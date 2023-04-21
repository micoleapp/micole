
import style from "./inforPlanes.module.css"
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



import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Button } from "@mui/material";
import SecCitas from "../../SchoolDetail-CITAS/SecCitas";
import { motion } from 'framer-motion'


const mockPLanes = [
  {
    plan: 'Gratis',
    precio: 'Sin Costo',

  },

  {
    plan: 'Básico',
    precio: 'S/ 50',

  },

  {
    plan: 'Estándar',
    precio: 'S/ 80',

  },
  {
    plan: 'Exclusivo',
    precio: 'S/ 120',

  },

]

export default function infoPlanes({ handleChangePlan }) {
  // console.log(plan)


  const handleChange = (e, plan) => {
    const planMinucula = plan.toLowerCase()
    handleChangePlan(planMinucula)
  }

  return (<>

    <div className={style.divDesktop}>


      <div className={style.slider_container}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          // spaceBetween={0}
          slidesPerView={3}
          grabCursor={true}
          rewind={true}
          Scrollbar={true}
          pagination={{ clickable: true }}
          // pagination={true} modules={[Pagination]} 
          className={style.swiper}
        >
          {/*  */}


          {mockPLanes?.map((p) => {
            return (
              <>

                <SwiperSlide className={style.swiper_slide}>
                  <div style={{ width: '100%', display: 'flex', gap: '5vh', alignItems: 'center', justifyContent: 'center' }}>
                    <div className={style.cardDia}>
                      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <h1 style={{ color: '#0061DF', fontSize: '2.4vh' }}>{p.plan}</h1>
                        <p style={{ color: '#0D263B', fontWeight: '500', fontSize: '2.3vh' }}>{p.precio}</p>
                        <p style={{ color: '#0D263B', fontWeight: '400', fontSize: '1.8vh' }}>por mes</p>
                      </div>


                      {
                        p.plan === "Gratis" ?
                          <>

                            <div style={{ paddingBottom: '0vh', fontSize: '1.8vh' }}>
                              <p>✔️ ¡30 días de prueba gratis!</p>
                              <p>✔️ 365 días de publicación</p>
                              <p>✔️ Envío de hasta 2  familias interesadas por mes</p>
                              <p>✔️ 3  fotos del centro educativo en la plataforma</p>
                              <p>✔️ Soporte operativo disponible</p>
                            </div>

                            <div style={{ padding: '1vh' }}>
                              <Button onClick={(e) => handleChange(e, p.plan)} sx={{ textAlign: 'center', height: '6vh', padding: '2vh', width: '100%', borderRadius: '8px', fontSize: '1.4vh' }} variant="contained">¡Quiero el plan {p.plan}!</Button>
                            </div>
                          </>
                          : p.plan === "Básico" ?
                            <>
                              <div style={{ paddingBottom: '0vh', fontSize: '1.8vh' }}>

                                <p>✔️ ¡30 días de prueba gratis!</p>
                                <p>✔️ 365 días de publicación</p>
                                <p>✔️ Envío de hasta 25 familias interesadas por mes</p>
                                <p>✔️ 15 fotos del centro educativo en la plataforma</p>
                                <p>✔️ Soporte operativo disponible</p>
                              </div>

                              <div style={{ padding: '1vh' }}>
                                <Button onClick={(e) => handleChange(e, p.plan)} sx={{ textAlign: 'center', height: '6vh', padding: '2vh', width: '100%', borderRadius: '8px', fontSize: '1.4vh' }} variant="contained">¡Quiero el plan  {p.plan}!</Button>
                              </div>
                            </>

                            : p.plan === "Estándar" ?
                              <>
                                <div style={{ paddingBottom: '0vh', fontSize: '1.8vh' }}>
                                  <p>✔️ ¡30 días de prueba gratis!</p>
                                  <p>✔️ 365 días de publicación</p>
                                  <p>✔️ Envío de hasta 50 familias interesadas por mes</p>
                                  <p>✔️ 30 fotos del centro educativo en la plataforma</p>
                                  <p>✔️ Soporte operativo disponible</p>
                                </div>

                                <div style={{ padding: '1vh' }}>
                                  <Button onClick={(e) => handleChange(e, p.plan)} sx={{ textAlign: 'center', height: '6vh', padding: '2vh', width: '100%', borderRadius: '8px', fontSize: '1.4vh' }} variant="contained">¡Quiero el plan {p.plan}!</Button>
                                </div>
                              </>
                              : p.plan === "Exclusivo" ?
                                <>
                                  <div style={{ paddingBottom: '0vh', fontSize: '1.8vh' }}>
                                    <p>✔️ ¡30 días de prueba gratis!</p>
                                    <p>✔️ 365 días de publicación</p>
                                    <p>✔️ Envío ilimitado de familias interesadas por mes</p>
                                    <p>✔️ 50 fotos del centro educativo en la plataforma</p>
                                    <p>✔️ Soporte operativo disponible</p>
                                  </div>

                                  <div style={{ padding: '1vh' }}>
                                    <Button onClick={(e) => handleChange(e, p.plan)} sx={{ textAlign: 'center', height: '6vh', padding: '2vh', width: '100%', borderRadius: '8px', fontSize: '1.4vh' }} variant="contained">¡Quiero el plan {p.plan}!</Button>
                                  </div>
                                </>
                                : null
                      }


                    </div></div>
                </SwiperSlide>



              </>
            );
          })
          }



        </Swiper>
      </div>
    </div>
    {/* mobile responsive */}
    <div className={style.divMobile}>
      <div className={style.slider_container}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          // spaceBetween={0}
          slidesPerView={1}
          grabCursor={true}
          rewind={true}
          Scrollbar={true}
          pagination={{ clickable: true }}
          // pagination={true} modules={[Pagination]} 
          className={style.swiper}
        >
          {/*  */}


          {mockPLanes?.map((p) => {
            return (
              <>

                <SwiperSlide className={style.swiper_slide}>
                  <div style={{ width: '100%', display: 'flex', gap: '5vh', alignItems: 'center', justifyContent: 'center' }}>
                    <div className={style.cardDia}>
                      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <h1 style={{ color: '#0061DF', fontSize: '2.4vh' }}>{p.plan}</h1>
                        <p style={{ color: '#0D263B', fontWeight: '500', fontSize: '2.3vh' }}>{p.precio}</p>
                        <p style={{ color: '#0D263B', fontWeight: '400', fontSize: '1.8vh' }}>por mes</p>
                      </div>


                      {
                        p.plan === "Gratis" ?
                          <>

                            <div style={{ paddingBottom: '0vh', fontSize: '1.8vh' }}>
                              <p>✔️ ¡30 días de prueba gratis!</p>
                              <p>✔️ 365 días de publicación</p>
                              <p>✔️ Envío de hasta 2  familias interesadas por mes</p>
                              <p>✔️ 3  fotos del centro educativo en la plataforma</p>
                              <p>✔️ Soporte operativo disponible</p>
                            </div>

                            <div style={{ padding: '1vh' }}>
                              <Button onClick={(e) => handleChange(e, p.plan)} sx={{ textAlign: 'center', height: '6vh', padding: '2vh', width: '100%', borderRadius: '8px', fontSize: '1.4vh' }} variant="contained">¡Quiero el plan {p.plan}!</Button>
                            </div>
                          </>
                          : p.plan === "Básico" ?
                            <>
                              <div style={{ paddingBottom: '0vh', fontSize: '1.8vh' }}>

                                <p>✔️ ¡30 días de prueba gratis!</p>
                                <p>✔️ 365 días de publicación</p>
                                <p>✔️ Envío de hasta 25 familias interesadas por mes</p>
                                <p>✔️ 15 fotos del centro educativo en la plataforma</p>
                                <p>✔️ Soporte operativo disponible</p>
                              </div>

                              <div style={{ padding: '1vh' }}>
                                <Button onClick={(e) => handleChange(e, p.plan)} sx={{ textAlign: 'center', height: '6vh', padding: '2vh', width: '100%', borderRadius: '8px', fontSize: '1.4vh' }} variant="contained">¡Quiero el plan  {p.plan}!</Button>
                              </div>
                            </>

                            : p.plan === "Estándar" ?
                              <>
                                <div style={{ paddingBottom: '0vh', fontSize: '1.8vh' }}>
                                  <p>✔️ ¡30 días de prueba gratis!</p>
                                  <p>✔️ 365 días de publicación</p>
                                  <p>✔️ Envío de hasta 50 familias interesadas por mes</p>
                                  <p>✔️ 30 fotos del centro educativo en la plataforma</p>
                                  <p>✔️ Soporte operativo disponible</p>
                                </div>

                                <div style={{ padding: '1vh' }}>
                                  <Button onClick={(e) => handleChange(e, p.plan)} sx={{ textAlign: 'center', height: '6vh', padding: '2vh', width: '100%', borderRadius: '8px', fontSize: '1.4vh' }} variant="contained">¡Quiero el plan {p.plan}!</Button>
                                </div>
                              </>
                              : p.plan === "Exclusivo" ?
                                <>
                                  <div style={{ paddingBottom: '0vh', fontSize: '1.8vh' }}>
                                    <p>✔️ ¡30 días de prueba gratis!</p>
                                    <p>✔️ 365 días de publicación</p>
                                    <p>✔️ Envío ilimitado de familias interesadas por mes</p>
                                    <p>✔️ 50 fotos del centro educativo en la plataforma</p>
                                    <p>✔️ Soporte operativo disponible</p>
                                  </div>

                                  <div style={{ padding: '1vh' }}>
                                    <Button onClick={(e) => handleChange(e, p.plan)} sx={{ textAlign: 'center', height: '6vh', padding: '2vh', width: '100%', borderRadius: '8px', fontSize: '1.4vh' }} variant="contained">¡Quiero el plan {p.plan}!</Button>
                                  </div>
                                </>
                                : null
                      }


                    </div></div>
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


{/* <SecCitas/> */ }
{/* <motion.div className={style.slider_container}>
      <motion.div className={style.slider} drag='x'
        dragConstraints={{ right: 0, left: -428 }} >
        <div style={{ display: 'flex', gap: '1vh', width: '100%' }}>

          {mockPLanes?.map((p) => {
            return (
              <>
                <div className={style.cardDia}>
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h1 style={{ color: '#0061DF', fontSize: '2.4vh' }}>{p.plan}</h1>
                    <p style={{ color: '#0D263B', fontWeight: '500', fontSize: '2.3vh' }}>{p.precio}</p>
                    <p style={{ color: '#0D263B', fontWeight: '400', fontSize: '1.8vh' }}>por mes</p>
                  </div>

                  <div style={{ display: 'felx', paddingTop: '1vh', height: '100%', flexDirection: 'column', alignItems: 'flex-start' }}>
                    {
                      p.plan === "Free" ?
                        <>

                          <div style={{ paddingBottom: '0vh' }}>
                            <p>✔️ ¡30 días de prueba gratis!</p>
                            <p>✔️ 365 días de publicación</p>
                            <p>✔️ Envío de hasta 2  familias interesadas por mes</p>
                            <p>✔️ 3  fotos del centro educativo en la plataforma</p>
                            <p>✔️ Soporte operativo disponible</p>
                          </div>

                          <div style={{ padding: '1vh' }}>
                            <Button sx={{ textAlign: 'center', height: '6vh', padding: '2vh', width: '100%', borderRadius: '8px', fontSize: '1.4vh' }} variant="contained">¡Quiero el plan {p.plan}!</Button>
                          </div>
                        </>
                        : p.plan === "Básico" ?
                          <>
                            <p>✔️ ¡30 días de prueba gratis!</p>
                            <p>✔️ 365 días de publicación</p>
                            <p>✔️ Envío de hasta 25 familias interesadas por mes</p>
                            <p>✔️ 15 fotos del centro educativo en la plataforma</p>
                            <p>✔️ Soporte operativo disponible</p>
                            <div style={{ padding: '1vh' }}>
                              <Button sx={{ textAlign: 'center', height: '6vh', padding: '2vh', width: '100%', borderRadius: '8px', fontSize: '1.4vh' }} variant="contained">¡Quiero el plan {p.plan}!</Button>
                            </div>
                          </>

                          : p.plan === "Estándar" ?
                            <>
                              <p>✔️ ¡30 días de prueba gratis!</p>
                              <p>✔️ 365 días de publicación</p>
                              <p>✔️ Envío de hasta 50 familias interesadas por mes</p>
                              <p>✔️ 30 fotos del centro educativo en la plataforma</p>
                              <p>✔️ Soporte operativo disponible</p>
                              <div style={{ padding: '1vh' }}>
                                <Button sx={{ textAlign: 'center', height: '6vh', padding: '2vh', width: '100%', borderRadius: '8px', fontSize: '1.4vh' }} variant="contained">¡Quiero el plan {p.plan}!</Button>
                              </div>
                            </>
                            : p.plan === "Premium" ?
                              <>
                                <p>✔️ ¡30 días de prueba gratis!</p>
                                <p>✔️ 365 días de publicación</p>
                                <p>✔️ Envío ilimitado de familias interesadas por mes</p>
                                <p>✔️ 50 fotos del centro educativo en la plataforma</p>
                                <p>✔️ Soporte operativo disponible</p>
                                <div style={{ padding: '1vh' }}>
                                  <Button sx={{ textAlign: 'center', height: '6vh', padding: '2vh', width: '100%', borderRadius: '8px', fontSize: '1.4vh' }} variant="contained">¡Quiero el plan {p.plan}!</Button>
                                </div>
                              </>
                              : null
                    }
                  </div>

                </div>
              </>
            );
          })
          }


        </div>

      </motion.div>

    </motion.div> */}