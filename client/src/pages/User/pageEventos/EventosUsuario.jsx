import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import NorthIcon from "@mui/icons-material/North";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import SouthIcon from "@mui/icons-material/South";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import fechaFormat from "../../../components/SwiperEventos/utils/fechaFormat";
import es_AM_PM from "../../../components/SwiperEventos/utils/horaFormat";
import style from "./userEvent.module.css";
import { Divider, Typography } from "@mui/material";
import ContentLoader from "react-content-loader";
import sliceIntoChunks from "../../../components/CardsCitas/Paginacion/utils/SliceCitas";
import PaginationCitas from "../../../components/CardsCitas/Paginacion/PaginationCitas";
export default function EventosUsuario() {
  const [data, setData] = useState([]);
  const [ProximoEvento, setProximoEvento] = useState([]);
  const items = [1, 2, 3, 4, 5];
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = React.useState(0);
  const [orderSelected, setOrderSelected] = useState(null);
  const [dataFiltrada, setDataFiltrada] = useState([]);
  useEffect(() => {
    // evento proximo
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      axios
        .get(`/eventos?order=ASC`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.length > 0) {
            setProximoEvento([res.data[0]]);
            const eventosPaginados = sliceIntoChunks(res.data, 10);
            setData(eventosPaginados);
            setIsLoading(false);
          }
          setIsLoading(false);
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
  console.log(ProximoEvento);

  const handleChangeState = (event) => {
    let state = event.target.value;
    setOrderSelected(state);

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      axios
        .get(`/eventos?order=${state}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const eventosPaginados = sliceIntoChunks(res.data, 10);
          setDataFiltrada(eventosPaginados);
          setIsLoading(false);
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
  };
  return (
    <>
      {/* Proximo EVENTO */}
      {ProximoEvento && ProximoEvento?.length > 0 ? (
        <>
          <div style={{ padding: "1vh", paddingLeft: "2vh", maxWidth: "80%" }}>
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
          {ProximoEvento?.length > 0 &&
            ProximoEvento?.map((ele) => {
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
                        src={
                          ele.imagen_evento
                            ? ele.imagen_evento
                            : "https://res.cloudinary.com/dj8p0rdxn/image/upload/v1680731885/to472cbnrflzyqjrelgi.png"
                        }
                        alt="Logo"
                      />
                      {!ele.imagen_evento && (
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
                      )}
                    </div>
                    <div className={style.infoDiv}>
                      <h1 className={style.titleK}>{ele.nombre_evento}</h1>
                      <div style={{ display: "flex", gap: "1vh" }}>
                        <p className={style.pK}>
                          {fechaFormat(ele.fecha_evento)} -
                        </p>
                        <p className={style.pK}>{ele.hora_evento +" "+ es_AM_PM(ele.hora_evento)}</p>
                      </div>

                      <div className={style.divDescripcion}>
                        <p className={style.pTittleK}>Descripción</p>
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
      ) : ProximoEvento?.length === 0 && isLoading === true ? (
        items.map((item, key) => (
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
      ) : ProximoEvento?.length === 0 && isLoading === false ? (
        <>
          <div style={{ padding: "1vh", paddingLeft: "2vh", maxWidth: "80%" }}>
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

          <div
            // data-aos="zoom-up"
            style={{
              width: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              color: "#0C2B42",
              gap: "10px",
              padding: "20px",
              minHeight: "100%",
              boxShadow: "0px 4px 10px rgba(31, 95, 175, 0.15)",
              fontWeight: "600",
              backgroundColor: "transparent",
            }}
          >
            <ContentPasteSearchOutlinedIcon style={{ color: "#0061DF" }} />
            <h1>No hay eventos pendientes</h1>
          </div>
        </>
      ) : null}

      {/* Siguientes EVENTOS */}
      <div className={style.layoutTitlteSigEventos}>
        <div className={style.titleSig}>
          <Typography
            variant="h6"
            sx={{
              color: "#0D263B",
              fontFamily: "Poppins",
              fontWeight: "700",
            }}
          >
            Siguientes Eventos
          </Typography>
          <Divider
            sx={{
              color: "blue",
              border: "1px solid #0061DF",
              width: "22vh",
            }}
          />
        </div>
        {/* FILTRO POR FECHA */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "1vh" }}>
          <p className={style.pSig}>Ordenar por </p>
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 100 }}
            size="small"
          >
            <InputLabel id="demo-select-small">Fecha</InputLabel>

            <Select
              sx={{ border: "none", outline: "none", fontSize: "2vh" }}
              labelId="demo-select-small"
              id="demo-select-small"
              // value={orderSelected}
              label={"Fecha"}
              onChange={handleChangeState}
            >
              <MenuItem value="ASC">
                {" "}
                Fecha <NorthIcon sx={{ width: "2vh" }} />{" "}
              </MenuItem>
              <MenuItem value="DESC">
                {" "}
                Fecha <SouthIcon sx={{ width: "2vh" }} />{" "}
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* CARD  FECHA */}
      </div>
      <div className={style.containerSigEvento}>
        {orderSelected != null && dataFiltrada ? (
          dataFiltrada?.length > 0 ? (
            <>
              {dataFiltrada &&
                dataFiltrada[page]?.map((ele) => {
                  return (
                    <>
                      <div className={style.layout}>
                        <div style={{ position: "relative" }}>
                          <img
                            style={{
                              display: "flex",
                              width: "20vh",
                              height: "20vh",
                            }}
                            src={
                              ele.imagen_evento
                                ? ele.imagen_evento
                                : "https://res.cloudinary.com/dj8p0rdxn/image/upload/v1680731885/to472cbnrflzyqjrelgi.png"
                            }
                            alt="Logo"
                          />
                          {!ele.imagen_evento && (
                            <div className={style.card2}>
                              <div className={style.imgDiv}>
                                <img
                                  style={{
                                    display: "flex",
                                    zIndex: "2",
                                    width: "5vh",
                                    height: "5vh",
                                  }}
                                  src={ele.imagen_evento}
                                  alt="Logo"
                                />
                              </div>
                              <h1 className={style.title}>
                                {ele.nombre_evento}
                              </h1>
                              <div
                                style={{ display: "flex", gap: "2vh" }}
                              ></div>
                            </div>
                          )}
                        </div>
                        <div className={style.infoDiv}>
                          <h1 className={style.titleK}>{ele.nombre_evento}</h1>
                          <div style={{ display: "flex", gap: "1vh" }}>
                            <p className={style.pK}>
                              {fechaFormat(ele.fecha_evento)} -
                            </p>
                            <p className={style.pK}>
                            {ele.hora_evento +" "+ es_AM_PM(ele.hora_evento)}
                            </p>
                          </div>

                          <div className={style.divDescripcion}>
                            <p className={style.pTittleK}>Descripción</p>
                            <p className={style.descripcion}>
                              {ele.descripcion}
                            </p>
                            <p className={style.descripcion}>
                              {ele.descripcion}
                            </p>
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
          ) : dataFiltrada?.length > 0 && isLoading === true ? (
            items.map((item, key) => (
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
          ) : (
            items.map((item, key) => (
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
          )
        ) : data?.length > 0 ? (
          <>
            {data &&
              data[page]?.map((ele) => {
                return (
                  <>
                    <div className={style.layout}>
                      <div style={{ position: "relative" }}>
                        <img
                          style={{
                            display: "flex",
                            width: "20vh",
                            height: "20vh",
                          }}
                          src={
                            ele.imagen_evento
                              ? ele.imagen_evento
                              : "https://res.cloudinary.com/dj8p0rdxn/image/upload/v1680731885/to472cbnrflzyqjrelgi.png"
                          }
                          alt="Logo"
                        />
                        {!ele.imagen_evento && (
                          <div className={style.card2}>
                            <div className={style.imgDiv}>
                              <img
                                style={{
                                  display: "flex",
                                  zIndex: "2",
                                  width: "5vh",
                                  height: "5vh",
                                }}
                                src={ele.imagen_evento}
                                alt="Logo"
                              />
                            </div>
                            <h1 className={style.title}>{ele.nombre_evento}</h1>
                            <div style={{ display: "flex", gap: "2vh" }}></div>
                          </div>
                        )}
                      </div>
                      <div className={style.infoDiv}>
                        <h1 className={style.titleK}>{ele.nombre_evento}</h1>
                        <div style={{ display: "flex", gap: "1vh" }}>
                          <p className={style.pK}>
                            {fechaFormat(ele.fecha_evento)} -
                          </p>
                          <p className={style.pK}>
                          {ele.hora_evento +" "+ es_AM_PM(ele.hora_evento)}
                          </p>
                        </div>

                        <div className={style.divDescripcion}>
                          <p className={style.pTittleK}>Descripción</p>
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
        ) : data?.length === 0 && isLoading === true ? (
          items.map((item, key) => (
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
        ) : data?.length === 0 && isLoading === false ? (
          <div
            // data-aos="zoom-up"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              color: "#0C2B42",
              gap: "10px",
              padding: "20px",
              minHeight: "100%",
              boxShadow: "0px 4px 10px rgba(31, 95, 175, 0.15)",
              fontWeight: "600",
              backgroundColor: "transparent",
            }}
          >
            <ContentPasteSearchOutlinedIcon style={{ color: "#0061DF" }} />
            <h1>No hay eventos pendientes</h1>
          </div>
        ) : null}
      </div>
      {dataFiltrada?.length ? (
        <PaginationCitas
          page={page}
          setPage={setPage}
          nroPaginas={dataFiltrada?.length}
        />
      ) : (
        <PaginationCitas
          page={page}
          setPage={setPage}
          nroPaginas={data?.length}
        />
      )}
    </>
  );
}
