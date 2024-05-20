import { configureStore } from '@reduxjs/toolkit';
import fireReducer from './fireSlicer';

/**
 * Configures the Redux store with the fire reducer.
 */
const store = configureStore({
	reducer: {
		fire: fireReducer,
	},
});

/**
 * RootState type representing the entire state structure.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * AppDispatch type for dispatching actions in the application.
 */
export type AppDispatch = typeof store.dispatch;

export default store;
