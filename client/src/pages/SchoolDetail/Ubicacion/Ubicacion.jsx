import React, { useEffect, useState } from "react";
import Maps from "../../../components/Maps";
import { useSelector } from "react-redux";

export default function Ubicacion() {
  const { oneSchool } = useSelector((state) => state.schools);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  useEffect(() => {
    if (oneSchool.ubicacion) {
      setLat(JSON.parse(oneSchool?.ubicacion)?.lat);
      setLng(JSON.parse(oneSchool?.ubicacion)?.lng);
    }
  }, [oneSchool]);

  return (
    <>
      <div className="p-5 bg-white flex flex-col  gap-5  rounded-md ">
        <h2 className="font-semibold  text-[#0D263B] text-[2.4vh]">
          Ubicación
        </h2>
        <div className=" p-3 flex flex-col  lg:flex-row  text-xs w-full justify-between">
          <div className="text-text-[#0D263B] gap-2  flex-col">
            <p className="font-semibold text-black ">Dirección: </p >
            {oneSchool.direccion}
          </div>
          <div className="text-text-[#0D263B] gap-2">
            <p className="font-semibold text-black ">Departamento: </p >
            {oneSchool?.Departamento?.nombre_departamento}
          </div>
          <div className="text-text-[#0D263B] gap-2">
            <p className="font-semibold text-black ">Distrito: </p >
            {oneSchool?.Distrito?.nombre_distrito}
          </div>

          <div className="text-text-[#0D263B] flex-col gap-2">
            <p className="font-semibold text-black ">Provincia </p >
            {oneSchool?.Provincium?.nombre_provincia}
          </div>
          <div className="text-text-[#0D263B] gap-2">
            <p className="font-semibold text-black ">Pais </p >
            Peru
          </div>
        </div>
      </div>
      <div className="p-5 shadow-md">
        <Maps lat={lat} lng={lng} />
      </div>
    </>
  );
}
