import './FormStepOne.scss';
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    RadioGroup,
    Radio,
} from '@mui/material';
import { ANIMAL_TYPES } from '../../../app.config';
import { FormikProps } from 'formik';

type FormStepOneProps = {
    formik: FormikProps<any>;
};

const FormStepOne: React.FC<FormStepOneProps> = ({ formik }) => {
    return (
        <div className="step-one-container">
            <TextField
                name="adName"
                fullWidth
                required
                label="Назва оголошення"
                variant="outlined"
                margin="normal"
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
                    name="price"
                    fullWidth
                    required
                    label="Ціна"
                    variant="outlined"
                    margin="normal"
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
                name="location"
                fullWidth
                required
                label="Локація"
                variant="outlined"
                margin="normal"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.location}
                error={
                    formik.touched.location && Boolean(formik.errors.location)
                }
                helperText=""
            />
            <FormControl component="fieldset">
                <label className="form-label">Походження тварини</label>
                <RadioGroup
                    name="petOrigin"
                    value={formik.values.petOrigin}
                    onChange={formik.handleChange}
                >
                    <FormControlLabel
                        value="Притулок"
                        control={<Radio />}
                        label="Я представник притулку"
                    />
                    <FormControlLabel
                        value="Розплідник"
                        control={<Radio />}
                        label="Я власник розплідника"
                    />
                    <FormControlLabel
                        value="Приватний власник"
                        control={<Radio />}
                        label="Я приватна особа"
                    />
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default FormStepOne;
