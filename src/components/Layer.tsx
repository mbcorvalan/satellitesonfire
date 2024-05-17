import React, { useState } from 'react';
import { tileLayers, layerStyles } from '../utils/constants/constants';
import { Box, Typography } from '@mui/material';
import { TileLayer } from 'react-leaflet';


const LayerComponent: React.FC = () => {
    const [activeLayer, setActiveLayer] = useState(tileLayers[0]);
    return (
        <>
            <TileLayer attribution={activeLayer.attribution} url={activeLayer.url} />
            <Box sx={layerStyles}>
                {tileLayers.map(layer => (
                    <Box
                        key={layer.name}
                        textAlign="center"
                        mx={1}
                        onClick={() => setActiveLayer(layer)}
                        sx={{ cursor: 'pointer' }}
                    >
                        <img
                            src={require(`../assets/${layer.name.toLowerCase()}.jpg`)}
                            alt={`Layer ${layer.name}`}
                            style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '10ps',
                                objectFit: "cover",
                                border: activeLayer.name === layer.name ? '2px solid #3E5AA9' : 'none',
                                padding: '2px',
                            }}
                        />
                        <Typography style={{
                            fontWeight: 500,
                            lineHeight: 1.57,
                            fontSize: "12px",
                        }}>{layer.name}</Typography>
                    </Box>
                ))}
            </Box >

        </>
    );
};

export default LayerComponent;
