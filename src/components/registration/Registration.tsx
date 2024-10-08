import RegistrationForm from '../registration-form/RegistrationForm';
import './Registration.scss';

const Registration = () => {
    return (
        <div className="form-wrapper">
            <section className="registration">
                <div className="registration__title-wrapper">
                    <h2 className='registration__title'>Привіт!</h2>
                    <h3 className='registration__subtitle'>Будь ласка введіть свої дані, щоб зареєструватися</h3>
                </div>
                <RegistrationForm />
                <p className='login-alternative'>
                    Вже маєте акаунт? <a className='login-alternative__link' href="#">Вхід</a>
                </p>
            </section>
        </div>
    )
};

export default Registration;
