import React from "react";
import style from "./Carrusel.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getFilterListSchool } from "../../redux/SchoolsActions";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Especial from '../../assets/carrusel/Especial.jpg'
import Hombres from '../../assets/carrusel/Hombres.jpg'
import Homeschool from '../../assets/carrusel/Homeschool.jpg'
import Internacional from '../../assets/carrusel/Internacional.jpg'
import Laico from '../../assets/carrusel/Laico.jpg'
import Mixto from '../../assets/carrusel/Mixto.jpg'
import Mujeres from '../../assets/carrusel/Mujeres.jpg'
import Certificacion from '../../assets/carrusel/Certificacion.jpg'
import Privado from '../../assets/carrusel/Privado.jpg'
import Publico from '../../assets/carrusel/Publico.jpg'
import Religioso from '../../assets/carrusel/Religioso.jpg'
import LogoEspecial from '../../assets/carrusel/LogoEspecial.svg'
import LogoReligioso from '../../assets/carrusel/LogoReligioso.svg'
import LogoHombres from '../../assets/carrusel/LogoHombres.svg'
import LogoInternacional from '../../assets/carrusel/LogoInternacional.svg'
import LogoMujeres from '../../assets/carrusel/LogoMujeres.svg'
import LogoLaico from '../../assets/carrusel/LogoLaico.png'
import LogoMixto from '../../assets/carrusel/LogoMixto.png'
import LogoPrivado from '../../assets/carrusel/Privado.png'
import LogoPublico from '../../assets/carrusel/LogoPublico.png'
const handleDragStart = (e) => e.preventDefault();

