import React from "react";
import style from "./head.module.css";
export default function HeadTable() {
  return (
    <div className={style.container}>
      <div className={style.divItemGrande}>
        <p>Datos del Colegio</p>
      </div>
      <div className={style.divItem}>
        <p>Fecha de Registro</p>
      </div>
      <div className={style.divItem}>
        <p>Plan</p>
      </div>
      <div className={style.divItem}>
        <p>Accion</p>
      </div>
    </div>
  );
}
