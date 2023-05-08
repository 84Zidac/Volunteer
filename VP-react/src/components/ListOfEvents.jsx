import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getEvents } from '../utilities'
import { useState, useEffect } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function ListOfEventsTable({ user, onDateClick }) {
    const [volunteers, setVolunteers] = useState([])

  useEffect(() => {
      const fetchEvents = async () => {
          // WORK IN PROGRESS. Will add the part for coordinator's only can check in volunteers.
          // if (user) {
          //     console.log("getEvents activated to grab list")
          //     const volunteersData = await getEvents();
          //     console.log("volunteersData:", volunteersData)
          //     setVolunteers(volunteersData.events);
          // } else {
          //     setVolunteers([])
          // }

          
            const volunteersData = await getEvents();
            setVolunteers(volunteersData.events);
              
      }
      fetchEvents();

  }, [user])

  const handleDateClick= (dateTime) => {
    const dateObject = new Date(dateTime)
    const dateOnly = `${dateObject.getFullYear()}-${String(dateObject.getMonth() + 1).padStart(2, '0')}-${String(dateObject.getDate()).padStart(2, '0')}`;
    if (onDateClick) {
      onDateClick(dateOnly)
    }
  };

  return (
    <TableContainer component={Paper} sx={{ minWidth: 300, maxWidth: 1000 }}>
      <Table sx={{ minWidth: 300 , maxWidth: 1000 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Events Info</StyledTableCell>
            <StyledTableCell align="right">Event name</StyledTableCell>
            <StyledTableCell align="right">start time</StyledTableCell>
            <StyledTableCell align="right">Amount of Volunteers Required</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {volunteers.map((row) => (
            <StyledTableRow 
            key={row.id}
            onClick={() => handleDateClick(row.start_time)}
            >
              <StyledTableCell component="th" scope="row">{row.event_name}</StyledTableCell>
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