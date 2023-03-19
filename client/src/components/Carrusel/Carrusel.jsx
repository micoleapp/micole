import React from "react";
import style from "./Carrusel.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getFilterListSchool } from "../../redux/SchoolsActions";
import Categorias from "../../MockupInfo/Categorias.json";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
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
          src="https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b3f20da1448c8135cf1d30_Especial2_categoria.jpg"
          alt="Inclusivo"
          className="filter brightness-50"
        />
        <div className="flex flex-col justify-center gap-0 items-center absolute cursor-pointer">
          <img
            src="https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b3f5d9c8a443530229145c_ColEspecialIcon.svg"
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
          src="https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b3f39789f36d6535ef6663_Hombres2_categoria.jpg"
          alt="Hombre"
          className="filter brightness-50"
        />
        <div className="flex flex-col justify-center gap-5 items-center absolute cursor-pointer">
          <img
            src="https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b3f60ad3c3afea1b7d877a_ColHombresIcon.svg"
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
          src="https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/63c7320e57852d172a76ad83_Homeschool.jpg"
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
          src="https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b3f388a08ac700f68719ea_Internacional2_categoria.jpg"
          alt="Internacional"
          className="filter brightness-50"
        />
        <div className="flex flex-col justify-center gap-5 items-center absolute cursor-pointer">
          <img
            src="https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b3f602c8a44319f02915ee_MundoIcon.svg"
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
          src="https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b3f791f78ad2f51d0472eb_Laico.jpg"
          alt="Laico"
          className="filter brightness-50"
        />
        <div className="flex flex-col justify-center gap-0 items-center absolute cursor-pointer">
          <img
            src="https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b5584f7691c3e086f66053_Laico.png"
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
          src="https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/63c7320e57852d172a76ad83_Homeschool.jpg"
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
          src="https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b3f782b03ee569be526697_Mixto.jpg"
          alt="Mixto"
          className="filter brightness-50"
        />
        <div className="flex flex-col justify-center gap-5 items-center absolute cursor-pointer">
        <img
            src="https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b558429a3cf14cd6a06c76_Mixto.png"
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
          src="https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b3f3a425752733c4410cb8_Mujeres3_categoria.jpg"
          alt="Mujeres"
          className="filter brightness-50"
        />
        <div className="flex flex-col justify-center gap-5 items-center absolute cursor-pointer">
          <img
            src="https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b3f6129d92297bb33aa0f9_ColMujeresIcon.svg"
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
        src="https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b544d64c3ed0b9f10d7b66_Privado.jpg"
        alt="Privado"
        className="filter brightness-50"
      />
      <div className="flex flex-col justify-center gap-0 items-center absolute cursor-pointer">
        <img
          src="https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b5583418c0ba591e37979e_Private.png"
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
        src="https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b3f379babdc3392e6363cb_Religioso2_categoria.jpg"
        alt="Religioso"
        className="filter brightness-50"
      />
      <div className="flex flex-col justify-center gap-5 items-center absolute cursor-pointer">
        <img
          src="https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b3f5d0e51b4b62b811bb61_IglesiaIcon.svg"
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
        src="https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/63d302a461107be72d80ccaa_Certificacion_categoria.jpg"
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
        src="https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b54702c00a4a0b9294903f_Publico.jpg"
        alt="Publico"
        className="filter brightness-50"
      />
      <div className="flex flex-col justify-center gap-5 items-center absolute cursor-pointer">
        <img
          src="https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b55866bc84bf4d680e8169_Public.png"
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
      animationDuration={2000}
      autoPlayInterval={1000}
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
