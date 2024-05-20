import { MapContainer } from 'react-leaflet';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';
import { initialPosition, initialZoom, mapStyles, filterPanel } from '../utils/constants/constants';
import FormDatePicker from './FormDatePicker';
import Layer from './Layer';
import MapMarkers from './MapMarkers';
import ErrorMsg from './ErrorMsg';
import FireCasesBox from './FireCasesBox';
import { FireCase } from '../service/fireService';
import { RootState } from '../redux/store';

/**
 * FullPageMap component that renders the full-page map with fire cases and controls.
 *
 * @returns {JSX.Element} The rendered full-page map component.
 */
const FullPageMap: React.FC = () => {
    const fireCases: FireCase[] = useSelector((state: RootState) => state.fire.data);
    const fireStatus = useSelector((state: RootState) => state.fire.isLoading);
    const fireError = useSelector((state: RootState) => state.fire.error);

    return (
        <main>
            <MapContainer style={mapStyles} center={initialPosition} zoom={initialZoom}>
                <Stack sx={filterPanel} spacing={2}>
                    <FormDatePicker />
                    {fireError && <ErrorMsg message={fireError} />}
                    <Layer />
                    <FireCasesBox />
                </Stack>
                {!fireStatus && fireCases.length > 0 && <MapMarkers />}
            </MapContainer>
        </main>
    );
};

export default FullPageMap;
