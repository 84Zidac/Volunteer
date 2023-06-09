import ListOfEventsTable from './ListOfEvents'
import { useNavigate } from "react-router-dom";
import '../App.css'

export default function EventOrganizerDashboard() {
  const navigate = useNavigate();

  const handleEventClick = (event_id, event_name, event_date) => {
      navigate('/checkin', {state:{selectedEventId: event_id, selectedEventName: event_name, selectedEventDate: event_date}})
  }
  return (
    <div>
      <h1>Event Dashboard</h1>
      <div className="CheckInPageContainer" >
          <ListOfEventsTable onEventClick={handleEventClick}/>
      </div>
    </div>
  );
}