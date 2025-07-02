import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../services/api';
import { setUser } from '../store/slices/authSlice';
import Account from '../components/Account';

function Profile() {
    const [error, setLocalError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState('');
    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // Initialise le nom d'utilisateur lorsque les données user sont disponibles
    useState(() => {
        if (user?.userName) {
            setUserName(user.userName);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateUserProfile({ userName }, token);
            dispatch(setUser(updatedUser));
            setIsEditing(false);
            setLocalError(null);
        } catch (error) {
            setLocalError('Failed to update username');
        }
    };

    return (
        <main className="main bg-dark user-bg-dark">
            <div className="header">
                <h1>
                    Welcome back
                    <br />
                    {user?.firstName} {user?.lastName}!
                </h1>

                {isEditing ? (
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
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="edit-button"
                    >
                        Edit Name
                    </button>
                )}
            </div>

            <h2 className="sr-only">Accounts</h2>

            <Account
                title="Argent Bank Checking (x8349)"
                amount="$2,082.79"
                description="Available Balance"
            />

            <Account
                title="Argent Bank Savings (x6712)"
                amount="$10,928.42"
                description="Available Balance"
            />

            <Account
                title="Argent Bank Credit Card (x8349)"
                amount="$184.30"
                description="Current Balance"
            />
        </main>
    );
}

export default Profile;