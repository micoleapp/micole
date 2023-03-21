import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InscripcionModal from "./ModalInscripcion/InscripcionModal";
import style from "./textEvent.module.css";
import fechaFormat from "./utils/fechaFormat";
export default function TextEvento({
  nombreEvento,
  description,
  fechaEvento,
  horaEvento,
  idEvento,
  capacidadEvento,
  logo,
}) {
  const [open, setOpen] = useState(false);
  const fecha = fechaFormat(fechaEvento);
  console.log(fecha);
  const handleOpen = () => setOpen(true);
  return (
    <div className={style.card}>
      <div style={{ maxWidth: "10vh", maxHeight: "12vh" }}>
        <img style={{ display: "flex" }} src={logo} alt="Logo" />
      </div>

      {nombreEvento && <h1 className={style.title}>{nombreEvento}</h1>}
      {description && <p className={style.descripcion}>{description}</p>}
      <div style={{ display: "flex", width:'100%', justifyContent:'space-around' }}>
       
        <div className={style.divDetalles}>
          <p className={style.pTittle}>Horario</p>
          {fechaEvento && <p className={style.p}>{horaEvento}</p>}
        </div>
        <div className={style.divDetalles}>
          <p className={style.pTittle}>Fecha</p>
          {fechaEvento && <p className={style.p}>{fecha}</p>}
        </div>
        <div className={style.divDetalles}>
          <p className={style.pTittle}>Capacidad</p>
          {fechaEvento && <p className={style.p}>{capacidadEvento}</p>}
        </div>
      </div>

      <div>
        <Button onClick={handleOpen} variant="contained">
          Inscribirme
        </Button>
      </div>
      {open && (
        <InscripcionModal
          open={open}
          idEvento={idEvento}
          fechaEvento={fecha}
          horaEvento={horaEvento}
          nombreEvento={nombreEvento}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}
