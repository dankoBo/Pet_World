import { TextField } from '@mui/material';
import PhotoInput from '../../photo-input/PhotoInput';
import { FormikProps } from 'formik';
import './FormStepThree.scss';

type FormStepThreeProps = {
    formik: FormikProps<any>;
    setImageFile: (file: File | null) => void;
};

const Step3: React.FC<FormStepThreeProps> = ({ formik, setImageFile }) => {
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

export default Step3;
