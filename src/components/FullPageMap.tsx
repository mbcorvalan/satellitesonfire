import React, { useState } from 'react';
import { MapContainer, Marker, Popup } from 'react-leaflet';
import { Dayjs } from 'dayjs';
import { SelectChangeEvent } from '@mui/material';
import FormDatePicker from './FormDatePicker';
import Layer from './Layer';

const FullPageMap: React.FC = () => {
    const [satellite, setSatellite] = useState<string>('');
    const [date, setDate] = useState<Dayjs | null>(null);
    const [errors, setErrors] = useState<{ satellite: boolean; date: boolean; }>({ satellite: false, date: false });
    const handleSatelliteChange = (event: SelectChangeEvent<string>) => {
        setSatellite(event.target.value);
    };

    const handleDateChange = (newDate: Dayjs | null) => {
        setDate(newDate);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newErrors = {
            satellite: !satellite,
            date: !date,
        };
        setErrors(newErrors);

        if (!newErrors.satellite && !newErrors.date) {
            console.log('Form submitted:', { satellite, date });
        }
    };

    return (
        <main>
            <MapContainer style={{ height: '100vh', width: '100%' }} center={[-34.6, -58.38]} zoom={13}>
                <FormDatePicker
                    satellite={satellite}
                    date={date}
                    errors={errors}
                    handleSatelliteChange={handleSatelliteChange}
                    handleDateChange={handleDateChange}
                    handleSubmit={handleSubmit}
                />
                <Layer />
                <Marker position={[-34.6, -58.38]}>
                    <Popup>Alo! <br /> I'm a marker.</Popup>
                </Marker>
            </MapContainer>
        </main>
    );
};

export default FullPageMap;


/*
          <Box display="flex" justifyContent="center" mt={2}>
                {tileLayers.map(layer => (
                    <Box
                        key={layer.name}
                        textAlign="center"
                        mx={1}
                        onClick={() => setActiveLayer(layer)}
                        sx={{ cursor: 'pointer' }}
                    >
                        <img
                            src={`/path/to/${layer.name.toLowerCase()}.png`}
                            alt={`Layer ${layer.name}`}
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '8px',
                                border: activeLayer.name === layer.name ? '2px solid #3E5AA9' : 'none',
                                padding: '2px',
                            }}
                        />
                        <Typography variant="subtitle2">{layer.name}</Typography>
                    </Box>
                ))}
            </Box>



*/