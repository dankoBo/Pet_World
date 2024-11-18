import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch} from 'react-redux';
import MaskedInput from 'react-text-mask';
import { userUpdateSchema } from '../../validation/userUpdateValidation';
import { stopUpdateInfo, updateUserData } from '../../store/userUpdateSlice';
import { inputMask } from '../../app.config';
import Button from '../../ui/button/Button';
import './UserUpdateForm.scss';

type UserUpdateValues = {
    firstName: string;
    lastName: string;
    location: string;
    email: string;
    phone: string;
};

type UserInfoProps = {
    userInfoData: UserUpdateValues | null;
    email: string | null;
    userId: string | null;
};

const UserUpdateForm: React.FC<UserInfoProps> = ({ userInfoData, email, userId }) => {
    const dispatch = useDispatch();

    const updateUserInfo = async (values: UserUpdateValues) => {
        if (userId) {
            const userDocRef = doc(db, "users", userId);

            try {
                await updateDoc(userDocRef, {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    location: values.location,
                    email: values.email,
                    phone: values.phone,
                });
                console.log("User data updated successfully");
            } catch (error) {
                console.error("Error updating user data:", error);
            }
        } else {
            console.error("User ID is not defined");
        }
    };

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
            dispatch(updateUserData(values))
            dispatch(stopUpdateInfo());
        },
    });

    const cancelUserUpdate = () => {
        dispatch(stopUpdateInfo());
    }

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
            <div className="user-update-form__controls">
                <Button type="submit" className="button" disabled={!formik.isValid || !isFormFilled()}>
                    Зберегти
                </Button>
                <Button className="warning" onClick={cancelUserUpdate} disabled={!formik.isValid || !isFormFilled()}>
                    Скасувати
                </Button>
            </div>
        </form>
    );
};

export default UserUpdateForm;
