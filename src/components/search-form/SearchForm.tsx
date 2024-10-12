import './SearchForm.scss';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import {
    ANIMAL_TYPES,
    BUTTON_CONTENT,
    CITY_LIST,
    INPUT_LABELS,
} from '../../app.config';
import Button from '../../ui/button/Button';

export default function SearchForm() {
    return (
        <form className="search-form">
            <FormControl>
                <InputLabel id="animal-type-select-label" shrink={true}>
                    {INPUT_LABELS.animalType}
                </InputLabel>
                <Select
                    className="search-form__select"
                    labelId="animal-type-select-label"
                    id="animal-type-select"
                    label={INPUT_LABELS.animalType}
                    value = ''
                    displayEmpty
                >
                    {ANIMAL_TYPES.map((animalType) => (
                        <MenuItem key={animalType} value={animalType}>
                            {animalType}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel id="location-select-label" shrink={true}>
                    {INPUT_LABELS.location}
                </InputLabel>
                <Select
                    className="search-form__select"
                    labelId="location-select-label"
                    id="location-select"
                    label={INPUT_LABELS.location}
                    value = ''
                    displayEmpty
                >
                    {CITY_LIST.map((cityName) => (
                        <MenuItem key={cityName} value={cityName}>
                            {cityName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button className="search search-form__search-button">
                {BUTTON_CONTENT.search}
            </Button>
        </form>
    );
}
