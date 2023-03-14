import React from "react";
import style from "./Carrusel.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getFilterListSchool } from "../../redux/SchoolsActions";
import Categorias from '../../MockupInfo/Categorias.json'
export default function Carrusel() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClick = (e) => {
    const data = {
      distrits: [],
      grado: [],
      tipo: [e],
      pension: [],
      cuota:[],
      rating:0,
      ingles: 0,
      ingreso: []
    };
    dispatch(getFilterListSchool(data))
    setTimeout(() => {
      navigate(`/listschool?distrito=false&grado=false&ingreso=false&categoria=${e}`)
    },1000)
  }

  return (

    <motion.div id="categorias" className={style.slider_container}>
   
      <motion.div className={style.slider} drag='x' dragConstraints={{right:0, left:-1000} }>
        {Categorias.filter(el=>el.imagen_categoria !== "null" && el.logo_categoria !== "null").map((cat) => {
            return (<>
            
            <motion.div className={`${style.item} relative flex justify-center items-center cursor-pointer`} key={cat.id} >  
            <div className="absolute bg-black/50 w-52 h-52"></div>
             <img src={cat.imagen_categoria} alt={cat.nombre_categoria}/>
             <div className="flex flex-col justify-center gap-5 items-center absolute cursor-pointer">
               {cat.logo_categoria && <img src={cat.logo_categoria} alt="logo" className="w-3 h-3 object-cover"/>}
             
             <h1 className="text-center text-white">{cat.nombre_categoria}</h1>
             </div>
             <p className="text-white absolute bottom-5 hover:text-sky-500" onClick={()=>handleClick(cat.id)}>Click aqui</p>
       </motion.div>
            </>
            )
            
          
        })}
      </motion.div>
    </motion.div>
  );
}
