import { useState, useEffect } from 'react';
//other libs
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//state
import { userLogin } from '../../state/auth/authActions';
import { AppDispatch, RootState } from '../../state/store';
//provider
import { useLanguage } from '../../hooks/language_provider';
//styles
import './login.css';

const LoginScreen = () => {
    const { translations } = useLanguage();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    })

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            navigate('/dashboard', { replace: true });
        }
    }, [navigate, token]);

    const submitForm = (e: any) => {
        e.preventDefault();
        dispatch(userLogin({
            username: credentials.username,
            password: credentials.password
        }));
    };

    const handleCredentials = (key: string, value: string) => {
        setCredentials((prev) => {
            return {
                ...prev,
                [key]: value
            }
        })
    }

    return (
        <div className='login-container'>
            <form className='login-form' onSubmit={submitForm}>
                <h1 className='title'>{translations.welcomeMessage}</h1>
                {error && <div className='error-message'>{error}</div>}
                <div className='form-group'>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        id='username'
                        className='form-input'
                        value={credentials.username}
                        onChange={(e) => handleCredentials('username', e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        className='form-input'
                        value={credentials.password}
                        onChange={(e) => handleCredentials('password', e.target.value)}
                        required
                    />
                </div>
                <div className='form-button'>
                    <button type='submit' className='button' disabled={loading}>
                        {loading ? "Logging in..." : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginScreen;