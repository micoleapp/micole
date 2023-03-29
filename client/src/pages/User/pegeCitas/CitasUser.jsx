import TimeLine from "./TimeLine";
import { Button, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import style from "./citaUser.module.css";
import Swal from "sweetalert2";
import axios from "axios";

import ContentLoader from "react-content-loader";
import fechaFormat from "../../../components/SwiperEventos/utils/fechaFormat";

export default function CitasUser() {
  const { allschools, loading } = useSelector((state) => state.schools);
  const items = [1, 2, 3, 4, 5];

  return (
    <>
      <Typography variant="h6" sx={{color:'#0D263B',fontSize: "2.4vh", fontWeight:'700', padding:'1vh'}}>Listado de Citas</Typography>

      <>
        <div style={{ display: "flex", gap: "4vh", flexDirection: "column" }}>
          {allschools?.length > 0 && loading === false
            ? allschools?.map((ele) => {
                let str = ele.direccion;

                console.log(str);
                let str2 = str?.slice(0, 60);
                console.log(str2);
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
                          src={ele.primera_imagen}
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
                            {ele.nombre_colegio}
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
                              <p>{ele.telefono}</p>
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
                              <b style={{ color: "#0061DF" }}>
                                Horarios / Fecha
                              </b>
                              <p>22 de agosto del 2023 8:00 AM</p>
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
                            <p>22 de agosto del 2023 8:00 AM</p>
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
                              <p>Aplicacion</p>
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
                            <p>Aplicacion</p>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div style={{ width: "100%", paddingTop: "1vh" }}>
                      <TimeLine />
                    </div>
                  </div>
                );
              })
            : allschools?.length > 0 && loading === true
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
        </div>
      </>
    </>
  );
}
