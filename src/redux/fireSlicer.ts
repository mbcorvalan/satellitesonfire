import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFiresData, FireCase } from '../service/fireService';

/**
 * Thunk to fetch fire data based on date, time, and satellite.
 */
export const fetchFireData = createAsyncThunk(
	'fire/fetchFireData',
	async ({
		date,
		time,
		satellite,
	}: {
		date: string;
		time: string;
		satellite: string;
	}) => {
		return await getFiresData({ date, time, satellite });
	}
);

interface FireState {
	data: FireCase[];
	isLoading: boolean;
	error: string | null;
}

const initialState: FireState = {
	data: [],
	isLoading: false,
	error: null,
};

/**
 * Slice to manage fire data state.
 */
const fireSlice = createSlice({
	name: 'fire',
	initialState,
	reducers: {
		clearFireData: (state) => {
			state.data = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFireData.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(
				fetchFireData.fulfilled,
				(state, action: PayloadAction<FireCase[]>) => {
					state.isLoading = false;
					state.data = action.payload;
				}
			)
			.addCase(fetchFireData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Failed to fetch fire data';
			});
	},
});

export const { clearFireData } = fireSlice.actions;
export default fireSlice.reducer;
