import axios from "axios";
import * as React from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function GridVacantes({ año, setVacantesOff }) {
  const { vacantesGrados } = useSelector((state) => state.schools);
  const { token, oneSchool, vacantes } = useSelector((state) => state.auth);

  const [datos, setDatos] = React.useState({ año });

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.id]: { ...datos[e.target.id], [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setVacantesOff(false);
    // try {
    //   axios
    //     .post(
    //       `/vacantes`,
    //       { data: datos },
    //       { headers: { Authorization: `Bearer ${token}` } }
    //     )
    //     .then((res) => {
    //       Swal.fire("Success", "Formulario enviado correctamente", "success");
    //     })
    //     .catch((err) => {
    //       Swal.fire({
    //         icon: "error",
    //         title: "Algo salio mal",
    //         text: err.response.data.error,
    //       });
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  console.log(datos);

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
                    defaultValue={vacantes?.filter(
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
                    defaultValue={vacantes?.filter(
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
                        : vacantes?.filter(
                            (el) => el.GradoId === vac.GradoId && el.año === año
                          ).map((el) => el.capacidad) -
                          vacantes?.filter(
                            (el) => el.GradoId === vac.GradoId && el.año === año
                          ).map((el) => el.alumnos_matriculados)
                    }
                    defaultValue={
                      vacantes?.filter(
                        (el) => el.GradoId === vac.GradoId && el.año === año
                      ).map((el) => el.capacidad) -
                      vacantes?.filter(
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
                    defaultValue={vacantes?.filter(
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
                    defaultValue={vacantes?.filter(
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
                    defaultValue={vacantes?.filter(
                      (el) => el.GradoId === vac.GradoId && el.año === año
                    ).map((el) => el.cuota_pension)}
                    name="cuota_pension"
                    onChange={handleChange}
                    className="border-b-2 text-center border-l w-[100px] border-r p-2 outline-none rounded-md shadow-white/40 shadow-sm"
                    placeholder="..."
                    type="number"
                  />{" "}
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
