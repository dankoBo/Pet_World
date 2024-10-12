import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import MainPage from './pages/main-page/MainPage';
import RegistrationPage from './pages/registration-page/RegistrationPage';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import LoginPage from './pages/login-page/LoginPage';
import UserProfilePage from './pages/user-profile-page/UserProfilePage';
import { onAuthStateChanged, User  } from 'firebase/auth';
import { auth } from './firebase';
import AddPetPage from './pages/add-pet-page/AddPetPage';
import PetProfilePage from './pages/pet-profile-page/PetProfilePage'

function App() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            console.log('User state changed:', user);
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
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
