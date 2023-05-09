import "./Button.css";
import "./Input.css";
// import { Grid, Paper } from '@mui/material';
// import Alert from '@mui/material/Alert';
// import {Visibility as VisibilityIcon} from '@mui/icons-material';
// import IconButton from '@mui/material/IconButton';
// import {VisibilityOff as VisibilityOffIcon} from '@mui/icons-material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import VolunteersList from './VolunteersList'
import ListOfEventsTable from './ListOfEvents'
import { useState } from 'react';

export const CheckInPage = () => {
    const [selectedDate, setSelectedDate] = useState(null)

    const handleDateClick = (date) => {
        setSelectedDate(date);
    }

    return (
        <>
        <h1>Check in Volunteers Now</h1>
        <ListOfEventsTable onDateClick={handleDateClick} />
        <VolunteersList selectedDate={selectedDate} />
        </>
        

    )
}