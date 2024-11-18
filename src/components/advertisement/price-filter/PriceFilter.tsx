import React from 'react';
import { TextField, Checkbox, FormControlLabel } from '@mui/material';

interface PriceFilterProps {
    filters: {
        minPrice: string;
        maxPrice: string;
        free: boolean;
    };
    handleTextFieldChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ filters, handleTextFieldChange, handleCheckboxChange }) => {
    return (
        <div className="advertisement-page__price-wrapper">
            <label htmlFor="">Ціна</label>
            <div className="advertisement__price-container">
                <TextField
                    value={filters.minPrice}
                    name="minPrice"
                    fullWidth
                    label="Мін"
                    variant="outlined"
                    margin="normal"
                    onChange={handleTextFieldChange}
                />
                <TextField
                    value={filters.maxPrice}
                    name="maxPrice"
                    fullWidth
                    label="Макс"
                    variant="outlined"
                    margin="normal"
                    onChange={handleTextFieldChange}
                />
            </div>
            <FormControlLabel
                control={<Checkbox checked={filters.free} onChange={handleCheckboxChange} name="free" />}
                label="Безкоштовно"
            />
        </div>
    );
};

export default PriceFilter;
