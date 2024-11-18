import { Link } from 'react-router-dom';
import RegistrationForm from '../../components/registration-form/RegistrationForm';
import './RegistrationPage.scss';

const Registration = () => {
    return (
        <div className="registration-form-wrapper">
            <section className="registration">
                <div className="registration__title-wrapper">
                    <h2 className="registration__title">Привіт!</h2>
                    <h3 className="registration__subtitle">Будь ласка введіть свої дані, щоб зареєструватися</h3>
                </div>
                <RegistrationForm />
                <p className="login-alternative">
                    Вже маєте акаунт?{' '}
                    <Link to="/login" className="login-alternative__link">
                        Вхід
                    </Link>
                </p>
            </section>
        </div>
    );
};

export default Registration;
