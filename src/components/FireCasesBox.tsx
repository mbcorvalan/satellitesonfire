import React, { useState } from 'react';
import { Box, Pagination, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { FireCase } from '../service/fireService';
import { formStyles, truncateToThreeDecimals, ITEMS_PER_PAGE } from '../utils/constants/constants';
import { RootState } from '../redux/store';

/**
 * FireCasesBox component that displays a paginated list of fire cases in accordion format.
 *
 * @returns {JSX.Element} The rendered fire cases box component.
 */
const FireCasesBox: React.FC = () => {
    const [page, setPage] = useState(1);
    const fireCases: FireCase[] = useSelector((state: RootState) => state.fire.data);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const paginatedFireCases = fireCases.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    if (fireCases.length === 0) {
        return (
            <Box sx={formStyles}>
                <Typography variant="h6">No fire information</Typography>
            </Box>
        );
    }

    return (
        <Box sx={formStyles}>
            <Typography variant="h6">Fire Information</Typography>
            <Typography variant="body1">
                Number of Points: {fireCases.length}
            </Typography>
            {paginatedFireCases.map((fireCase, index) => {
                const globalIndex = (page - 1) * ITEMS_PER_PAGE + index + 1;
                return (
                    <Accordion key={fireCase.id}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${fireCase.id}-content`}
                            id={`panel${fireCase.id}-header`}
                        >
                            <Typography>Fire Case {globalIndex}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>Date: {dayjs(fireCase.date).format('YYYY-MM-DD')}</Typography>
                            <Typography>Satellite: {fireCase.sat}</Typography>
                            <Typography>Coordinates: {truncateToThreeDecimals(fireCase.y)}, {truncateToThreeDecimals(fireCase.x)}</Typography>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
            <Pagination
                count={Math.ceil(fireCases.length / ITEMS_PER_PAGE)}
                page={page}
                onChange={handlePageChange}
                color="primary"
                style={{ marginTop: '16px' }}
            />
        </Box>
    );
};

export default FireCasesBox;
