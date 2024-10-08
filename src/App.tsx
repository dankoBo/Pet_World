import Header from './components/header/Header';
import MainPage from './pages/main-page/MainPage';
import RegistrationPage from './pages/registration-page/RegistrationPage';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import LoginPage from './pages/login-page/LoginPage';

function App() {
    return (
        <>
            <Header />
            <main className="main">
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/registration" element={<RegistrationPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
