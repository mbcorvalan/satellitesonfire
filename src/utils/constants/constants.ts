import { SxProps, Theme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { LatLngTuple } from 'leaflet';

/**
 * Styles for the form component.
 * Uses Material-UI breakpoints to adjust the max width at different screen sizes.
 * @type {SxProps<Theme>}
 */
export const formStyles: SxProps<Theme> = {
	width: '100%',
	zIndex: 1000,
	position: 'absolute',
	top: 10,
	right: 10,
	backgroundColor: 'white',
	borderRadius: '4px',
	margin: '0 auto',
	boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
	padding: 2,
	maxWidth: {
		xs: '60%',
		sm: '80%',
		md: '400px',
	},
};

/**
 * Styles for the form component.
 * Uses Material-UI breakpoints to adjust the max width at different screen sizes.
 * @type {SxProps<Theme>}
 */
export const layerStyles: SxProps<Theme> = {
	display: 'inline-flex',
	p: 2,
	zIndex: 1000,
	position: 'absolute',
	top: 260,
	right: 10,
	backgroundColor: 'white',
	borderRadius: '4px',
	margin: '0 auto',
	boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
	maxWidth: {
		xs: '60%',
		sm: '80%',
		md: '300px',
	},
};

/**
 * Interface representing a satellite.
 * @interface
 */
export interface Satellite {
	/** The name of the satellite to be displayed in the list. */
	label: string;
	/** The value of the satellite to be used as an identifier. */
	value: string;
}

/**
 * List of available satellites.
 * Each satellite has a label and a value.
 * @type {Satellite[]}
 */
export const satellites: Satellite[] = [
	{ label: 'VIIRS Suomi NPP', value: 'viirs-suomi-npp' },
	{ label: 'VIIRS NOAA-20', value: 'viirs-noaa-20' },
	{ label: 'MODIS Aqua', value: 'modis-aqua' },
	{ label: 'MODIS Terra', value: 'modis-terra' },
	{ label: 'NOAA GOES-16', value: 'noaa-goes16' },
	{ label: 'NOAA GOES-17', value: 'noaa-goes17' },
];

/**
 * Interface representing a theme.
 * @interface
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
 * Interface representing a tile layer for the map.
 */
interface TileLayer {
	/** The name of the tile layer. */
	name: string;
	/** The URL template for the tile layer. */
	url: string;
	/** The attribution text for the tile layer. */
	attribution: string;
}

/**
 * Array of tile layers available for the map.
 * Each tile layer contains a name, a URL template, and attribution text.
 */
export const tileLayers: TileLayer[] = [
	{
		name: 'Satellite',
		url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
		attribution: 'Google Maps',
	},
	{
		name: 'Street',
		url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		attribution: '&copy; OpenStreetMap contributors',
	},
];

/**
 * The initial position for the map view.
 * @type {LatLngTuple}
 */
export const initialPosition: LatLngTuple = [-34.6, -58.38];
