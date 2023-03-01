import * as React from "react";
import { useSelector } from "react-redux";


export default function GridVacantes({año}) {
  const { vacantesGrados } = useSelector((state) => state.schools);

  const [datos,setDatos] = React.useState([
    {asd:123}
  ])

  console.log(datos)

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
    <tr className="bg-white border-b">
        <td className="py-5"> <input className="w-[200px] py-1 text-center bg-transparent" disabled value={10} /> </td>
        <td className="px-6"><input id={1} onChange={(e)=>setDatos([...datos,[e.target.value]])} className="border-b-2 text-center border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm" placeholder="Ingrese nro" type="number" /> </td>
        <td className="px-6"><input id={1} onChange={(e)=>setDatos(...datos,[e.target.value])} className="border-b-2 text-center border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm" placeholder="Ingrese nro" type="number" /> </td>
        <td className="px-6"><input id={1} disabled form="myform" className="border-b-2 text-center border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm" placeholder="Ingrese nro" type="number" /> </td>
        <td className="px-6"><input id={1} onChange={(e)=>setDatos(...datos,[e.target.value])} className="border-b-2 text-center border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm" placeholder="Ingrese nro" type="number" /> </td>
        <td className="px-6"><input id={1} onChange={(e)=>setDatos(...datos,[e.target.value])} className="border-b-2 text-center border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm" placeholder="Ingrese nro" type="number" /> </td>
        <td className="px-6"><input id={1} onChange={(e)=>setDatos(...datos,[e.target.value])} className="border-b-2 text-center border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm" placeholder="Ingrese nro" type="number" /> </td>
      </tr>
    {/* {vacantesGrados?.map((vac)=>(
      <tr className="bg-white border-b" key={vac.GradoId}>
        <td className="py-5"> <input form="myform" className="w-[200px] py-1 text-center bg-transparent" disabled value={vac.nombre_grado} /> </td>
        <td className="px-6"><input id={vac.GradoId} onChange={(e)=>setDatos([...datos,{id:e.target.id,capacidad:e.target.value}])} form="myform"  className="border-b-2 text-center border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm" placeholder="Ingrese nro" type="number" /> </td>
        <td className="px-6"><input   form="myform"  className="border-b-2 text-center border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm" placeholder="Ingrese nro" type="number" /> </td>
        <td className="px-6"><input disabled form="myform" className="border-b-2 text-center border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm" placeholder="Ingrese nro" type="number" /> </td>
        <td className="px-6"><input  form="myform" className="border-b-2 text-center border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm" placeholder="Ingrese nro" type="number" /> </td>
        <td className="px-6"><input  form="myform" className="border-b-2 text-center border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm" placeholder="Ingrese nro" type="number" /> </td>
        <td className="px-6"><input  form="myform" className="border-b-2 text-center border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm" placeholder="Ingrese nro" type="number" /> </td>
      </tr>
    ))} */}
    </tbody>
  </table>
</div>
  );
}
