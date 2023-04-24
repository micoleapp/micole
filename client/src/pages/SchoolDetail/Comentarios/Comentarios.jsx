import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import SwalProp from '../../../exports/SwalProp';
import { Card, Rating } from "@mui/material";
export default function Comentarios({id}) {
    const { user, isAuth } = useSelector((state) => state.auth);

    const [ratingNivel, setRatingNivel] = useState(0);
    const [ratingAtencion, setRatingAtencion] = useState(0);
    const [ratingInfraestructura, setRatingInfraestructura] = useState(0);
    const [ratingUbicacion, setRatingUbicacion] = useState(0);
    const [ratingLimpieza, setRatingLimpieza] = useState(0);
    const [ratingPrecio, setRatingPrecio] = useState(0);

    const [comentario, setComentario] = useState({
        rating: 0,
        nombre: "",
        email: "",
        comentario: "",
    });
    //2
    useEffect(() => {
 
        setComentario({
            ...comentario,
            rating: Number(
                (
                    (ratingNivel +
                        ratingAtencion +
                        ratingInfraestructura +
                        ratingUbicacion +
                        ratingLimpieza +
                        ratingPrecio) /
                    6
                ).toFixed(2)
            ),
        });
    }, [
        ratingNivel,
        ratingAtencion,
        ratingInfraestructura,
        ratingUbicacion,
        ratingLimpieza,
        ratingPrecio,
    ]);

    useEffect(() => {
        if (isAuth) {
            setComentario({ ...comentario, nombre: user.nombre_responsable + " " + user.apellidos_responsable, email: user.email })
        
        }

    }, [isAuth]);


    const comentarioSubmit = (e) => {
        e.preventDefault();
        if (!isAuth) {
            Swal.fire({
                icon: "info",
                title: "Inicia Sesion",
                text: "Debes iniciar sesion o registrarte para comentar",

                confirmButtonText: "Iniciar Sesion",

            }).then(res => {
                if (res.isConfirmed) {
                    setOpenLogin(true);
                }
            });
            // setOpenLogin(true);
            return;
        }
        if (
            comentario.rating === 0.0
        ) {
            SwalProp({
                status: false,
                title: "Ups!...",
                text: "Debes calificar el colegio para poder comentar",
            })
            return
        }
        if (localStorage.getItem("id") === id) {
            SwalProp({
                status: false,
                title: "Error!",
                text: "No puedes comentar mas de una vez"});
            return;
        }
        try {
            axios
                .post("/reviews", { ...comentario, ColegioId: id })
                .then((res) => {
                    SwalProp({
                        status: true,
                        title: "Gracias por tu comentario!",
                        text: "Tu comentario ha sido enviado",
                        }
                    );
                    localStorage.setItem("id", id);
                })
                .catch((err) => {
                    SwalProp({
                        status: false,
                        title:"Ups!..." ,
                        text: "Algo salió mal"});
                });
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <form
            className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md w-full"
            onSubmit={comentarioSubmit}
        >
            <h2 className="font-semibold  text-[#0D263B] text-[2.4vh]">Deja tu comentario</h2>
            <div className="flex flex-col lg:grid grid-cols-2 text-black/70">
                <div>
                    <h2>Nivel de enseñanza</h2>
                    <Rating
                        name="simple-controlled"
                        value={ratingNivel}
                        max={5}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setRatingNivel(newValue);
                        }}
                    />
                </div>
                <div>
                    <h2>Atención al cliente</h2>
                    <Rating
                        name="simple-controlled"
                        value={ratingAtencion}
                        max={5}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setRatingAtencion(newValue);
                        }}
                    />
                </div>
                <div>
                    <h2>Infraestructura</h2>
                    <Rating
                        name="simple-controlled"
                        value={ratingInfraestructura}
                        max={5}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setRatingInfraestructura(newValue);
                        }}
                    />
                </div>
                <div>
                    <h2>Ubicación</h2>
                    <Rating
                        name="simple-controlled"
                        value={ratingUbicacion}
                        max={5}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setRatingUbicacion(newValue);
                        }}
                    />
                </div>
                <div>
                    <h2>Limpieza</h2>
                    <Rating
                        name="simple-controlled"
                        value={ratingLimpieza}
                        max={5}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setRatingLimpieza(newValue);
                        }}
                    />
                </div>
                <div>
                    <h2>Precio</h2>
                    <Rating
                        name="simple-controlled"
                        value={ratingPrecio}
                        max={5}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setRatingPrecio(newValue);
                        }}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center border py-1">
                <h2>Calificación promedio: </h2>
                <Rating
                    id="rating"
                    name="simple-controlled"
                    value={
                        (ratingNivel +
                            ratingAtencion +
                            ratingInfraestructura +
                            ratingUbicacion +
                            ratingLimpieza +
                            ratingPrecio) /
                        6
                    }
                    max={5}
                    precision={0.5}
                    readOnly
                />
            </div>
            <div className="flex w-full gap-5 justify-between">
                {isAuth ? (
                    <input
                        name="nameComentario"
                        type="text"
                        className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                        placeholder="Nombre"
                        value={user?.nombre_responsable + " " + user?.apellidos_responsable}
                        required
                        onChange={(e) => {
                            setComentario({
                                ...comentario,
                                nombre: e.target.value,
                            });
                        }}
                    />
                ) : (
                    <input
                        name="nameComentario"
                        type="text"
                        className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                        placeholder="Nombre y apellido"
                        required
                        onChange={(e) => {
                            setComentario({
                                ...comentario,
                                nombre: e.target.value,
                            });
                        }}
                    />
                )}
                {isAuth ? (
                    <input
                        name="email"
                        type="email"
                        required
                        value={user?.email}
                        className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                        placeholder="Email"
                        onChange={(e) => {
                            setComentario({
                                ...comentario,
                                email: e.target.value,
                            });
                        }}
                    />
                ) : (

                    <input
                        name="email"
                        type="email"
                        required
                        className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                        placeholder="Email"
                        onChange={(e) => {
                            setComentario({
                                ...comentario,
                                email: e.target.value,
                            });
                        }}
                    />
                )}
            </div>
            <textarea
                name="comentario"
                type="text"
                required
                className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                placeholder="Escribe tu comentario"
                rows={5}
                onChange={(e) => {
                    setComentario({
                        ...comentario,
                        comentario: e.target.value,
                    });
                }}
            />
            <button
                type="submit"
                className="p-3 bg-[#0061dd] text-white rounded-md hover:bg-[#0759c3] duration-300"
            >
                Enviar reseña
            </button>
        </form>
    )
}
