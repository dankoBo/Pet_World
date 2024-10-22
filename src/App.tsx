import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import MainPage from './pages/main-page/MainPage';
import RegistrationPage from './pages/registration-page/RegistrationPage';
import LoginPage from './pages/login-page/LoginPage';
import UserProfilePage from './pages/user-profile-page/UserProfilePage';
import PetProfilePage from './pages/pet-profile-page/PetProfilePage';
import AddPetPage from './pages/add-pet-page/AddPetPage';
import AdvertisementPage from './pages/advertisement-page/AdvertisementPage';
import Footer from './components/footer/Footer';
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';

function App() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
            <Header />
            <main className="main">
                <Routes>
                    <Route path="/" element={<MainPage/>} />
                    <Route path="/registration" element={<RegistrationPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route 
                        path="/user-profile" 
                        element={user ? <UserProfilePage /> : <LoginPage />} 
                    />
                    <Route path="/pet-profile/:petId" element={<PetProfilePage />} />
                    <Route
                        path="/add-pet"
                        element={user ? <AddPetPage /> : <RegistrationPage />}
                    />
                    <Route path="/advertisement" element={<AdvertisementPage />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
