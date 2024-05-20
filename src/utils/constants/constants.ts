import { SxProps, Theme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { LatLngTuple } from 'leaflet';
import { FireCase } from '../../service/fireService';

/**
 * Styles for the form component.
 */
export const formStyles: SxProps<Theme> = {
	zIndex: 1000,
	backgroundColor: 'white',
	borderRadius: '4px',
	margin: '0 auto',
	boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
	padding: 2,
};

export const filterPanel: SxProps<Theme> = {
	position: 'absolute',
	alignItems: 'end',
	top: 10,
	right: 10,
	margin: '20px',
	width: {
		xs: '40%',
		sm: '60%',
		md: '400px',
	},
};

/**
 * Styles for the layer component.
 */
export const layerStyles: SxProps<Theme> = {
	display: 'inline-flex',
	maxWidth: '50px',
	p: 2,
	zIndex: 1000,
	backgroundColor: 'white',
	borderRadius: '4px',
	margin: '0 auto',
	boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
};

/**
 * Styles for the Error component.
 */
export const errorStyles: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'center',
	alignContent: 'center',
	zIndex: 1000,
};

/**
 * Interface representing a satellite.
 */
export interface Satellite {
	label: string;
	value: string;
}

export const satellites: Satellite[] = [
	{ label: 'VIIRS Suomi NPP', value: 'viirs-suomi-npp' },
	{ label: 'VIIRS NOAA-20', value: 'viirs-noaa-20' },
	{ label: 'MODIS Aqua', value: 'modis-aqua' },
	{ label: 'MODIS Terra', value: 'modis-terra' },
	{ label: 'NOAA GOES-16', value: 'noaa-goes16' },
	{ label: 'NOAA GOES-17', value: 'noaa-goes17' },
];

/**
 * Theme for the filter button.
 */
export const filterButtonTheme = createTheme({
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					backgroundColor: '#3e5aa9',
					color: 'white',
					'&:hover': {
						backgroundColor: '#354b87',
					},
				},
			},
		},
	},
});

/**
 * Theme for the layer button.
 */
export const layerButtonTheme = createTheme({
	components: {
		MuiIconButton: {
			styleOverrides: {
				root: {
					color: '#3e5aa9',
					'&:hover': {
						backgroundColor: '#354b87',
						color: 'white',
					},
				},
			},
		},
	},
});

/**
 * Interface representing a tile layer for the map.
 */
export interface TileLayer {
	name: string;
	url: string;
	attribution: string;
}

export const tileLayers: TileLayer[] = [
	{
		name: 'Street',
		url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		attribution: '&copy; OpenStreetMap contributors',
	},
	{
		name: 'Satellite',
		url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
		attribution: 'Google Maps',
	},
];

/**
 * The initial position for the map view.
 */
export const initialPosition: LatLngTuple = [-34.6, -58.38];

/**
 * Initial zoom level for the map.
 */
export const initialZoom: number = 13;

/**
 * Styles for the map container.
 */
export const mapStyles: React.CSSProperties = {
	height: '100vh',
	width: '100%',
};

/**
 * Options for satellites selection.
 */
export const satellitesOptions = [
	{ label: 'VIIRS Suomi NPP', value: 'viirs-suomi-npp' },
	{ label: 'VIIRS NOAA-20', value: 'viirs-noaa-20' },
	{ label: 'MODIS Aqua', value: 'modis-aqua' },
	{ label: 'MODIS Terra', value: 'modis-terra' },
	{ label: 'noaa-goes16', value: 'noaa-goes16' },
	{ label: 'noaa-goes17', value: 'noaa-goes17' },
];

/**
 * Interface representing the categories for GOES satellites.
 */
export interface GOESCategory {
	[key: number]: string;
}

/**
 * Categories for the GOES satellites.
 */
export const GOESCategories: GOESCategory = {
	10: 'Procesado',
	30: 'Procesado',
	11: 'Saturado',
	31: 'Saturado',
	12: 'Contaminado por nubes',
	32: 'Contaminado por nubes',
	13: 'Probabilidad alta',
	33: 'Probabilidad alta',
	14: 'Probabilidad media',
	34: 'Probabilidad media',
	15: 'Probabilidad baja',
	35: 'Probabilidad baja',
};

/**
 * Interface representing the categories for VIIRS satellites.
 */
export interface VIIRSCategory {
	[key: number]: string;
}

/**
 * Categories for the VIIRS satellites.
 */
export const VIIRSCategories: VIIRSCategory = {
	20: 'Probabilidad baja',
	50: 'Probabilidad media',
	90: 'Probabilidad alta',
};

/**
 * Truncate a number to three decimal places.
 *
 * @param {number} num - The number to truncate.
 * @returns {number} The truncated number.
 */
export const truncateToThreeDecimals = (num: number): number => {
	return Math.floor(num * 1000) / 1000;
};

/**
 * Number of items per page for pagination.
 */
export const ITEMS_PER_PAGE = 3;

export const baseAPIUrl =
	process.env.REACT_APP_BASE_URL || window.location.origin;
