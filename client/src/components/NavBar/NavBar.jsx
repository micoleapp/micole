import React, { useState } from "react";
import Burguer from "./svg/Burguer";
import Logo from "../../assets/logo1.png";
import style from "./NavBar.module.css";
import Categoria from "./Categoria/Categoria";
import Contacto from "./Contacto/Contacto";
import { Link } from "react-router-dom";
import ModalLogin from "../ModalLogin/ModalLogin";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/AuthActions";
import BurguerMenuU from "./BurguerMenu/BurguerMenu";

function NavBar() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const [OpenLogin, setOpenLogin] = useState(false);
  const [BurguerMen, setBurguerMen] = useState(false);
  const [OpenCategory, setOpenCategory] = useState(false);
  const [OpenContact, setOpenContact] = useState(false);
 
  const toggleBurguerMenu = () => {
    setBurguerMen(true)
  };
  const ToggleCategory = () => {
    setOpenCategory(!OpenCategory);
    setOpenContact(false);
  };



  const ToggleContact = () => {
    setOpenContact(!OpenContact);
    setOpenCategory(false);
  };

  const handlerLogin = () => {
    setOpenLogin(true);
  };

  const handlerLogout = () => {
    dispatch(logout());
  };

  function scrollBot() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  return (
    <div className={style.layout}>
      <Link to={"/"}>
        <img className={style.img} src={Logo} />
      </Link>

      <div className={style.container}>
        <div className={style.items}>
          <Link
            className={`${style.p} hover-underline-animation`}
            to={"/?categorias=1"}
          >
            Categorias
          </Link>
          <p className={`${style.p} hover-underline-animation`}>BLOG</p>
          <p
            className={`${style.p} hover-underline-animation`}
            onClick={scrollBot}
          >
            Contáctanos
          </p>
        </div>

        <div onClick={toggleBurguerMenu} className={style.Burguer}>
          <Burguer />
        </div>
        <div className={style.burguerMenu}>
            {BurguerMen && <BurguerMenuU handlerClose={setBurguerMen}/> }
        </div>
       

        <div className={style.buttonContainer}>
          {isAuth === true ? (
            <button onClick={handlerLogout} className={style.SesionButtom}>
              Cerrar Sesion
            </button>
          ) : (
            <button onClick={handlerLogin} className={style.SesionButtom}>
              Iniciar sesion
            </button>
          )}
          {isAuth === true ? (
          <Link to={"/dashboardschool"}>
          <button className={style.SesionButtom}>Ver Perfil</button>
        </Link>
          ) : (          <Link to={"/enroll"}>
          <button className={style.SesionButtom}>Inscribe tu colegio</button>
        </Link>)}

        </div>
      </div>
      {OpenCategory && (
        <div className={style.divCategory}>
          {" "}
          <Categoria />{" "}
        </div>
      )}
      {OpenContact && (
        <div className={style.divContact}>
          {" "}
          <Contacto />{" "}
        </div>
      )}
      {OpenLogin && <ModalLogin handlerClose={setOpenLogin} OpenLogin={OpenLogin} />}
    </div>
  );
}

export default NavBar;
