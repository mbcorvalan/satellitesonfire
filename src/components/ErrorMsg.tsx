import React from 'react';
import Alert from '@mui/material/Alert';
import { errorStyles } from '../utils/constants/constants';

interface ErrorProps {
    message: string;
}

const ErrorMsg: React.FC<ErrorProps> = ({ message }) => {
    return (
        <Alert variant="filled" sx={errorStyles} severity="error">{message}</Alert>
    );
};

export default ErrorMsg;
