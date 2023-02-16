import React, { useEffect } from "react";
import style from "./Home.module.css";
import fondoHome from "../../assets/Home_img.png";
import Icon_directo from "./svg/Icon_directo";
import Icon_recomendacion from "./svg/Icon_recomendacion";
import Icon_school from "./svg/Icon_school";
import CardsOne from "../../components/CardsOne";
import GroupSchool from "../../assets/GroupSchool.png";
import VectorPeople from "../../assets/VectorPeople.png";
import VectorTalk from "../../assets/VectorTalk.png";
import Carrusel from "../../components/Carrusel/Carrusel";
import FiltrosHome from "../../components/FiltrosHome/FiltrosHome";
import { useNavigate, Link } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);

  return (
    <>
      <div className={style.container}>
        {/* <img className={style.img} src={fondoHome} alt="home" /> */}
        <div className={style.landingText}>
          <h1 className={style.h1}> Tu búsqueda de colegios comienza aquí</h1>
          <p className={style.p}>¡Qué Emoción!</p>
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
              title="Haz que tu colegio brille frente a las familias"
              parrafe="Publica toda la información relevante sobre ti para las familias que están buscando colegios"
            />
            <CardsOne
              img={VectorPeople}
              title="Completa tus vacantes 
disponibles"
              parrafe="Gestiona todas las vacantes de inicial, primaria y secundaria que tengas en un solo lugar.
"
            />
            <CardsOne
              img={VectorTalk}
              title="Cuenta con un proceso de 
admisión simple y eficiente"
              parrafe="Olvídate de tener que mandar correos y comunicaciones uno a uno, hazlo todo masivo."
            />
          </div>
        </section>

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
            <button>Registrar</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
