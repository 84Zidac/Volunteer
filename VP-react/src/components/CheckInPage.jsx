import "./Button.css";
import "./Input.css";
import VolunteersList from './VolunteersList'
import {useLocation} from 'react-router-dom';
import '../App.css'

export const CheckInPage = () => {
    const location = useLocation();
    
    return (
        <>
        <h1>Check in Volunteers</h1>
        <h2>Event: {location.state.selectedEventName}</h2>
        <div className="CheckInPageContainer" >
            <VolunteersList selectedEventId={location.state.selectedEventId} />
        </div>
        </>
    )
}