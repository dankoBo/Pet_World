import * as Yup from 'yup';

export const addPetSchema = Yup.object().shape({
    adName: Yup.string().required("Назва оголошення є обов'язковою"),
    animalType: Yup.string().required('Оберіть вид тварини'),
    price: Yup.number().required('Вкажіть ціну'),
    location: Yup.string().required('Вкажіть локацію'),
    animalVariety: Yup.string().required('Вкажіть тварини'),
    animalAge: Yup.number().required('Вкажіть вік тварини'),
    gender: Yup.string().required('Оберіть стать'),
});
