import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import MainPage from './pages/main-page/MainPage';
import RegistrationPage from './pages/registration-page/RegistrationPage';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import LoginPage from './pages/login-page/LoginPage';
import UserProfilePage from './pages/user-profile-page/UserProfilePage';
import { onAuthStateChanged, User  } from 'firebase/auth';
import AddPetInfo from './components/add-pet-info/AddPetInfo'
import { auth } from './firebase';

function App() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user); // Оновлює статус аутентифікації
        });

        return () => unsubscribe(); // Очистка підписки
    }, []);

    return (
        <>
            <Header />
            <main className="main">
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/registration" element={<RegistrationPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/user-profile" element={<UserProfilePage />} />
                    <Route
                        path="/add-pet"
                        element={user ? <AddPetInfo /> : <RegistrationPage />}
                    />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
