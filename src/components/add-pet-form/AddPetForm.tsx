import './AddPetForm.scss'
import { useState } from 'react';
import { TextField, Select, MenuItem, InputLabel, FormControl, RadioGroup, FormControlLabel, Radio, Checkbox } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from '../../firebase';
import Button from '../../ui/button/Button'
import { ANIMAL_TYPES } from '../../app.config'
import { getAuth } from "firebase/auth";
import PhotoInput from '../photo-input/PhotoInput';

const uploadImageToStorage = async (file) => {
    if (!file) return null;

    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);

    try {
        // Завантажуємо файл у Firebase Storage
        const snapshot = await uploadBytes(storageRef, file);

        // Отримуємо URL для доступу до зображення
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error("Помилка завантаження зображення:", error);
        return null;
    }
};


const MultiStepForm = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        adName: '',
        animalType: '',
        price: '',
        free: false,
        location: '',
        animalBreed: '',
        animalVariety: '',
        animalAge: '',
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
    });

    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleNext = () => setStep((prev) => prev + 1);
    const handlePrev = () => setStep((prev) => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            console.error('Користувач не авторизований');
            return;
        }

        // Завантажуємо зображення
        const imageURL = await uploadImageToStorage(imageFile);
        if (!imageURL) {
            console.error('Помилка завантаження зображення');
            return;
        }

        const dataToSubmit = {
            ...formData,
            price: formData.free ? 'free' : formData.price,
            uid: user.uid,
            imageUrl: imageURL,  // Додаємо URL зображення
        };

        try {
            // Зберігаємо дані у Firestore
            await addDoc(collection(db, 'animals'), dataToSubmit);
            console.log('Дані успішно збережені!', dataToSubmit);
        } catch (e) {
            console.error('Помилка збереження:', e);
        }
    };
    const steps = [
        <div key="step1">
            <TextField
                fullWidth
                label="Назва оголошення"
                variant="outlined"
                margin="normal"
                multiline
                rows={3}
                name="adName"
                value={formData.adName}
                onChange={handleChange}
            />
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="animal-type-label">Вид тварини</InputLabel>
                <Select
                    labelId="animal-type-label"
                    name="animalType"
                    value={formData.animalType}
                    onChange={handleChange}
                    label="Вид тварини"
                >
                    {ANIMAL_TYPES.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <div>
                <TextField
                    fullWidth
                    label="Ціна"
                    variant="outlined"
                    margin="normal"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    disabled={formData.free}
                />
                <div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.free}
                                onChange={handleChange}
                                name="free"
                            />
                        }
                        label="Безкоштовно"
                    />
                </div>
            </div>
            <TextField
                fullWidth
                label="Локація"
                variant="outlined"
                margin="normal"
                name="location"
                value={formData.location}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                label="Порода"
                variant="outlined"
                margin="normal"
                name="animalBreed"
                value={formData.animalBreed}
                onChange={handleChange}
            />
        </div>,
        <div key="step2">
            <TextField
                fullWidth
                label="Різновид"
                variant="outlined"
                margin="normal"
                name="animalVariety"
                value={formData.animalVariety}
                onChange={handleChange}
            />
            <div className='form-age-control'>
                <TextField
                    type="number"
                    label="Вік тварини"
                    variant="outlined"
                    margin="normal"
                    value={formData.animalAge.split(' ')[0]}
                    onChange={(e) => handleChange({ target: { name: 'animalAge', value: e.target.value + ' ' + formData.animalAge.split(' ')[1] } })}
                />
                <Select
                    labelId="age-unit-label"
                    value={formData.animalAge.split(' ')[1] || 'months'}
                    onChange={(e) => handleChange({ target: { name: 'animalAge', value: formData.animalAge.split(' ')[0] + ' ' + e.target.value } })}
                    sx={{width: '140px', marginTop: '10px'}}
                >
                    <MenuItem value="months">місяців</MenuItem>
                    <MenuItem value="years">років</MenuItem>
                </Select>
            </div>
            <div>
                <FormControl component="fieldset">
                    <label className='form-label'>Стать</label>
                    <RadioGroup
                        aria-label="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="girl" control={<Radio />} label="Дівчинка" />
                        <FormControlLabel value="boy" control={<Radio />} label="Хлопчик" />
                        <FormControlLabel value="unknown" control={<Radio />} label="Невідомо" />
                    </RadioGroup>
                </FormControl>
            </div>
            <FormControl component="fieldset">
                <label className='form-label'>Здоров'я</label>
                <div className='form-group'>
                    <FormControlLabel
                        control={<Checkbox checked={formData.chip} onChange={handleChange} name="chip" />}
                        label="Чіп"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={formData.sterilization} onChange={handleChange} name="sterilization" />}
                        label="Стерилізація"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={formData.parasite} onChange={handleChange} name="parasite" />}
                        label="Обробка від паразитів"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={formData.vaccination} onChange={handleChange} name="vaccination" />}
                        label="Вакцинація"
                    />
                </div>
            </FormControl>
            <FormControl component="fieldset">
                <label className='form-label'>Документи</label>
                <div className='form-group'>
                    <FormControlLabel
                        control={<Checkbox checked={formData.passport} onChange={handleChange} name="passport" />}
                        label="Ветпаспорт"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={formData.pedigree} onChange={handleChange} name="pedigree" />}
                        label="Родовід"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={formData.metrics} onChange={handleChange} name="metrics" />}
                        label="Метрика цуценяти"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={formData.cynology} onChange={handleChange} name="cynology" />}
                        label="FCI/KCY"
                    />
                </div>
            </FormControl>
        </div>,
        <div key="step3">
            <TextField
                fullWidth
                label="Додаткова інформація"
                variant="outlined"
                margin="normal"
                multiline
                rows={3}
                name="additional"
                value={formData.additional}
                onChange={handleChange}
            />
            <div>
                <label className='form-label'>Фото</label>
                <PhotoInput onImageSelect={setImageFile}/>
            </div>
        </div>,
    ];

    return (
        <form onSubmit={handleSubmit} className='add-pet-form'>
            <div className="step-indicator">
                {['Крок 1', 'Крок 2', 'Крок 3'].map((label, index) => (
                    <div key={index} className={`step ${step === index ? 'active' : step > index ? 'completed' : ''}`}>
                        {label}
                    </div>
                ))}
            </div>
            {steps[step]}
            <div className='form-button'>
                <div className='form-button__container'>
                    {step > 0 && <Button className='prev' type="button" onClick={handlePrev}>Назад</Button>}
                </div>
                <div className='form-button__container'>
                    {step < steps.length - 1 && <Button className='forward' type="button" onClick={handleNext}>Вперед</Button>}
                    {step === steps.length - 1 && <Button className='publish' type="submit">Опублікувати</Button>}
                </div>
            </div>
        </form>
    );
};

export default MultiStepForm;
