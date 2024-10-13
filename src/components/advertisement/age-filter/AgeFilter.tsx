import React from 'react';
import { TextField, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface AgeFilterProps {
    filters: {
        minAnimalAge: string;
        maxAnimalAge: string;
        minAgeUnit: string;
        maxAgeUnit: string;
    };
    handleTextFieldChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSelectChange: (event: SelectChangeEvent<string>) => void;
}

const AgeFilter: React.FC<AgeFilterProps> = ({
    filters,
    handleTextFieldChange,
    handleSelectChange,
}) => {
    return (
        <div>
            <label htmlFor="">Вік</label>
            <div className="form-age-control">
                <TextField
                    value={filters.minAnimalAge}
                    name="minAnimalAge"
                    fullWidth
                    type="number"
                    label="Min"
                    variant="outlined"
                    margin="normal"
                    onChange={handleTextFieldChange}
                />
                <FormControl variant="outlined" sx={{ width: '140px', marginTop: '10px' }}>
                    <Select
                        labelId="age-unit-label"
                        name="minAgeUnit"
                        value={filters.minAgeUnit}
                        onChange={handleSelectChange}
                    >
                        <MenuItem value="місяці (-ів)">Місяці (-ів)</MenuItem>
                        <MenuItem value="роки (-ів)">Роки (-ів)</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="form-age-control">
                <TextField
                    value={filters.maxAnimalAge}
                    name="maxAnimalAge"
                    fullWidth
                    type="number"
                    label="Max"
                    variant="outlined"
                    margin="normal"
                    onChange={handleTextFieldChange}
                />
                <FormControl variant="outlined" sx={{ width: '140px', marginTop: '10px' }}>
                    <Select
                        labelId="max-age-unit-label"
                        name="maxAgeUnit"
                        value={filters.maxAgeUnit}
                        onChange={handleSelectChange}
                    >
                        <MenuItem value="місяці (-ів)">Місяці (-ів)</MenuItem>
                        <MenuItem value="роки (-ів)">Роки (-ів)</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export default AgeFilter;
