import { useState } from 'react';
import { useSelector } from 'react-redux';
import Account from '../components/Account/Account';
import UserForm from '../components/UserForm/UserForm';

function UserPage() {
    const [isEditing, setIsEditing] = useState(false);
    const { user } = useSelector((state) => state.auth);

    // Données de compte centralisées
    const accounts = [
        { id: '8349', type: 'Checking', number: 'x8349', balance: 2082.79 },
        { id: '6712', type: 'Savings', number: 'x6712', balance: 10928.42 },
        { id: '8349-cc', type: 'Credit Card', number: 'x8349', balance: 184.30 }
    ];

    return (
        <div className="user-bg-dark">
            <main className="main bg-dark">
                <div className="header">
                    {!isEditing ? (
                        <>
                            <h1>Welcome back<br />{user?.firstName || 'Tony'} {user?.lastName || 'Jarvis'}!</h1>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="edit-button"
                            >
                                Edit Name
                            </button>
                        </>
                    ) : (
                        <UserForm
                            onCancel={() => setIsEditing(false)}
                            initialUserName={user?.userName}
                        />
                    )}
                </div>

                <h2 className="sr-only">Accounts</h2>

                {accounts.map((account) => (
                    <Account key={account.id} account={account} />
                ))}
            </main>
        </div>
    );
}

export default UserPage;