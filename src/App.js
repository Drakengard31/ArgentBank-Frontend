import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/Auth/PrivateRoute';
import HomePage from './components/HomePage';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";

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
                            <Profile />
                        </PrivateRoute>
                    }
                />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
export default App;