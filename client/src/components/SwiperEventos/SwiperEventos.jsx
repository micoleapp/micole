import React, { useEffect, useState } from "react";


import { useSelector } from "react-redux";
import axios from "axios";
// Import Swiper styles
import style from "./SwiperEvenos.module.css"
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Autoplay,
  EffectFade,
  Navigation,
  Parallax,
  Scrollbar,
  A11y,

} from "swiper";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import TextEvento from "./TextEvento";
export default function SwiperEventos({ data }) {
  let logoColegio = data?.logo ? data?.logo : data?.primera_imagen;
  let publiColegio = data.Eventos.map((e) => e.imagen_evento);
  console.log(publiColegio);
  return (<>

    <div className={style.divDesktop}>
      <div className={style.slider_container}>
        <Swiper
          modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={2}
          grabCursor={true}
          rewind={true}
          // Scrollbar={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          //   pagination={true} modules={[Pagination]} 
          className={style.swiper}
        >
          {/*  */}


          {data.Eventos?.map((event) => {
            return (
              <>

                <SwiperSlide className={style.swiper_slide}>
                  {event.imagen_evento != "" ? (
                    <>
                      <img
                        style={{ width: "50vh", height: "50vh" }}
                        src={event.imagen_evento}
                      />
                      <div className={style.content}>
                        <TextEvento
                          plantilla={false}
                          nombreEvento={event.nombre_evento}
                          description={event.descripcion}
                          tipoEvento={event.tipo_evento}
                          fechaEvento={event.fecha_evento}
                          horaEvento={event.hora_evento}
                          capacidadEvento={event.capacidad}
                          logo={logoColegio}
                          idEvento={event.id}
                        />
                      </div>
                    </>
                  ) : publiColegio ? (
                    <>
                      <div className={style.content}>

                        <TextEvento
                          plantilla={true}
                          nombreEvento={event.nombre_evento}
                          description={event.descripcion}
                          tipoEvento={event.tipo_evento}
                          fechaEvento={event.fecha_evento}
                          horaEvento={event.hora_evento}
                          capacidadEvento={event.capacidad}
                          logo={logoColegio}
                          idEvento={event.id}
                        />
                      </div>
                    </>
                  ) : null}
                </SwiperSlide>



              </>
            );
          })
          }



        </Swiper>
      </div>
    </div>
    <div className={style.divMobile}>
    <div className={style.slider_container}>
        <Swiper
          modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={1}
          grabCursor={true}
          rewind={true}
          // Scrollbar={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          //   pagination={true} modules={[Pagination]} 
          className={style.swiper}
        >
          {/*  */}


          {data.Eventos?.map((event) => {
            return (
              <>

                <SwiperSlide className={style.swiper_slide}>
                  {event.imagen_evento != "" ? (
                    <>
                      <img
                        style={{ width: "50vh", height: "50vh" }}
                        src={event.imagen_evento}
                      />
                      <div className={style.content}>
                        <TextEvento
                          plantilla={false}
                          nombreEvento={event.nombre_evento}
                          description={event.descripcion}
                          tipoEvento={event.tipo_evento}
                          fechaEvento={event.fecha_evento}
                          horaEvento={event.hora_evento}
                          capacidadEvento={event.capacidad}
                          logo={logoColegio}
                          idEvento={event.id}
                        />
                      </div>
                    </>
                  ) : publiColegio ? (
                    <>
                      <div className={style.content}>

                        <TextEvento
                          plantilla={true}
                          nombreEvento={event.nombre_evento}
                          description={event.descripcion}
                          tipoEvento={event.tipo_evento}
                          fechaEvento={event.fecha_evento}
                          horaEvento={event.hora_evento}
                          capacidadEvento={event.capacidad}
                          logo={logoColegio}
                          idEvento={event.id}
                        />
                      </div>
                    </>
                  ) : null}
                </SwiperSlide>



              </>
            );
          })
          }



        </Swiper>
      </div>
    </div>



  </>)
}


// <SwiperSlide className={style.swiper_slide}>
// {event.imagen_evento != ""? (
//   <>
//     <img
//       style={{ width: "50vh", height: "50vh" }}
//       src={event.imagen_evento}
//     />
//     <div className={style.content}>
//       <TextEvento
//         plantilla={false}
//         nombreEvento={event.nombre_evento}
//         description={event.descripcion}
//         tipoEvento={event.tipo_evento}
//         fechaEvento={event.fecha_evento}
//         horaEvento={event.hora_evento}
//         capacidadEvento={event.capacidad}
//         logo={logoColegio}
//         idEvento={event.id}
//       />
//     </div>
//   </>
// ) : publiColegio ?(
//   <>
//     <div className={style.content}>

//     <TextEvento
//       plantilla={true}
//       nombreEvento={event.nombre_evento}
//       description={event.descripcion}
//       tipoEvento={event.tipo_evento}
//       fechaEvento={event.fecha_evento}
//       horaEvento={event.hora_evento}
//       capacidadEvento={event.capacidad}
//       logo={logoColegio}
//       idEvento={event.id}
//     />
//     </div>
//   </>
// ):null}
// </SwiperSlide>