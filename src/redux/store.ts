import { configureStore } from '@reduxjs/toolkit';
import fireReducer from './fireSlicer';

const store = configureStore({
	reducer: {
		fire: fireReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
