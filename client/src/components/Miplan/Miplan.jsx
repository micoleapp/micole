import { Button, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./Miplan.module.css";
import { useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import ModalInscripcion from "../ModalInscripcion/ModalInscripcion";
import { display } from "@mui/system";
import es_AM_PM from "../SwiperEventos/utils/horaFormat";
import fechaFormat from "../SwiperEventos/utils/fechaFormat";
export default function Miplan() {
  const [planPago, setPlanPago] = useState([]);
  const [OpenRegister, setOpenRegister] = useState(false);
  const { user, oneSchool } = useSelector((state) => state.auth);
  const [OpenPaymentPLan, setOpenPaymentPLan] = useState({
    state: false,
    plan: "",
    price: 0,
  });

  const toggleInscripcion = () => {
    setOpenRegister(true);
  };
  console.log(oneSchool);
  // Plan_Pago: nombre_plan_pago
  //user.id-----
  const ID = user.id;
  useEffect(() => {
    axios
      .get(`/ventas?id=${ID}`)
      .then((res) => setPlanPago(res.data))
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const planActual = planPago && planPago?.filter((ele) => ele.activo === true);
  const planHistorial =
    planPago && planPago?.filter((ele) => ele.activo === true);

  console.log(planActual);
  // vencimientoPlan
  return (
    <>
      <div className={style.layout}>
        {/* // Plan actual */}
        <Typography
          sx={{
            fontSize: "1.3rem",
            fontWeight: "600",
            color: "#0D263B",
            paddingBottom: "10px",
            fontFamily: "Poppins",
          }}
        >
          Plan Actual
        </Typography>
        {planActual &&
          planActual?.map((ele) => {
            return (
              <>
                <div>
                  <div className={style.divCard}>
                    {/* <Card sx={{boxShadow: '0px 4px 40px rgba(31, 95, 175, 0.15)', padding:'10px',display:'flex',justifyContent:'space-between', alignItems:'center',flexDirection:'row'}}> */}
                    <div className={style.divItem}>
                      <p className={style.ItemTitle}> Nº de venta </p>
                      <p>{ele.id}</p>
                    </div>
                    <div className={style.divItem}>
                      <p className={style.ItemTitle}> Tipo de plan </p>
                      <p>{ele.Plan_Pago.nombre_plan_pago}</p>
                    </div>
                    <div className={style.divItem}>
                      <p className={style.ItemTitle}> Fecha de Compra </p>
                      <p>{fechaFormat(ele.InicioPlan)}</p>
                    </div>
                    <div className={style.divItem}>
                      <p className={style.ItemTitle}> Fecha de Vencimiento </p>
                      <p> {fechaFormat(ele.vencimientoPlan)}</p>
                    </div>
                    <div className={style.divItem}>
                      <p className={style.ItemTitle}>Monto</p>
                      <p> S/ {ele.totalprice}</p>
                    </div>
                    <div className={style.divBtn}>
                      <Button
                        variant="contained"
                        onClick={toggleInscripcion}
                        color="primary"
                      >
                        Cambiar Plan
                      </Button>
                    </div>

                    {/* </Card> */}
                  </div>
                </div>
              </>
            );
          })}

        {planPago.length === 0 && planPago != null && (
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className={`${style.divCardFree} bg-white`}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: " center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.3rem",
                    fontWeight: "600",
                    color: "#0D263B",
                    paddingBottom: "10px",
                    fontFamily: "Poppins",
                  }}
                >
                  Tus plan es {oneSchool?.Plan_Pago?.nombre_plan_pago}
                </Typography>
                <p>Desbloquea más beneficios actualizando tu plan</p>
              </div>
              <div className={style.divBtn}>
                <Button
                  variant="contained"
                  onClick={toggleInscripcion}
                  color="primary"
                >
                  Cambiar Plan
                </Button>
              </div>
            </div>
          </div>
        )}
        {/* // Historial */}
        {planPago?.length > 0 && (
          <Typography
            sx={{
              fontSize: "1.3rem",
              fontWeight: "600",
              color: "#0D263B",
              paddingBottom: "10px",
              fontFamily: "Poppins",
            }}
          >
            Historial
          </Typography>
        )}
        {planPago?.length > 0 && (
          <div>
            {planPago &&
              planHistorial?.map((ele) => {
                return (
                  <>
                    <div>
                      <div className={style.divCard}>
                        <div className={style.divItem}>
                          <p className={style.ItemTitle}> Nº de venta </p>
                          <p>{ele.id}</p>
                        </div>
                        <div className={style.divItem}>
                          <p className={style.ItemTitle}> Tipo de plan </p>
                          <p>{ele.Plan_Pago.nombre_plan_pago}</p>
                        </div>
                        <div className={style.divItem}>
                          <p className={style.ItemTitle}> Fecha de Compra </p>
                          <p>{  fechaFormat(ele.InicioPlan)}</p>
                        </div>
                        <div className={style.divItem}>
                          <p className={style.ItemTitle}>
                            {" "}
                            Fecha de Vencimiento{" "}
                          </p>
                          <p> {fechaFormat(ele.vencimientoPlan)}</p>
                        </div>
                        <div className={style.divItem}>
                          <p className={style.ItemTitle}>Monto</p>
                          <p> S/ {ele.totalprice}</p>
                        </div>
                        <div className={style.divItem}>
                          <p className={style.ItemTitle}>Monto</p>
                          <p> S/ {ele.totalprice}</p>
                        </div>

                        <div className={style.divItem}>
                          <CheckIcon color="success" />
                          <p>{ele.status === "Paid" && "Pago"}</p>
                        </div>
                        {/* </Card> */}
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        )}
        {OpenRegister && (
          <ModalInscripcion
            handleClose={setOpenRegister}
            OpenPaymentPLan={OpenPaymentPLan}
          />
        )}
      </div>
    </>
  );
}
