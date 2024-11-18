import React from 'react';
import { FormControl, FormControlLabel, Checkbox } from '@mui/material';

interface HealthFilterProps {
    filters: {
        chip: boolean;
        sterilization: boolean;
        parasite: boolean;
        vaccination: boolean;
    };
    handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HealthFilter: React.FC<HealthFilterProps> = ({ filters, handleCheckboxChange }) => {
    return (
        <FormControl component="fieldset">
            <label className="form-label">Здоров'я</label>
            <div className="form-group">
                <FormControlLabel
                    control={<Checkbox checked={filters.chip} onChange={handleCheckboxChange} name="chip" />}
                    label="Чіп"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filters.sterilization}
                            onChange={handleCheckboxChange}
                            name="sterilization"
                        />
                    }
                    label="Стерилізація"
                />
                <FormControlLabel
                    control={<Checkbox checked={filters.parasite} onChange={handleCheckboxChange} name="parasite" />}
                    label="Обробка від паразитів"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={filters.vaccination} onChange={handleCheckboxChange} name="vaccination" />
                    }
                    label="Вакцинація"
                />
            </div>
        </FormControl>
    );
};

export default HealthFilter;
