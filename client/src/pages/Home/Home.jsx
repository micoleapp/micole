import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import CardsOne from "../../components/CardsOne";
import GroupSchool from "../../assets/GroupSchool.png";
import VectorPeople from "../../assets/VectorPeople.png";
import VectorTalk from "../../assets/VectorTalk.png";
import Carrusel from "../../components/Carrusel/Carrusel";
import FiltrosHome from "../../components/FiltrosHome/FiltrosHome";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useRef } from 'react';


function Home() {

  const navigate = useNavigate()

  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const myDivRef = useRef(null);

  useEffect(()=>{
    if(params.get("categorias") === "1") {
      myDivRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
    }
  },[params])
  
  const [test,setTest] = useState(false)

  return (
    <>
      <div className={style.container}>
        
        {/* <img className={style.img} src={fondoHome} alt="home" /> */}
        <div className={style.landingText}>
          <h1 className={style.h1}> Tu búsqueda de colegios comienza aquí</h1>

        </div>
        <div className={style.container_filtros}>
          <FiltrosHome />
        </div>
      </div>
      <div className={style.contentHome}>
    

     
        <section className="bg-[#f7f8fa] w-full p-10 py-20 gap-10 flex flex-col justify-around">
          <h1 className="text-center text-3xl font-semibold">
            ¿Por qué escoger MiCole?
          </h1>
          <div className="flex flex-col lg:flex-row justify-center items-center gap-5 text-black">
            <CardsOne
              img={GroupSchool}
              title="Cientos de alternativas 
              para escoger"
              parrafe="Encuentra una gran variedad de colegios que se acomoden a tus necesidades"
              duration={"0"}
            />
            <CardsOne
              img={VectorPeople}
              title="Contacto directo 
              con tu colegio de interés"
              parrafe="Separa una cita directamente desde la plataforma con un solo click"
              duration={"200"}
            />
            <CardsOne
              img={VectorTalk}
              title="Revisa recomendaciones 
              de nuestra comunidad"
              parrafe="Verifica miles de opiniones de otros padres de familia sobre los colegios de la plataforma."
              duration={"400"}
            />
          </div>
        </section>

        <div ref={myDivRef} className={style.container_categorias}>
          <h1 className={style.title}>
            Explora nuestras categorías de colegios
          </h1>
          <Carrusel />
        </div>
        <div className={style.preFooter}>
          <h1>Inscribe tu colegio en nuestra plataforma</h1>
          <p>Únete a la mayor comunidad de colegios en el Perú</p>
          <Link to={"/enroll"}  className="p-2 bg-white text-[#0061dd] px-4 rounded-md">
          Registrar mi colegio
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
