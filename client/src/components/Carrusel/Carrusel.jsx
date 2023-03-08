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
                 <motion.div className={style.item} key={cat.id} onClick={()=>handleClick(cat.id)}>  
                  <img src={cat.imagen_categoria} alt={cat.nombre_categoria} />
                  <h1 className="text-center border-b border-l border-r rounded-b-md">{cat.nombre_categoria}</h1>
           
            </motion.div>
            )
           
          
        })}
      </motion.div>
    </motion.div>
  );
}
