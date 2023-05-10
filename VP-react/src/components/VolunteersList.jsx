import React, { useEffect, useMemo } from 'react';
import { useTable, useRowSelect } from 'react-table';
import { getVolunteersList } from '../utilities';
import Button from '@mui/material/Button';


export default function VolunteersList({ selectedDate }) {
  const [volunteers, setVolunteers] = React.useState([]);

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
      Cell: ({ row }) => <input type="checkbox" {...row.getToggleRowSelectedProps()} />,
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
  ], []);

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
    <Button variant="contained">Checkin Volunteer</Button>
  </>
  );
}