export default function Carrusel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (e) => {
    const data = {
      distrits: [],
      grado: [],
      tipo: e,
      pension: [],
      cuota: [],
      rating: null,
      ingles: 200,
      ingreso: [],
      metodos:[],
      dificultades:[]
    };
    dispatch(getFilterListSchool(data,1));
    setTimeout(() => {
      navigate(
        `/listschool?distrito=false&grado=false&ingreso=false&categoria=${e}`
      );
    }, 1000);
  };
  const items = [
    <div className="grid grid-cols-2 lg:flex w-full justify-around items-center">
      <div
        className={`${style.item} relative flex w-full justify-center items-center cursor-pointer`}
        key={2}
        onClick={() => handleClick(2)}
      >
        <img
          src={Especial}
          alt="Inclusivo"
          className="filter brightness-50"
        />
        <div className="flex flex-col justify-center gap-0 items-center absolute cursor-pointer">
          <img
            src={LogoEspecial}
            alt="logo"
            className="w-3 h-3 object-cover"
          />

          <h1 className="text-center text-white">Inclusivo</h1>
        </div>
      </div>
      <div
        className={`${style.item} relative w-full  flex justify-center items-center cursor-pointer`}
        key={3}
        onClick={() => handleClick(3)}
      >
        <img
          src={Hombres}
          alt="Hombre"
          className="filter brightness-50"
        />
        <div className="flex flex-col justify-center gap-5 items-center absolute cursor-pointer">
          <img
            src={LogoHombres}
            alt="logo"
            className="w-5 h-5 object-cover flex"
          />

          <h1 className="text-center text-white">Hombres</h1>
        </div>
      </div>
      <div
        className={`${style.item} relative flex w-full  justify-center items-center cursor-pointer`}
        key={4}
        onClick={() => handleClick(4)}
      >
        <img
          src={Homeschool}
          alt="Homeschool"
          className="filter brightness-50"
        />
        <div className="flex flex-col justify-center gap-5 items-center absolute cursor-pointer">
          <h1 className="text-center text-white">Homeschool</h1>
        </div>
      </div>
      <div
        className={`${style.item} relative flex w-full  justify-center items-center cursor-pointer`}
        key={5}
        onClick={() => handleClick(5)}
      >
        <img
          src={Internacional}
          alt="Internacional"
          className="filter brightness-50"
        />
        <div className="flex flex-col justify-center gap-5 items-center absolute cursor-pointer">
          <img
            src={LogoInternacional}
            alt="logo"
            className="w-3 h-3 object-cover"
          />

          <h1 className="text-center text-white">Internacional</h1>
        </div>
      </div>
    </div>,
    <div className="grid grid-cols-2 lg:flex w-full justify-around items-center">
      <div
        className={`${style.item} relative flex w-full justify-center items-center cursor-pointer`}
        key={6}
        onClick={() => handleClick(6)}
      >
        <img
          src={Laico}
          alt="Laico"
          className="filter brightness-50"
        />
        <div className="flex flex-col justify-center gap-0 items-center absolute cursor-pointer">
          <img
            src={LogoLaico}
            alt="logo"
            className="w-3 h-3 object-cover"
          />

          <h1 className="text-center text-white">Laico</h1>
        </div>
      </div>
      <div
        className={`${style.item} relative w-full  flex justify-center items-center cursor-pointer`}
        key={7}
        onClick={() => handleClick(7)}
      >
        <img
          src={Homeschool}
          alt="Militar"
          className="filter brightness-50"
        />
        <div className="flex flex-col justify-center gap-5 items-center absolute cursor-pointer">

          <h1 className="text-center text-white">Militar</h1>
        </div>
      </div>
      <div
        className={`${style.item} relative flex w-full  justify-center items-center cursor-pointer`}
        key={8}
        onClick={() => handleClick(8)}
      >
        <img
          src={Mixto}
          alt="Mixto"
          className="filter brightness-50"
        />
        <div className="flex flex-col justify-center gap-5 items-center absolute cursor-pointer">
        <img
            src={LogoMixto}
            alt="logo"
            className="w-3 h-3 object-cover"
          />
          <h1 className="text-center text-white">Mixto</h1>
        </div>
      </div>
      <div
        className={`${style.item} relative flex w-full  justify-center items-center cursor-pointer`}
        key={9}
        onClick={() => handleClick(9)}
      >
        <img
          src={Mujeres}
          alt="Mujeres"
          className="filter brightness-50"
        />
        <div className="flex flex-col justify-center gap-5 items-center absolute cursor-pointer">
          <img
            src={LogoMujeres}
            alt="logo"
            className="w-3 h-3 object-cover"
          />

          <h1 className="text-center text-white">Mujeres</h1>
        </div>
      </div>
    </div>,
    <div className="grid grid-cols-2 lg:flex w-full justify-around items-center">
    <div
      className={`${style.item} relative flex w-full justify-center items-center cursor-pointer`}
      key={10}
      onClick={() => handleClick(10)}
    >
      <img
        src={Privado}
        alt="Privado"
        className="filter brightness-50"
      />
      <div className="flex flex-col justify-center gap-0 items-center absolute cursor-pointer">
        <img
          src={LogoPrivado}
          alt="logo"
          className="w-3 h-3 object-cover"
        />

        <h1 className="text-center text-white">Privado</h1>
      </div>
    </div>
    <div
      className={`${style.item} relative w-full  flex justify-center items-center cursor-pointer`}
      key={12}
      onClick={() => handleClick(12)}
    >
      <img
        src={Religioso}
        alt="Religioso"
        className="filter brightness-50"
      />
      <div className="flex flex-col justify-center gap-5 items-center absolute cursor-pointer">
        <img
          src={LogoReligioso}
          alt="logo"
          className="w-5 h-5 object-cover flex"
        />

        <h1 className="text-center text-white">Religioso</h1>
      </div>
    </div>
    <div
      className={`${style.item} relative flex w-full  justify-center items-center cursor-pointer`}
      key={1}
      onClick={() => handleClick(1)}
    >
      <img
        src={Certificacion}
        alt="Certificacion de estudios"
        className="filter brightness-50"
      />
      <div className="flex flex-col justify-center gap-5 items-center absolute cursor-pointer">
        <h1 className="text-center text-white">Certificacion de estudios</h1>
      </div>
    </div>
    <div
      className={`${style.item} relative flex w-full  justify-center items-center cursor-pointer`}
      key={11}
      onClick={() => handleClick(11)}
    >
      <img
        src={Publico}
        alt="Publico"
        className="filter brightness-50"
      />
      <div className="flex flex-col justify-center gap-5 items-center absolute cursor-pointer">
        <img
          src={LogoPublico}
          alt="logo"
          className="w-3 h-3 object-cover"
        />

        <h1 className="text-center text-white">Publico</h1>
      </div>
    </div>
  </div>,
  ];
  return (
    <AliceCarousel
      autoPlay={true}
      infinite={true}
      animationDuration={10000}
      autoPlayInterval={0}
      mouseTracking
      items={items}
    />
  );

  // return (

  //   <motion.div id="categorias" className={style.slider_container}>

  //     <motion.div className={style.slider} drag='x' dragConstraints={{right:0, left:-1000} }>
  //       {Categorias.filter(el=>el.imagen_categoria !== "null" && el.logo_categoria !== "null").map((cat) => {
  //           return (<>

  //           <motion.div className={`${style.item} relative flex justify-center items-center cursor-pointer`} key={cat.id} >
  //           <div className="absolute bg-black/50 w-52 h-52"></div>
  //            <img src={cat.imagen_categoria} alt={cat.nombre_categoria}/>
  //            <div className="flex flex-col justify-center gap-5 items-center absolute cursor-pointer">
  //              {cat.logo_categoria && <img src={cat.logo_categoria} alt="logo" className="w-3 h-3 object-cover"/>}

  //            <h1 className="text-center text-white">{cat.nombre_categoria}</h1>
  //            </div>
  //            <p className="text-white absolute bottom-5 hover:text-sky-500" onClick={()=>handleClick(cat.id)}>Click aqui</p>
  //      </motion.div>
  //           </>
  //           )

  //       })}
  //     </motion.div>
  //   </motion.div>
  // );
}
