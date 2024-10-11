import './RegistrationForm.scss';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import IconButton from '@mui/material/IconButton';
import Button from '../../ui/button/Button';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { registrationSchema } from '../../validation/registrationValidation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import MaskedInput from 'react-text-mask';

type RegistrationValues = {
    firstName: string;
    lastName: string;
    location: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

const RegistrationForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    const handleRegistration = async (values: RegistrationValues) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                firstName: values.firstName,
                lastName: values.lastName,
                location: values.location,
                phone: values.phone,
            });

            console.log('Користувач зареєстрований:', user);
            navigate('/');
        } catch (error) {
            console.error('Помилка реєстрації:', error instanceof Error ? error.message : 'Невідома помилка');
        }
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            location: '',
            email: '',
            phone: '+38 () - -',
            password: '',
            confirmPassword: '',
        },
        validationSchema: registrationSchema,
        onSubmit: async (values) => {
            await handleRegistration(values);
        },
    });

    const handleClickShowPassword = (
        state: (value: boolean) => void,
        item: boolean
    ) => {
        state(!item);
    };

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setChecked(event.target.checked);
    };

    const isFormFilled = () => {
        return Object.values(formik.values).every(value => value.trim() !== '');
    };

    return (
        <form className="registration-form" onSubmit={formik.handleSubmit}>
            <TextField
                name="firstName"
                fullWidth
                required
                label="Ім'я"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
                error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
                name="lastName"
                fullWidth
                required
                label="Прізвище"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
                error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
                name="location"
                fullWidth
                required
                label="Локація"
                onChange={formik.handleChange}
                value={formik.values.location}
                onBlur={formik.handleBlur}
                error={
                    formik.touched.location && Boolean(formik.errors.location)
                }
                helperText={formik.touched.location && formik.errors.location}
            />
            <TextField
                type="email"
                name="email"
                fullWidth
                required
                label="Електронна пошта"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
            <MaskedInput
                mask={['+', '3', '8', ' ', '(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                render={(ref, props) => (
                    <TextField
                        {...props}
                        inputRef={ref}
                        type="tel"
                        name="phone"
                        fullWidth
                        required
                        label="Номер телефону"
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                    />
                )}
            />
            <TextField
                name="password"
                fullWidth
                required
                label="Пароль"
                type={showPassword ? 'text' : 'password'}
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                error={
                    formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() =>
                                        handleClickShowPassword(
                                            setShowPassword,
                                            showPassword
                                        )
                                    }
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <MdVisibilityOff />
                                    ) : (
                                        <MdVisibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
            />
            <TextField
                name="confirmPassword"
                fullWidth
                required
                label="Повторіть пароль"
                type={showConfirmPassword ? 'text' : 'password'}
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
                error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                }
                helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                }
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() =>
                                        handleClickShowPassword(
                                            setShowConfirmPassword,
                                            showConfirmPassword
                                        )
                                    }
                                    edge="end"
                                >
                                    {showConfirmPassword ? (
                                        <MdVisibilityOff />
                                    ) : (
                                        <MdVisibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
            />
            <div className="privacy-policy">
                <input
                    className="privacy-policy__checkbox"
                    type="checkbox"
                    name="policy"
                    checked={checked}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="policy">
                    Я погоджуюся з{' '}
                    <a className="privacy-policy__link" href="#">
                        Політикою конфіденційності та Правилами користування
                    </a>
                </label>
            </div>
            <Button type="submit" className="button" disabled={!checked || !formik.isValid || !isFormFilled()}>
                Зареєструватися
            </Button>
        </form>
    );
};

export default RegistrationForm;
