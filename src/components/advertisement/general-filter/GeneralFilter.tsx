import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent
} from '@mui/material';

interface GeneralFiltersProps {
    filters: {
        animalType: string;
        animalVariety: string;
        location: string;
        petOrigin: string;
    };
    handleSelectChange: (event: SelectChangeEvent<string>) => void;
    ANIMAL_TYPES: string[];
    animalVarieties: string[];
    locations: string[];
    ANIMAL_ORIGIN: string[];
}

const GeneralFilters: React.FC<GeneralFiltersProps> = ({
    filters = {
        animalType: '',
        animalVariety: '',
        location: '',
        petOrigin: '',
    },
    handleSelectChange,
    ANIMAL_TYPES,
    animalVarieties,
    locations,
    ANIMAL_ORIGIN,
}) => {
    return (
        <>
            <FormControl fullWidth variant="outlined">
                <InputLabel>Вид тварини</InputLabel>
                <Select
                    labelId="animal-type-label"
                    name="animalType"
                    value={filters.animalType}
                    onChange={handleSelectChange}
                    label="Вид тварини"
                >
                    {ANIMAL_TYPES.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined">
                <InputLabel>Різновид</InputLabel>
                <Select
                    labelId="animal-variety-label"
                    name="animalVariety"
                    value={filters.animalVariety}
                    onChange={handleSelectChange}
                    label="Різновид"
                >
                    {animalVarieties.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined">
                <InputLabel>Локація</InputLabel>
                <Select
                    labelId="location-label"
                    name="location"
                    value={filters.location}
                    onChange={handleSelectChange}
                    label="Локація"
                >
                    {locations.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined">
                <InputLabel>Походження</InputLabel>
                <Select
                    labelId="pet-origin-label"
                    name="petOrigin"
                    value={filters.petOrigin}
                    onChange={handleSelectChange}
                    label="Походження"
                >
                    {ANIMAL_ORIGIN.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
};

export default GeneralFilters;
