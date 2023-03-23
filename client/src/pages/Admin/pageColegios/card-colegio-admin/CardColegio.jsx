import { Button, Card, Typography } from "@mui/material";
import React, { useState } from "react";

import HeadTable from "./headTable/HeadTable";
import style from "./cardColegio.module.css";
import Swal from "sweetalert2";
import axios from "axios";
export default function CardColegio({ input, data }) {
  console.log(input, data);

  const [success, setSuccess] = useState(false);
  const putActiveColegio = (id) => {
    console.log(id);
    try {
      axios
        .put(`/colegios/activo/${id}`, { isActive: true })
        .then((res) => {
          setSuccess(true);
          Swal.fire("Exito", "Datos actualizados", "success");
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Algo salio mal",
            text: err.response.data.error,
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Algo salio mal",
        text: error.response,
      });
    }
  };
  const putDesactiveColegio = (id) => {
    console.log(id);
    try {
      axios
        .put(`/colegios/activo/${id}`, { isActive: false })
        .then((res) => {
          setSuccess(true);
          Swal.fire("Exito", "Datos actualizados", "success");
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Algo salio mal",
            text: err.response.data.error,
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Algo salio mal",
        text: error.response,
      });
    }
  };
  return (
    <>
      <HeadTable />
      <div>
        {data?.map((ele) => {
          let str = ele.direccion;

          console.log(str);
          let str2 = str?.slice(0, 60);
          console.log(str2);
          return (
            <>
              <div className={style.layout}>
                {/* foto mas info */}
                <div className={style.imgInfoDiv}>
                  <img
                    className="object-cover w-40 h-40"
                    src={ele.primera_imagen}
                  />

                  <div>
                    <Typography
                      sx={{
                        padding: "1vh",
                        color: "#0D263B",
                        fontWeight: "600",
                        fontSize: "2.4vh",
                      }}
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      {ele.nombre_colegio}
                    </Typography>
                    <Typography
                      sx={{
                        padding: "1vh",
                        color: "#0D263B",
                        fontWeight: "600",
                        fontSize: "1.5vh",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "1vh",
                        }}
                      >
                        <div className={style.divTypo}>
                          <b style={{ color: "#0061DF" }}>Dirección</b>
                          <p>{str2}</p>
                        </div>
                      </div>
                    </Typography>
                    <Typography
                      sx={{
                        padding: "1vh",
                        color: "#0D263B",
                        fontWeight: "600",
                        fontSize: "1.5vh",
                      }}
                    >
                      <div className={style.divTypo}>
                        <b style={{ color: "#0061DF" }}>Teléfono</b>
                        <p>{ele.telefono}</p>
                      </div>
                    </Typography>
                  </div>
                </div>

                {/*  fecha */}
                <div className={style.itemDiv}>
                  <p>12 de abril del 2023</p>
                </div>
                {/*  plan */}
                <div className={style.itemDiv}>
                  {/* //   Plan_Pago: { id: 1, nombre_plan_pago: 'Free' }, */}
                  <p> {ele.Plan_Pago.nombre_plan_pago}</p>
                </div>
                {/* boton */}
                {ele.isActive && (
                  <div className={style.itemDiv}>
                    <Button
                      onClick={() => {
                        setSuccess(true);
                        putDesactiveColegio(ele.id);
                      }}
                      variant="outlined"
                      sx={{ fontWeight: "600", fontFamily: "Poppins" }}
                    >
                      Desactivar
                    </Button>
                  </div>
                )}
                {ele.isActive === false && (
                  <div className={style.itemDiv}>
                    <Button
                      onClick={() => {
                        setSuccess(true);
                        putActiveColegio(ele.id);
                      }}
                      variant="outlined"
                      sx={{ fontWeight: "600", fontFamily: "Poppins" }}
                    >
                     Ativar
                    </Button>
                  </div>
                )}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
// ubicacion  telefono fecha de registro plan  y logo nombre de colegio
