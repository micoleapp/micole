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
                <img src='https://res.cloudinary.com/dj8p0rdxn/image/upload/v1679350090/fzbdxjnerwn5wrqlgfx6.png' alt="" />

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
// id(pin):"b0e003bf-9a33-4f72-9e22-92cf9ac35e3e"
// nombre_evento(pin):"Charla Orientacion"
// descripcion(pin):"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'"
// tipo_evento(pin):"Familiar"
// fecha_evento(pin):"2023-03-21"
// hora_evento(pin):"08:00"
// capacidad(pin):60
// imagen_evento(pin):"https://res.cloudinary.com/de4i6biay/image/upload/v1679360608/micole/zxlrdrjjqdgyuom2umje.png"

const MockEventos = [
  {
    idColegio: "sad",
    nombreEvento: "Esuela Abierta",
    descripcionEvento:
      "Lorem Ipsum has been the industry's standathe 1500s, when an unknown printer took a galley",

    tipoEvento: "Puerta Abierta",
    capacidadEvento: 200,
    fechaEvento: "12/02/2020",
    horaEvento: "08:00",
    image:
      "https://res.cloudinary.com/dj8p0rdxn/image/upload/v1679350090/fzbdxjnerwn5wrqlgfx6.png",
  },
  {
    idColegio: "sad",
    nombreEvento: "Evento 1",
    descripcionEvento:
      "Lorem Ipsum has been the industry's standathe 1500s, when an unknown printer took a galley",
    tipoEvento: "Prueb1",
    capacidadEvento: 0,
    fechaEvento: "12/02/2020",
    horaEvento: "08:00",
    image:
      "https://res.cloudinary.com/dj8p0rdxn/image/upload/v1679350090/fzbdxjnerwn5wrqlgfx6.png",
  },
  {
    idColegio: "sad",
    nombreEvento: "Recorrido del Campus",
    descripcionEvento:
      "Lorem Ipsum has been the industry's standathe 1500s, when an unknown printer took a galley",
    tipoEvento: "Prueb2",
    capacidadEvento: 0,
    fechaEvento: "12/02/2020",
    horaEvento: "08:00",
    image:
      "https://res.cloudinary.com/dj8p0rdxn/image/upload/v1679350090/fzbdxjnerwn5wrqlgfx6.png",
  },
  {
    idColegio: "sad",
    nombreEvento: "Demostracion de talleres",
    descripcionEvento:
      "Lorem Ipsum has been the industry's standathe 1500s, when an unknown printer took a galley",

    tipoEvento: "Prueb3",
    capacidadEvento: 0,
    fechaEvento: "12/02/2020",
    horaEvento: "08:00",
    image:
      "https://res.cloudinary.com/dj8p0rdxn/image/upload/v1679350090/fzbdxjnerwn5wrqlgfx6.png",
  },
];
