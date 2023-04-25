import React, { useState } from "react";
import style from "./swDetail.module.css";

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
import { useSelector } from "react-redux";


export default function SwDetail() {
    // galeria_fotos(pin):"[ "https://via.placeholder.com/400x300.png?text=Colegio+1",
    //  "https://via.placeholder.com/400x300.png?text=Colegio+2",
    //  "https://via.placeholder.com/400x300.png?text=Colegio+3"]

    const { oneSchool } = useSelector(
        (state) => state.schools
    );
    const arrImg = oneSchool?.galeria_fotos !== null &&
        JSON.parse(oneSchool?.galeria_fotos).length > 0 && JSON.parse(oneSchool?.galeria_fotos)
    console.log(arrImg)
    arrImg.unshift(oneSchool?.primera_imagen)
    return (
        <>
            {/* <div className={style.divResponsiveDesktop}> */}
            <div className={style.slider_container}>
                <Swiper
                    modules={[EffectFade,Autoplay, Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={0}
                    slidesPerView={1}
                    effect={"fade"}
                    grabCursor={true}
                    rewind={true}
                    autoplay={{
                        delay: 3600,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    className={style.swiper}
                >
                    {arrImg?.map((f) => {
                        return (
                            <>
                                <SwiperSlide className={style.swiper_slide}>

                                    <img
                                        src={f}
                                        alt="banner"
                                        className="object-cover w-full h-[500px] h-full"
                                    />

                                </SwiperSlide>

                            </>
                        );
                    })
                    }
                </Swiper>

            </div>
            {/* </div> */}


        </>

    );
}
