import * as React from 'react';
import { useSelector } from 'react-redux';

export default function GridVacantes({ año }) {
  const { vacantesGrados } = useSelector((state) => state.schools);

  const [datos, setDatos] = React.useState({año});

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.id]: { ...datos[e.target.id], [e.target.name]: e.target.value },
    });
  };
  console.log(datos);
  return (
    <div className="lg:w-[980px] w-auto rounded-lg overflow-x-auto pb-5">
      <table className="w-full text-sm shadow-md">
        <thead className="text-xs rounded-lg text-white bg-[#0061dd]">
          <tr>
            <th scope="col" className="px-6 py-5 text-center">
              Grado
            </th>
            <th scope="col" className="px-6 text-center">
              Capacidad <br /> Disponible
            </th>
            <th scope="col" className="px-6 text-center">
              Alumnos <br /> Matriculados
            </th>
            <th scope="col" className="px-6 text-center">
              Vacantes <br /> Disponibles
            </th>
            <th scope="col" className="px-6 text-center">
              Cuota <br /> Ingreso
            </th>
            <th scope="col" className="px-6 text-center">
              Matricula
            </th>
            <th scope="col" className="px-6 text-center">
              Pension
            </th>
          </tr>
        </thead>
        <tbody>
          {vacantesGrados?.map((vac, index) => (
            <tr className="bg-white border-b">
              <td className="py-5">
                <input
                  className="w-[200px] py-1 text-center bg-transparent"
                  disabled
                  value={vac.nombre_grado}
                />
              </td>
              <td className="px-6">
                <input
                  id={vac.GradoId}
                  name="capacidad"
                  onChange={handleChange}
                  className="border-b-2 text-center border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm"
                  placeholder="Ingrese nro"
                  type="number"
                />{' '}
              </td>
              <td className="px-6">
                <input
                  id={vac.GradoId}
                  name="alumnos"
                  onChange={handleChange}
                  className="border-b-2 text-center border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm"
                  placeholder="Ingrese nro"
                  type="number"
                />{' '}
              </td>
              <td className="px-6">
                <input
                  id={vac.GradoId}
                  disabled
                  value={datos[vac.GradoId] ? datos[vac.GradoId]["capacidad"] - datos[vac.GradoId]["alumnos"] : 0}
                  form="myform"
                  className="border-b-2 text-center border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm"
                  placeholder="Ingrese nro"
                  type="number"
                />{' '}
              </td>
              <td className="px-6">
                <input
                  id={vac.GradoId}
                  name="cuota_ingreso"
                  onChange={handleChange}
                  className="border-b-2 text-center border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm"
                  placeholder="Ingrese nro"
                  type="number"
                />{' '}
              </td>
              <td className="px-6">
                <input
                  id={vac.GradoId}
                  name="matricula"
                  onChange={handleChange}
                  className="border-b-2 text-center border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm"
                  placeholder="Ingrese nro"
                  type="number"
                />{' '}
              </td>
              <td className="px-6">
                <input
                  id={vac.GradoId}
                  name="cuota_pension"
                  onChange={handleChange}
                  className="border-b-2 text-center border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm"
                  placeholder="Ingrese nro"
                  type="number"
                />{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
