import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import style from "./textEvent.module.css";
export default function TextEvento({
  nombreEvento,
  description,
  fechaEvento,
  horaEvento,
  idColegio,
  capacidadEvento,
}) 
{


    const { oneSchool } = useSelector((state) => state.auth);
console.log(oneSchool.logo)
    return (
    <div className={style.card}>
        <div style={{maxWidth:'10vh', maxHeight:'12vh'}}>
             <img  style={{display:'flex'}}  src={oneSchool.logo} alt='Logo'/>
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
          {fechaEvento && <p className={style.p}>{ horaEvento}</p>}
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
