import React from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { filterButtonTheme } from '../utils/constants/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';


interface FilterButtonProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ handleSubmit }) => {
    const fireStatus = useSelector((state: RootState) => state.fire.isLoading);
    return (
        <ThemeProvider theme={filterButtonTheme}>
            <Button
                onClick={(event) => handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>)}
                type="submit"
                variant="contained"
                sx={{ width: "100%", borderRadius: "50px" }}
            >
                {fireStatus ? 'Loading...' : 'Filter'}
            </Button>
        </ThemeProvider>
    );
};

export default FilterButton;