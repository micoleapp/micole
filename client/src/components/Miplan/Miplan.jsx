import { Button, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./Miplan.module.css";
import { useSelector } from "react-redux";
export default function Miplan() {
  const [planPago, setPlanPago] = useState(false);
  const { user } = useSelector((state) => state.auth);
  //user.id-----
  const ID = "13b57af0-d887-4bb5-ba41-f5d3f38c650b";
//   useEffect( () => {
//     axios
//       .get(`/ventas?idColegio=${ID}`)
//       .then((res) => setPlanPago(res.data))
//       .catch((err) => {
//         console.log(err.message);
//       });
//   });

  // const planActual =   planPago.filter((ele=> ele.Activo === true))
  // const planActual =   planPago.filter((ele=> ele.Activo != true))
  return (
    <>
      <div className={style.layout}>
        {/* // Plan actual */}
        <div>
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
          <div className={style.divCard}>
            {/* <Card sx={{boxShadow: '0px 4px 40px rgba(31, 95, 175, 0.15)', padding:'10px',display:'flex',justifyContent:'space-between', alignItems:'center',flexDirection:'row'}}> */}
            <div className={style.divItem}>
              <p className={style.ItemTitle}> Nº de venta </p>
              <p>38766872381</p>
            </div>
            <div className={style.divItem}>
              <p className={style.ItemTitle}> Tipo de plan </p>
              <p>Free</p>
            </div>
            <div className={style.divItem}>
              <p className={style.ItemTitle}> Fecha de Compra </p>
              <p>12/02/2023</p>
            </div>
            <div className={style.divItem}>
              <p className={style.ItemTitle}>Monto</p>
              <p> S/ 872381</p>
            </div>
            <div className={style.divBtn}>
              <Button variant="contained" color="primary">
                Cambiar Plan
              </Button>
            </div>

            {/* </Card> */}
          </div>
        </div>
        {/* // Historial */}
        <div>
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
        </div>
      </div>
    </>
  );
}
