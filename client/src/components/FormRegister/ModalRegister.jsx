import React, { useState } from "react";
import style from "./ModalRegister.module.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   maxWidth: 400,
  bgcolor: "background.paper",
  boxShadow: " 0px 1px 5px rgba(0, 0, 0, 0.40)",
  p: 4,
  borderRadius: "10px",
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
          {OpenRegistroPadre === false && OpenRegistroColegio === false && (
            <>
              <div className={style.img_div}>
                <img src={Logo} />
              </div>
              <div className={style.h1_div}></div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "1vh" }}
              >
                <Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.50",
                    }}
                  >
                    <b style={{ color: "#0061DF" }}>
                      Inscribe tu colegio en nuestra plataforma
                    </b>
                    Únete a la mayor comunidad de colegios en el Perú
                  </div>
                </Typography>
                <Button
                  onClick={() => setOpenRegistroColegio(true)}
                  variant="contained"
                >
                  Inscribe tu Colegio
                </Button>
                <Button
                  onClick={() => setOpenRegistroPadre(true)}
                  variant="contained"
                >
                  Registrarse como Familia
                </Button>
              </div>
            </>
          )}

          {OpenRegistroPadre && (
            <>
              <form
                onSubmit={handleSubmit(OnSubmit)}
                className={style.formLayout}
              >
                <div className={style.h1_div}>
                  <h1>Completa tus datos</h1>
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
                      className="shadow-md"
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
                      className="shadow-md"
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
                      className="shadow-md"
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
                      className="shadow-md"
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
                        className="shadow-md"
                      />
                    </div>
                    {errors.password?.type === "required" && (
                      <p className={style.p}>Campo requerido</p>
                    )}
                  </div>
                </div>
                <div className={style.divButton}>
                  <button type="submit">REGISTRARSE</button>
                  <div className={`${style.divButton}`}>
                    <p>Ya tienes cuenta ? </p>
                    <div>
                      <p
                        onClick={() => {
                          setOpenLogin(true);
                          setOpenRegistroColegio(false);
                        }}
                        style={{ color: "blue", cursor: "pointer" }}
                      >
                        Inicia Sesión{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </>
          )}
          {OpenRegistroColegio && OpenLogin === false && (
            <FormInscripcion handlerOpenLogin={setOpenLogin} />
          )}
          <div>
            {OpenLogin === true && isAuth === false && (
              <FormLogin setOpenLogin={setOpenLogin} OpenLogin={OpenLogin} />
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
}
