import React, { useEffect, useState } from "react";
import { Pagination, Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/swiper.min.css";
import style from "./SwiperEvenos.module.css";
import "swiper/css/pagination";

import "swiper/css/effect-fade";
import TextEvento from "./TextEvento";
export default function SwiperEventos({data}) {
  const { oneSchool } = useSelector((state) => state.schools)
  console.log(data);



  return (
    <div style={{ width: "60vh" }}>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{
          crossFade: true, // enables slides to cross fade
        }}
        lazy="true"
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        centeredSlides="true"
        className={style.swiper}
      >
        {data.Eventos.map((event) => {
          return (
            <>
              <SwiperSlide className={style.swiper_slide}>
                <img  style={{width:'50vh',height:'60vh'}}  src='https://res.cloudinary.com/dj8p0rdxn/image/upload/v1679362147/eesjwe0dwaabi37gzuj9.png' alt="" />

                <div className={style.content}>
                  <TextEvento
                    nombreEvento={event.nombre_evento}
                    description={event.descripcion}
                    tipoEvento={event.tipo_evento}
                    fechaEvento={event.fecha_evento}
                    horaEvento={event.hora_evento}
                    capacidadEvento={event.capacidad}
                   logo={event.imagen_evento}
                    idColegio={event.id}
                  />
                </div>
              </SwiperSlide>
            </>
          );
        })}
      </Swiper>
    </div>
  );
}
