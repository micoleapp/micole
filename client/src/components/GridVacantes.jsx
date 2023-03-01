import * as React from "react";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
const columns = [
  {
    field: "grado",
    headerName: "Grado",
    headerClassName: "bg-[#0061dd] text-white rounded-l-md overflow-hidden ",
    headerAlign: "center",
    align: "center",
    width: 180,
    sortable: false,
  },
  {
    field: "capacidadDisponible",
    headerName: "Capacidad Disponible",
    renderHeader: (params) => (
      <div className="flex flex-col">
        {" "}
        <p className="h-5 text-center">Capacidad</p>{" "}
        <p className="text-center">Disponible</p>{" "}
      </div>
    ),
    editable: true,
    sortable: false,
    headerAlign: "center",
    width: 120,
    headerClassName: "bg-[#0061dd] text-white flex justify-center items-center",
  },
  {
    field: "alumnosMatriculados",
    headerClassName: "bg-[#0061dd] text-white overflow-hidden",
    renderHeader: (params) => (
      <div className="flex flex-col">
        {" "}
        <p className="h-5 text-center">Alumnos</p>{" "}
        <p className="text-center">Matriculados</p>{" "}
      </div>
    ),
    editable: true,
    width: 120,
    headerAlign: "center",
    sortable: false,
    description: "This column has a value getter and is not sortable.",
  },
  {
    field: "vacantesDisponibles",
    renderHeader: (params) => (
      <div className="flex flex-col">
        {" "}
        <p className="h-5 text-center">Vacantes</p>{" "}
        <p className="text-center">Disponibles</p>{" "}
      </div>
    ),
    valueGetter: (params) =>
      (params.row.capacidadDisponible || 0) -
      (params.row.alumnosMatriculados || 0),
    headerClassName: "bg-[#0061dd] text-white overflow-hidden",
    width: 120,
    headerAlign: "center",
    sortable: false,
    description: "This column has a value getter and is not sortable.",
  },
  {
    field: "cuotaDeIngreso",
    width: 120,
    renderHeader: (params) => (
      <div className="flex flex-col">
        {" "}
        <p className="h-5 text-center">Cuota</p>{" "}
        <p className="text-center">Ingreso</p>{" "}
      </div>
    ),
    headerClassName: "bg-[#0061dd] text-white overflow-hidden",
    editable: true,
    headerAlign: "center",
    sortable: false,
    description: "This column has a value getter and is not sortable.",
  },
  {
    field: "matricula",
    headerName: "Matricula",
    width: 120,
    headerClassName: "bg-[#0061dd] text-white overflow-hidden",
    editable: true,
    headerAlign: "center",
    sortable: false,
    description: "This column has a value getter and is not sortable.",
  },
  {
    field: "pension",
    headerName: "Pension",
    headerClassName: "bg-[#0061dd] text-white rounded-r-md overflow-hidden",
    editable: true,
    sortable: false,
    headerAlign: "center",
    width: 120,
    description: "This column has a value getter and is not sortable.",
  },
  // {
  //   field: "configuracion",
  //   headerName: "Config",
  //   headerClassName: "bg-[#0061dd] text-white rounded-r-md overflow-hidden",
  //   editable: true,
  //   sortable: false,
  //   width: 120,
  //   headerAlign: "center",
  //   description: "This column has a value getter and is not sortable.",
  // },
];

export default function GridVacantes() {
  const { vacantesGrados } = useSelector((state) => state.schools);

  const newRows = vacantesGrados.map((vac) => ({
    id: vac.GradoId,
    grado: vac.nombre_grado,
    matricula: "",
  }));

  return (
<div className="lg:w-[980px] w-auto rounded-lg overflow-x-auto pb-5">
  <table className="w-full text-sm shadow-md">
    <thead className="text-xs rounded-lg text-white bg-[#0061dd]">
    <tr>
      <th scope="col" className="px-6 py-5 text-center">Grado</th>
      <th scope="col" className="px-6 text-center">Capacidad <br /> Disponible</th>
      <th scope="col" className="px-6 text-center">Alumnos <br /> Matriculados</th>
      <th scope="col" className="px-6 text-center">Vacantes <br /> Disponibles</th>
      <th scope="col" className="px-6 text-center">Cuota <br /> Ingreso</th>
      <th scope="col" className="px-6 text-center">Matricula</th>
      <th scope="col" className="px-6 text-center">Pension</th>
    </tr>
    </thead>
    <tbody>
    {vacantesGrados?.map(vac=>(
      <tr className="bg-white border-b" key={vac.GradoId}>
        <td className="py-5"> <p className="w-[200px] py-1 text-center">{vac.nombre_grado} </p> </td>
        <td className="px-6"><input className="border-b-2 border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm" placeholder="Ingrese nro" type="number" /> </td>
        <td className="px-6"><input className="border-b-2 border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm" placeholder="Ingrese nro" type="number" /> </td>
        <td className="px-6"><input className="border-b-2 border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm" placeholder="Ingrese nro" type="number" /> </td>
        <td className="px-6"><input className="border-b-2 border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm" placeholder="Ingrese nro" type="number" /> </td>
        <td className="px-6"><input className="border-b-2 border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm" placeholder="Ingrese nro" type="number" /> </td>
        <td className="px-6"><input className="border-b-2 border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm" placeholder="Ingrese nro" type="number" /> </td>
      </tr>
    ))}
    </tbody>
  </table>
</div>
  );
}
