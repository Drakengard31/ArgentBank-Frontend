import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../services/api';
import { setUser } from '../../store/slices/authSlice';

function UserForm({ onCancel, initialUserName }) {
    const [userName, setUserName] = useState(initialUserName || '');
    const [error, setError] = useState(null);
    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateUserProfile({ userName }, token);
            dispatch(setUser(updatedUser.body || updatedUser));
            setError(null);
            if (onCancel) onCancel();
        } catch (error) {
            setError('Failed to update username');
            console.error('Update error:', error);
        }
    };

    const handleCancel = () => {
        setUserName(initialUserName || '');
        setError(null);
        if (onCancel) onCancel();
    };

    return (
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
                        autoFocus
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
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
            {error && <p className="error-txt">{error}</p>}
        </div>
    );
}

export default UserForm;