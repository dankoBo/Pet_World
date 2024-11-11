import * as Yup from 'yup';

const phoneRegex = /^\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}$/;

export const userUpdateSchema = Yup.object().shape({
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
        .matches(/^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s-]+$/, 'Локація повинна містити лише літери')
        .required("Це поле є обов'язковим"),
    email: Yup.string()
        .email('Некоректна електронна пошта')
        .required("Це поле є обов'язковим"),
    phone: Yup.string()
        .matches(phoneRegex, 'Номер телефону має бути у форматі +38 (0XX) XXX-XX-XX')
        .required('Це поле є обов\'язковим'),
});
