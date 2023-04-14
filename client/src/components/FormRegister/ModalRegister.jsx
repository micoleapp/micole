import React, { useState } from "react";
import style from "./ModalRegister.module.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import { MenuItem, toggleButtonClasses, Typography } from "@mui/material";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import { InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";

import Logo from "../../assets/logoPayment.png";
import FormInscripcion from "../FormInscripcion/FormInscripcion";
import { register as registerUser } from "../../redux/AuthActions";
import FormLogin from "../FormLogin/FormLogin";
import ModalLogin from "../ModalLogin/ModalLogin";
import FB from "../FormLogin/svg/FB";
import Gmail from "../FormLogin/svg/Gmail";
import IconSch from "./svg/IconSch";
import IconUser from "./svg/IconUser";
const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  //   maxWidth: 400,
  bgcolor: "background.paper",
  boxShadow: " 0px 1px 5px rgba(0, 0, 0, 0.40)",
  padding: '2vh',
  borderRadius: "1vh",
};

export default function ModalRegistro({ open, setOpen }) {
  const { isAuth, success } = useSelector((state) => state.auth);
  const handleClose = () => setOpen(false);
  const [Distrito, setDistrito] = useState(false);
  const [seePassword, setseePassword] = useState(false);
  const [OpenRegistroColegio, setOpenRegistroColegio] = useState(false);
  const [OpenRegistroPadre, setOpenRegistroPadre] = useState(false);
  const [OpenLogin, setOpenLogin] = useState(false);
  const { distrits } = useSelector((state) => state.schools);
  const dispatch = useDispatch();

  const ToggleSeePass = () => {
    setseePassword(!seePassword);
  };
  const handlerOpenLogin = () => {
    setOpenLogin(true);
    // setOpen(false)
    setOpenRegistroColegio(false);
    setOpenRegistroPadre(false);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      mail: "",
      lastname: "",
      phone: "",
      password: "",
    },
    mode: "onChange",
  });
  const navigate = useNavigate();

  const OnSubmit = (user) => {
    const data = {
      apellidos: user.lastname,
      email: user.mail,
      nombre: user.name,
      password: user.password,
      telefono: user.phone,
    };
    console.log(data);
    dispatch(registerUser(data));
    handleClose();
  };

  return (
    <>
      <Modal
        sx={{ display: "flex" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          {OpenRegistroPadre === false &&
            OpenLogin === false &&
            OpenRegistroColegio === false && (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: "2vh",
                    padding: "1vh",
                    flexDirection: "column",
                  }}
                >
                 

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2vh",
                    }}
                  >
                 <div
                  style={{display:'flex', gap:'2vh', width:'100%',flexDirection:'row', justifyContent:'flex-start', alignItems:'center' }}
                 >
                 <IconSch/> 
                    <Button
                
                      transparent
                    >
                      {" "}
                      <Link
                        // className={`${style.p} hover-underline-animation`}
                        style={{ fontWeight: "600",fontSize:'1.4vh', fontFamily: "Poppins" }}
                        to={"/enroll"}
                      >
                      Colegio
                      </Link>
                    </Button>
                 </div>
                  
                 <div
                  style={{display:'flex', gap:'2vh', width:'100%',flexDirection:'row', justifyContent:'flex-start', alignItems:'center' }}
                 >
                   <IconUser/>
                   <Button
                      onClick={() => setOpenRegistroPadre(true)}
                     transparent
                      sx={{ fontWeight: "600",fontSize:'1.4vh', fontFamily: "Poppins" }}
                    >
                     Padre de Familia
                    </Button>
                 </div>
                   
                  </div>
                </div>
              </>
            )}

          {OpenRegistroPadre && (
            <>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <img style={{ width: "30vh" }} src={Logo} /> */}
              </div>
              <form
                onSubmit={handleSubmit(OnSubmit)}
                className={style.formLayout}
              >
                {/* <div className={style.h1_div}> 

                  <h1 style={{fontSize:'1.8'}}>Completa tussss datos</h1>
                </div> */}
                <div
                  style={{
                    width: "100%",
                    padding: "1vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "700",
                      fontFamily: "Poppins",
                      color: "#0061DF",
                    }}
                  >
                    Completa tus datos
                  </Typography>
                </div>

                <div className={style.form}>
                  <div className={style.divInputs}>
                    <label className={style.label}>Nombre</label>
                    <input
                      placeholder="Introduzca su nombre "
                      {...register("name", {
                        required: true,

                        maxLength: 100,
                      })}
                      className={style.input}
                    />

                    {errors.name && (
                      <p className={style.p}>Introduzca su nombre.</p>
                    )}
                    <label className={style.label}>Apellido</label>
                    <input
                      placeholder="Introduzca su apellido "
                      {...register("lastname", {
                        required: true,
                        maxLength: 100,
                      })}
                      className={style.input}
                    />

                    {errors.lastname?.type === "required" && (
                      <p className={style.p}>Introduzca su apellido.</p>
                    )}
                    {errors.lastname?.type === "maxLength" && (
                      <p className={style.p}>Demasiados caracteres.</p>
                    )}
                    <label className={style.label}>Email</label>
                    <input
                      placeholder="Introduzca su correo electronico "
                      {...register("mail", {
                        required: true,

                        maxLength: 100,
                        pattern: /\S+@\S+\.\S+/,
                      })}
                      className={style.input}
                    />
                    {errors.mail?.type === "required" && (
                      <p className={style.p}>Introduzca su mail.</p>
                    )}
                    {errors.mail?.type === "pattern" && (
                      <p className={style.p}>El formato es examp@sds.com</p>
                    )}
                    {errors.mail?.type === "maxLength" && (
                      <p className={style.p}>Demasiados caracteres.</p>
                    )}
                  </div>
                  <div className={style.divInputs}>
                    <label className={style.label}>Telefono</label>
                    <input
                      type="number"
                      placeholder="Introduzca numero de telefono"
                      {...register("phone", { required: true })}
                      className={style.input}
                    />
                    {errors.phone && (
                      <p className={style.p}>Introduzca su telefono .</p>
                    )}

                    <label className={style.label}>Contraseña</label>
                    <div className={style.DivPass}>
                      {seePassword === true ? (
                        <BsEye
                          onClick={ToggleSeePass}
                          className={style.Password}
                        />
                      ) : (
                        <BsEyeSlash
                          onClick={ToggleSeePass}
                          className={style.Password}
                        />
                      )}

                      <input
                        placeholder="Contraseña"
                        type={seePassword === true ? "text" : "password"}
                        {...register("password", {
                          required: true,
                          maxLength: 100,
                        })}
                        className={style.input}
                      />
                    </div>
                    {errors.password?.type === "required" && (
                      <p className={style.p}>Campo requerido</p>
                    )}
                  </div>
                </div>
                <div className={style.divButton}>
                  <button type="submit">REGISTRARSE</button>
                </div>

              
                <div
                  style={{
                    display: "flex",
                    width:'100%',
                    flexDirection:'column',
                    alignContent:'center',
                    justifyContent:'center',
                 
                    alignItems: "center",
                  }}
                >
                    <p className="  text-sm">Prefiero iniciar sesion con</p>
                <div
                  style={{
                    display: "flex",
                    width:'100%',
                    flexDirection:'row',
                    alignContent:'center',
                    justifyContent:'center',
                    gap: "1.5vh",
                    padding: "1vh",
                    alignItems: "center",
                  }}
                
                >
                    <FB/>
                  <Gmail />
                </div>
                
                </div>

                <div className={`${style.divButton}`}>
                  <p>Ya tienes cuenta ? </p>
                  <div>
                    <p
                      onClick={handlerOpenLogin}
                      style={{ color: "blue", cursor: "pointer" }}
                    >
                      Inicia Sesión{" "}
                    </p>
                  </div>
                </div>
              </form>
            </>
          )}
          {OpenRegistroColegio && OpenLogin === false && (
            <FormInscripcion handlerOpenLogin={setOpenLogin} />
          )}
          <div>
            {OpenLogin === true &&
              OpenRegistroPadre === false &&
              isAuth === false && (
                <FormLogin setOpenLogin={setOpenLogin} OpenLogin={OpenLogin} />
              )}
          </div>
        </Box>
      </Modal>
    </>
  );
}
