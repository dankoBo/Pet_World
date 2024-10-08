import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Некоректна електронна пошта')
        .required("Це поле є обов'язковим"),
    password: Yup.string()
        .min(8, 'Пароль повинен містити щонайменше 8 символів')
        .required("Це поле є обов'язковим"),
});
