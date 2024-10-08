import Header from './components/header/Header';
import MainPage from './pages/main-page/MainPage';
import Registration from './components/registration/Registration'
import { Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer'

function App() {
    return (
        <>
            <Header />
            <main className="main">
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/registration" element={<Registration />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App
