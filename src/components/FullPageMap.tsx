
import { MapContainer } from 'react-leaflet';
import { initialPosition, initialZoom, mapStyles, filterPanel } from '../utils/constants/constants';
import FormDatePicker from './FormDatePicker';
import Layer from './Layer';
import MapMarkers from './MapMarkers';
import { FireCase } from '../service/fireService';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ErrorMsg from './ErrorMsg';
import Stack from '@mui/material/Stack';

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
                </Stack>
                {!fireStatus && fireCases.length > 0 && <MapMarkers />}
            </MapContainer>
        </main>
    );
};

export default FullPageMap;
