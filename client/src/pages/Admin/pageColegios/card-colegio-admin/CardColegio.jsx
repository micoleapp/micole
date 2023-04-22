import { Button, Card, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import HeadTable from "./headTable/HeadTable";
import style from "./cardColegio.module.css";
import Swal from "sweetalert2";
import axios from "axios";
import { getAllSchoolsPageAdmin } from "../../../../redux/SchoolsActions";

import ContentLoader from "react-content-loader";
import fechaFormat from "../../../../components/SwiperEventos/utils/fechaFormat";
export default function CardColegio({ input, data, isLoading, page }) {
  const dispatch = useDispatch();
  const items = [1, 2, 3, 4, 5];
  const pages= useRef(page);
  
  const putActiveColegio = (id, setLoading) => {
    console.log(id);
    setLoading(true);
    try {
      axios
        .put(`/colegios/activo/${id}`, { isActive: true })
        .then((res) => {
          // dispatch(getAllSchoolsPageAdmin(pages));
          setLoading(false);
          Swal.fire("Exito", "Datos actualizados", "success");
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Algo salio mal",
            text: err,
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Algo salio mal",
        text: error,
      });
    }
  };
  const putDesactiveColegio = (id, setLoading) => {
    console.log(id);
    setLoading(true);
    try {
      axios
        .put(`/colegios/activo/${id}`, { isActive: false })
        .then((res) => {
          // dispatch(getAllSchoolsPageAdmin(pages));
          setLoading(false);
          Swal.fire("Exito", "Datos actualizados", "success");
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Algo salio mal",
            text: err,
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Algo salio mal",
        text: error,
      });
    }
  };

  function ActDesButton({ isActive, id }) {
    const [Toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false);
    const toggleBtn = () => {
      setToggle(!Toggle);
      if (isActive === true) {
        putDesactiveColegio(id, setLoading);
      } else {
        putActiveColegio(id, setLoading);
      }
    };

    return (
      <>
        {isActive === true && (
          <div className={style.itemDiv}>
            <Button
              onClick={toggleBtn}
              variant="outlined"
              sx={{ fontFamily: "Poppins", fontSize: "1.4vh" }}
            >
              {Toggle === false ? "Desactivar" : "Activar"}
              {loading === true && <div className={style.loader}></div>}
            </Button>
          </div>
        )}
        {isActive === false && (
          <div className={style.itemDiv}>
            <Button
              variant="outlined"
              sx={{ fontFamily: "Poppins", fontSize: "1.4vh" }}
              onClick={toggleBtn}
            >
              {Toggle === false ? "Activar" : "Desactivar"}
              {loading === true && <div className={style.loader}></div>}
            </Button>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <HeadTable />
      <div>
        {data?.length > 0 && isLoading === false
          ? data?.map((ele) => {
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
                            paddingLeft: "1vh",
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

                        {/*  fecha */}
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
                              <b style={{ color: "#0061DF" }}>Fecha</b>
                              <p>{fechaFormat(ele.createdAt)}</p>
                            </div>
                          </Typography>
                        </div>
                        {/*  plan */}
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
                              <b style={{ color: "#0061DF" }}>Plan</b>
                              <p>{ele.Plan_Pago?.nombre_plan_pago}</p>
                            </div>
                          </Typography>
                        </div>
                      </div>
                    </div>
                    {/*  fecha */}
                    <div className={style.divThanos}>
                      <p
                        style={{
                          color: "#0D263B",

                          fontSize: "1.6vh",
                        }}
                      >
                        {fechaFormat(ele.createdAt)}
                      </p>
                    </div>

                    {/*  plan */}
                    <div className={style.divThanos}>
                      <p
                        style={{
                          color: "#0D263B",

                          fontSize: "1.5vh",
                        }}
                      >
                        {" "}
                        {ele.Plan_Pago.nombre_plan_pago}
                      </p>
                    </div>

                    {/* boton */}

                    <ActDesButton
                      // onClick={() => {
                      //   putActiveColegio(ele.id);
                      // }}
                      isActive={ele.isActive}
                      id={ele.id}
                    />
                  </div>
                </>
              );
            })
          : data?.length > 0 && isLoading === true
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
  );
}
// ubicacion  telefono fecha de registro plan  y logo nombre de colegio
