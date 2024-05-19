import React from 'react';
import { MapContainer, Marker, Popup } from 'react-leaflet';
import { initialPosition, initialZoom, mapStyles } from '../utils/constants/constants';
import FormDatePicker from './FormDatePicker';
import Layer from './Layer';

const FullPageMap: React.FC = () => {
    return (
        <main>
            <MapContainer style={mapStyles} center={initialPosition} zoom={initialZoom}>
                <FormDatePicker />
                <Layer />
                <Marker position={[-34.6, -58.38]}>
                    <Popup>Alo! <br /> I'm a marker.</Popup>
                </Marker>
            </MapContainer>
        </main>
    );
};

export default FullPageMap;
