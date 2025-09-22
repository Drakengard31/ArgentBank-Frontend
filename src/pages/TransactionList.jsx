import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

function TransactionList() {
    const { accountId } = useParams();
    const [transactions, setTransactions] = useState([]);
    const [account, setAccount] = useState(null);
    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simuler la récupération des données du compte
                setAccount({
                    type: "Checking",
                    number: "x3448",
                    balance: 48098.43
                });

                // Simuler des données de transaction
                const mockTransactions = [
                    {
                        id: '1',
                        date: '2020-02-27',
                        description: 'Golden Sun Bakery',
                        amount: 8.00,
                        balance: 298.00,
                        category: 'Food',
                        notes: ''
                    },
                    {
                        id: '2',
                        date: '2020-02-27',
                        description: 'Golden Sun Bakery',
                        amount: 8.00,
                        balance: 298.00,
                        category: 'Food',
                        notes: ''
                    },
                    {
                        id: '3',
                        date: '2020-02-27',
                        description: 'Golden Sun Bakery',
                        amount: 8.00,
                        balance: 298.00,
                        category: 'Food',
                        notes: ''
                    }
                ];
                setTransactions(mockTransactions);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };
        fetchData();
    }, [accountId, token]);

    if (!account) return <div>Loading...</div>;

    return (
        <div className="transaction-page">
            <div className="account-header">
                <h2>Argent Bank {account.type} ({account.number})</h2>
                <p className="account-balance">${account.balance.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                <p className="balance-label">Available balance</p>
            </div>

            <div className="transaction-container">
                <table className="transaction-table">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Balance</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{new Date(transaction.date).toLocaleDateString('fr-FR')}</td>
                            <td>
                                <Link to={`/transactions/${transaction.id}`}>
                                    {transaction.description}
                                </Link>
                            </td>
                            <td>${transaction.amount.toFixed(2)}</td>
                            <td>${transaction.balance.toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TransactionList;