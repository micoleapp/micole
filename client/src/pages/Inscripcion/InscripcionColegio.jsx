import React from 'react'
import FormInscripcion from '../../components/FormInscripcion/FormInscripcion'
import style from "./InscripcionColegio.module.css"
export default function InscripcionColegio() {
  return (
    <>

        <div className={style.layout}>
       
        <div className={style.container}>
          <div className={style.h1_div}>
                    <h1>Completa tus datos</h1>
          </div>

           <FormInscripcion/>
        </div>
         
          </div>
    </>

  )
}
