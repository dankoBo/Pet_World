import * as Yup from 'yup';

export const registrationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, "Ім'я занадто коротке")
        .max(20, "Ім'я занадто довге")
        .matches(/^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ]+$/, 'Імʼя повинно містити лише літери')
        .required("Це поле є обов'язковим"),
    lastName: Yup.string()
        .min(2, 'Прізвище занадто коротке')
        .max(20, 'Too Long!')
        .matches(/^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ]+$/, 'Прізвище повинно містити лише літери')
        .required("Це поле є обов'язковим"),
    location: Yup.string()
        .matches(/^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ]+$/, 'Локація повинна містити лише літери')
        .required("Це поле є обов'язковим"),
    email: Yup.string()
        .email('Некоректна електронна пошта')
        .required("Це поле є обов'язковим"),
    password: Yup.string()
        .min(8, 'Пароль повинен містити щонайменше 8 символів')
        .required("Це поле є обов'язковим"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Паролі не співпадають')
        .required('Підтвердіть пароль'),
});
