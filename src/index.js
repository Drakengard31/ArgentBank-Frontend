import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import './index.css';
import {getProfile} from "./services/api";

const root = ReactDOM.createRoot(document.getElementById('root'));

if (localStorage.getItem('token')) {
    store.dispatch(getProfile(localStorage.getItem('token')));
}

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);