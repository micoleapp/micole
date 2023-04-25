import axios from 'axios';
import React, { useState } from 'react'
import SecCitas from '../../../components/SchoolDetail-CITAS/SecCitas';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import SwalProp from '../../../exports/SwalProp';
import ModalLogin from '../../../components/ModalLogin/ModalLogin';
import { postCita } from '../../../redux/SchoolsActions';
import style from "../../SchoolD.module.css"
import { Link } from 'react-router-dom';

export default function CitasD({ ingresoParams, nombre_grado }) {
    const dispatch = useDispatch()
    const { user, isAuth } = useSelector((state) => state.auth);
    const [modo, setModo] = React.useState(true);
    const [openLogin, setOpenLogin] = useState(false);
    const [cita, setCita] = React.useState({
        date: "",
        time: "",
        modo: modo ? "Presencial" : "Virtual",
        nombre: isAuth ? user.nombre_responsable + " " + user?.apellidos_responsable : "",

        celular: isAuth ? user.telefono : "",
        correo: isAuth ? user.email : "",
        añoIngreso: ingresoParams,
        grado: nombre_grado
    });

    function handleChangeDateHS(data) {
        console.log(data)
        if (data.select === true) {
            setCita({
                ...cita,
                date: data.date,
                time: data.time
            });
        }







    }
    const handleSubmit = (e) => {
        e.preventDefault();



        if (
            cita.time === "" ||
            cita.date === "" ||
            e.target["nombre"].value === "" ||
            e.target["cel"].value === "" ||
            e.target["email"].value === ""
        ) {
            SwalProp({
                status: false,
                title: "Ups...",
                text: "Debes llenar todos los datos para continuar",
            });
            return;
        }
        if (isAuth) {

            console.log(cita);

            dispatch(postCita(cita));
        } else {

            Swal.fire({
                icon: "info",
                title: "Inicia Sesion",
                text: "Debes iniciar sesion o registrarte",

                confirmButtonText: "Iniciar Sesion",

            }).then(res => {
                if (res.isConfirmed) {
                    setOpenLogin(true);
                }
            });

            return;

        }
    };

    const handleModo = () => {
        setModo(!modo);
        setCita({
            ...cita,
            modo: !modo ? "Presencial" : "Virtual",
        });
    };

    // useEffect(() => {
    //     setCita({
    //       ...cita,
    //       grado: nombre_grado
    //     })
    //   }, [nombre_grado])
    return (
        <>
            <div className=" bg-white flex flex-col gap-5 rounded-md  w-full">
                <h2 className="font-semibold  text-[#0D263B] text-[2.4vh]">Solicitar una visita</h2>
                <div className={style.divSwipperCitas}>
                    <SecCitas sendDateHs={handleChangeDateHS} />
                </div>

                {/* FORMULARIO DE LA CITA */}
                <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-7"
                >
                    <div className="flex gap-5">
                        <input
                            type="button"
                            value={"Presencial"}
                            className={`border w-[120px] ${modo ? "bg-[#0061dd] text-white" : "cursor-pointer"
                                } py-2 rounded-md shadow-lg duration-300`}
                            onClick={handleModo}
                            disabled={modo}
                        />
                        <input
                            type="button"
                            value={"Virtual"}
                            className={`border w-[120px] py-2 rounded-md shadow-lg ${!modo ? "bg-[#0061dd] text-white" : "cursor-pointer"
                                } duration-300`}
                            onClick={handleModo}
                            disabled={!modo}
                        />
                    </div>
                    <div className="flex w-full gap-5 justify-between">
                        {
                            isAuth ?
                                <input
                                    name="nombre"
                                    type="text"
                                    value={user?.nombre_responsable + " " + user?.apellidos_responsable}
                                    className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                                    placeholder="Nombre"
                                    onChange={(e) => {
                                        setCita({ ...cita, nombre: e.target.value });
                                    }}
                                    required
                                />
                                :
                                <input
                                    name="nombre"
                                    type="text"

                                    className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                                    placeholder="Nombre"
                                    onChange={(e) => {
                                        setCita({ ...cita, nombre: e.target.value });
                                    }}
                                    required
                                />
                        }
                        <input
                            name="cel"
                            type="number"
                            pattern="[0-9]{8,15}"
                            value={user?.telefono}
                            required
                            title="Solo se permiten numeros y entre 8 y 10 caracteres"
                            className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                            placeholder="Celular"
                            onChange={(e) => {
                                setCita({ ...cita, celular: Number(e.target.value) });
                            }}
                        />
                    </div>
                    <input
                        name="email"
                        type="email"
                        value={user?.email}
                        className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                        placeholder="Correo"
                        onChange={(e) => {
                            setCita({ ...cita, correo: e.target.value });
                        }}
                        required
                    />
                    <button
                        type="submit"
                        value="Virtual"
                        className="border mt-5 mx-auto px-10 py-2 rounded-md shadow-lg bg-[#0061dd] text-white duration-300 cursor-pointer"
                    >
                        SOLICITAR VISITA
                    </button>
                </form>
                <p className="text-sm p-10">
                    Al enviar estás aceptando los{" "}
                    <Link className="text-[#0061dd] hover:underline">
                        Términos y Condiciones de Uso y la Política de Privacidad
                    </Link>
                </p>
            </div>

            {openLogin && <ModalLogin handlerClose={setOpenLogin} />}
        </>

    )
}
