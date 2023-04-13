import TimeLine from "./TimeLine";
import { Box, Button, Card, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import style from "./citaUser.module.css";
import Swal from "sweetalert2";
import axios from "axios";

import ContentLoader from "react-content-loader";
import fechaFormat from "../../../components/SwiperEventos/utils/fechaFormat";
import es_AM_PM from "../../../components/SwiperEventos/utils/horaFormat";
import sliceIntoChunks from "../../../components/CardsCitas/Paginacion/utils/SliceCitas";
import PaginationCitas from "../../../components/CardsCitas/Paginacion/PaginationCitas";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import { getCitaUsuario } from "../../../redux/CitasActions";
export default function CitasUser() {
  const { citasUsuario, loading, pagination } = useSelector(
    (state) => state.citas
  );
  // const [citasUser, setCitasUser] = useState(citasUsuario);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const items = [1, 2, 3, 4, 5];
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  useEffect(() => {
    dispatch(getCitaUsuario(page));


  }, [page]);


  return (
    <>
      <Typography
        variant="h6"
        sx={{
          color: "#0D263B",
          fontSize: "2.4vh",
          fontWeight: "700",
          padding: "1vh",
          paddingLeft: "5vh",
        }}
      >
        Listado de Citas
      </Typography>

      <>
        <div className={style.divLayout}>
          { citasUsuario &&  citasUsuario?.length > 0 && loading === false ? (
             citasUsuario &&
             citasUsuario?.map((ele) => {
              let str = ele.Colegio?.direccion;

            
              let str2 = str?.slice(0, 60);
         
              return (
                <div className={style.layout}>
                  {/* foto mas info */}
                  <div className={style.contenedor}>
                    <div className={style.imgInfoDiv}>
                      <img
                        style={{
                          width: "15vh",
                          height: "15vh",
                          padding: "1vh",
                        }}
                        className="object-cover w-40 h-40"
                        src={
                          ele.Colegio?.primera_imagen != null
                            ? ele.Colegio?.primera_imagen
                            : ele.Colegio?.logo
                        }
                        // src={ele.Colegio?.primera_imagen}
                      />

                      <div>
                        <Typography
                          sx={{
                            paddingLeft: "1vh",
                            color: "#0D263B",
                            fontWeight: "600",
                            fontSize: "2.2vh",
                          }}
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          {ele.Colegio?.nombre_colegio}
                        </Typography>
                        <Typography
                          sx={{
                            paddingLeft: "1vh",
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
                            paddingLeft: "1vh",
                            color: "#0D263B",
                            fontWeight: "600",
                            fontSize: "1.5vh",
                          }}
                        >
                          <div className={style.divTypo}>
                            <b style={{ color: "#0061DF" }}>Teléfono</b>
                            <p>{ele.Colegio?.telefono}</p>
                          </div>
                        </Typography>
                      </div>
                    </div>

                    <div className={style.fechaHorarioDiv}>
                      <div className={style.planFechaResponsive}>
                        <Typography
                          sx={{
                            paddingLeft: "1vh",
                            color: "#0D263B",
                            fontWeight: "600",
                            fontSize: "1.5vh",
                          }}
                        >
                          <div className={style.divTypo}>
                            <b style={{ color: "#0061DF" }}>Horarios / Fecha</b>
                            <div style={{ display: "flex", gap: "1vh" }}>
                              <p>{fechaFormat(ele.fecha_cita)}</p>
                              <p>
                                {ele.hora_cita} {es_AM_PM(ele.hora_cita)}
                              </p>
                            </div>
                          </div>
                        </Typography>
                      </div>

                      <div className={style.divThanos}>
                        <p
                          style={{
                            color: "#0D263B",

                            fontSize: "1.5vh",
                          }}
                        >
                          <b style={{ color: "#0061DF" }}>Horarios / Fecha</b>{" "}
                          <p>{fechaFormat(ele.fecha_cita)}</p>
                          <p>
                            {" "}
                            {ele.hora_cita} {es_AM_PM(ele.hora_cita)}
                          </p>
                        </p>
                      </div>

                      <div className={style.planFechaResponsive}>
                        <Typography
                          sx={{
                            paddingLeft: "1vh",
                            color: "#0D263B",
                            fontWeight: "600",
                            fontSize: "1.5vh",
                          }}
                        >
                          <div className={style.divTypo}>
                            <b style={{ color: "#0061DF" }}>Estado</b>
                            <p>{ele.estado}</p>
                          </div>
                        </Typography>
                      </div>

                      <div className={style.divThanos}>
                        <p
                          style={{
                            color: "#0D263B",

                            fontSize: "1.5vh",
                          }}
                        >
                          <b style={{ color: "#0061DF" }}>Estado</b>{" "}
                          <p>{ele.estado}</p>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div style={{ width: "100%", paddingTop: "1vh" }}>
                    <TimeLine cita={ele} />
                  </div>
                </div>
              );
            })
          ) :  citasUsuario &&  citasUsuario?.length === 0 && loading === true ? (
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
          ) :  citasUsuario &&  citasUsuario?.length === 0 && loading === false ? (
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
                backgroundColor: "#fff",
              }}
            >
              <ContentPasteSearchOutlinedIcon style={{ color: "#0061DF" }} />
              <h1>No has sacado cita con ningun colegio</h1>
            </div>
          ) : null}
        </div>
      </>
      <Box
        justifyContent={"start"}
        alignItems={"center"}
        display={"flex"}
        sx={{ margin: "20px 0px" }}
      >
        <Pagination
          count={pagination.pages}
          onChange={handlePageChange}
          page={page}
          color="primary"
        />
      </Box>
    </>
  );
}
