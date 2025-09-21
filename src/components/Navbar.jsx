import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/argentBankLogo.png';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    // Fonction pour obtenir le nom à afficher
    const getDisplayName = () => {
        if (user?.userName) {
            return user.userName;
        }
        return user?.firstName || 'Profile';
    };

    return (
        <nav className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img src={logo} alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div className="main-nav-right">
                {isAuthenticated ? (
                    <>
                        <Link to="/profile" className="main-nav-item profile-link">
                            <i className="fa fa-user-circle nav-icon"></i>
                            <span className="username">{getDisplayName()}</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="main-nav-item logout-btn"
                            aria-label="Sign out"
                        >
                            <i className="fa fa-sign-out nav-icon"></i>
                            <span>Sign Out</span>
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="main-nav-item signin-link">
                        <i className="fa fa-user-circle nav-icon"></i>
                        <span>Sign In</span>
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;