import { useState, useCallback } from 'react';
import { Box, InputLabel, FormControl, Select, MenuItem, FormHelperText } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { formStyles, satellites, Satellite } from '../utils/constants/constants';
import FilterButton from './FilterButton';
import { useForm } from '../hooks/useForm';
import { SelectChangeEvent } from '@mui/material';

/**
 * FormDatePicker component that renders a form with a satellite selection and date-time picker.
 *
 * @returns {JSX.Element} The rendered form date picker component.
 */
const FormDatePicker: React.FC = () => {
    const [satellite, setSatellite] = useState<string>('');
    const { date, errors, handleDateChange, handleSubmit } = useForm(satellite);

    const handleSatelliteChange = useCallback(
        (event: SelectChangeEvent<string>) => {
            setSatellite(event.target.value);
        },
        []
    );

    return (
        <Box component="form" sx={formStyles} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <FormControl sx={{ mb: 2 }} fullWidth required error={errors.satellite}>
                <InputLabel id="satellite-select">Satellite</InputLabel>
                <Select label="Satellite" labelId="satellite-select" value={satellite} onChange={handleSatelliteChange}>
                    {satellites.map((sat: Satellite) => (
                        <MenuItem key={sat.value} value={sat.value}>
                            {sat.label}
                        </MenuItem>
                    ))}
                </Select>
                {errors.satellite && <FormHelperText>A satellite name is required</FormHelperText>}
            </FormControl>

            <FormControl sx={{ mb: 2 }} fullWidth required error={errors.date}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        format="DD-MM-YYYY HH"
                        label="Date and Time"
                        ampm={false}
                        views={['year', 'month', 'day', 'hours']}
                        value={date}
                        onChange={handleDateChange}
                    />
                </LocalizationProvider>
                {errors.date && <FormHelperText>Date and time are required</FormHelperText>}
            </FormControl>

            <Box sx={{ mb: 2 }}>
                <FilterButton handleSubmit={handleSubmit} />
            </Box>
        </Box>
    );
};

export default FormDatePicker;
