import React, { useEffect, useState } from "react";
import FormLogin from "../FormLogin/FormLogin";
import FormInscripcion from "../FormInscripcion/FormInscripcion";
import style from "./ModaLogin.module.css";
import CloseButton from "../ModalInscripcion/svg/CloseButton";
import { useSelector } from "react-redux";
import Logo from "../../assets/logoPayment.png";

export default function ModalLogin({ handlerClose }) {
  const { isAuth } = useSelector((state) => state.auth);
  const [OpenLogin, setOpenLogin] = useState(false);
  const toggleClose = () => {
    handlerClose(false);
  };

  useEffect(() => {
    if(isAuth){
      handlerClose(false)
    }
  },[isAuth]);

  return (
    <div  className={style.Overlay}>
      <div>
        <div data-aos="fade-down" data-aos-mirror={false} className={`${style.contenedorModal}`}>
          <div className={style.DivCloseButton}>
            <div style={{ cursor: "pointer" }} onClick={toggleClose}>
              <CloseButton />
            </div>
          </div>
     {OpenLogin ? <FormInscripcion handlerOpenLogin={setOpenLogin} OpenLogin={OpenLogin} /> : <FormLogin OpenLogin={OpenLogin} setOpenLogin={setOpenLogin} handlerClose={handlerClose} /> }
        </div>
      </div>
    </div>
  );
}
