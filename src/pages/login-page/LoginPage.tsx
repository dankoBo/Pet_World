import { Link } from 'react-router-dom';
import LoginForm from '../../components/login-form/LoginForm';
import './LoginPage.scss';

const LoginPage = () => {
    return (
        <div className="login-form-wrapper">
            <section className="login">
                <div className="login__title-wrapper">
                    <h2 className="login__title">Привіт знову!</h2>
                    <h3 className="login__subtitle">Будь ласка, введіть свої дані, щоб увійти</h3>
                </div>
                <LoginForm />
                <p className="registration-alternative">
                    Ще не маєте акаунту?{' '}
                    <Link to="/registration" className="registration-alternative__link">
                        Зареєструватися
                    </Link>
                </p>
            </section>
        </div>
    );
};

export default LoginPage;
