import React, { useEffect } from "react";
import style from "./Home.module.css";
import fondoHome from "../../assets/Home_img.png";
import Icon_directo from "./svg/Icon_directo";
import Icon_recomendacion from "./svg/Icon_recomendacion";
import Icon_school from "./svg/Icon_school";
import Carrusel from "../../components/Carrusel/Carrusel";
import FiltrosHome from "../../components/FiltrosHome/FiltrosHome";
import { useNavigate, Link } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/')
  }, [])
  
  return (
    <>
      <div className={style.container}>
        {/* <img className={style.img} src={fondoHome} alt="home" /> */}
        <div className={style.landingText}>
          <h1 className={style.h1}> Tu búsqueda de colegios comienza aquí</h1>
          <p className={style.p}>¡Qué Emoción!</p>
      
        </div>  
        <div className={style.container_filtros}>
           <FiltrosHome/>
        </div>
       
      </div>
      <div className={style.contentHome}>
        <h1 className={style.title}>¿Por qué escoger MiCole.pe?</h1>

        <div className={style.LayoutContent}>
          <div className={style.CardContainer}>
            <Icon_school />
            <h1>Cientos de alternativas para escoger</h1>
            <p>
              Encuentra una gran variedad de colegios que se acomoden a tus
              necesidades
            </p>
          </div>
          <div className={style.CardContainer}>
            <Icon_directo />
            <h1>Contacto directo con tu colegio de interés</h1>
            <p>
              Separa una cita directamente desde la plataforma con un solo click
            </p>
          </div>
          <div className={style.CardContainer}>
            <Icon_recomendacion />
            <h1>Recomendaciones de nuestra comunidad</h1>
            <p>
              Verifica miles de opiniones de otros padres de familia sobre los
              colegios de la plataforma
            </p>
          </div>
        </div>
        <div className={style.container_categorias}>
          <h1 className={style.title}>
            Explora nuestras categorías de colegios
          </h1>
          <Carrusel />
        </div>
        <div className={style.preFooter}>
          <h1>Inscribe tu colegio en nuestra plataforma</h1>
          <p>Únete a la mayor comunidad de colegios en el Perú</p>
          <Link to={"/enroll"}>
              <button>
            Registrar
          </button>
          </Link>
        
        </div>
      </div>
    </>
  );
}

export default Home;
