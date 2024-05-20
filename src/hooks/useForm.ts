import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { fetchFireData, clearFireData } from '../redux/fireSlicer';
import { Dayjs } from 'dayjs';

interface UseFormResult {
	date: Dayjs | null;
	errors: { satellite: boolean; date: boolean };
	handleDateChange: (newDate: Dayjs | null) => void;
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * Custom hook to manage form state and handle form submission.
 *
 * @param {string} satellite - The selected satellite.
 * @returns {UseFormResult} The form state and handlers.
 */
export const useForm = (satellite: string): UseFormResult => {
	const dispatch: AppDispatch = useDispatch();
	const [date, setDate] = useState<Dayjs | null>(null);
	const [errors, setErrors] = useState<{ satellite: boolean; date: boolean }>({
		satellite: false,
		date: false,
	});

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
				dispatch(clearFireData());
				dispatch(
					fetchFireData({
						satellite: satellite,
						date: date.format('YYYY-MM-DD'),
						time: date.format('HH'),
					})
				);
			}
		},
		[satellite, date, dispatch]
	);

	return {
		date,
		errors,
		handleDateChange,
		handleSubmit,
	};
};
