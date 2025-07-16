import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../../services/api';
import { setUser, logout } from '../../store/slices/authSlice';

function PrivateRoute({ children }) {
    const { token, isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token && !isAuthenticated) {
            navigate('/login');
        } else if (token && !isAuthenticated) {
            const loadProfile = async () => {
                try {
                    const userData = await getProfile(token);
                    dispatch(setUser(userData.body));
                } catch (error) {
                    dispatch(logout());
                    navigate('/login');
                }
            };
            loadProfile();
        }
    }, [token, isAuthenticated, navigate, dispatch]);

    return isAuthenticated ? children : null;
}

export default PrivateRoute;