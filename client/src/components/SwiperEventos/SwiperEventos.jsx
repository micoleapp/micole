import React, { useEffect, useState } from "react";
import { Pagination, Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/swiper.min.css";
import style from "./SwiperEvenos.module.css";
import "swiper/css/pagination";

import "swiper/css/effect-fade";
import TextEvento from "./TextEvento";
export default function SwiperEventos() {
  const [Data, setData] = useState();
  // useEffect(() => {
  //     axios.get(``).then((res) => {
  //       const respons = res.data;
  //       setData(respons);
  //     });
  //   }, []);
  return (
    <div style={{width:'60vh',  }}>
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
        {MockEventos.map((event) => {
          
          return (
            <>
              <SwiperSlide className={style.swiper_slide}>
                <img src={event.image} alt="" />

                <div className={style.content}>
                  <TextEvento
                    nombreEvento={event.nombreEvento}
                    description={event.descripcionEvento}
                    tipoEvento={event.tipoEvento}
                    fechaEvento={event.fechaEvento}
                    horaEvento={event.horaEvento}
                    idColegio={event.idColegio}
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

const MockEventos = [
  {
    idColegio: 'sad',
    nombreEvento: "Esuela Abierta",
    descripcionEvento: "Visita guiada",
    tipoEvento: "Puerta Abierta",
    capacidadEvento: 200,
    fechaEvento: "12/02/1220",
    horaEvento: "08:00",
    image:
      "https://res.cloudinary.com/dj8p0rdxn/image/upload/v1673357908/cld-sample-3.jpg",
  },
  {
    idColegio: 'sad',
    nombreEvento: "Evento 1",
    descripcionEvento:
      "Lorem Ipsum has been the industry's standathe 1500s, when an unknown printer took a galley",
    tipoEvento: "Prueb1",
    capacidadEvento: 0,
    fechaEvento: "43/12/2020",
    horaEvento: "08:00",
    image:
      "https://res.cloudinary.com/dj8p0rdxn/image/upload/v1673357908/cld-sample-3.jpg",
  },
  {
    idColegio: 'sad',
    nombreEvento: "Evento 2",
    descripcionEvento:
      "Lorem Ipsum has been the industry's standathe 1500s, when an unknown printer took a galley",
    tipoEvento: "Prueb2",
    capacidadEvento: 0,
    fechaEvento: "43/12/2020",
    horaEvento: "08:00",
    image:
      "https://res.cloudinary.com/dj8p0rdxn/image/upload/v1673357907/cld-sample-2.jpg",
  },
  {
    idColegio: 'sad',
    nombreEvento: "Evento 3",
    descripcionEvento:
      "Lorem Ipsum has been the industry's standathe 1500s, when an unknown printer took a galley",
    tipoEvento: "Prueb3",
    capacidadEvento: 0,
    fechaEvento: "12/02/1220",
    horaEvento: "08:00",
    image:
      "https://res.cloudinary.com/dj8p0rdxn/image/upload/v1673357907/cld-sample-2.jpg",
  },
];
