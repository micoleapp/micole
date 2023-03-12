import React from "react";
import style from "./Carrusel.module.css";
import images from "../../exports/carruselImagenes";
import { motion } from "framer-motion";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFilterListSchool } from "../../redux/SchoolsActions";
export default function Carrusel() {

  const {categories} = useSelector((state)=>state.schools)
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
   
      <motion.div className={style.slider} drag='x' dragConstraints={{right:0, left:-1500} }>
        {categories.filter(el=>el.imagen_categoria !== "null").map((cat) => {
            return (
                 <motion.div className={`${style.item} relative flex justify-center items-center`} key={cat.id} onClick={()=>handleClick(cat.id)}>  
                 <div className="absolute bg-black/50 w-52 h-52"></div>
                  <img src={cat.imagen_categoria} alt={cat.nombre_categoria}/>
                  <div className="flex flex-col justify-center gap-5 items-center absolute">
                    {cat.logo_categoria && <img src={cat.logo_categoria} alt="logo" className="w-3 object-cover"/>}
                  
                  <h1 className="text-center text-white">{cat.nombre_categoria}</h1>
                  </div>
            </motion.div>
            )
           
          
        })}
      </motion.div>
    </motion.div>
  );
}
