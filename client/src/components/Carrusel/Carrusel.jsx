import React from "react";
import style from "./Carrusel.module.css";
import images from "../../exports/carruselImagenes";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
export default function Carrusel() {
console.log(images)
  return (

    <motion.div className={style.slider_container}>
   
      <motion.div className={style.slider} drag='x' dragConstraints={{right:0, left:-700} }>
        {images.map((element) => {
            return (
                 <motion.div className={style.item}>  
                 <Link target='_blank' to={`/${element.link}`}>
                  <img src={element.image} alt="category" />
                 </Link>
           
            </motion.div>
            )
           
          
        })}
      </motion.div>
    </motion.div>
  );
}
