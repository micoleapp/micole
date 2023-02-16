import React from "react";
import style from "./FormInscripcion.module.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import { MenuItem, toggleButtonClasses } from "@mui/material";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import { InputLabel } from "@mui/material";
import MockupDistritos from "../../MockupInfo/MockupDistritos";

function FormInscripcion({handlerOpenPayment,handlerOpenLogin}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      ruc: "",
      lastname: "",
      phone: "",
      schoolDistrict: "",
      schoolName: "",
    },
    mode: "onChange",
  });
  const navigate = useNavigate();
  const handlerLogin = () => {
    handlerOpenLogin(true)
  };
  const OnSubmit = () => {
    handlerOpenPayment(true)
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
              {...register("name", {
                required: true,

                maxLength: 100,
              })}
            />

            {errors.name && <p className={style.p}>Introduzca su nombre.</p>}

            <label className={style.label}>Email</label>
            <input
              {...register("email", {
                required: true,

                maxLength: 100,
                pattern: /\S+@\S+\.\S+/,
              })}
            />
            {errors.email?.type === "required" && (
              <p className={style.p}>Introduzca su email.</p>
            )}
            {errors.email?.type === "pattern" && (
              <p className={style.p}>El formato es examp@sds.com</p>
            )}
            {errors.email?.type === "maxLength" && (
              <p className={style.p}>Demasiados caracteres.</p>
            )}
            <label className={style.label}>RUC</label>
            <input type="number" {...register("ruc", { required: true })} />
            {errors.ruc && <p className={style.p}>Introduzca su numero RUC.</p>}

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
                  // onChange={handleChangeDistric}
                  label="Tipo de colegio"
                >
                  {MockupDistritos.map((type) => (
                    <MenuItem value={type} key={type}>
                      <ListItemText primary={type} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={style.divInputs}>
            <label className={style.label}>Apellido</label>
            <input
              {...register("lastname", {
                required: true,
                maxLength: 100,
              })}
            />

            {errors.lastname?.type === "required" && (
              <p className={style.p}>Introduzca su apellido.</p>
            )}
            {errors.lastname?.type === "maxLength" && (
              <p className={style.p}>Demasiados caracteres.</p>
            )}
            <label className={style.label}>Telefono</label>
            <input type="number" {...register("phone", { required: true })} />
            {errors.phone && (
              <p className={style.p}>Introduzca su telefono .</p>
            )}

            <label className={style.label}>Nombre del Colegio</label>
            <input
              {...register("schoolName", {
                required: true,
                maxLength: 100,
              })}
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
          <button>REGISTRARSE</button>
          <div className={style.divSingIn}>
            <p>Ya tienes cuenta ? </p>
            <div onClick={handlerLogin}>
               <p style={{ color: "blue", cursor:"pointer" }}>Inicia Sesión </p>
            </div>
           
          </div>
        </div>
      </form>
    </>
  );
}

export default FormInscripcion;
