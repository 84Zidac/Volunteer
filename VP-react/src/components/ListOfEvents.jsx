import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getEventsByOrganization } from '../utilities'
import { useState, useEffect, useContext } from 'react';
import { OrgContext } from '../App';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: '#f4e4ac',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#204051',
    // backgroundColor: theme.palette.action.hover,
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#4381a2',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



// send organization's ID. 
export default function ListOfEventsTable({ user, onEventClick }) {
    const [volunteers, setVolunteers] = useState([])

    const { organization } = useContext(OrgContext);
    
  useEffect(() => {
      const fetchEvents = async () => {
          // coordinator's only can check in volunteers and only for their organization.
          if (organization) {
            // console.log(organization)
            const volunteersData = await getEventsByOrganization(organization['id']); 
            if (volunteersData.events) {
              setVolunteers(volunteersData.events);
            }
          }
      }
      fetchEvents();

  }, [user, organization])


  const handleEventClick= (eventId) => {
    // console.log("List of events handleEventClick eventId", eventId)
    const eventObject = eventId
     if (onEventClick) {
      onEventClick(eventObject)
    }
  };

  return (
    <TableContainer component={Paper} sx={{ minWidth: 300, maxWidth: 1000 }}>
      <Table  aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Events ID</StyledTableCell>
            <StyledTableCell align="right">Event name</StyledTableCell>
            <StyledTableCell align="right">start time</StyledTableCell>
            <StyledTableCell align="right">Amount of Volunteers Required</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {volunteers.map((row) => (
            <StyledTableRow 
            key={row.id}
            onClick={() => handleEventClick(row.event_id)}
            >
              <StyledTableCell component="th" scope="row">{row.event_id}</StyledTableCell>
              <StyledTableCell align="right">{row.event_name}</StyledTableCell>
              <StyledTableCell align="right">{row.start_time}</StyledTableCell>
              <StyledTableCell align="right">{row.volunteers_required}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// Code below is just to understand, all of what we can iterate through and display on the table. 
// event_dict = {
//   'id': event.id,
//   'event_name': event.event_name,
//   'start_time': event.start_time.isoformat(),
//   'end_time': event.end_time.isoformat(),
//   'description': event.description,
//   'volunteers_required': event.volunteers_required,
//   'protective_equipment': event.protective_equipment,
//   'address': {
//       'street': event.address.street,
//       'city': event.address.city,
//       'state': event.address.state,
//       'zipcode': event.address.zipcode
//   },
//   'organization': event.organization.organization_name
// }
// event_list.append(event_dict)