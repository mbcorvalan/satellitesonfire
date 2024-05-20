import { useCallback } from 'react';
import { GOESCategories, VIIRSCategories } from '../utils/constants/constants';

/**
 * Custom hook to get the reliability based on satellite type and confidence level.
 *
 * @returns {object} An object containing the getReliability function.
 */
const useReliability = (): {
	getReliability: (sat: string, conf: number) => number;
} => {
	/**
	 * Function to calculate the reliability based on the satellite and confidence level.
	 *
	 * @param {string} sat - The satellite identifier.
	 * @param {number} conf - The confidence level.
	 * @returns {number} The reliability as a number.
	 */
	const getReliability = useCallback((sat: string, conf: number): number => {
		switch (sat) {
			case 'noaa-goes16':
			case 'noaa-goes17':
				const goesCategory = GOESCategories[conf];
				if (goesCategory === 'Procesado' || goesCategory === 'Saturado') {
					return 1;
				} else if (goesCategory === 'Contaminado por nubes') {
					return 0.1;
				} else if (goesCategory === 'Probabilidad alta') {
					return 0.7;
				} else if (goesCategory === 'Probabilidad media') {
					return 0.4;
				} else if (goesCategory === 'Probabilidad baja') {
					return 0.2;
				} else {
					return 0;
				}
			case 'VIIRS Suomi NPP':
			case 'VIIRS NOAA-20':
				const viirsCategory = VIIRSCategories[conf];
				if (viirsCategory === 'Probabilidad baja') {
					return 0.2;
				} else if (viirsCategory === 'Probabilidad media') {
					return 0.5;
				} else if (viirsCategory === 'Probabilidad alta') {
					return 0.9;
				} else {
					return 0;
				}
			case 'MODIS Aqua':
			case 'MODIS Terra':
				return conf / 100;
			default:
				return 0;
		}
	}, []);

	return { getReliability };
};

export default useReliability;
