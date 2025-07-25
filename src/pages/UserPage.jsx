import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function UserPage() {
    const { user } = useSelector((state) => state.auth);

    // Données de compte simulées
    const accounts = [
        { id: '8349', type: 'Checking', number: 'x8349', balance: 2082.79 },
        { id: '6712', type: 'Savings', number: 'x6712', balance: 10928.42 },
        { id: '8349-cc', type: 'Credit Card', number: 'x8349', balance: 184.30 }
    ];

    return (
        <div className="user-bg-dark">
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br />{user?.firstName || 'Tony'} {user?.lastName || 'Jarvis'}!</h1>
                    <button className="edit-button">Edit Name</button>
                </div>

                <h2 className="sr-only">Accounts</h2>

                {accounts.map((account) => (
                    <section key={account.id} className="account">
                        <div className="account-content-wrapper">
                            <h3 className="account-title">Argent Bank {account.type} ({account.number})</h3>
                            <p className="account-amount">${account.balance.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                            <p className="account-amount-description">
                                {account.type === 'Credit Card' ? 'Current Balance' : 'Available Balance'}
                            </p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <Link
                                to={`/accounts/${account.id}/transactions`}
                                className="transaction-button"
                            >
                                View transactions
                            </Link>
                        </div>
                    </section>
                ))}
            </main>
        </div>
    );
}

export default UserPage;