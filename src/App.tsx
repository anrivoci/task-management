import { useCallback, useEffect, Suspense } from 'react';
//other-libs
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
//store
import { AppDispatch } from './state/store';
import { getUserDetails, refreshToken } from './state/auth/authActions';
import { logOut } from './state/auth/authSlice';
//routes
import { routes } from './routes/config';
//components
import ProtectedRoute from './routes/protected_route';
import Layout from './components/layout';
import Fallback from './components/fallback';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token: any = localStorage.getItem('token');
  const accessToken: any = localStorage.getItem('token');

  const handleRefreshToken = useCallback((tokenExp: number) => {
    const currentTime = Date.now() / 1000;
    const timeLeft = tokenExp - currentTime;

    const refreshTime = timeLeft > 5 ? timeLeft - 5 : 0;

    setTimeout(async () => {
      try {
        const resultAction = await dispatch(refreshToken(accessToken));
        if (refreshToken.fulfilled.match(resultAction)) {
          const newToken = resultAction.payload.token;
          localStorage.setItem('token', newToken);
          const newDecoded: any = jwtDecode(newToken);
          handleRefreshToken(newDecoded.exp);
        } else {
          dispatch(logOut());
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    }, refreshTime * 1000);
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      const tokenExp: any = decoded.exp;
      handleRefreshToken(tokenExp);
      dispatch(getUserDetails(token));
    }
  }, [token, dispatch, handleRefreshToken]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Fallback />}>
        <Routes>
          {routes.map(({ path, element: Element, isProtected }) => {
            let content = null;
            if (path === "/") {
              content = token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
            } else {
              content = Element ? <Element /> : null;
            }

            return (
              isProtected ? (
                <Route element={<ProtectedRoute />} key={path}>
                  <Route path={path} element={
                    <Layout>
                      {content}
                    </Layout>
                  } />
                </Route>
              ) : (
                <Route path={path} element={content} key={path} />
              )
            );
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;