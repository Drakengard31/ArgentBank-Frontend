import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { Link } from 'react-router-dom';
import logo from '../assets/argentBankLogo.png';

function Navbar() {
    const dispatch = useDispatch();
    const { token, user } = useSelector((state) => state.auth);

    return (
        <nav className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img src={logo} alt="Argent Bank Logo" />
            </Link>
            <div>
                {token ? (
                    <>
                        <Link to="/profile" className="main-nav-item">
                            <i className="fa fa-user-circle"></i>
                            {user?.firstName}
                        </Link>
                        <button
                            onClick={() => dispatch(logout())}
                            className="main-nav-item"
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