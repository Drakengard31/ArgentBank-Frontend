import { Link } from 'react-router-dom';

function Account({ account }) {
    const { id, type, number, balance } = account;

    return (
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank {type} ({number})</h3>
                <p className="account-amount">${balance.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                <p className="account-amount-description">
                    {type === 'Credit Card' ? 'Current Balance' : 'Available Balance'}
                </p>
            </div>
            <div className="account-content-wrapper cta">
                <Link
                    to={`/accounts/${id}/transactions`}
                    className="transaction-button"
                >
                    View transactions
                </Link>
            </div>
        </section>
    );
}

export default Account;
