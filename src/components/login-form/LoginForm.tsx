import './LoginForm.scss';
import { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { MdVisibility } from 'react-icons/md';
import { MdVisibilityOff } from 'react-icons/md';
import { useFormik } from 'formik';
import { loginSchema } from '../../validation/loginValidation';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/button/Button';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await signInWithEmailAndPassword(auth,values.email,values.password);
                navigate('/');
            } catch (error) {
                console.error('Помилка при вході:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form onSubmit={formik.handleSubmit} className="registration-form">
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
                                    onClick={handleClickShowPassword}
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
            <Button
                type="submit"
                className="button"
                disabled={formik.isSubmitting || !formik.isValid}
            >
                Увійти
            </Button>
        </form>
    );
};

export default LoginForm;
