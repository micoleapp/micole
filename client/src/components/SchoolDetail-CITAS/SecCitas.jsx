import React, { useState } from "react";
import style from "./swiperCitas.module.css";

// import de la libreria swipper , el carrusel de las cards
import {
  Pagination,
  Autoplay,
  EffectFade,
  Navigation,
  Parallax,
  Scrollbar,
  A11y,
} from "swiper";


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import generarCalendario from "./GenCalendario"
// Componentes del look and feel de citas
import CardsDia from "./components/CardsDia/CardsDia";
import HorariosColegio from "./components/HorariosColegio/HorariosColegio";

export default function SecCitas({ sendDateHs }) {
  //  ejecuta la funcion que genera el calendario y se guarda el arr de dias
  const arrCarruselOrdenado = generarCalendario();

  // Se filtran los objetos con strings vacios, ya que los dias pasados se guardan de esa manera 
  const arrLimpio = arrCarruselOrdenado.filter((ele) => ele.dia != "")

  // este handler es intermediario entre  la card y los horarios correspondientes a la misma
  // la informacion de los horarios mas la fecha de la card se pasan al componente 
  // HorariosColegio quien es el que genera el drop de horarios y  manda la informacion a schooldetail 
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardSelect = (card) => {
    setSelectedCard([card]);
  };

  return (
    <>
      <div className={style.divResponsiveDesktop}>
        <div className={style.slider_container}>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={6}
            grabCursor={true}
            rewind={true}
            pagination={{ clickable: true }}
            className={style.swiper}
          >
            {arrLimpio?.map((d) => {
              return (
                <>
                  <SwiperSlide className={style.swiper_slide}>

                    {d.dia != "" &&
                      <div className={style.cardDia}>
                        {d.diaSemana === "Sáb" && (
                          <>
                            <p
                              style={{
                                fontSize: "1.9vh",
                                fontWeight: "400",
                                color: "#9E9999",
                                padding: '2px'
                              }}
                            >
                              {d.diaSemana}
                            </p>
                            <p
                              style={{
                                fontSize: "1.9vh",
                                fontWeight: "400",
                                color: "#9E9999",
                                padding: '2px'
                              }}
                            >
                              {d.dia}
                            </p>
                            <p
                              style={{
                                fontSize: "1.9vh",
                                fontWeight: "400",
                                color: "#9E9999",
                                padding: '2px'
                              }}
                            >
                              {d.mes}
                            </p>
                          </>
                        )}
                        {d.diaSemana === "Dom" && (
                          <>
                            <p
                              style={{
                                fontSize: "1.9vh",
                                fontWeight: "400",
                                color: "#9E9999",
                                padding: '2px'
                              }}
                            >
                              {d.diaSemana}
                            </p>
                            <p
                              style={{
                                fontSize: "1.9vh",
                                fontWeight: "400",
                                color: "#9E9999",
                                padding: '2px'
                              }}
                            >
                              {d.dia}
                            </p>
                            <p
                              style={{
                                fontSize: "1.9vh",
                                fontWeight: "400",
                                color: "#9E9999",
                                padding: '2px'
                              }}
                            >
                              {d.mes}
                            </p>
                          </>
                        )}

                        {d.diaSemana != "Sáb" && d.diaSemana != "Dom" && (
                          <>
                            <CardsDia onCardSelect={handleCardSelect} diasSemana={d.diaSemana} fechadelDia={d.dia} mesdelDia={d.mes} />
                          </>

                        )}

                      </div>
                    }

                  </SwiperSlide>

                </>
              );
            })
            }
          </Swiper>
          <div className={style.divDropHorarios}>
            {/* <p className={style.pSig}>Horarios </p> */}
            <HorariosColegio diaSelecionado={selectedCard} sendDateHs={sendDateHs} />

          </div>
        </div>
      </div>


      <div className={style.divResponsiveMobile}>
        <div className={style.slider_container}>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={3}
            grabCursor={true}
            rewind={true}
            pagination={{ clickable: true }}
            className={style.swiper}
          >
            {arrLimpio?.map((d) => {
              return (
                <>
                  <SwiperSlide className={style.swiper_slide}>

                    {d.dia != "" &&
                      <div className={style.cardDia}>
                        {d.diaSemana === "Sáb" && (
                          <>
                            <p
                              style={{
                                fontSize: "1.9vh",
                                fontWeight: "400",
                                color: "#9E9999",
                                padding: '2px'
                              }}
                            >
                              {d.diaSemana}
                            </p>
                            <p
                              style={{
                                fontSize: "1.9vh",
                                fontWeight: "400",
                                color: "#9E9999",
                                padding: '2px'
                              }}
                            >
                              {d.dia}
                            </p>
                            <p
                              style={{
                                fontSize: "1.9vh",
                                fontWeight: "400",
                                color: "#9E9999",
                                padding: '2px'
                              }}
                            >
                              {d.mes}
                            </p>
                          </>
                        )}
                        {d.diaSemana === "Dom" && (
                          <>
                            <p
                              style={{
                                fontSize: "1.9vh",
                                fontWeight: "400",
                                color: "#9E9999",
                                padding: '2px'
                              }}
                            >
                              {d.diaSemana}
                            </p>
                            <p
                              style={{
                                fontSize: "1.9vh",
                                fontWeight: "400",
                                color: "#9E9999",
                                padding: '2px'
                              }}
                            >
                              {d.dia}
                            </p>
                            <p
                              style={{
                                fontSize: "1.9vh",
                                fontWeight: "400",
                                color: "#9E9999",
                                padding: '2px'
                              }}
                            >
                              {d.mes}
                            </p>
                          </>
                        )}

                        {d.diaSemana != "Sáb" && d.diaSemana != "Dom" && (
                          <>
                            <CardsDia onCardSelect={handleCardSelect} diasSemana={d.diaSemana} fechadelDia={d.dia} mesdelDia={d.mes} />
                          </>

                        )}

                      </div>
                    }

                  </SwiperSlide>

                </>
              );
            })
            }
          </Swiper>
          <div className={style.divDropHorarios}>
            {/* <p className={style.pSig}>Horarios </p> */}
            <HorariosColegio diaSelecionado={selectedCard} sendDateHs={sendDateHs} />

          </div>
        </div>
      </div>
    </>

  );
}
