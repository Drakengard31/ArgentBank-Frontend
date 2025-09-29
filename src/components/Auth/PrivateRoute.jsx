import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../../services/api';
import { setUser, logout } from '../../store/slices/authSlice';

function PrivateRoute({ children }) {
    const { token, isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserProfile = async () => {
            if (!token) {
                navigate('/login');
                setLoading(false);
                return;
            }

            try {
                // Si pas d'utilisateur dans le state, on charge le profil
                if (!user) {
                    const userData = await getProfile(token);
                    dispatch(setUser(userData.body || userData));
                }
                setLoading(false);
            } catch (error) {
                console.error('Failed to load user profile:', error);
                dispatch(logout());
                navigate('/login');
                setLoading(false);
            }
        };

        loadUserProfile();
    }, [token, user, navigate, dispatch]);

    if (loading) {
        return (
            <div className="loading-container">
                <div>Loading...</div>
            </div>
        );
    }

    return isAuthenticated && user ? children : null;
}

export default PrivateRoute;