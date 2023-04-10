import { Typography } from "@mui/material";
import React from "react";
import style from "./List.module.css";

export default function ListadeEspera() {
  return (
    <>
      <div>
        <Typography variant="h6" sx={{ color: "#0D263B" }}>
          Lista de Espera
        </Typography>
      </div>
      <div className={style.container}>
        <div
          style={{
            display: "flex",
            gap: "5px",
            flexDirection: "column",
            width: "100%",
            fontSize: "1.8vh",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexDirection: "row",
              alignItems: "center",
              fontSize: "1.8vh",
            }}
          >
            <img
              style={{ width: "50px", height: "50px" }}
              src="https://res.cloudinary.com/dj8p0rdxn/image/upload/v1676414550/xuj9waxpejcnongvhk9o.png"
              alt=""
            />
            <div>
              <div className={style.divNombreGrado}>
                <p>Nombre</p>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "5px",
            width: "100%",
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          <div className={style.itemDiv}>
            <p>
              <b>Telefono</b>{" "}
            </p>
            <p>31234535</p>
          </div>
          <div className={style.itemDiv}>
            <p>
              {" "}
              <b>Grado </b>
            </p>
            <p>1ro-Primaria</p>
          </div>
          <div className={style.itemDiv}>
            <p>
              <b>Email</b>{" "}
            </p>
            <p>sad@gmaiil.com</p>
          </div>
          <div className={style.itemDiv}>
            <p>
              <b>Fecha</b>
            </p>
            <p>22 de abril del 2023</p>
          </div>
        </div>
      </div>
    </>
  );
}
