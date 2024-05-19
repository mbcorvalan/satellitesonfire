import { useCallback } from 'react';

/**
 * Custom hook to get the color of a marker based on its reliability.
 * @returns An object containing the getMarkerColor function.
 */
const useMarkerColor = (): {
	getMarkerColor: (reliability: number) => string;
} => {
	/**
	 * Function to determine the color of a marker based on its reliability.
	 * @param reliability - The reliability value.
	 * @returns The color of the marker as a string.
	 */
	const getMarkerColor = useCallback((reliability: number): string => {
		if (reliability >= 0.8) {
			return '#b71c1c';
		} else if (reliability >= 0.5) {
			return '#ff7a00';
		} else {
			return '#f6bf26';
		}
	}, []);

	return { getMarkerColor };
};

export default useMarkerColor;
