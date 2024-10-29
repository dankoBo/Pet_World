import './AddPetForm.scss';
import { useState } from 'react';
import { useFormik } from 'formik';
import { addPetSchema } from '../../validation/addPetValidation';
import Button from '../../ui/button/Button';
import FormStepOne from './form-step-one/FormStepOne';
import FormStepTwo from './form-step-two/FormStepTwo';
import FormStepThree from './form-step-three/FormStepThree';
import { db } from '../../firebase';
import { getAuth } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { serverTimestamp } from 'firebase/firestore';
// import { v4 as uuidv4 } from 'uuid';

const uploadImageToStorage = async (
    file: File | null
): Promise<string | null> => {
    if (!file) return null;

    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);

    try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error('Помилка завантаження зображення:', error);
        return null;
    }
};

const AddPetForm = () => {
    const [step, setStep] = useState(0);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            adName: '',
            animalType: '',
            price: '',
            free: false,
            location: '',
            petOrigin: '',
            animalVariety: '',
            animalAge: '',
            ageUnit: '',
            gender: '',
            chip: false,
            sterilization: false,
            parasite: false,
            vaccination: false,
            passport: false,
            pedigree: false,
            metrics: false,
            cynology: false,
            additional: '',
        },
        validationSchema: addPetSchema,
        onSubmit: async (values) => {
            const auth = getAuth();
            const user = auth.currentUser;

            const imageUrl = await uploadImageToStorage(imageFile);

            try {
                await addDoc(collection(db, 'animals'), {
                    // id: uuidv4(),
                    createdAt: serverTimestamp(),
                    ...values,
                    imageUrl,
                    userId: user ? user.uid : null,
                    animalAge: `${values.animalAge} ${values.ageUnit}`,
                });
                console.log('Ad successfully submitted!');
                navigate('/user-profile');
            } catch (error) {
                console.error('Error submitting ad:', error);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="form-container">
            <div className="step-indicator">
                {['Крок 1', 'Крок 2', 'Крок 3'].map((label, index) => (
                    <div
                        key={index}
                        className={`step ${
                            step === index
                                ? 'active'
                                : step > index
                                ? 'completed'
                                : ''
                        }`}
                    >
                        {label}
                    </div>
                ))}
            </div>
            {step === 0 && <FormStepOne formik={formik} />}
            {step === 1 && <FormStepTwo formik={formik} />}
            {step === 2 && (
                <FormStepThree formik={formik} setImageFile={setImageFile} />
            )}
            <div className="form-button">
                <div className="form-button__container">
                    {step > 0 && (
                        <Button
                            className="prev"
                            type="button"
                            onClick={() => setStep(step - 1)}
                        >
                            Назад
                        </Button>
                    )}
                </div>
                <div className="form-button__container">
                    {step < 2 && (
                        <Button
                            className="forward"
                            type="button"
                            onClick={() => setStep(step + 1)}
                        >
                            Вперед
                        </Button>
                    )}
                    {step === 2 && (
                        <Button className="publish" type="submit">
                            Опублікувати
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default AddPetForm;
