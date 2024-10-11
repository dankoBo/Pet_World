import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import { ANIMAL_TYPES } from '../../../app.config';
import { FormikProps } from 'formik';
import './FormStepOne.scss';

type FormStepOneProps = {
    formik: FormikProps<any>;
};

const FormStepOne: React.FC<FormStepOneProps> = ({ formik }) => {
    return (
        <div className="step-one-container">
            <TextField
                fullWidth
                label="Назва оголошення"
                variant="outlined"
                margin="normal"
                name="adName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.adName}
                error={formik.touched.adName && Boolean(formik.errors.adName)}
                helperText=""
            />
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="animal-type-label">Вид тварини</InputLabel>
                <Select
                    labelId="animal-type-label"
                    name="animalType"
                    value={formik.values.animalType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.animalType &&
                        Boolean(formik.errors.animalType)
                    }
                    label="Вид тварини"
                >
                    <MenuItem>Оберіть вид</MenuItem>
                    {ANIMAL_TYPES.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
                {formik.touched.animalType && formik.errors.animalType && (
                    <div style={{ color: 'red' }}></div>
                )}
            </FormControl>
            <div>
                <TextField
                    fullWidth
                    label="Ціна"
                    variant="outlined"
                    margin="normal"
                    name="price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText=""
                    disabled={formik.values.free}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formik.values.free}
                            onChange={() =>
                                formik.setFieldValue(
                                    'free',
                                    !formik.values.free
                                )
                            }
                            name="free"
                        />
                    }
                    label="Безкоштовно"
                />
            </div>
            <TextField
                fullWidth
                label="Локація"
                variant="outlined"
                margin="normal"
                name="location"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.location}
                error={
                    formik.touched.location && 
                    Boolean(formik.errors.location)
                }
                helperText=""
            />
            <TextField
                fullWidth
                label="Порода"
                variant="outlined"
                margin="normal"
                name="animalBreed"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.animalBreed}
                error={
                    formik.touched.animalBreed &&
                    Boolean(formik.errors.animalBreed)
                }
                helperText=""
            />
        </div>
    );
};

export default FormStepOne;
