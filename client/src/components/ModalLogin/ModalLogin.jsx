import React, { useState } from "react";
import FormLogin from "../FormLogin/FormLogin";
import style from "./ModaLogin.module.css";
import CloseButton from "../ModalInscripcion/svg/CloseButton";
import { useSelector } from "react-redux";

export default function ModalLogin({handlerClose}) {
  const { isAuth } = useSelector((state) => state.auth);
//   const [Open, setOpen] = useState(false);
  const toggleClose = () => {
    handlerClose(false)
  };
  return (
    <div className={style.Overlay}>
      <div>
        <div className={`${style.contenedorModal}`}>
          <div className={style.DivCloseButton}>
            <div style={{cursor:'pointer'}}  onClick={toggleClose}>
              <CloseButton />
            </div>
          </div>
          {isAuth === true ? "Ya estas logueado" : <FormLogin/>}
        </div>
      </div>
    </div>
  );
}
