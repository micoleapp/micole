import React, { useState } from "react";
import style from "./ModalInscripcion.module.css";
import CloseButton from "./svg/CloseButton";
import FormInscripcion from "../FormInscripcion/FormInscripcion";
import Payment from "../FormPayment/Payment";
import FormLogin from "../FormLogin/FormLogin";
import { useSelector } from "react-redux";
export default function ModalInscripcion({
  handleClose,
  handleClosePayment,
  OpenPaymentPLan,
}) {
  const { isAuth } = useSelector((state) => state.auth);
console.log( OpenPaymentPLan.price)
  const [OpenPayment, setOpenPayment] = useState(true);
  const [OpenLogin, setOpenLogin] = useState(false);
  const [OpenRegister, setOpenRegister] = useState(true);

  const toggleClose = () => {
    handleClose(false);
    handleClosePayment({
      ...OpenPaymentPLan,
      state: false,
    });
  };
  return (
    <div className={style.Overlay}>
      <div style={{ paddingTop: "40px", marginBottom: "20px" }}>
        <div className={style.contenedorModal}>
          <div className={style.DivCloseButton}>
            <div onClick={toggleClose}>
              <CloseButton />
            </div>
          </div>
          {OpenPayment === false &&
            OpenLogin === false &&
            isAuth === false &&
            OpenRegister === true && (
              <FormInscripcion
                handlerOpenLogin={setOpenLogin}
                handlerOpenPayment={setOpenPayment}
              />
            )}
          <div>
            {OpenPayment === true && (
              <Payment
                plan={OpenPaymentPLan?.plan}
                price={OpenPaymentPLan?.price}
              />
            )}
          </div>
          <div>{OpenLogin === true && <FormLogin />}</div>
        </div>
      </div>
    </div>
  );
}
