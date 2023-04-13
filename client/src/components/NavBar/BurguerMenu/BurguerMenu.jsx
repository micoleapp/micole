import React from "react";
import style from "./BurguerMenu.module.css";
// import CloseButton from "../../svg/CloseButton";
import CloseButton from "../../ModalInscripcion/svg/CloseButton";
export default function BurguerMenuU({ handlerClose }) {
  const ToggleClose = () => {
    handlerClose(false);
  };

  return (
    <div className={style.layout}  data-aos="zoom-out">
      <div className={style.CloseButton} onClick={ToggleClose}>
        <CloseButton />
      </div>

      <div className={style.container}>
        <div className={style.divPages}>
          <p className={style.Pages}>Inicio</p>
        </div>
        <div className={style.divPages}>
          <p className={style.Pages}>Categorías</p>
        </div>

        <div className={style.divPages}>
          <p className={style.Pages}>BLOG</p>
        </div>

        <div className={style.divPages}>
          <p className={style.Pages}>Contacto</p>
        </div>
      
      </div>
    </div>
  );
}
