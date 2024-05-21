import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import dayjs from 'dayjs';
import userEvent from "@testing-library/user-event";
import fireReducer from '../redux/fireSlicer';
import FormatDatePicker from '../components/FormDatePicker';

jest.mock('axios', () => ({
	__esModule: true,
	default: {
		get: jest.fn(() => Promise.resolve({ data: [] })),
	},
}));

const initialState = {
	fire: {
		data: [],
		isLoading: false,
		error: null,
	},
};

const store = configureStore({
	reducer: {
		fire: fireReducer,
	},
	preloadedState: initialState,
});

const renderWithProviders = (ui: React.ReactElement) => {
	return render(
		<Provider store={store}>
			{ui}
		</Provider>
	);
};

test('renders FormatDatePicker', () => {
	renderWithProviders(<FormatDatePicker />);
	expect(screen.getByTestId('format-date-picker')).toBeInTheDocument();
});

test('should handle satellite change', async () => {
	renderWithProviders(<FormatDatePicker />);
	const dropdownButton = screen.getByLabelText(/Satellite/i);
	userEvent.click(dropdownButton);
	const dropdownItem = await screen.findByRole("option", { name: /VIIRS Suomi NPP/i });
	userEvent.click(dropdownItem);
});

test('should handle date change', () => {
	renderWithProviders(<FormatDatePicker />);
	const dateInput = screen.getByLabelText(/date and time/i) as HTMLInputElement;
	const newDate = dayjs("2023-01-01T00");

	fireEvent.change(dateInput, { target: { value: newDate.format('DD-MM-YYYY HH') } });

	expect(dateInput.value).toBe(newDate.format('DD-MM-YYYY HH'));
});

test('should handle form submission', async () => {
	renderWithProviders(<FormatDatePicker />);
	const dropdownButton = screen.getByLabelText(/Satellite/i);
	userEvent.click(dropdownButton);

	const dropdownItem = await screen.findByRole("option", { name: /VIIRS Suomi NPP/i });
	userEvent.click(dropdownItem);

	const dateInput = screen.getByLabelText(/date and time/i) as HTMLInputElement;
	const newDate = dayjs("2023-01-01T00");

	// Simulate date selection
	userEvent.type(dateInput, newDate.format('DD-MM-YYYY HH'));

	// Simulate form submission
	const submitButton = screen.getByRole('button', { name: /Filter/i });
	userEvent.click(submitButton);
});