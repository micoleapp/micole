import React, { useState } from "react";
import style from "./FormInscripcion.module.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import { MenuItem, toggleButtonClasses } from "@mui/material";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import { InputLabel } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { register as registerUser } from "../../redux/AuthActions";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
function FormInscripcion({ handlerOpenPayment, handlerOpenLogin , OpenLogin }) {

  const {error} = useSelector(state=>state.auth)

  const [Distrito, setDistrito] = useState(false);
  const [seePassword, setseePassword] = useState(false);

  const { distrits } = useSelector((state) => state.schools);
  const dispatch = useDispatch();

  const ToggleSeePass = () => {
    setseePassword(!seePassword);
  };

  const handleValueDistrito = (event) => {
    console.log(event.target.value);
    setDistrito(event.target.value);
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
      ruc: "",
      lastname: "",
      phone: "",

      schoolName: "",
      password: "",
      esColegio: true,
    },
    mode: "onChange",
  });
  const navigate = useNavigate();
  const handlerLogin = () => {
    handlerOpenLogin(true);
    handlerOpenLogin(!OpenLogin)
  };
  const OnSubmit = (user) => {
    const data = {
      esColegio: true,
      apellidos: user.lastname,
      email: user.mail,
      nombre: user.name,
      password: user.password,
      telefono: user.phone,
      ruc: user.ruc,

      nombre_colegio: user.schoolName,
      DistritoId: Distrito,
    };

    dispatch(registerUser(data));
  };

  return (
    <>
      <div className={style.h1_div}>
        <h1>Completa tus datos</h1>
      </div>

      <form onSubmit={handleSubmit(OnSubmit)} className={style.formLayout}>
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

            {errors.name && <p className={style.p}>Introduzca su nombre.</p>}

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
            <label className={style.label}>RUC</label>
            <input
              placeholder="Introduzca su nro de RUC"
              type="number"
              {...register("ruc", {
                required: true,
                minLength: 11,
              })}
              className="shadow-md"
            />
            {errors.ruc?.type === "required" && (
              <p className={style.p}>Introduzca su numero RUC.</p>
            )}
            {errors.ruc?.type === "minLength" && (
              <p className={`${style.p} text-xs`}>Su RUC debe tener 11 caracteres.</p>
            )}

            <label className={style.label}>Distrito del Colegio</label>
            <div>
              <FormControl
                variant="standard"
                style={{ width: "100%" }}
                size="small"
                className="text-xs font-light "
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Introduzca el distrito
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-type-select-standard"
                  // value={type}
                  onChange={handleValueDistrito}
                  label="Tipo de colegio"
                >
                  {distrits.map((dis) => (
                    <MenuItem value={dis.id} key={dis.id}>
                      <ListItemText primary={dis.nombre_distrito} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={style.divInputs}>
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
                <BsEye onClick={ToggleSeePass} className={style.Password} />
              ) : (
                <BsEyeSlash
                  onClick={ToggleSeePass}
                  className={style.Password}
                />
              )}

              <input
                placeholder="Contraseña"
                type={ seePassword === true ? "text" :"password"}
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
            <label className={style.label}>Nombre del Colegio</label>
            <input
              placeholder="Introduzca el nombre de su colegio"
              {...register("schoolName", {
                required: true,
                maxLength: 100,
              })}
              className="shadow-md"
            />
            {errors.schoolName?.type === "required" && (
              <p className={style.p}>Introduzca su institución .</p>
            )}
            {errors.schoolName?.type === "maxLength" && (
              <p className={style.p}>Demasiados caracteres.</p>
            )}
          </div>
        </div>
        <div className={style.divButton}>
          <button type="submit">REGISTRARSE</button>
          <div className={`${style.divButton}`}>
            <p>Ya tienes cuenta ? </p>
            <div onClick={handlerLogin}>
              <p style={{ color: "blue", cursor: "pointer" }}>Inicia Sesión </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default FormInscripcion;
