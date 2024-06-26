import axios from 'axios';
import { baseAPIUrl } from '../utils/constants/constants';

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

/**
 * Fetches fire data based on the given date, time, and satellite.
 *
 * @param {object} params - The parameters for the API request.
 * @param {string} params.date - The date for the fire data.
 * @param {string} params.time - The time for the fire data.
 * @param {string} params.satellite - The satellite identifier.
 * @returns {Promise<FireCase[]>} The filtered fire cases.
 * @throws {Error} If fetching the fire data fails or no matching satellites are found.
 */
export const getFiresData = async ({
	date,
	time,
	satellite,
}: {
	date: string;
	time: string;
	satellite: string;
}): Promise<FireCase[]> => {
	const url = `${baseAPIUrl}/api/${date}/T${time}.json`;

	try {
		const response = await axios.get<ApiResponse>(url);
		const filteredItems =
			response.data.data.getPublicWildfireByDate.items.filter(
				(item) => item.sat === satellite
			);

		if (filteredItems.length === 0) {
			throw new Error('Failed to fetch fires');
		}

		return filteredItems;
	} catch (error) {
		throw new Error('Failed to fetch fires');
	}
};
