import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../services/api';
import { loginSuccess, setError } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setError(null));
        try {
            const data = await login(email, password);
            dispatch(loginSuccess(data));
            navigate('/profile');
        } catch (err) {
            dispatch(setError(err.message || 'Login failed'));
        }
    };

    return (
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Sign In</button>
            </form>
        </section>
    );
}

export default Login;