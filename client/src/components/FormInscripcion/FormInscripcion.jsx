import React from "react";
import style from "./FormInscripcion.module.css";
import { useForm } from "react-hook-form";
function FormInscripcion() {
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

  const OnSubmit = () => {};
  return (
    <>
    
        <form onSubmit={handleSubmit(OnSubmit)}  className={style.formLayout}>
        <div className={style.Form}>
        <div className={style.divInputs}>
            <label>Nombre</label>
            <input {...register("name", { required: true })} />

            {errors.name && <p className={style.p}>Introduzca su nombre.</p>}
       
            <label>Email</label>
            <input {...register("email", { required: true })} />
            {errors.email && <p  className={style.p}>Introduzca su email.</p>}
                <label>RUC</label>
            <input {...register("ruc", { required: true })} />
            {errors.lastname && <p  className={style.p}>Introduzca su RUC.</p>}
           
            <label>Distrito del Colegio</label>
            <input {...register("schoolDistrict", { required: true })} />
            {errors.schoolDistrict && <p  className={style.p}>Introduzca el distrito .</p>}
         
          </div>
          <div className={style.divInputs}>
            <label>Apellido</label>
            <input {...register("lastname", { required: true })} />

            {errors.ruc && <p  className={style.p}>Introduzca su apellido.</p>}

            <label>Telefono</label>
            <input type="number" {...register("phone", { required: true })} />
            {errors.phone && <p  className={style.p}>Introduzca su telefono .</p>}


            <label>Nombre del Colegio</label>
            <input {...register("schoolName", { required: true })} />
            {errors.schoolName && (

              <p  className={style.p}>Introduzca su institución .</p>

            )}
         
          </div>

        </div>
        <div className={style.divButton}>
                <button>REGISTRARSE</button>
        </div>
    

        </form>
     
  
    </>
  );
}

export default FormInscripcion;
