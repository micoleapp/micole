import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import fechaFormat from "../../../components/SwiperEventos/utils/fechaFormat";
import es_AM_PM from "../../../components/SwiperEventos/utils/horaFormat";
import style from "./userEvent.module.css";
import { Divider, Typography } from "@mui/material";
import ContentLoader from "react-content-loader";
export default function EventosUsuario() {
  const [data, setData] = useState([]);
  const items = [1, 2, 3, 4, 5];
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      axios
        .get(`/eventos`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          setData(res.data);
          setIsLoading(false)
        })
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
      {data && data?.length > 0 ? (
        <>
          <div style={{ padding: "1vh" }}>
            <Typography
              variant="h6"
              sx={{
                color: "#0D263B",
                fontFamily: "Poppins",
                fontWeight: "700",
              }}
            >
              Próximo Evento
            </Typography>
            <Divider
              sx={{
                color: "blue",
                border: "1px solid #0061DF",
                width: "20vh",
              }}
            />
          </div>
          {data &&
            data?.map((ele) => {
              return (
                <>
                  <div className={style.layout}>
                    <div style={{ position: "relative" }}>
                      <img
                        style={{
                          display: "flex",
                          width: "30vh",
                          height: "30vh",
                        }}
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
                        <div style={{ display: "flex", gap: "2vh" }}>
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
                        <p className={style.pK}>
                          {fechaFormat(ele.fecha_evento)} -
                        </p>
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
      )  : data?.length > 0 && isLoading === true
      ? items.map((item, key) => (
          <ContentLoader
            key={key}
            speed={3}
            width={"50%"}
            height={"80%"}
            viewBox="0 0 500 120"
            backgroundColor="#dcdce2"
            foregroundColor="#ecebeb"
          >
            <rect x="110" y="8" rx="3" ry="3" width="120" height="10" />
            <rect x="110" y="25" rx="3" ry="3" width="100" height="6" />
            <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
            <rect x="110" y="56" rx="3" ry="3" width="310" height="6" />
            <rect x="110" y="72" rx="3" ry="3" width="300" height="6" />
            <rect x="110" y="88" rx="3" ry="3" width="178" height="6" />
            <rect width="100" height="100" />
          </ContentLoader>
        ))
      
      : items.map((item, key) => (
        <ContentLoader
          key={key}
          speed={3}
          width={"50%"}
          height={"80%"}
          viewBox="0 0 500 120"
          backgroundColor="#dcdce2"
          foregroundColor="#ecebeb"
        >
          <rect x="110" y="8" rx="3" ry="3" width="120" height="10" />
          <rect x="110" y="25" rx="3" ry="3" width="100" height="6" />
          <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
          <rect x="110" y="56" rx="3" ry="3" width="310" height="6" />
          <rect x="110" y="72" rx="3" ry="3" width="300" height="6" />
          <rect x="110" y="88" rx="3" ry="3" width="178" height="6" />
          <rect width="100" height="100" />
        </ContentLoader>
      ))}
    </>
  );
}
