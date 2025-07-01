import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../services/api';
import { setUser } from '../store/slices/authSlice';
import PropTypes from 'prop-types';

function Profile() {
    const [error, setLocalError] = useState(null);
    const { user, token } = useSelector((state) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState(user?.userName || '');
    const dispatch = useDispatch();

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
        <main className="main bg-dark">
            <div className="header">
                <h1>
                    Welcome back
                    <br />
                    {user?.firstName} {user?.lastName}!
                </h1>
                {isEditing ? (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <button type="submit">Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </form>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="edit-button"
                    >
                        Edit Name
                    </button>
                )}
            </div>
            {/* ... Afficher les comptes bancaires ... */}
        </main>
    );
}
export default Profile;