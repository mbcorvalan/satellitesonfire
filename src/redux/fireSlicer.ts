import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFiresData, FireCase } from '../service/fireService';

interface FireState {
	isLoading: boolean;
	data: FireCase[] | null;
	error: boolean;
}

const initialState: FireState = {
	isLoading: false,
	data: null,
	error: false,
};

// Async thunk to fetch fire data
export const fetchFireData = createAsyncThunk(
	'fire/fetchFireData',
	async ({ date, time }: { date: string; time: string }) => {
		const response = await getFiresData({ date, time });
		return response;
	}
);

const fireSlice = createSlice({
	name: 'fire',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFireData.pending, (state) => {
				state.isLoading = true;
				state.error = false;
			})
			.addCase(
				fetchFireData.fulfilled,
				(state, action: PayloadAction<FireCase[]>) => {
					state.isLoading = false;
					state.data = action.payload;
				}
			)
			.addCase(fetchFireData.rejected, (state) => {
				state.isLoading = false;
				state.error = true;
			});
	},
});

export default fireSlice.reducer;
