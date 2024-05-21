import axios from 'axios';
import { getFiresData } from '../service/fireService';
import { baseAPIUrl, mockResponse } from '../utils/constants/constants';

jest.mock('axios', () => ({
	__esModule: true,
	default: {
		get: jest.fn(() => Promise.resolve({ mockResponse })),
	},
}));

describe('getFiresData', () => {
	const date = '2023-01-01';
	const time = '00';
	const satellite = 'noaa-goes17';
	const url = `${baseAPIUrl}/api/${date}/T${time}.json`;

	beforeEach(() => {
		(axios.get as jest.Mock).mockReset();
	});

	it('should fetch fire data and return filtered items based on satellite', async () => {
		(axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

		const result = await getFiresData({ date, time, satellite });

		expect(axios.get).toHaveBeenCalledWith(url);
		expect(result).toEqual([
			{
				cat: null,
				conf: 13,
				date: '2023-01-01T00',
				id: '2023-01-01T00:00:00+00:00+-103.36+24.12',
				sat: 'noaa-goes17',
				x: -103.36372375488281,
				y: 24.116455078125,
			},
		]);
	});

	it('should throw an error if no matching satellites are found', async () => {
		const mockResponse = {
			data: {
				data: {
					getPublicWildfireByDate: {
						items: [
							{
								cat: null,
								conf: 15,
								date: '2023-01-01T00',
								id: '2023-01-01T00:00:00+00:00+-103.41+24.11',
								sat: 'modis-terra',
								x: -103.41473388671875,
								y: 24.11414909362793,
							},
						],
						nextToken: null,
					},
				},
			},
		};
		(axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

		await expect(getFiresData({ date, time, satellite })).rejects.toThrow(
			'Failed to fetch fires'
		);

		expect(axios.get).toHaveBeenCalledWith(url);
	});

	it('should throw an error if fetching fire data fails', async () => {
		(axios.get as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

		await expect(getFiresData({ date, time, satellite })).rejects.toThrow(
			'Failed to fetch fires'
		);

		expect(axios.get).toHaveBeenCalledWith(url);
	});
});
