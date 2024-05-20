import React from 'react';
import Alert from '@mui/material/Alert';
import { errorStyles } from '../utils/constants/constants';

/**
 * Error message component that displays an alert with a given error message.
 *
 * @param {ErrorProps} props - The properties for the component.
 * @param {string} props.message - The error message to display.
 * @returns {JSX.Element} The rendered error message component.
 */
interface ErrorProps {
    message: string;
}

const ErrorMsg: React.FC<ErrorProps> = ({ message }) => {
    return (
        <Alert variant="filled" sx={errorStyles} severity="error">{message}</Alert>
    );
};

export default ErrorMsg;
