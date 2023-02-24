import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {
    field: 'grado',
    headerName: 'Grado',
    headerClassName: "bg-[#0061dd] text-white rounded-l-md overflow-hidden ",
    headerAlign: 'center',
    editable: true,
    width:137.1,
    sortable: false,
  },
  {
    field: 'capacidadDisponible',
    headerName: 'Capacidad Disponible',
    renderHeader: (params) => ( <div className="flex flex-col"> <p className="h-5 text-center">Capacidad</p> <p className="text-center">Disponible</p> </div> ),
    editable: true,
    sortable: false,
    headerAlign: 'center',
    width:120,
    headerClassName: "bg-[#0061dd] text-white flex justify-center items-center",
  },
  {
    field: 'alumnosMatriculados',
    headerClassName: "bg-[#0061dd] text-white overflow-hidden",
    renderHeader: (params) => ( <div className="flex flex-col"> <p className="h-5 text-center">Alumnos</p> <p className="text-center">Matriculados</p> </div> ),
    editable: true,
    width:120,
    headerAlign: 'center',
    sortable: false,
    description: 'This column has a value getter and is not sortable.',
  },
  {
    field: 'vacantesDisponibles',
    renderHeader: (params) => ( <div className="flex flex-col"> <p className="h-5 text-center">Vacantes</p> <p className="text-center">Disponibles</p> </div> ),
    headerClassName: "bg-[#0061dd] text-white overflow-hidden",
    editable: true,
    width:120,
    headerAlign: 'center',
    sortable: false,
    description: 'This column has a value getter and is not sortable.',
  },
  {
    field: 'cuotaDeIngreso',
    width:120,
    renderHeader: (params) => ( <div className="flex flex-col"> <p className="h-5 text-center">Cuota</p> <p className="text-center">Ingreso</p> </div> ),
    headerClassName: "bg-[#0061dd] text-white overflow-hidden",
    editable: true,
    headerAlign: 'center',
    sortable: false,
    description: 'This column has a value getter and is not sortable.',
  },
  {
    field: 'matricula',
    headerName: 'Matricula',
    width:120,
    headerClassName: "bg-[#0061dd] text-white overflow-hidden",
    editable: true,
    headerAlign: 'center',
    sortable: false,
    description: 'This column has a value getter and is not sortable.',
  },
  {
    field: 'pension',
    headerName: 'Pension',
    headerClassName: "bg-[#0061dd] text-white overflow-hidden",
    editable: true,
    sortable: false,
    headerAlign: 'center',
    width:120,
    description: 'This column has a value getter and is not sortable.',
  },
  {
    field: 'configuracion',
    headerName: 'Config',
    headerClassName: "bg-[#0061dd] text-white rounded-r-md overflow-hidden",
    editable: true,
    sortable: false,
    width:120,
    headerAlign: 'center',
    description: 'This column has a value getter and is not sortable.',
  }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function GridVacantes() {
  return (
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick={true}
        disableColumnFilter={true}
        disableColumnMenu={true}
        hideFooterPagination={true}
        hideFooter={true}
        hideFooterSelectedRowCount={true}
        autoHeight
        editMode="row"
        sort
      />
  );
}