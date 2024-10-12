import {
    TextField,
    FormControl,
    FormControlLabel,
    Select,
    MenuItem,
    Checkbox,
    Radio,
    RadioGroup,
} from '@mui/material';
import { FormikProps } from 'formik';
import './FormStepTwo.scss';

type FormStepOneProps = {
    formik: FormikProps<any>;
};

const FormStepTwo: React.FC<FormStepOneProps> = ({ formik }) => {
    return (
        <div className="step-two-container">
            <TextField
                name="animalVariety"
                fullWidth
                required
                label="Різновид"
                variant="outlined"
                margin="normal"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.animalVariety}
                error={
                    formik.touched.animalVariety &&
                    Boolean(formik.errors.animalVariety)
                }
                helperText=''
            />
            <div className="form-age-control">
                <TextField
                    name="animalAge"
                    fullWidth
                    required
                    type="number"
                    label="Вік тварини"
                    variant="outlined"
                    margin="normal"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.animalAge || ''}
                    error={
                        formik.touched.animalAge &&
                        Boolean(formik.errors.animalAge)
                    }
                    helperText=''
                />
                <FormControl
                    variant="outlined"
                    sx={{ width: '140px', marginTop: '10px' }}
                >
                    <Select
                        labelId="age-unit-label"
                        value={formik.values.ageUnit || 'months'}
                        onChange={(e) =>{
                            formik.setFieldValue('ageUnit', e.target.value);
                        }}
                    >
                        <MenuItem value="місяці">Місяців</MenuItem>
                        <MenuItem value="роки">Років</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <FormControl component="fieldset">
                <label className="form-label">Стать</label>
                <RadioGroup
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                >
                    <FormControlLabel
                        value="хлопчик"
                        control={<Radio />}
                        label="хлопчик"
                    />
                    <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="дівчинка"
                    />
                    <FormControlLabel
                        value="невідомо"
                        control={<Radio />}
                        label="Невідомо"
                    />
                </RadioGroup>
            </FormControl>
            <FormControl component="fieldset">
                <label className="form-label">Здоров'я</label>
                <div className="form-group">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formik.values.chip}
                                onChange={() =>
                                    formik.setFieldValue(
                                        'chip',
                                        !formik.values.chip
                                    )
                                }
                                name="chip"
                            />
                        }
                        label="Чіп"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formik.values.sterilization}
                                onChange={() =>
                                    formik.setFieldValue(
                                        'sterilization',
                                        !formik.values.sterilization
                                    )
                                }
                                name="sterilization"
                            />
                        }
                        label="Стерилізація"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formik.values.parasite}
                                onChange={() =>
                                    formik.setFieldValue(
                                        'parasite',
                                        !formik.values.parasite
                                    )
                                }
                                name="parasite"
                            />
                        }
                        label="Обробка від паразитів"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formik.values.vaccination}
                                onChange={() =>
                                    formik.setFieldValue(
                                        'vaccination',
                                        !formik.values.vaccination
                                    )
                                }
                                name="vaccination"
                            />
                        }
                        label="Вакцинація"
                    />
                </div>
            </FormControl>
            <FormControl component="fieldset">
                <label className="form-label">Документи</label>
                <div className="form-group">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formik.values.passport}
                                onChange={() =>
                                    formik.setFieldValue(
                                        'passport',
                                        !formik.values.passport
                                    )
                                }
                                name="passport"
                            />
                        }
                        label="Ветпаспорт"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formik.values.pedigree}
                                onChange={() =>
                                    formik.setFieldValue(
                                        'pedigree',
                                        !formik.values.pedigree
                                    )
                                }
                                name="pedigree"
                            />
                        }
                        label="Родовід"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formik.values.metrics}
                                onChange={() =>
                                    formik.setFieldValue(
                                        'metrics',
                                        !formik.values.metrics
                                    )
                                }
                                name="metrics"
                            />
                        }
                        label="Метрика цуценяти"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formik.values.cynology}
                                onChange={() =>
                                    formik.setFieldValue(
                                        'cynology',
                                        !formik.values.cynology
                                    )
                                }
                                name="cynology"
                            />
                        }
                        label="FCI/KCY"
                    />
                </div>
            </FormControl>
        </div>
    );
};

export default FormStepTwo;
