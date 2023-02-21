import React, { useEffect, useState } from "react";
import FormLogin from "../FormLogin/FormLogin";
import style from "./ModaLogin.module.css";
import CloseButton from "../ModalInscripcion/svg/CloseButton";
import { useSelector } from "react-redux";
import Logo from "../../assets/logoPayment.png";

export default function ModalLogin({ handlerClose }) {
  const { isAuth } = useSelector((state) => state.auth);
  //   const [Open, setOpen] = useState(false);
  const toggleClose = () => {
    handlerClose(false);
  };

  useEffect(() => {}, [isAuth]);

  return (
    <div  className={style.Overlay}>
      <div>
        <div data-aos="fade-down" className={`${style.contenedorModal}`}>
          <div className={style.DivCloseButton}>
            <div style={{ cursor: "pointer" }} onClick={toggleClose}>
              <CloseButton />
            </div>
          </div>
          {isAuth === true ? (
            <>
              <div style={{display:'flex', flexDirection:'column'}}>
                <div className={style.img_div}>
                  <img src={Logo} alt="logo" />
                  </div>
                  <div className={style.content_div}>
                    <h1>Bienvenido a MiCole </h1>
                    <p>El inicio de sesion ha sido exitoso!</p>
                    <button onClick={toggleClose}>Continuar</button>
                  </div>
                </div>
            
            </>
          ) : (
            <FormLogin handlerClose={handlerClose} />
          )}
        </div>
      </div>
    </div>
  );
}
