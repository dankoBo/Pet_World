import React from 'react';
import { FormControl, FormControlLabel, Checkbox } from '@mui/material';

interface DocumentsFilterProps {
    filters: {
        passport: boolean;
        pedigree: boolean;
        metrics: boolean;
        cynology: boolean;
    };
    handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DocumentsFilter: React.FC<DocumentsFilterProps> = ({ filters, handleCheckboxChange }) => {
    return (
        <FormControl component="fieldset">
            <label className="form-label">Документи</label>
            <div className="form-group">
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filters.passport}
                            onChange={handleCheckboxChange}
                            name="passport"
                        />
                    }
                    label="Ветпаспорт"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filters.pedigree}
                            onChange={handleCheckboxChange}
                            name="pedigree"
                        />
                    }
                    label="Родовід"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filters.metrics}
                            onChange={handleCheckboxChange}
                            name="metrics"
                        />
                    }
                    label="Метрика цуценяти"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filters.cynology}
                            onChange={handleCheckboxChange}
                            name="cynology"
                        />
                    }
                    label="FCI/KCY"
                />
            </div>
        </FormControl>
    );
};

export default DocumentsFilter;
