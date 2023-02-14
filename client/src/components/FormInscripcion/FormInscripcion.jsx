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
            {errors.name && <p>Introduzca su nombre.</p>}
       
            <label>Email</label>
            <input {...register("email", { required: true })} />
            {errors.email && <p>Introduzca su email.</p>}
                <label>RUC</label>
            <input {...register("ruc", { required: true })} />
            {errors.lastname && <p>Introduzca su lastname.</p>}
           
            <label>Distrito del Colegio</label>
            <input {...register("schoolDistrict", { required: true })} />
            {errors.schoolDistrict && <p>Introduzca el distrito .</p>}
         
          </div>
          <div className={style.divInputs}>
            <label>Apellido</label>
            <input {...register("lastname", { required: true })} />
            {errors.ruc && <p>Introduzca su RUC.</p>}

            <label>Telefono</label>
            <input {...register("phone", { required: true })} />
            {errors.phone && <p>Introduzca su telefono .</p>}

            <label>Nombre del Colegio</label>
            <input {...register("schoolName", { required: true })} />
            {errors.schoolName && (
              <p>Introduzca el nombre de su institución .</p>
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
