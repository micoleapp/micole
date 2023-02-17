import React, { useState } from "react";
import Burguer from "./svg/Burguer";
import Logo from "../../assets/logo1.png";
import style from "./NavBar.module.css";
import Categoria from "./Categoria/Categoria";
import Contacto from "./Contacto/Contacto";
import { Link } from "react-router-dom";
function NavBar() {
 
  const [OpenCategory, setOpenCategory] = useState(false);
  const [ OpenContact , setOpenContact ] = useState(false);
  const ToggleCategory = () => {
    setOpenCategory(!OpenCategory);
    setOpenContact(false)
  };
  const ToggleContact = () => {
    setOpenContact(!OpenContact);
    setOpenCategory(false);
  };
  return (
    <div className={style.layout}>
  <Link to={"/"}>
    <img className={style.img} src={Logo} />
  </Link>
      

      <div className={style.container}>
        <div className={style.items}>
          <p className={`${style.p} hover-underline-animation`}>Inicio</p>
          <p className={`${style.p} hover-underline-animation`} onClick={ToggleCategory}>
            Categorias
          </p>
          <p className={`${style.p} hover-underline-animation`}>BLOG</p>
          <p className={`${style.p} hover-underline-animation`} onClick={ToggleContact}>Contáctanos</p>
        </div>

        <div className={style.Burguer}>
          <Burguer />
        </div>
        <div className={style.buttonContainer}>
          <button className={style.SesionButtom}>Iniciar sesion</button>

          <Link to={"/enroll"}>
            <button className={style.SesionButtom}>Inscribe tu colegio</button>
          </Link>
        </div>
      </div>
      {OpenCategory && <div className={style.divCategory}> <Categoria />  </div> }
      {OpenContact &&<div className={style.divContact}>  <Contacto /> </div>}
      
    </div>
  );
}

export default NavBar;
