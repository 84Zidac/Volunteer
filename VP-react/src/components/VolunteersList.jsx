import React, { useEffect, useState } from 'react';
// import { getVolunteersList } from '../utilities';
import { getVolunteersList, volunteersAccounted } from '../utilities';
import { getVolunteersByEventId } from '../utilities';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { Alert } from '@mui/material';

export default function VolunteersList({ selectedEventId }) {
  const [volunteers, setVolunteers] = React.useState([]);
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);
  const [saved, setSaved]  = useState(false)
  const [error, setError]  = useState(false)

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      color: '#F4E4AC',
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#204051',
    },
    '&:nth-of-type(even)': {
      backgroundColor: '#4381A2',
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  const handleCheckIn = async () => {
    setSaved(false)
    const response = await volunteersAccounted(selectedVolunteers, true);
    if (response.status === 'success') {
      setSaved(true)
      console.log(handleCheckIn, 'successfully updated')
    }else{
      setError(true)
      console.log(handleCheckIn, 'no updates made')
    }
  }
  const handleNoShow = async () => {
    setSaved(false)
    const response = await volunteersAccounted(selectedVolunteers, false);
    if (response.status === 'success') {
      setSaved(true)
      console.log(handleNoShow, 'successfully updated')
    }else{
      setError(true)
      console.log(handleNoShow, 'no updates made')
    }
  }
  const onSelectVolunteer = (volunteerId) => {
    setSelectedVolunteers(prev => {
      //Toggle selection
      if (prev.includes(volunteerId)) {
        return prev.filter(id => id !== volunteerId);
      } else {
        return [...prev, volunteerId];
      }
    })
  }
  useEffect(() => {
    const fetchVolunteers = async () => {
      if (selectedEventId) {
        const volunteerData = await getVolunteersByEventId(selectedEventId);
        if (volunteerData && volunteerData.volunteers) {
          setVolunteers(volunteerData.volunteers);
        }
      }
    };
    fetchVolunteers();
  }, [selectedEventId, saved]);

  return (
    <TableContainer component={Paper} sx={{ minWidth: 300, maxWidth: 1000 }}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell padding="checkbox"></StyledTableCell>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell>Last Name</StyledTableCell>
            <StyledTableCell>Checked in?</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {volunteers.length > 0 ? (volunteers.map((volunteer) => {
            const [firstName, ...lastName] = volunteer.name.split(' ');
            return (
              <StyledTableRow key={volunteer.id}>
                <StyledTableCell padding="checkbox">
                  <Checkbox
                    sx={{color:'white',
                    '&.Mui-checked': {
                      color: 'white'}
                    }}
                    onChange={() => onSelectVolunteer(volunteer.id)}
                    checked={selectedVolunteers.includes(volunteer.id)}
                  />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {volunteer.id}
                </StyledTableCell>
                <StyledTableCell>{firstName}</StyledTableCell> {/* First Name */}
                <StyledTableCell>{lastName.join(' ')}</StyledTableCell> {/* Last Name */}
                <StyledTableCell>{volunteer.attendance ? ("Yes") : ("No")}</StyledTableCell> {/* Attendance */}
              </StyledTableRow>
            );
          })) : (<StyledTableRow> <StyledTableCell colSpan={5}>No volunteers to check in!</StyledTableCell></StyledTableRow>)}
        </TableBody>
      </Table>
      {saved  && (
    <Alert severity="success" onClose={() => setSaved(false)}>
      Saved!
    </Alert> )}
    {error  && (
    <Alert severity="error" onClose={() => setError(false)}>
      Saved!
    </Alert> )}
      {volunteers.length > 0 &&       
      <div style={{backgroundColor:'#f3e5ab'}}>
        <button 
          onClick={handleCheckIn}
          className='check-in-button'
        >
          Check in
        </button>
        <button 
          onClick={handleNoShow}
          className='no-show-button'
        >
          No Show
        </button></div>}
    </TableContainer>
  );
}