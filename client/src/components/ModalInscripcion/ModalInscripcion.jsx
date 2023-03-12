import React, { useEffect, useState } from "react";
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
  const { isAuth , success } = useSelector((state) => state.auth);
  console.log(OpenPaymentPLan.price);
  const [OpenRegister, setOpenRegister] = useState(true);
  const [OpenLogin, setOpenLogin] = useState(false);

  const toggleClose = () => {
    handleClose(false);
    handleClosePayment({
      ...OpenPaymentPLan,
      state: false,
      price: 0,
      plan: "",
    });
  };
  
  return (
    <div className={style.Overlay}>
      <div className="">
        <div data-aos="fade-down" data-aos-mirror={false} className={style.contenedorModal}>
          <div className={style.DivCloseButton}>
            <div onClick={toggleClose}>
              <CloseButton />
            </div>
          </div>
          {OpenLogin === false && isAuth === false && OpenRegister === true && (
            <FormInscripcion handlerOpenLogin={setOpenLogin} />
          )}
          <div>
            {isAuth === true && (
              <Payment
                plan={OpenPaymentPLan?.plan}
                price={OpenPaymentPLan?.price}
              />
            )}
          </div>
          <div>{OpenLogin === true && isAuth === false && <FormLogin setOpenLogin={setOpenLogin} OpenLogin={OpenLogin} />}</div>
        </div>
      </div>
    </div>
  );
}
