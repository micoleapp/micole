import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function FormListaEspera({ gradoId, año }) {

  const { user, isAuth } = useSelector((state) => state.auth);
  const { oneSchool } = useSelector(
    (state) => state.schools
  );
  const handleSubmitLista = (e) => {
    e.preventDefault();
    if (!isAuth) {
      Swal.fire({
        icon: "info",
        title: "Inicia Sesion",
        text: "Debes iniciar sesion o registrarte para comentar",

        confirmButtonText: "Iniciar Sesion",

      }).then(res => {
        if (res.isConfirmed) {
          setOpenLogin(true);
        }
      });
      return;
    } else {
      try {
        let data = {
          año: año,
          gradoId:  gradoId,
          usuarioId: user?.id,
          colegioId: oneSchool?.id,
        };
        axios
          .post("/lista", data)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Lista creada exitosamente!",
              text: "Lista Agendada",
            });
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Algo salio mal",
              text: err.response.data.message,
            });
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className=" bg-white flex flex-col gap-5 rounded-md  w-full">
      <h2 className="font-semibold  text-[#0D263B] text-[2.4vh]">Lista de espera</h2>
      <form
        onSubmit={handleSubmitLista}
        className="w-full flex flex-col gap-7"
      >
        <div className="flex w-full gap-5 justify-between">
          {isAuth ? (
            <input
              name="nombreLista"
              type="text"
              value={user?.nombre_responsable}
              className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
              placeholder="Nombre"
              required
            />
          ) : (
            <input
              name="nombreLista"
              type="text"
              className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
              placeholder="Nombre"
              required
            />
          )}
          {isAuth ? (
            <input
              name="apellidoLista"
              type="text"
              value={user?.apellidos_responsable}
              required
              className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
            />
          ) : (
            <input
              name="apellidoLista"
              type="text"
              required
              className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
              placeholder="Apellidos"
            />
          )}
        </div>
        <div className="flex w-full gap-5 justify-between">
          {isAuth ? (
            <input
              name="emailLista"
              type="email"
              value={user?.email}
              className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
              placeholder="Correo"
              required
            />
          ) : (
            <input
              name="emailLista"
              type="email"
              className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
              placeholder="Correo"
              required
            />
          )}
          {isAuth ? (
            <input
              name="celLista"
              type="number"
              pattern="[0-9]{8,15}"
              value={user?.telefono}
              required
              title="Solo se permiten numeros y entre 8 y 10 caracteres"
              className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
              placeholder="Celular"
            />
          ) : (
            <input
              name="celLista"
              type="number"
              pattern="[0-9]{8,15}"
              required
              title="Solo se permiten numeros y entre 8 y 10 caracteres"
              className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
              placeholder="Celular"
            />
          )}
        </div>

        <button
          type="submit"
          className="border mt-5 mx-auto px-10 py-2 rounded-md shadow-lg bg-[#0061dd] text-white duration-300 cursor-pointer"
        >
          INSCRIBIRME
        </button>
      </form>
      <p className="text-sm p-10">
        Al enviar estás aceptando los{" "}
        <Link className="text-[#0061dd] hover:underline">
          Términos y Condiciones de Uso y la Política de Privacidad
        </Link>
      </p>
    </div>
  )
}
