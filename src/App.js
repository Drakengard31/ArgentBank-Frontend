import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/Auth/PrivateRoute';
import HomePage from './components/HomePage';
import Login from './pages/Login';
import UserPage from './pages/UserPage';
import TransactionList from './pages/TransactionList';
import TransactionDetails from './pages/TransactionDetails';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <UserPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/accounts/:accountId/transactions"
                    element={
                        <PrivateRoute>
                            <TransactionList />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/transactions/:transactionId"
                    element={
                        <PrivateRoute>
                            <TransactionDetails />
                        </PrivateRoute>
                    }
                />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
