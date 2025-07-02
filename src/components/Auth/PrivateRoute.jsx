import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../../services/api';
import { setUser, setError } from '../../store/slices/authSlice';
import PropTypes from 'prop-types';

function PrivateRoute({ children }) {
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            const loadProfile = async () => {
                try {
                    const userData = await getProfile(token);
                    dispatch(setUser(userData));
                } catch (error) {
                    dispatch(setError('Session expired. Please login again.'));
                    navigate('/login');
                }
            };
            loadProfile();
        }
    }, [token, navigate, dispatch]);

    return token ? children : null;
}
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
};
export default PrivateRoute;