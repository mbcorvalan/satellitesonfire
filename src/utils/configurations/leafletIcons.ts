import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/**
 * Extends the type definition of Leaflet.Icon.Default to include the mergeOptions method.
 */
declare module 'leaflet' {
	interface IconDefault {
		mergeOptions(options: Partial<L.IconOptions>): this;
	}
}

L.Icon.Default.mergeOptions({
	iconRetinaUrl:
		'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
	iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export default L;
