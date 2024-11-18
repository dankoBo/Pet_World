import { FormikProps } from 'formik';
import { TextField } from '@mui/material';
import PhotoInput from '../../photo-input/PhotoInput';
import './FormStepThree.scss';

type FormValues = {
    adName: string;
    animalType: string;
    price: string;
    free: boolean;
    location: string;
    petOrigin: string;
    animalVariety: string;
    animalAge: string;
    ageUnit: string;
    gender: string;
    chip: boolean;
    sterilization: boolean;
    parasite: boolean;
    vaccination: boolean;
    passport: boolean;
    pedigree: boolean;
    metrics: boolean;
    cynology: boolean;
    additional: string;
}

type FormStepThreeProps = {
    formik: FormikProps<FormValues>;
    setImageFile: (file: File | null) => void;
};

const FormStepThree: React.FC<FormStepThreeProps> = ({ formik, setImageFile }) => {
    return (
        <div className="step-three-container">
            <TextField
                fullWidth
                label="Додаткова інформація"
                variant="outlined"
                margin="normal"
                multiline
                rows={3}
                name="additional"
                onChange={formik.handleChange}
                value={formik.values.additional}
            />
            <div>
                <label className="form-label">Фото</label>
                <PhotoInput onImageSelect={setImageFile} />
            </div>
        </div>
    );
};

export default FormStepThree;
