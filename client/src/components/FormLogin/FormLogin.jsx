import React from "react";
import { useForm } from "react-hook-form";
import style from "./FormLogin.module.css";
import Logo from "../../assets/logoPayment.png";
import FB from "./svg/FB";
import { login } from "../../redux/AuthActions";
import Gmail from "./svg/Gmail";
import { useDispatch } from "react-redux";
export default function FormLogin() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      email: "",
    },
    mode: "onChange",
  });

  const OnSubmit = async (user) => {
    console.log(data);
    dispatch(login(user))  
  };

  return (
    <>
    
        <form onSubmit={handleSubmit(OnSubmit)} className={style.Form}>
      <div className={style.img_div}>
        <img src={Logo} />
      </div>
      <input
        placeholder="Correo Electrónico"
        {...register("email", {
          required: true,
          maxLength: 100,
        })}
      />
      {errors.email?.type === "required" && (
        <p className={style.p}>Campo requerido</p>
      )}

      <input
        placeholder="Contraseña"
        type="password"
        {...register("password", {
          required: true,
          maxLength: 100,
        })}
      />
      {errors.password?.type === "required" && (
        <p className={style.p}>Campo requerido</p>
      )}
      <button>INGRESAR</button>

    </form>
    <div className={style.recuperar}>
        <h1>¿Has olvidado tu contraseña?</h1>
        <p>Recuperar contraseña</p>
    </div>
    <div className={style.socialMedia}>
        <p>Prefiero iniciar sesion con:</p>
      <div style={{display:"flex" , gap:"20px" , padding:"20px", alignItems:"center"}}>
          <FB/>
        <Gmail/>
      </div>
      
    </div>
    </>


  );
}
