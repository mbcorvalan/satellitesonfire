import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { fetchFireData } from '../service/fireService';
import { Dayjs } from 'dayjs';
import { SelectChangeEvent } from '@mui/material';

interface UseFormResult {
	satellite: string;
	date: Dayjs | null;
	errors: { satellite: boolean; date: boolean };
	handleSatelliteChange: (event: SelectChangeEvent<string>) => void;
	handleDateChange: (newDate: Dayjs | null) => void;
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const useForm = (): UseFormResult => {
	const dispatch: AppDispatch = useDispatch();
	const [satellite, setSatellite] = useState<string>('');
	const [date, setDate] = useState<Dayjs | null>(null);
	const [errors, setErrors] = useState<{ satellite: boolean; date: boolean }>({
		satellite: false,
		date: false,
	});

	const handleSatelliteChange = useCallback(
		(event: SelectChangeEvent<string>) => {
			setSatellite(event.target.value);
		},
		[]
	);

	const handleDateChange = (newDate: Dayjs | null) => {
		setDate(newDate);
	};

	const handleSubmit = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			const newErrors = {
				satellite: !satellite,
				date: !date,
			};
			setErrors(newErrors);
			if (!newErrors.satellite && !newErrors.date && date) {
				dispatch(
					fetchFireData({
						date: date.format('YYYY-MM-DD'),
						time: date.format('HH'),
					})
				);
			}
		},
		[satellite, date, dispatch]
	);

	return {
		satellite,
		date,
		errors,
		handleSatelliteChange,
		handleDateChange,
		handleSubmit,
	};
};
