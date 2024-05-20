import React, { useState } from 'react';
import { Box, Typography, Popper, Fade, Paper, IconButton } from '@mui/material';
import LayersIcon from '@mui/icons-material/Layers';
import { TileLayer } from 'react-leaflet';
import { ThemeProvider } from '@mui/material/styles';
import { tileLayers, layerStyles, layerButtonTheme } from '../utils/constants/constants';

/**
 * LayerComponent that provides a button to switch between different tile layers on the map.
 *
 * @returns {JSX.Element} The rendered layer component.
 */
const LayerComponent: React.FC = () => {
    const [activeLayer, setActiveLayer] = useState(tileLayers[0]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => !prev);
    };

    const handleLayerClick = (layer: typeof tileLayers[0]) => {
        setActiveLayer(layer);
        setOpen(false);
    };

    return (
        <>
            <TileLayer attribution={activeLayer.attribution} url={activeLayer.url} />
            <Box sx={layerStyles}>
                <ThemeProvider theme={layerButtonTheme}>
                    <IconButton onClick={handleClick}>
                        <LayersIcon fontSize="large" />
                    </IconButton>
                </ThemeProvider>
                <Popper
                    open={open}
                    anchorEl={anchorEl}
                    placement='left'
                    transition
                    sx={{ zIndex: 1200 }}
                >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper sx={{ padding: 2 }}>
                                <Box>
                                    {tileLayers.map((layer) => (
                                        <Box
                                            key={layer.name}
                                            onClick={() => handleLayerClick(layer)}
                                            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', mb: 1 }}
                                        >
                                            <img
                                                src={require(`../assets/${layer.name.toLowerCase()}.jpg`)}
                                                alt={`Layer ${layer.name}`}
                                                style={{
                                                    width: '48px',
                                                    height: '48px',
                                                    borderRadius: '10px',
                                                    objectFit: "cover",
                                                    border: activeLayer.name === layer.name ? '2px solid #3E5AA9' : 'none',
                                                    padding: '2px',
                                                    marginRight: '8px'
                                                }}
                                            />
                                            <Typography variant="subtitle2">
                                                {layer.name}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </Box>
        </>
    );
};

export default LayerComponent;
