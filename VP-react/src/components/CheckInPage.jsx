import "./Button.css";
import "./Input.css";
import VolunteersList from './VolunteersList'
import ListOfEventsTable from './ListOfEvents'
import { useState, useContext } from 'react';
import '../App.css'
import { OrgContext } from '../App';

export const CheckInPage = () => {
    const [selectedEventId, setSelectedEventId] = useState(null)
    const { organization } = useContext(OrgContext);
    const handleEventClick = (event) => {
        setSelectedEventId(event);
    } 
   
    return (
        <>
        <h1>Check in Volunteers</h1>
        <div className="CheckInPageContainer" >
            {/* <ListOfEventsTable onDateClick={handleDateClick} /> */}
            {/* <VolunteersList selectedDate={selectedDate} /> */}
            <ListOfEventsTable onEventClick={handleEventClick} organization={organization} />
            <VolunteersList selectedEventId={selectedEventId} />
        </div>
        </>
        

    )
}