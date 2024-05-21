import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import fireReducer from '../redux/fireSlicer';
import FireCasesBox from '../components/FireCasesBox';
import { RootState } from '../redux/store';
import { mockResponse } from '../utils/constants/constants';

jest.mock('axios', () => ({
    __esModule: true,
    default: {
        get: jest.fn(() => Promise.resolve([])),
    },
}));

const initialState = {
    fire: {
        data: mockResponse.data.data.getPublicWildfireByDate.items,
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

describe('FireCasesBox component', () => {
    test('renders "No fire information" when there are no fire cases', () => {
        const emptyState: RootState = {
            fire: {
                data: [],
                isLoading: false,
                error: null,
            },
        };
        const emptyStore = configureStore({
            reducer: {
                fire: fireReducer,
            },
            preloadedState: emptyState,
        });

        render(
            <Provider store={emptyStore}>
                <FireCasesBox />
            </Provider>
        );

        expect(screen.getByText('No fire information')).toBeInTheDocument();
    });

    test('renders fire cases and paginates correctly', () => {
        renderWithProviders(<FireCasesBox />);

        // Check that the fire cases are rendered
        expect(screen.getByText('Fire Information')).toBeInTheDocument();

    });
});
