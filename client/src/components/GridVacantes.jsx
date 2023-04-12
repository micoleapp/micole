import axios from "axios";
import * as React from "react";
import { useSelector,useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";
import { setVacantesRedux } from "../redux/AuthActions";

export default function GridVacantes({ año, setVacantesOff }) {
  const { vacantesGrados } = useSelector((state) => state.schools);
  const { token, oneSchool, vacantes } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [datos, setDatos] = React.useState({ año });
  const [defaultVacantes,setDefaultVacantes] = React.useState([])
  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.id]: { ...datos[e.target.id], [e.target.name]: e.target.value },
    });
  };

  React.useEffect(() => {
    setDefaultVacantes(vacantes)
    setDatos({
      ...datos,
      ...vacantes?.reduce((acc, el) => {
        if (el.año === año) {
          acc[el.GradoId] = {
            capacidad: el.capacidad,
            alumnos: el.alumnos_matriculados,
            cuota_ingreso: el.cuota_ingreso,
            matricula: el.matricula,
            cuota_pension: el.cuota_pension,
          };
        }
        return acc;
      }, {}),
    })
  }, [vacantes])
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setVacantesOff(false);
    try {
      axios
        .post(
          `/vacantes`,
          { data: datos },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          Swal.fire("Success", "Formulario enviado correctamente", "success");
          dispatch(setVacantesRedux(oneSchool.id))
        }
        )
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Algo salio mal",
            text: err.response.data.error,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

/*
{ 2: { capacidad: '', alumnos: '', cuota_ingreso: '', matricula: '', cuota_pension: '' }, 'año': 2023 }
*/

  const handleDelete = (vac) => {
    setDefaultVacantes(defaultVacantes.filter(el => el.id !== vac.id))
    setDatos({...datos,
      [vac.GradoId]: {capacidad: "", alumnos: "", cuota_ingreso: "", matricula: "", cuota_pension: ""}
    })
  }

  return (
    <>
      <div className=" relative overflow-x-auto pb-5">
        <table className="text-sm shadow-md relative ">
          <thead className="text-xs  text-white bg-[#0061dd]">
            <tr>
              <th scope="col" className="py-5 w-[10px] text-center">
                Grado
              </th>
              <th scope="col" className="text-center">
                Capacidad <br /> Disponible
              </th>
              <th scope="col" className="text-center">
                Alumnos <br /> Matriculados
              </th>
              <th scope="col" className="text-center">
                Vacantes <br /> Disponibles
              </th>
              <th scope="col" className=" text-center">
                Cuota <br /> Ingreso
              </th>
              <th scope="col" className=" text-center">
                Matricula
              </th>
              <th scope="col" className="text-center">
                Pension
              </th>
              <th scope="col" className="text-center">
                Borrar
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
                <td className="">
                  <input
                    id={vac.GradoId}
                    name="capacidad"
                    onChange={handleChange}
                    className="border-b-2 text-center w-[100px] border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm"
                    defaultValue={defaultVacantes?.filter(
                      (el) => el.GradoId === vac.GradoId && el.año === año
                    ).map((el) => el.capacidad)}
                    placeholder="Ingrese nro"
                    type="number"
                  />{" "}
                </td>
                <td className="">
                  <input
                    id={vac.GradoId}
                    name="alumnos"
                    defaultValue={defaultVacantes?.filter(
                      (el) => el.GradoId === vac.GradoId && el.año === año
                    ).map((el) => el.alumnos_matriculados)}
                    onChange={handleChange}
                    className="border-b-2 text-center w-[100px] border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm"
                    placeholder="Ingrese nro"
                    type="number"
                  />{" "}
                </td>
                <td className="">
                  <input
                    id={vac.GradoId}
                    disabled
                    value={
                      datos[vac.GradoId]
                        ? datos[vac.GradoId]["capacidad"] -
                          datos[vac.GradoId]["alumnos"]
                        : defaultVacantes?.filter(
                            (el) => el.GradoId === vac.GradoId && el.año === año
                          ).map((el) => el.capacidad) -
                          defaultVacantes?.filter(
                            (el) => el.GradoId === vac.GradoId && el.año === año
                          ).map((el) => el.alumnos_matriculados)
                    }
                    defaultValue={
                      defaultVacantes?.filter(
                        (el) => el.GradoId === vac.GradoId && el.año === año
                      ).map((el) => el.capacidad) -
                      defaultVacantes?.filter(
                        (el) => el.GradoId === vac.GradoId && el.año === año
                      ).map((el) => el.alumnos_matriculados)
                    }
                    className="border-b-2 text-center w-[100px] border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm"
                    type="number"
                  />{" "}
                </td>
                <td className=" relative">
                  <span className="absolute top-[33%] left-[10%] font-bold">
                  S/
                  </span>
                  <input
                    id={vac.GradoId}
                    name="cuota_ingreso"
                    defaultValue={defaultVacantes?.filter(
                      (el) => el.GradoId === vac.GradoId && el.año === año
                    ).map((el) => el.cuota_ingreso)}
                    onChange={handleChange}
                    className="border-b-2 text-center w-[100px] border-l border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm"
                    placeholder="..."
                    type="number"
                  />{" "}
                </td>
                <td className=" relative">
                  <span className="absolute top-[33%] left-[10%] font-bold">
                    S/
                  </span>
                  <input
                    id={vac.GradoId}
                    defaultValue={defaultVacantes?.filter(
                      (el) => el.GradoId === vac.GradoId && el.año === año
                    ).map((el) => el.matricula)}
                    name="matricula"
                    onChange={handleChange}
                    className="border-b-2 text-center border-l w-[100px] border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm"
                    placeholder="..."
                    type="number"
                  />{" "}
                </td>
                <td className="relative pr-2">
                  <span className="absolute top-[33%] left-[10%] font-bold">
                  S/
                  </span>
                  <input
                    id={vac.GradoId}
                    defaultValue={defaultVacantes?.filter(
                      (el) => el.GradoId === vac.GradoId && el.año === año
                    ).map((el) => el.cuota_pension)}
                    name="cuota_pension"
                    onChange={handleChange}
                    className="border-b-2 text-center border-l w-[100px] border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm"
                    placeholder="..."
                    type="number"
                  />{" "}
                </td>
                <td className="relative px-5">
                  {defaultVacantes?.filter(
                    (el) => el.GradoId === vac.GradoId && el.año === año
                  ).length > 0 ? (
                    <MdDeleteForever
                    onClick={() => handleDelete(defaultVacantes.find(el=>el.GradoId===vac.GradoId && el.año === año ))}
                    className="text-[#0061dd] text-4xl cursor-pointer"
                  />
                    ) : null }

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleSubmit}
        className="flex mx-auto bg-[#0061dd] p-5 text-white rounded-md"
      >
        Enviar formulario del año: {año}
      </button>
    </>
  );
}
