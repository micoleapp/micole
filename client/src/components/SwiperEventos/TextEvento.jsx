import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./textEvent.module.css";
export default function TextEvento({
  nombreEvento,
  description,
  fechaEvento,
  horaEvento,
  idColegio,
  capacidadEvento,
}) {
  const { oneSchool } = useSelector((state) => state.schools);
  console.log(oneSchool.id);

  useEffect(() => {
    axios
      .put(`/citas/${idCita}`, { estado: NuevoEstado })
      .then((res) => console.log(res.data))
      .catch((err) => {
        dispatch(getError(err.response.data.error));
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  }, []);

  return (
    <div className={style.card}>
      <div style={{ maxWidth: "10vh", maxHeight: "12vh" }}>
        <img style={{ display: "flex" }} src={idColegio} alt="Logo" />
      </div>

      {nombreEvento && <h1 className={style.title}>{nombreEvento}</h1>}
      {description && <p className={style.descripcion}>{description}</p>}
      <div style={{ display: "flex" }}>
        <div className={style.divDetalles}>
          <p className={style.pTittle}>Dia</p>
          {fechaEvento && <p className={style.p}>{fechaEvento}</p>}
        </div>
        <div className={style.divDetalles}>
          <p className={style.pTittle}>Horario</p>
          {fechaEvento && <p className={style.p}>{horaEvento}</p>}
        </div>
        <div className={style.divDetalles}>
          <p className={style.pTittle}>Capacidad</p>
          {fechaEvento && <p className={style.p}>{capacidadEvento}</p>}
        </div>
      </div>

      <div>
        <Button variant="contained">Inscribirme</Button>
      </div>
    </div>
  );
}
