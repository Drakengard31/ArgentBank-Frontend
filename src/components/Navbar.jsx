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

    return (
        <nav className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img src={logo} alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {isAuthenticated ? (
                    <>
                        <Link to="/profile" className="main-nav-item">
                            <i className="fa fa-user-circle"></i>
                            {user?.firstName || 'Profile'}
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="main-nav-item"
                            aria-label="Sign out"
                        >
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="main-nav-item">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;