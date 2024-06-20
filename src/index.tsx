import React from 'react';
import ReactDOM from 'react-dom/client';
//other-libs
import { Provider } from 'react-redux';
import { LanguageProvider } from './hooks/language_provider';
//componen
import App from './App';
//store
import { store } from './state/store';
//styles
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </LanguageProvider>
  </React.StrictMode>

);
