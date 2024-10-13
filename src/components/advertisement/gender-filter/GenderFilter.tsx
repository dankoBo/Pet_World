import React from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio, SelectChangeEvent } from '@mui/material';

interface GenderFilterProps {
    filters: {
        gender: string;
    };
    handleSelectChange: (event: SelectChangeEvent<string>) => void;
}

const GenderFilter: React.FC<GenderFilterProps> = ({ filters, handleSelectChange }) => {
    return (
        <FormControl component="fieldset">
            <label className="form-label">Стать</label>
            <RadioGroup
                name="gender"
                value={filters.gender}
                onChange={handleSelectChange}
            >
                <FormControlLabel
                    value="Хлопчик"
                    control={<Radio />}
                    label="Хлопчик"
                />
                <FormControlLabel
                    value="Дівчинка"
                    control={<Radio />}
                    label="Дівчинка"
                />
                <FormControlLabel
                    value="Невідомо"
                    control={<Radio />}
                    label="Невідомо"
                />
            </RadioGroup>
        </FormControl>
    );
};

export default GenderFilter;
