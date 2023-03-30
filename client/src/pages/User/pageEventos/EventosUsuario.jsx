import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import fechaFormat from "../../../components/SwiperEventos/utils/fechaFormat";
import es_AM_PM from "../../../components/SwiperEventos/utils/horaFormat";
import style from "./userEvent.module.css";
import { Typography } from "@mui/material";
export default function EventosUsuario() {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      axios
        .get(`/eventos`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setData(res.data))
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.error,
          });
        });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    }
  }, []);
  console.log(data);
  return (
    <>
    <div>
      <Typography
      variant="h6"
      sx={{color:'#0D263B', fontFamily:'Poppins', fontWeight:'700'}}
      >
       Próximo Evento
      </Typography>
    </div>
      {data &&
        data?.map((ele) => {
          return (
            <>
              <div className={style.layout}>
                <div style={{ position: "relative" }}>
                  <img
                    style={{ display: "flex", width: "30vh", height: "30vh" }}
                    src="https://res.cloudinary.com/dj8p0rdxn/image/upload/v1679362147/eesjwe0dwaabi37gzuj9.png"
                    alt="Logo"
                  />
                  <div className={style.card}>
                    <div className={style.imgDiv}>
                      <img
                        style={{ display: "flex", zIndex: "2" }}
                        src={ele.imagen_evento}
                        alt="Logo"
                      />
                    </div>
                    <h1 className={style.title}>{ele.nombre_evento}</h1>
                    <div style={{display:'flex', gap:'2vh'}}>
                        <div className={style.divDetalles}>
                      <p className={style.pTittle}>Tipo Evento</p>

                      <p className={style.p}>{ele.tipo_evento}</p>
                    </div>
                  
                    <div className={style.divDetalles}>
                      <p className={style.pTittle}>Capacidad</p>
                      <p className={style.p}>{ele.capacidad}</p>
                    </div>
                    </div>
                
                  </div>
                </div>
                <div className={style.infoDiv}>
                  <h1 className={style.titleK}>{ele.nombre_evento}</h1>
                  <div style={{ display: "flex", gap: "1vh" }}>
                    <p className={style.pK}>{fechaFormat(ele.fecha_evento)} -</p>
                    <p className={style.pK}>{es_AM_PM(ele.hora_evento)}</p>
                  </div>

                  <div>
                    <p className={style.pTittleK}>Descripcion</p>
                    <p className={style.descripcion}>{ele.descripcion}</p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-around",
                    }}
                  ></div>
                </div>
              </div>
            </>
          );
        })}
    </>
  );
}
