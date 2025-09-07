import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUserProfile } from '../services/api';
import { setUser } from '../store/slices/authSlice';

function UserPage() {
    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState('');
    const [error, setError] = useState(null);
    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // Initialiser le userName avec la valeur actuelle
    useEffect(() => {
        if (user?.userName) {
            setUserName(user.userName);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateUserProfile({ userName }, token);
            dispatch(setUser(updatedUser.body || updatedUser));
            setIsEditing(false);
            setError(null);
        } catch (error) {
            setError('Failed to update username');
            console.error('Update error:', error);
        }
    };

    // Données de compte simulées
    const accounts = [
        { id: '8349', type: 'Checking', number: 'x8349', balance: 2082.79 },
        { id: '6712', type: 'Savings', number: 'x6712', balance: 10928.42 },
        { id: '8349-cc', type: 'Credit Card', number: 'x8349', balance: 184.30 }
    ];

    return (
        <div className="user-bg-dark">
            <main className="main bg-dark">
                <div className="header">
                    {!isEditing ? (
                        <>
                            <h1>Welcome back<br />{user?.firstName || 'Tony'} {user?.lastName || 'Jarvis'}!</h1>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="edit-button"
                            >
                                Edit Name
                            </button>
                        </>
                    ) : (
                        <div className="edit-form-container">
                            <h3>Edit user info</h3>
                            <form onSubmit={handleSubmit} className="edit-username-form">
                                <div className="input-container">
                                    <label htmlFor="username">User name:</label>
                                    <input
                                        type="text"
                                        id="username"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-container">
                                    <label>First name:</label>
                                    <input
                                        type="text"
                                        value={user?.firstName || ''}
                                        disabled
                                        className="disabled-input"
                                    />
                                </div>
                                <div className="input-container">
                                    <label>Last name:</label>
                                    <input
                                        type="text"
                                        value={user?.lastName || ''}
                                        disabled
                                        className="disabled-input"
                                    />
                                </div>
                                <div className="form-btn-container">
                                    <button type="submit" className="edit-button">
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="edit-button"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                            {error && <p className="error-txt">{error}</p>}
                        </div>
                    )}
                </div>

                <h2 className="sr-only">Accounts</h2>

                {accounts.map((account) => (
                    <section key={account.id} className="account">
                        <div className="account-content-wrapper">
                            <h3 className="account-title">Argent Bank {account.type} ({account.number})</h3>
                            <p className="account-amount">${account.balance.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                            <p className="account-amount-description">
                                {account.type === 'Credit Card' ? 'Current Balance' : 'Available Balance'}
                            </p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <Link
                                to={`/accounts/${account.id}/transactions`}
                                className="transaction-button"
                            >
                                View transactions
                            </Link>
                        </div>
                    </section>
                ))}
            </main>
        </div>
    );
}

export default UserPage;