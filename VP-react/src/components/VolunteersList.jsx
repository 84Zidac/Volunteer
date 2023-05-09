import * as React from 'react';
import  {DataGrid}  from '@mui/x-data-grid';
import { getVolunteersList } from '../utilities'
import { useState, useEffect } from 'react';

export default function VolunteersList ({ selectedDate }) {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    const fetchVolunteers = async () => {
      if (selectedDate) {
        const volunteerData = await getVolunteersList(selectedDate);
        if (volunteerData && volunteerData.volunteers) {
          setVolunteers(volunteerData.volunteers)
        }
      }
      
    }
    fetchVolunteers();
  }, [selectedDate]);

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  ,
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = volunteers.map((volunteer) => ({
    id: volunteer.id, 
    firstName: volunteer.name.split(' ')[0],
    lastName: volunteer.name.split(' ')[1], 
  }))


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}