import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from './axios';

export interface FireCase {
	cat: string | null;
	conf: number;
	date: string;
	id: string;
	sat: string;
	x: number;
	y: number;
}

interface ApiResponse {
	data: {
		getPublicWildfireByDate: {
			items: FireCase[];
			nextToken: string | null;
		};
	};
}

export const getFiresData = async ({
	date,
	time,
}: {
	date: string;
	time: string;
}): Promise<FireCase[]> => {
	const url = `/api/${date}/T${time}.json`;

	try {
		const response = await axiosInstance.get<ApiResponse>(url);
		return response.data.data.getPublicWildfireByDate.items;
	} catch (error) {
		console.error('Failed to fetch fires:', error);
		throw new Error('Failed to fetch fires');
	}
};

export const fetchFireData = createAsyncThunk(
	'fire/fetchFireData',
	async ({ date, time }: { date: string; time: string }) => {
		return await getFiresData({ date, time });
	}
);

interface FireState {
	data: FireCase[];
	isLoading: boolean;
	error: string | null;
}

const fireSlice = createSlice({
	name: 'fire',
	initialState: {
		data: [] as FireCase[],
		isLoading: false,
		error: null,
	} as FireState,
	reducers: {},
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

export default fireSlice.reducer;
