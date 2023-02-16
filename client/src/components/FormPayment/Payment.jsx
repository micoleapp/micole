import React from "react";
import style from "./Payment.module.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MercadoPagoLogo from "../../assets/mercado-pago-logo-.png";
import MaterialCheckBox from "@mui/material/Checkbox";
import Logo from "../../assets/logoPayment.png";
import MasterCard from "./svg/MasterCard";
import Visa from "./svg/Visa";
import Union from "./svg/Union";
import Paypal from "./svg/Paypal";
import ImageMG from "./svg/infoMG.png";
import YapeLogo from "./svg/yape.png";
import InfoPlanes from "./utils/InfoPlanes";
function Payment({price , plan }) {
console.log(price , plan)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      ruc: "",
      lastname: "",
      phone: "",
      schoolDistrict: "",
      schoolName: "",
    },
    mode: "onChange",
  });
  const navigate = useNavigate();
  const handleChangeDistric = () => {};
  const OnSubmit = () => {
    handlerOpenPayment(true);
  };




  return (
    <>
      {" "}
      <div className={style.h1_div}>
        <img src={Logo} />
      </div>
      <div className={style.PaymentLayout}>
        <div className={style.container}>
          <div className={style.Divdetalle}>
            <h1>Detalles de Compra</h1>
            <div className={style.detalle}>
              <p>Plan Especial +IGV</p>
              <p>S/.{price}</p>
            </div>
            <div className={style.detalle}>
              <p>Total</p>
              <p>S/. {price}</p>
            </div>
          </div>
          <div className={style.containerMetodoPago}>
            <h1>Elige tu método de pago</h1>

            <div className={style.mercadoPago}>
              <div
                style={{
                  display: "flex",
                  fleDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialCheckBox type="checkbox" />

                <img
                  style={{ width: "90px", height: "30px" }}
                  src={MercadoPagoLogo}
                />
              </div>

              <div
              className={style.tarjetas}
                // style={{
                //   display: "flex",
                //   fleDirection: "row",
                //   alignItems: "center",
                //   gap: "20px",
                // }}
              >
                <Visa />
                <MasterCard />
                <Union />
                <Paypal />
              </div>
            </div>

            <img style={{ width: "100%", height: "200px" }} src={ImageMG} />
          </div>
          <div className={style.mercadoPago}>
            <div
              style={{
                display: "flex",
                fleDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialCheckBox type="checkbox" />
              <img
                style={{ width: "40px", height: "30px", borderRadius: "5px" }}
                src={YapeLogo}
              />
            </div>
          </div>
          <div className={style.divButton}>
            <button>FINALIZAR PEDIDO</button>
          </div>
        </div>
        <div className={style.divBeneficios}>
          <h1>Información Detallada del Plan Especial</h1>
          <InfoPlanes  plan ={plan}/>
        </div>
      </div>
    </>
  );
}

export default Payment;
