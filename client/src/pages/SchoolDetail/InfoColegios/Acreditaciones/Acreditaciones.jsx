import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAcreditaciones } from '../../../../redux/SchoolsActions';

export default function Acreditaciones() {
    const dispatch = useDispatch()
    const { oneSchool,Acre } = useSelector(
        (state) => state.schools
    );
   

    useEffect(() => {
        dispatch( getAcreditaciones(oneSchool?.id))
    }, [])
console.log(Acre[0].Afiliacions)
    return (
        <div className=" bg-white flex flex-col gap-5 rounded-md ">
            <h2 className="font-semibold  text-[#0D263B] text-[2.4vh]">
                Acreditaciones / Certificaciones / Asosiaciones
            </h2>
            <div className="flex text-xs w-full gap-5">
                <ul className="grid grid-cols-2 gap-y-5 gap-x-3">
                    {Acre[0]?.Afiliacions?.map((ac) => (
                        <li className="text-black/60 flex items-center gap-3">
                            <img src={ac.logo} alt="" className="w-6" />
                            {ac.nombre_afiliacion}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    )
}
