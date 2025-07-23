import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function TransactionDetails() {
    const { transactionId } = useParams();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        category: 'Food',
        notes: 'Lorem ipsum'
    });

    // Simuler la récupération des détails de la transaction
    const transaction = {
        id: transactionId,
        date: '2020-02-27',
        description: 'Golden Sun Bakery',
        amount: 8.00,
        balance: 298.00,
        category: 'Food',
        notes: ''
    };

    const handleSave = () => {
        // Ici, vous pourriez appeler une API pour sauvegarder les modifications
        setEditMode(false);
    };

    return (
        <div className="transaction-details-page">
            <h2>Transaction Details</h2>
            <button onClick={() => navigate(-1)} className="back-button">
                Back to transactions
            </button>

            <div className="transaction-info">
                <p><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString('fr-FR')}</p>
                <p><strong>Description:</strong> {transaction.description}</p>
                <p><strong>Amount:</strong> ${transaction.amount.toFixed(2)}</p>
                <p><strong>Balance:</strong> ${transaction.balance.toFixed(2)}</p>
            </div>

            <div className="transaction-edit-section">
                <div>
                    <strong>Transaction type</strong>
                    <p>Electronic</p>
                </div>
                <div>
                    <strong>Category</strong>
                    {editMode ? (
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                        >
                            <option value="Food">Food</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Entertainment">Entertainment</option>
                        </select>
                    ) : (
                        <div>
                            <span>{formData.category}</span>
                            <button onClick={() => setEditMode(true)}>
                                Edit
                            </button>
                        </div>
                    )}
                </div>
                <div>
                    <strong>Note</strong>
                    {editMode ? (
                        <input
                            type="text"
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        />
                    ) : (
                        <div>
                            <span>{formData.notes}</span>
                            <button onClick={() => setEditMode(true)}>
                                Edit
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {editMode && (
                <div className="edit-actions">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default TransactionDetails;