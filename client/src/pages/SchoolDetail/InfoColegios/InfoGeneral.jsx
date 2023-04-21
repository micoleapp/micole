import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUsers,
    faCalendar,
    faSchool,
} from "@fortawesome/free-solid-svg-icons";
export default function InfoGeneral() {

    const { oneSchool } = useSelector(
        (state) => state.schools
    );



    return (
        <section className=" p-5 left flex flex-col gap-8 w-full shadow-md">

            <div className="  bg-white flex flex-col gap-2 rounded-md ">
                <h2 className="font-semibold text-[#0D263B] text-[2.4vh] text-xl">Descripción</h2>
                <p className=" text-[#696969] text-[1.8vh] ">{oneSchool.descripcion}</p>
            </div>
            <div className="bg-white flex flex-col gap-2 rounded-md ">
                <h2 className="font-semibold  text-[#0D263B] text-[2.4vh]">
                Propuesta Valor Educativa
                </h2>
                <p className=" text-[#696969] text-[1.8vh] ">
                    {oneSchool.propuesta_valor}
                </p>
            </div>
     

            <div className=" bg-white flex flex-col gap-5 rounded-md ">
                <h2 className="font-semibold  text-[#0D263B] text-[2.4vh]">Detalles del Colegio</h2>
                <div className="flex text-xs w-full flex-col lg:flex-row gap-3 justify-between">
                    <ul className="grid grid-cols-3 w-full gap-3">
                        <li className="text-text-[#0D263B] gap-2">
                            <span className="font-semibold text-black ">RUC: </span>
                            {oneSchool.ruc}
                        </li>
                        <li className="text-text-[#0D263B] gap-2">
                            <span className="font-semibold text-black ">Area: </span>
                            {oneSchool.area}
                        </li>
                        <li className="text-text-[#0D263B] gap-2">
                            <span className="font-semibold text-black ">
                                Fundación:{" "}
                            </span>
                            {oneSchool.fecha_fundacion}
                        </li>
                        <li className="text-text-[#0D263B] gap-2">
                            <span className="font-semibold text-black ">Niveles: </span>
                            {oneSchool.Nivels?.map((nivel) => nivel.nombre_nivel).join(
                                ", "
                            )}
                        </li>
                        <li className="text-text-[#0D263B] gap-2">
                            <span className="font-semibold text-black ">
                                Director:{" "}
                            </span>
                            {oneSchool.nombre_director}
                        </li>
                    </ul>
                    <ul className="flex flex-col gap-3">

                    </ul>

                </div>
                {oneSchool?.Metodos?.length > 0 && (
                    <>
                        <h2 className="font-semibold text-lg">
                            Metodos de aprendizaje
                        </h2>
                        <div className="flex flex-wrap gap-5">
                            {oneSchool?.Metodos?.map((metodo) => (
                                <p className="flex gap-2 items-center text-sm">
                                    {" "}
                                    <BsPinAngle className="text-[#0061dd]" />{" "}
                                    {metodo.nombre_metodo}{" "}
                                </p>
                            ))}
                        </div>
                    </>
                )}
                {oneSchool?.Dificultades?.length > 0 && (
                    <>
                        <h2 className="font-semibold text-lg">
                            Metodos de aprendizaje
                        </h2>
                        <div className="flex flex-wrap gap-5">
                            {oneSchool?.Dificultades?.map((dif) => (
                                <p className="flex gap-2 items-center text-sm">
                                    {" "}
                                    <BsPinAngle className="text-[#0061dd]" />{" "}
                                    {dif.nombre_dificultad}{" "}
                                </p>
                            ))}
                        </div>
                    </>
                )}
            </div>

           
    


        </section>
    )
}
