import React from "react";
import { BsCalendar4Week } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import style from "./Cards.module.css";
export default function Cards({ icon, text, nro }) {
  return (
    <div  className={style.container}>
      <div className={style.divInfo}>
        <div
         className={style.divRedondo}
        >
          {icon === "solicitud" && (
            <BsCalendar4Week
              style={{ color: "#0061DF", height: "30px", width: "30px" }}
            />
          )}
          {icon === "mensaje" && (
            <FiMail
              style={{ color: "#0061DF", height: "30px", width: "30px" }}
            />
          )}
          {icon === "comentario" && (
            <AiOutlineMessage
              style={{ color: "#0061DF", height: "30px", width: "30px" }}
            />
          )}
          {icon === "visualizacion" && (
            <BsEye
              style={{ color: "#0061DF", height: "30px", width: "30px" }}
            />
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <p
            style={{
              fontSize: "24px",
              fontWeight: "700",
              margin: "0",
              color: "#0061dd",
            }}
          >
            {nro}
          </p>
          <p className={style.p}>{text}</p>
        </div>
      </div>
    </div>
  );
}
