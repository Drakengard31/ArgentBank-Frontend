import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

function UserPage() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className="user-bg-dark">
            <nav className="main-nav">
                <a className="main-nav-logo" href="/">
                    <h1 className="sr-only">Argent Bank</h1>
                </a>
                <div className="main-nav-right">
                    <span className="main-nav-item">
                        <i className="fa fa-user-circle"></i>
                        {user?.firstName || 'Tony'}
                    </span>
                    <button className="main-nav-item" onClick={handleLogout}>
                        <i className="fa fa-sign-out"></i>
                        Sign Out
                    </button>
                </div>
            </nav>

            <main className="main">
                <div className="header">
                    <h1>Welcome back<br />{user?.firstName || 'Tony'} {user?.lastName || 'Jarvis'}!</h1>
                    <button className="edit-button">Edit Name</button>
                </div>

                {/* Account 1 */}
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                        <p className="account-amount">$2,082.79</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>

                {/* Account 2 */}
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                        <p className="account-amount">$10,928.42</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>

                {/* Account 3 */}
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                        <p className="account-amount">$184.30</p>
                        <p className="account-amount-description">Current Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default UserPage;
