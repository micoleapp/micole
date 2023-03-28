import React, { useState } from "react";
import Logo from "../../assets/logo1.png";
import style from "./NavBar.module.css";
import Categoria from "./Categoria/Categoria";
import Contacto from "./Contacto/Contacto";
import { Link } from "react-router-dom";
import ModalLogin from "../ModalLogin/ModalLogin";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/AuthActions";
import { Squash as Hamburger } from "hamburger-react";
import CircularProgress from "@mui/material/CircularProgress";
import ModalRegistro from "../FormRegister/ModalRegister";
function NavBar() {
  const dispatch = useDispatch();
  const { isAuth, oneSchool } = useSelector((state) => state.auth);
  const [OpenLogin, setOpenLogin] = useState(false);
  const [BurguerMen, setBurguerMen] = useState(false);
  const [OpenCategory, setOpenCategory] = useState(false);
  const [OpenContact, setOpenContact] = useState(false);
  const [openRegister, setOpenRegister] = useState(false)
const handlerOpenRegister =()=>{
  setOpenRegister(true)
}
  const toggleBurguerMenu = () => {
    setBurguerMen(true);
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
      behavior: "smooth",
    });
  }

  const [isOpen, setOpen] = useState(false);

  return (
    <div className={style.layout}>
      <Link to={"/"}>
        <img className={style.img} src={Logo} />
      </Link>

      <div className={style.container}>
        <div className={style.items}>
          {isAuth && (
            
            <Link
              className={`${style.p} hover-underline-animation`}
              to={"/enroll"}
            >
              Inscribe tu colegio
            </Link>
            
          )}

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

        <div className="md:hidden">
          <Hamburger toggled={isOpen} toggle={setOpen} color="#fff" />
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
          {/* {isAuth === true && oneSchool !== null ? (
          <Link to={"/dashboardschool"}>
          <button className={style.SesionButtom}>Ver Perfil</button>
        </Link>
          ) : (          <Link to={"/enroll"}>
          <button className={style.SesionButtom}>Inscribe tu colegio</button>
        </Link>)} */}

          {!isAuth ? (
            <>
              <Link to={"/enroll"}>
              <button className={style.SesionButtom}>
                Inscribe tu colegio
              </button>
            </Link>
        
              <button onClick={handlerOpenRegister}  className={style.SesionButtom}>
                Registrarse
              </button>
            
            </>
          
          ) : oneSchool !== null ? (
            <Link to={"/dashboardschool"}>
              <button className={style.SesionButtom}>Ver Perfil</button>
            </Link>
          ) : (
            <button
              className={`${style.SesionButtom} flex items-center justify-center gap-2`}
            >
              Cargando perfil{" "}
              <CircularProgress size="1rem" style={{ color: "#0061dd" }} />{" "}
            </button>
          )}
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
      {OpenLogin && (
        <ModalLogin handlerClose={setOpenLogin} OpenLogin={OpenLogin} />
      )}
      <div
        className={`bg-[#0061dd] w-[100vw] absolute top-16 z-[500] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 md:hidden rounded-b-md`}
      >
        <div className="flex flex-col justify-center items-center gap-5 p-5">
          {isAuth && (
            <Link
              className={`${style.p} hover-underline-animation`}
              to={"/enroll"}
              onClick={() => setOpen(!isOpen)}
            >
              Inscribe tu colegio
            </Link>
          )}
          <Link
            className={`${style.p} hover-underline-animation`}
            to={"/?categorias=1"}
            onClick={() => setOpen(!isOpen)}
          >
            Categorias
          </Link>
          <p
            className={`${style.p} hover-underline-animation`}
            onClick={() => setOpen(!isOpen)}
          >
            BLOG
          </p>
          <p
            className={`${style.p} hover-underline-animation`}
            onClick={() => {
              scrollBot();
              setOpen(!isOpen);
            }}
          >
            Contáctanos
          </p>
          {isAuth === true ? (
            <button
              onClick={() => {
                setOpen(!isOpen);
                handlerLogout();
              }}
              className={style.SesionButtom}
            >
              Cerrar Sesion
            </button>
          ) : (
            <button
              onClick={() => {
                setOpen(!isOpen);
                handlerLogin();
              }}
              className={style.SesionButtom}
            >
              Iniciar sesion
            </button>
          )}
          {!isAuth ? (
            <>
              <Link to={"/enroll"}>
                <button className={style.SesionButtom}>
                  Inscribe tu colegio
                </button>
              </Link>
              <button className={style.SesionButtom}>
                Registrarse
              </button>
            </>
          ) : oneSchool !== null ? (
            <Link to={"/dashboardschool"}>
              <button className={style.SesionButtom}>Ver Perfil</button>
            </Link>
          ) : (
            <button
              className={`${style.SesionButtom} flex items-center justify-center gap-2`}
            >
              Cargando perfil{" "}
              <CircularProgress size="1rem" style={{ color: "#0061dd" }} />{" "}
            </button>
          )}
        </div>
      </div>
      {openRegister && <ModalRegistro open={openRegister} setOpen={setOpenRegister} />}
    </div>
  );
}

export default NavBar;
