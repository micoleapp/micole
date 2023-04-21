import React, { useEffect, useState } from 'react'
// import { a11yProps, TabPanel } from '../../../components/Tabs';
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { a11yProps, TabPanel } from '../../../../components/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import { getInfra } from '../../../../redux/SchoolsActions';
export default function Infraestructura() {
    const [value, setValue] = useState(0);
    const dispatch = useDispatch()
    const handleChange = (event, newValue) => {
        setValue(newValue);

    };

    const { oneSchool, grados, horariosColegio ,infraestructura,infraSH} = useSelector(
        (state) => state.schools
    );
    let infraColegio = infraSH&&Object.assign({}, ...infraSH);
    let infra = Array.from(
        new Set(infraColegio?.Infraestructuras?.map((e) => e.InfraestructuraTipoId))
    );


    useEffect(() => {

        dispatch(getInfra(oneSchool?.id))

      
    }, [])
console.log(infraColegio?.Infraestructuras)
    return (
        <div className=" p-5 bg-white flex flex-col gap-5 shadow-md rounded-md ">
            <h2 className=" pl-5 font-semibold  text-[#0D263B] text-[2.4vh]">Infraestructura</h2>

            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
            >
                {infra.map((e) => (
                    <Tab
                        style={{
                            fontSize: "1.6vh",
                            fontFamily: "Poppins",
                            textTransform: "capitalize",
                        }}
                        label={
                            e === 1
                                ? "Administrativo"
                                : e === 2
                                    ? "Artistica"
                                    : e === 3
                                        ? "Deportiva"
                                        : e === 4
                                            ? "Enseñanza"
                                            : e === 5
                                                ? "Laboratorio"
                                                : null
                        }
                        {...a11yProps(e)}
                    />
                ))}
            </Tabs>

            <div className="text-[1.2vh] flex w-full justify-center">
                {infraColegio?.Infraestructuras?.some(
                    (e) => e.InfraestructuraTipoId === 1
                ) && (
                        <TabPanel value={value} index={0}>
                            <ul className="grid grid-cols-3 w-full gap-x-10 gap-y-5">
                                {infraColegio?.Infraestructuras?.filter(
                                    (e) => e.InfraestructuraTipoId === 1
                                ).map((e) => (
                                    <li className="flex items-center gap-3">
                                        {e.imagen.length > 0 ? (
                                            <img
                                                src={e.imagen}
                                                alt={e.nombre_infraestructura}
                                                className="w-5"
                                            />
                                        ) : (
                                            <img
                                                src="https://es.digi.com/getattachment/products/networking/infrastructure-management/icon-im-usbconnectivity.png"
                                                alt={e.nombre_infraestructura}
                                                className="w-5"
                                            />
                                        )}
                                        {e.nombre_infraestructura}
                                    </li>
                                ))}
                            </ul>
                        </TabPanel>
                    )}
                {infraColegio?.Infraestructuras?.some(
                    (e) => e.InfraestructuraTipoId === 2
                ) && (
                        <TabPanel value={value} index={1}>
                            <ul className="grid grid-cols-3 w-full gap-x-10 gap-y-5">
                                {infraColegio?.Infraestructuras?.filter(
                                    (e) => e.InfraestructuraTipoId === 2
                                ).map((e) => (
                                    <li className="flex items-center gap-3">
                                        {e.imagen.length > 0 ? (
                                            <img
                                                src={e.imagen}
                                                alt={e.nombre_infraestructura}
                                                className="w-5"
                                            />
                                        ) : (
                                            <img
                                                src="https://es.digi.com/getattachment/products/networking/infrastructure-management/icon-im-usbconnectivity.png"
                                                alt={e.nombre_infraestructura}
                                                className="w-5"
                                            />
                                        )}
                                        {e.nombre_infraestructura}
                                    </li>
                                ))}
                            </ul>
                        </TabPanel>
                    )}
                {infraColegio?.Infraestructuras?.some(
                    (e) => e.InfraestructuraTipoId === 3
                ) && (
                        <TabPanel value={value} index={2}>
                            <ul className="grid grid-cols-3 w-full gap-x-10 gap-y-5">
                                {infraColegio?.Infraestructuras?.filter(
                                    (e) => e.InfraestructuraTipoId === 3
                                ).map((e) => (
                                    <li className="flex items-center gap-3">
                                        {e.imagen.length > 0 ? (
                                            <img
                                                src={e.imagen}
                                                alt={e.nombre_infraestructura}
                                                className="w-5"
                                            />
                                        ) : (
                                            <img
                                                src="https://es.digi.com/getattachment/products/networking/infrastructure-management/icon-im-usbconnectivity.png"
                                                alt={e.nombre_infraestructura}
                                                className="w-5"
                                            />
                                        )}
                                        {e.nombre_infraestructura}
                                    </li>
                                ))}
                            </ul>
                        </TabPanel>
                    )}
                {infraColegio?.Infraestructuras?.some(
                    (e) => e.InfraestructuraTipoId === 4
                ) && (
                        <TabPanel value={value} index={3}>
                            <ul className="grid grid-cols-3 w-full gap-x-10 gap-y-5">
                                {infraColegio?.Infraestructuras?.filter(
                                    (e) => e.InfraestructuraTipoId === 4
                                ).map((e) => (
                                    <li className="flex items-center gap-3">
                                        {e.imagen.length > 0 ? (
                                            <img
                                                src={e.imagen}
                                                alt={e.nombre_infraestructura}
                                                className="w-5"
                                            />
                                        ) : (
                                            <img
                                                src="https://es.digi.com/getattachment/products/networking/infrastructure-management/icon-im-usbconnectivity.png"
                                                alt={e.nombre_infraestructura}
                                                className="w-5"
                                            />
                                        )}
                                        {e.nombre_infraestructura}
                                    </li>
                                ))}
                            </ul>
                        </TabPanel>
                    )}
                {infraColegio?.Infraestructuras?.some(
                    (e) => e.InfraestructuraTipoId === 5
                ) && (
                        <TabPanel value={value} index={4}>
                            <ul className="grid grid-cols-3 w-full gap-x-10 gap-y-5">
                                {infraColegio?.Infraestructuras?.filter(
                                    (e) => e.InfraestructuraTipoId === 5
                                ).map((e) => (
                                    <li className="flex items-center gap-3">
                                        {e.imagen.length > 0 ? (
                                            <img
                                                src={e.imagen}
                                                alt={e.nombre_infraestructura}
                                                className="w-5"
                                            />
                                        ) : (
                                            <img
                                                src="https://es.digi.com/getattachment/products/networking/infrastructure-management/icon-im-usbconnectivity.png"
                                                alt={e.nombre_infraestructura}
                                                className="w-5"
                                            />
                                        )}

                                        {e.nombre_infraestructura}
                                    </li>
                                ))}
                            </ul>
                        </TabPanel>
                    )}

            </div>
        </div>
    )
}
