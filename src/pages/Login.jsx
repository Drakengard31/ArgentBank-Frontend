import React, { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';

export default function Login() {
    const [error, setError] = useState(null);

    return (
        <main className="main bg-dark">
            <LoginForm onError={setError} />
            {error && <p className="error">{error}</p>}
        </main>
    );
}