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
	satellite,
}: {
	date: string;
	time: string;
	satellite: string;
}): Promise<FireCase[]> => {
	const url = `/api/${date}/T${time}.json`;

	try {
		const response = await axiosInstance.get<ApiResponse>(url);
		const filteredItems =
			response.data.data.getPublicWildfireByDate.items.filter(
				(item) => item.sat === satellite
			);

		if (filteredItems.length === 0) {
			throw new Error('No matching satellites found for the given criteria.');
		}

		return filteredItems;
	} catch (error) {
		console.error('Failed to fetch fires:', error);
		throw new Error('Failed to fetch fires');
	}
};
