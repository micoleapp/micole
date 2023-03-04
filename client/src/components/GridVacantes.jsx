import * as React from 'react';
import { useSelector } from 'react-redux';

export default function GridVacantes({ año }) {
  const { vacantesGrados } = useSelector((state) => state.schools);
  const { token } = useSelector((state) => state.auth);
  const [datos, setDatos] = React.useState({año});


  
  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.id]: { ...datos[e.target.id], [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post(`/vacantes`,{data:datos},{headers:{'Authorization': `Bearer ${token}`}})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <div className="rounded-lg relative overflow-x-auto pb-5">
      <table className="text-sm shadow-md relative ">
        <thead className="text-xs rounded-lg text-white bg-[#0061dd]">
          <tr>
            <th scope="col" className="px-6 py-5 text-center">
              Grado
            </th>
            <th scope="col" className="px-6 text-center">0g
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
            <tr className="bg-white border-b" key={index}>
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
      <button type='button' onClick={handleSubmit} className='flex mx-auto bg-[#0061dd] p-5 text-white rounded-md'>Enviar formulario del año: {año}</button>
    </>
  );
}
