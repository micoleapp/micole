import { Button } from "@mui/material";
import React from "react";
import style from "./textEvent.module.css"
export default function TextEvento({
  nombreEvento,
  description,
  fechaEvento,
  horaEvento,
  idColegio,
}) {
  return (
    <div  className={style.card}>
      {nombreEvento && <h1 className={style.title}>{nombreEvento}</h1>}
      {description && <p className={style.descripcion}>{description}</p>}
      {fechaEvento && <p>{fechaEvento}</p>}
      {horaEvento && <p>{horaEvento}</p>}
      <Button variant="contained" color='primary'>Incribirme </Button>
    </div>
  );
}
