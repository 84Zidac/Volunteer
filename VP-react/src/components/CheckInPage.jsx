import "./Button.css";
import "./Input.css";
import VolunteersList from './VolunteersList'
import {useLocation} from 'react-router-dom';
import '../App.css'

export const CheckInPage = () => {
    const location = useLocation();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    const selectedEventDate = location.state.selectedEventDate
    
    return (
        <>
        {formattedDate > selectedEventDate ? (<h1>Volunteers checked in</h1>) : (<h1>Check in Volunteers</h1>)}
        <h2>Event: {location.state.selectedEventName}</h2>
        <div className="CheckInPageContainer" >
            <VolunteersList selectedEventId={location.state.selectedEventId} selectedEventDate = {selectedEventDate} formattedDate = {formattedDate}/>
        </div>
        </>
    )
}