import React, { useEffect, useMemo, useState  } from 'react';
import { useTable, useRowSelect } from 'react-table';
import { getVolunteersList } from '../utilities';
import Button from '@mui/material/Button';
import { volunteersAccounted } from '../utilities'

export default function VolunteersList({ selectedDate }) {
  const [volunteers, setVolunteers] = React.useState([]);
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);

  const handleCheckIn = async () => {
    const response = await volunteersAccounted(selectedVolunteers, true);
    if (response.status === 'success') {
      console.log(handleCheckIn, 'successfully updated')
    }else{
      console.log(handleCheckIn, 'no updates made')
    }
  }

  const handleNoShow = async () => {
    const response = await volunteersAccounted(selectedVolunteers, false);
    if (response.status === 'success') {
      console.log(handleNoShow, 'successfully updated')
    }else{
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
      if (selectedDate) {
        const volunteerData = await getVolunteersList(selectedDate);
        if (volunteerData && volunteerData.volunteers) {
          setVolunteers(volunteerData.volunteers);
        }
      }
    };
    fetchVolunteers();
  }, [selectedDate]);

  const data = React.useMemo(() => volunteers.map((volunteer) => ({
    id: volunteer.id,
    firstName: volunteer.name.split(' ')[0],
    lastName: volunteer.name.split(' ')[1],
    fullName: `${volunteer.name.split(' ')[0]} ${volunteer.name.split(' ')[1]}`
  })), [volunteers]);

  const columns = useMemo(() => [
    {
      id: 'selection',
      Header: ({ getToggleAllRowsSelectedProps }) => (
        <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
      ),
      Cell: ({ row }) => (
      <input 
      type="checkbox"
      {...row.getToggleRowSelectedProps()} 
      onChange={() => onSelectVolunteer(row.original.id)}
      checked={selectedVolunteers.includes(row.original.id)}
      />
      ),
    },
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
    {
      Header: 'Full Name',
      accessor: 'fullName',
    },
  ], [selectedVolunteers]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useRowSelect);

  return (
    <>
    <table {...getTableProps()} style={{ width: '100%', textAlign: 'left' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} style={{height: '50px', backgroundColor: 'blue', color: 'white' }}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} style={{ height: '50px', backgroundColor: i % 2 === 0 ? 'rgb(5, 165, 126)' : 'rgb(9, 165, 52)' }}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
    <Button 
    variant="contained" 
    onClick={handleCheckIn}
    >
      Checkin Volunteer
      </Button>
      <Button 
    variant="contained" 
    onClick={handleNoShow}
    >
      No Show
      </Button>
  </>
  );
}

{/* <Button 
    variant="contained" 
    onClick={() => handleCheckIn(selectedVolunteers)}
    >
      Checkin Volunteer
      </Button>
      <Button 
    variant="contained" 
    onClick={() => handleNoShow(selectedVolunteers)}
    >
      No Show
      </Button>
  </> */}