import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { TablePagination } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
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


  function convertDate(datetimeString){
    const datetime = new Date(datetimeString);
    const formattedDate = datetime.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
    });
    return (
    `${formattedDate}`
    )
  }

  function convertTime(datetimeString){
    const datetime = new Date(datetimeString);
    const formattedTime = datetime.toLocaleString(undefined, {
    hour: "numeric",
    minute: "numeric",
    });
    return (
    `${formattedTime}`
    )
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} sx={{ minWidth: 300, maxWidth: 1000 }}>
      <Table  aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Event ID</StyledTableCell>
            <StyledTableCell align="right">Event name</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Start time</StyledTableCell>
            <StyledTableCell align="right">End time</StyledTableCell>
            <StyledTableCell align="right">Volunteers Required</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {volunteers.map((row) => (
            <StyledTableRow 
            key={row.id}
            onClick={() => {onEventClick(row.event_id, row.event_name, convertDate(row.start_time))}}
            >
              <StyledTableCell component="th" scope="row">{row.event_id}</StyledTableCell>
              <StyledTableCell align="right">{row.event_name}</StyledTableCell>
              <StyledTableCell align="right">{convertDate(row.start_time)}</StyledTableCell>
              <StyledTableCell align="right">{convertTime(row.start_time)}</StyledTableCell>
              <StyledTableCell align="right">{convertTime(row.end_time)}</StyledTableCell>
              <StyledTableCell align="right">{row.volunteers_required}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
        <TableRow>
            <TableCell colSpan={6}>*Click on any of the event fields to view the volunteers and check them in for the event selected</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={volunteers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

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