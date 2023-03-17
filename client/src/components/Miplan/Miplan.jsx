import { Button, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./Miplan.module.css";
import { useSelector } from "react-redux";
import CheckIcon from '@mui/icons-material/Check';
import ModalInscripcion from "../ModalInscripcion/ModalInscripcion";
export default function Miplan() {
  const [planPago, setPlanPago] = useState([]);
  const [OpenRegister, setOpenRegister] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [OpenPaymentPLan, setOpenPaymentPLan] = useState({
    state: false,
    plan: "",
    price: 0,
  });

  const toggleInscripcion = () => {
    setOpenRegister(true);
  };
  //user.id-----
  const ID = "13b57af0-d887-4bb5-ba41-f5d3f38c650b";
  useEffect( () => {
    axios
      .get(`/ventas?id=${ID}`)
      .then((res) => setPlanPago(res.data))
      .catch((err) => {
        console.log(err.message);
      });
  },[]);

  const planActual = planPago&&   planPago?.filter((ele=> ele.activo === true))
  const planHistorial = planPago&&   planPago?.filter((ele=> ele.activo === true))
 

  console.log( planActual )
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
        { planActual&& planActual?.map((ele)=>{   
        return<>
        
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
              <p>{ele.InicioPlan}</p>
            </div>
            <div className={style.divItem}>
              <p className={style.ItemTitle}>Monto</p>
              <p> S/ {ele.totalprice}</p>
      
            </div>
            <div className={style.divBtn}>
              <Button variant="contained"  onClick={toggleInscripcion} color="primary">
                Cambiar Plan
              </Button>
            </div>

            {/* </Card> */}
          </div>
        </div>
        
        </>


        })  }
    
        {/* // Historial */}
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
        <div>
        { planPago&& planHistorial?.map((ele)=>{   
        return<>
        
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
              <p>{ele.InicioPlan}</p>
            </div>
            <div className={style.divItem}>
              <p className={style.ItemTitle}>Monto</p>
              <p> S/ {ele.totalprice}</p>
              {/*  id: '4f7e8534-abd2-49ad-ad00-f0bbe20f7980',
      totalprice: 150,
      status: 'Paid',
      months: 3,
      InicioPlan: '2023-03-15',
      vencimientoPlan: '2023-06-15',
      activo: true,
      Plan_Pago: { id: 2, nombre_plan_pago: 'Basico' } */}
            </div>
     
            <div className={style.divItem}>
              < CheckIcon color="success"/>
              <p>{ele.status === 'Paid' && 'Pago'}</p>
            </div>
            {/* </Card> */}
          </div>
        </div>
        
        </>


        })  }
          {/* <Typography
            sx={{
              fontSize: "1.3rem",
              fontWeight: "600",
              color: "#0D263B",
              paddingBottom: "10px",
              fontFamily: "Poppins",
            }}
          >
            Historial
          </Typography> */}
        </div>
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
