import './UserUpdateForm.scss';
import { TextField } from '@mui/material';
import Button from '../../ui/button/Button';
import { useFormik } from 'formik';
import MaskedInput from 'react-text-mask';
import { userUpdateSchema } from '../../validation/userUpdateValidation';

type UserUpdateValues = {
    firstName: string;
    lastName: string;
    location: string;
    email: string;
    phone: string;
}

type UserInfoProps = {
    userInfoData: UserUpdateValues | null;
    email: string | null;
    userId: string | null;
};

const UserUpdateForm: React.FC<UserInfoProps> = ({ userInfoData, email, userId }) => {
    const inputMask = ['+', '3', '8', ' ', '(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]
    const updateUserInfo = () => {
        console.log('user data updated');
    }

    const formik = useFormik<UserUpdateValues>({
        initialValues: {
            firstName: userInfoData?.firstName || '',
            lastName: userInfoData?.lastName || '',
            location: userInfoData?.location || '',
            email: email || '',
            phone: userInfoData?.phone || '',
        },
        validationSchema: userUpdateSchema,
        onSubmit: async (values) => {
            await updateUserInfo(values);
            console.log(userId);
            
        },
    });

    const isFormFilled = () => {
        return Object.values(formik.values).every(value => value.trim() !== '');
    };

    return (
        <form className="user-update-form" onSubmit={formik.handleSubmit}>
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
                mask={inputMask}
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
            <Button type="submit" className="button" disabled={!formik.isValid || !isFormFilled()}>
                Зберегти
            </Button>
        </form>
    );
};

export default UserUpdateForm;
