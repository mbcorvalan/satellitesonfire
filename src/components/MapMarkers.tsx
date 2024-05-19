import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Popup, Circle } from "react-leaflet";
import dayjs from 'dayjs';
import { FireCase } from '../service/fireService';
import useReliability from '../hooks/useReliability';
import useMarkerColor from '../hooks/useMarkerColor';

const MapMarkers: React.FC = () => {
    const fireCases: FireCase[] = useSelector((state: RootState) => state.fire.data);
    const { getMarkerColor } = useMarkerColor();
    const { getReliability } = useReliability();

    return (
        <>
            {fireCases?.map((fireCase) => {
                const reliability = getReliability(fireCase.sat, fireCase.conf);
                return (
                    <Circle
                        key={fireCase.id}
                        center={[fireCase.y, fireCase.x]}
                        radius={5}
                        color={getMarkerColor(reliability)}
                        weight={8}
                        fillColor={getMarkerColor(reliability)}
                    >
                        <Popup>
                            <h3 style={{ textAlign: 'center' }}>Fire pixel information</h3>
                            <p><b>Date: </b>{dayjs(fireCase.date).format('YYYY-MM-DD')}</p>
                            <p><b>Coordinates: </b>{fireCase.y}, {fireCase.x}</p>
                            <p><b>Satellite: </b>{fireCase.sat}</p>
                        </Popup>
                    </Circle>
                );
            })}
        </>
    );
};

export default MapMarkers;
