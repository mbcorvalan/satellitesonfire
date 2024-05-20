import React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { filterButtonTheme } from '../utils/constants/constants';
import { RootState } from '../redux/store';

interface FilterButtonProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * FilterButton component that renders a themed button for submitting a form.
 *
 * @param {FilterButtonProps} props - The properties for the component.
 * @param {function} props.handleSubmit - The function to handle form submission.
 * @returns {JSX.Element} The rendered filter button component.
 */
const FilterButton: React.FC<FilterButtonProps> = ({ handleSubmit }: FilterButtonProps): JSX.Element => {
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
