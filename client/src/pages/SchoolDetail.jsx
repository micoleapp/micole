import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  clannDetailid,
  getAllGrados,
  getHorariosSchool,
  getSchoolDetail,
  postCita,
} from "../redux/SchoolsActions";
import CircularProgress from '@mui/material/CircularProgress'

import banner from "../assets/ejemplobanner.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/premium.png";
import Swal from "sweetalert2";

import {
  faDoorOpen,
  faHeart,
  faPaperclip,
  faShare,
  faUsers,
  faCalendar,
  faSchool,
  faChalkboard,
  faChildReaching,
  faVectorSquare,
  faFlask,
  faRobot,
  faGraduationCap,
  faRestroom,
  faHouseMedicalFlag,
  faCameraRotate,
} from "@fortawesome/free-solid-svg-icons";
import { BsPinAngle } from "react-icons/bs";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Maps from "../components/Maps";
import { a11yProps, TabPanel } from "../components/Tabs";
import { Card, Rating } from "@mui/material";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers";
import axios from "axios";
import { fontSize } from "@mui/system";
import style from "./SchoolD.module.css";
import { HiChevronDown } from "react-icons/hi";
import { HiChevronLeft } from "react-icons/hi";
import SwiperEventos from "../components/SwiperEventos/SwiperEventos";
import es_AM_PM from "../components/SwiperEventos/utils/horaFormat";
import ModalLogin from "../components/ModalLogin/ModalLogin";
import { setVacantesRedux } from "../redux/AuthActions";
import SliderC from "../components/SliderC";
import IconError from "../svg/IconError";
function QuiltedImageList({ firstImage, gallery, setImage,setImages }) {
  return (
    <div className="w-full px-4">
      <img
        src={firstImage}
        alt=""
        onClick={() => setImage(firstImage)}
        className="cursor-pointer rounded-md h-24"
      />
      <div className="flex gap-5 mt-2 overflow-x-scroll w-full pb-2">
        {gallery?.map((item, index) => (
          <img
            key={index}
            src={item}
            className="cursor-pointer z-25 object-cover h-24 rounded-md"
            onClick={() => setImages({open:true,src:gallery})}
          />
        ))}
      </div>
    </div>
  );
}

function SchoolDetail() {
  const { id } = useParams();
  const { oneSchool, grados, horariosColegio } = useSelector(
    (state) => state.schools
  );
  const [images,setImages] = useState({
    open:false,
    src:[]
  })

  const { user, isAuth, vacantes } = useSelector((state) => state.auth);
  console.log(horariosColegio);

  const location = useLocation();
  console.log();
  const params = new URLSearchParams(location.search);

  const [gradoParams, setGradoParams] = React.useState(params.get("grado"));
  console.log(gradoParams);
  const [ingresoParams, setIngresoParams] = React.useState(
    params.get("ingreso")
  );

  const [listaParams, setListaParams] = React.useState(params.get("lista"));

  console.log(gradoParams);
  console.log(grados);
  const nombre_grado = grados?.find(
    (grado) => grado.id == gradoParams
  )?.nombre_grado;
  const stringyDate = (date) => {
    if (date.toString().length === 1) {
      return "0" + date++;
    } else {
      return date;
    }
  };

  const [currentVacante, setCurrentVacante] = useState([]);

  useEffect(() => {
    dispatch(setVacantesRedux(id));
  }, []);
  useEffect(() => {
    if (vacantes.length > 0) {
      setCurrentVacante(
        vacantes?.filter(
          (vac) =>
            vac.GradoId === Number(gradoParams) &&
            vac.año === Number(ingresoParams)
        )
      );
    }
  }, [vacantes]);

  console.log(currentVacante);

  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  ///1

  useEffect(() => {
    dispatch(getAllGrados());
    dispatch(getSchoolDetail(id));
    dispatch(getHorariosSchool(id));
    return () => {
      dispatch(clannDetailid());
    };
  }, []);

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [date, setDate] = React.useState(dayjs(new Date()));
  const [time, setTime] = React.useState(dayjs("2014-08-18T08:00:00"));
  const handleChangeDate = (newValue) => {
    setDate(dayjs(newValue));
    setCita({
      ...cita,
      date: [
        stringyDate(newValue["$D"]).toString(),
        stringyDate(newValue["$M"] + 1).toString(),
        newValue["$y"].toString(),
      ].join("/"),
    });
  };
  const handleChangeTime = (newValue) => {
    setTime(dayjs(newValue));
    setCita({
      ...cita,
      time: [
        stringyDate(newValue["$H"]).toString(),
        stringyDate(newValue["$m"]).toString(),
      ].join(":"),
    });
  };
  const [modo, setModo] = React.useState(true);
  const [openLogin, setOpenLogin] = useState(false);

  const [cita, setCita] = React.useState({
    date: [
      stringyDate(dayjs(new Date()).$D).toString(),
      stringyDate(dayjs(new Date()).$M + 1).toString(),
      dayjs(new Date()).$y.toString(),
    ].join("/"),
    time: [
      stringyDate(dayjs(new Date()).$H).toString(),
      stringyDate(dayjs(new Date()).$m).toString(),
    ].join(":"),

    modo: modo ? "Presencial" : "Virtual",
    nombre: isAuth ? user.nombre_responsable +" "+ user?.apellidos_responsable: "",
    
    celular: isAuth ? user.telefono : "",
    correo: isAuth ? user.email : "",
    añoIngreso: ingresoParams,
    grado: nombre_grado
  });

  console.log(cita);
  // console.log( nombre_grado);


useEffect(() => {
setCita({
  ...cita,
  grado: nombre_grado
})
}, [nombre_grado])


  const handleSubmit = (e) => {
    e.preventDefault();

  

    if (
      e.target["nombre"].value === "" ||
      e.target["cel"].value === "" ||
      e.target["email"].value === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Algo salio mal",
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
          
        }).then(res=>{
          if(res.isConfirmed){
            setOpenLogin(true);
          }
        });
          // setOpenLogin(true);
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

  /*{
    "nombre": "Jorge Lopez",
      "email": "jlopez@gmail.com",
      "comentario": "Excelente Colegio...",
      "rating": 7.5,
      "ColegioId": "f2aba1d5-3d86-4c5b-b18c-0b1f30ef98f9"
}*/

  const comentarioSubmit = (e) => {
    e.preventDefault();
    if(!isAuth){
      Swal.fire({
        icon: "info",
        title: "Inicia Sesion",
        text: "Debes iniciar sesion o registrarte para comentar",

        confirmButtonText: "Iniciar Sesion",
        
      }).then(res=>{
        if(res.isConfirmed){
          setOpenLogin(true);
        }
      });
        // setOpenLogin(true);
      return;
    }
    if (
      comentario.rating === 0.0
    ) {
      Swal.fire({
        icon: "info",
        title: "Ups!...",
        text: "Debes calificar el colegio para poder comentar",
      })
      return
    }
    if (localStorage.getItem("id") === id) {
      Swal.fire("Error!", "No puedes comentar mas de una vez", "error");
      return;
    }
    try {
      axios
        .post("/reviews", { ...comentario, ColegioId: id })
        .then((res) => {
          Swal.fire(
            "Gracias por tu comentario!",
            "Tu comentario ha sido enviado",
            "success"
          );
          localStorage.setItem("id", id);
        })
        .catch((err) => {
          Swal.fire("Error!", "Ha ocurrido un error", "error");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const disableWeekends = (date, dayColegio) => {
    return date.day() === 0 || date.day() === 6;
  };
  const [Horarios, setHorarios] = useState(false);
  const toggleHorarios = () => {
    setHorarios(!Horarios);
  };

  let infra = Array.from(
    new Set(oneSchool?.Infraestructuras?.map((e) => e.InfraestructuraTipoId))
  );

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

    document.title = oneSchool?.nombre_colegio?.length > 0 ? oneSchool.nombre_colegio : "MiCole"

  useEffect(() => {
    if (oneSchool.ubicacion) {
      setLat(JSON.parse(oneSchool?.ubicacion)?.lat);
      setLng(JSON.parse(oneSchool?.ubicacion)?.lng);
    }
  }, [oneSchool]);

  const handleSubmitLista = (e) => {
    e.preventDefault();
    if (!isAuth) {
      Swal.fire({
        icon: "info",
        title: "Inicia Sesion",
        text: "Debes iniciar sesion o registrarte para comentar",

        confirmButtonText: "Iniciar Sesion",
        
      }).then(res=>{
        if(res.isConfirmed){
          setOpenLogin(true);
        }
      });
      return;
    } else {
      try {
        let data = {
          año: Number(ingresoParams),
          gradoId: Number(gradoParams),
          usuarioId: user?.id,
          colegioId: oneSchool?.id,
        };
        axios
          .post("/lista", data)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Lista creada exitosamente!",
              text: "Lista Agendada",
            });
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Algo salio mal",
              text: err.response.data.message,
            });
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(()=>{
    if(isAuth){
      setComentario({...comentario, nombre: user.nombre_responsable + " " + user.apellidos_responsable, email: user.email})
      setCita({...cita, nombre: user?.nombre_responsable + " " + user?.apellidos_responsable, correo: user?.email, celular:user?.telefono})
    }
  },[isAuth])

  return (
    <div className="bg-[#f6f7f8]">
      {images.open && <SliderC setImages={setImages} images={images.src}></SliderC>}
      {oneSchool?.primera_imagen?.length > 0 ?      <img
        src={oneSchool.primera_imagen}
        alt="banner"
        className="object-cover w-full h-[500px]"
      /> : <div className="w-full h-[500px] flex justify-center items-center">
                    <CircularProgress
              size="5rem"
              style={{ color: '#0061dd'}}
            />
      </div> }

      <div
        className="p-8 px-5 lg:px-[100px]"
        data-aos-mirror={false}
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="header">
          <h1 className="text-2xl  font-semibold">
            {oneSchool.nombre_colegio}
          </h1>
          <div>
            <div className="flex justify-between flex-col gap-5 lg:flex-row mt-2 lg:mt-0">
              <div className="flex gap-5 lg:items-center justify-center flex-col lg:flex-row text-black/70">
                <h2 className="text-center lg:text-start">
                  {oneSchool.direccion}{" "}
                </h2>
                <div className="flex gap-5 lg:flex-row flex-col justify-center w-full items-center">
                  <span className="bg-black/80 min-w-fit py-1 px-2 rounded-sm text-white text-sm flex items-center">
                    {currentVacante &&
                      Number(currentVacante[0]?.capacidad) -
                        Number(currentVacante[0]?.alumnos_matriculados)}{" "}
                    Vacantes
                  </span>
                  <span className="bg-black/80 min-w-fit py-1 px-2 rounded-sm text-white text-sm flex items-center">
                    {nombre_grado}
                  </span>
                  <span className="bg-black/80 min-w-fit py-1 px-2 rounded-sm text-white text-sm flex items-center">
                    {ingresoParams}
                  </span>
                </div>
              </div>
              <div className="flex  justify-center items-center gap-5 text-black/70">
                <span className="flex items-center gap-2">
                  {" "}
                  <FontAwesomeIcon
                    size="lg"
                    color="rgb(156 163 175)"
                    className="bg-white rounded-full p-3"
                    icon={faShare}
                  />
                  Compartir
                </span>
                <span className="flex items-center gap-2">
                  {" "}
                  <FontAwesomeIcon
                    size="lg"
                    className="bg-white rounded-full p-3"
                    color="rgb(156 163 175)"
                    icon={faHeart}
                  />
                  Favoritos
                </span>
              </div>
            </div>
          </div>
          <div className="mt-5 gap-5 flex justify-between items-start lg:items-center flex-col lg:flex-row">
            <div className="flex lg:flex-row w-full flex-col gap-5 items-center justify-center lg:justify-start lg:w-full lg:items-start">
              {" "}
              <div className="flex flex-col gap-2 text-center">
                <FontAwesomeIcon
                  size="lg"
                  color="rgb(156 163 175)"
                  icon={faUsers}
                />
                <span className="text-sm text-gray-400">
                  {oneSchool.numero_estudiantes} Alumnos
                </span>
              </div>
              {oneSchool?.Categoria?.map((cat) => (
                <div className="flex flex-col items-center gap-2 text-center">
                  <img
                    src={cat.logo_categoria}
                    alt="logo_categoria"
                    className="w-4 object-cover invert-[40%]"
                  />
                  <span className="text-sm text-gray-400">
                    {cat.nombre_categoria}{" "}
                  </span>
                </div>
              ))}
              {/* <div className="flex flex-col gap-2 text-center">
                <FontAwesomeIcon
                  size="lg"
                  color="rgb(156 163 175)"
                  icon={faDoorOpen}
                />
                <span className="text-sm text-gray-400">2 Salones</span>
              </div> */}
              <div className="flex flex-col gap-2 text-center">
                <FontAwesomeIcon
                  size="lg"
                  color="rgb(156 163 175)"
                  icon={faCalendar}
                />
                <span className="text-sm text-gray-400">
                  Fundación: {oneSchool.fecha_fundacion}{" "}
                </span>
              </div>
              <div className="flex flex-col gap-2 text-center">
                <FontAwesomeIcon
                  size="lg"
                  color="rgb(156 163 175)"
                  icon={faSchool}
                />
                <span className="text-sm text-gray-400">
                  UGEL: {oneSchool.ugel}{" "}
                </span>
              </div>
            </div>
            {currentVacante && (
              <div className="flex flex-col w-full items-center lg:items-end">
                <small>
                  Cuota de ingreso: S/{" "}
                  {currentVacante.length > 0 && currentVacante[0].cuota_ingreso}{" "}
                </small>
                <small>
                  Cuota de pensión: S/{" "}
                  {currentVacante.length > 0 && currentVacante[0].cuota_pension}
                </small>
                <small>
                  Cuota de matricula: S/{" "}
                  {currentVacante.length > 0 && currentVacante[0].matricula}
                </small>
              </div>
            )}
          </div>
        </div>
        <main className="flex gap-5 flex-col lg:flex-row">
          <section className="left mt-5 flex flex-col gap-8 w-full">
            <div className="p-5 bg-white flex flex-col gap-2 rounded-md shadow-md">
              <h2 className="font-semibold text-xl">Descripción</h2>
              <p className="text-black/60 text-base">{oneSchool.descripcion}</p>
            </div>
            <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md">
              <h2 className="font-semibold text-xl">Ubicación</h2>
              <div className="flex text-xs w-full justify-between">
                <ul className="flex flex-col gap-3">
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">
                      Dirección:{" "}
                    </span>
                    {oneSchool.direccion}
                  </li>
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">
                      Departamento:{" "}
                    </span>
                    {oneSchool?.Departamento?.nombre_departamento}
                  </li>
                </ul>
                <ul className="flex flex-col gap-3">
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">
                      Distrito:{" "}
                    </span>
                    {oneSchool?.Distrito?.nombre_distrito}
                  </li>
                  {/* <li className="text-black/60">
                    <span className="font-semibold text-black ">Zip: </span>
                    365448
                  </li> */}
                </ul>
                <ul className="flex flex-col gap-3">
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">
                      Provincia:{" "}
                    </span>
                    {oneSchool?.Provincium?.nombre_provincia}
                  </li>
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">Pais: </span>
                    Peru
                  </li>
                </ul>
              </div>
              <Maps lat={lat} lng={lng} />
            </div>
            <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md">
              <h2 className="font-semibold text-xl">Detalles del Colegio</h2>
              <div className="flex text-xs w-full flex-col lg:flex-row gap-3 justify-between">
                <ul className="grid grid-cols-3 w-full gap-3">
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">RUC: </span>
                    {oneSchool.ruc}
                  </li>
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">Area: </span>
                    {oneSchool.area}
                  </li>
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">
                      Fundación:{" "}
                    </span>
                    {oneSchool.fecha_fundacion}
                  </li>
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">Niveles: </span>
                    {oneSchool.Nivels?.map((nivel) => nivel.nombre_nivel).join(
                      ", "
                    )}
                  </li>
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">
                      Director:{" "}
                    </span>
                    {oneSchool.nombre_director}
                  </li>
                </ul>
                <ul className="flex flex-col gap-3">
                  {/* <li className="text-black/60">
                    <span className="font-semibold text-black ">
                      Profesores:{" "}
                    </span>
                    8
                  </li>
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">Salones: </span>
                    3
                  </li> */}
                </ul>
                {/* <ul className="flex flex-col gap-3">
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">
                      Tipo de educacion:{" "}
                    </span>
                    Escolarizada
                  </li>
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">Turnos: </span>
                    Mañana
                  </li>
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">
                      Localidad:{" "}
                    </span>
                    Urbana
                  </li>
                </ul> */}
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

            <div className="p-5 bg-white flex flex-col gap-2 rounded-md shadow-md">
              <h2 className="font-semibold text-xl">
                Propuesta Valor Educativo
              </h2>
              <p className="text-black/60 text-base">
                {oneSchool.propuesta_valor}
              </p>
            </div>
            <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md">
              <h2 className="font-semibold text-xl">Infraestructura</h2>
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
                      fontSize: "11px",
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

              <div className="text-sm flex w-full justify-center">
                {oneSchool?.Infraestructuras?.some(
                  (e) => e.InfraestructuraTipoId === 1
                ) && (
                  <TabPanel value={value} index={0}>
                    <ul className="grid grid-cols-3 w-full gap-x-10 gap-y-5">
                      {oneSchool?.Infraestructuras?.filter(
                        (e) => e.InfraestructuraTipoId === 1
                      ).map((e) => (
                        <li className="flex items-center gap-3">
                          {e.imagen.length > 0 ? (
                            <img
                              src={e.imagen}
                              alt={e.nombre_infraestructura}
                              className="w-10"
                            />
                          ) : (
                            <img
                              src="https://es.digi.com/getattachment/products/networking/infrastructure-management/icon-im-usbconnectivity.png"
                              alt={e.nombre_infraestructura}
                              className="w-10"
                            />
                          )}
                          {e.nombre_infraestructura}
                        </li>
                      ))}
                    </ul>
                  </TabPanel>
                )}
                {oneSchool?.Infraestructuras?.some(
                  (e) => e.InfraestructuraTipoId === 2
                ) && (
                  <TabPanel value={value} index={1}>
                    <ul className="grid grid-cols-3 w-full gap-x-10 gap-y-5">
                      {oneSchool?.Infraestructuras?.filter(
                        (e) => e.InfraestructuraTipoId === 2
                      ).map((e) => (
                        <li className="flex items-center gap-3">
                          {e.imagen.length > 0 ? (
                            <img
                              src={e.imagen}
                              alt={e.nombre_infraestructura}
                              className="w-10"
                            />
                          ) : (
                            <img
                              src="https://es.digi.com/getattachment/products/networking/infrastructure-management/icon-im-usbconnectivity.png"
                              alt={e.nombre_infraestructura}
                              className="w-10"
                            />
                          )}
                          {e.nombre_infraestructura}
                        </li>
                      ))}
                    </ul>
                  </TabPanel>
                )}
                {oneSchool?.Infraestructuras?.some(
                  (e) => e.InfraestructuraTipoId === 3
                ) && (
                  <TabPanel value={value} index={2}>
                    <ul className="grid grid-cols-3 w-full gap-x-10 gap-y-5">
                      {oneSchool?.Infraestructuras?.filter(
                        (e) => e.InfraestructuraTipoId === 3
                      ).map((e) => (
                        <li className="flex items-center gap-3">
                          {e.imagen.length > 0 ? (
                            <img
                              src={e.imagen}
                              alt={e.nombre_infraestructura}
                              className="w-10"
                            />
                          ) : (
                            <img
                              src="https://es.digi.com/getattachment/products/networking/infrastructure-management/icon-im-usbconnectivity.png"
                              alt={e.nombre_infraestructura}
                              className="w-10"
                            />
                          )}
                          {e.nombre_infraestructura}
                        </li>
                      ))}
                    </ul>
                  </TabPanel>
                )}
                {oneSchool?.Infraestructuras?.some(
                  (e) => e.InfraestructuraTipoId === 4
                ) && (
                  <TabPanel value={value} index={3}>
                    <ul className="grid grid-cols-3 w-full gap-x-10 gap-y-5">
                      {oneSchool?.Infraestructuras?.filter(
                        (e) => e.InfraestructuraTipoId === 4
                      ).map((e) => (
                        <li className="flex items-center gap-3">
                          {e.imagen.length > 0 ? (
                            <img
                              src={e.imagen}
                              alt={e.nombre_infraestructura}
                              className="w-10"
                            />
                          ) : (
                            <img
                              src="https://es.digi.com/getattachment/products/networking/infrastructure-management/icon-im-usbconnectivity.png"
                              alt={e.nombre_infraestructura}
                              className="w-10"
                            />
                          )}
                          {e.nombre_infraestructura}
                        </li>
                      ))}
                    </ul>
                  </TabPanel>
                )}
                {oneSchool?.Infraestructuras?.some(
                  (e) => e.InfraestructuraTipoId === 5
                ) && (
                  <TabPanel value={value} index={4}>
                    <ul className="grid grid-cols-3 w-full gap-x-10 gap-y-5">
                      {oneSchool?.Infraestructuras?.filter(
                        (e) => e.InfraestructuraTipoId === 5
                      ).map((e) => (
                        <li className="flex items-center gap-3">
                          {e.imagen.length > 0 ? (
                            <img
                              src={e.imagen}
                              alt={e.nombre_infraestructura}
                              className="w-10"
                            />
                          ) : (
                            <img
                              src="https://es.digi.com/getattachment/products/networking/infrastructure-management/icon-im-usbconnectivity.png"
                              alt={e.nombre_infraestructura}
                              className="w-10"
                            />
                          )}

                          {e.nombre_infraestructura}
                        </li>
                      ))}
                    </ul>
                  </TabPanel>
                )}
                {/* <TabPanel value={value} index={0}>
                  <ul className="flex flex-col gap-3">
                    <li className="flex items-center gap-2">
                      {" "}
                      <FontAwesomeIcon
                        size="lg"
                        color="rgb(156 163 175)"
                        className="bg-[#f6f7f8] rounded-full p-3"
                        icon={faChalkboard}
                      />
                      Pizarras acrilicas
                    </li>
                    <li className="flex items-center gap-2">
                      {" "}
                      <FontAwesomeIcon
                        size="lg"
                        color="rgb(156 163 175)"
                        className="bg-[#f6f7f8] rounded-full p-3"
                        icon={faChildReaching}
                      />
                      Area de juegos
                    </li>
                    <li className="flex items-center gap-2">
                      {" "}
                      <FontAwesomeIcon
                        size="lg"
                        color="rgb(156 163 175)"
                        className="bg-[#f6f7f8] rounded-full p-3"
                        icon={faVectorSquare}
                      />
                      Patio
                    </li>
                    <li className="flex items-center gap-2">
                      {" "}
                      <FontAwesomeIcon
                        size="lg"
                        color="rgb(156 163 175)"
                        className="bg-[#f6f7f8] rounded-full p-3"
                        icon={faFlask}
                      />
                      Laboratorio de Ciencias
                    </li>
                    <li className="flex items-center gap-2">
                      {" "}
                      <FontAwesomeIcon
                        size="lg"
                        color="rgb(156 163 175)"
                        className="bg-[#f6f7f8] rounded-full p-3"
                        icon={faRobot}
                      />
                      Laboratorio de Robotica
                    </li>
                  </ul>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <ul className="flex flex-col gap-3">
                    <li className="flex items-center gap-2">
                      {" "}
                      <FontAwesomeIcon
                        size="lg"
                        color="rgb(156 163 175)"
                        className="bg-[#f6f7f8] rounded-full p-3"
                        icon={faRestroom}
                      />
                      Baños
                    </li>
                    <li className="flex items-center gap-2">
                      {" "}
                      <FontAwesomeIcon
                        size="lg"
                        color="rgb(156 163 175)"
                        className="bg-[#f6f7f8] rounded-full p-3"
                        icon={faShare}
                      />
                      Compartir
                    </li>
                    <li className="flex items-center gap-2">
                      {" "}
                      <FontAwesomeIcon
                        size="lg"
                        color="rgb(156 163 175)"
                        className="bg-[#f6f7f8] rounded-full p-3"
                        icon={faShare}
                      />
                      Compartir
                    </li>
                    <li className="flex items-center gap-2">
                      {" "}
                      <FontAwesomeIcon
                        size="lg"
                        color="rgb(156 163 175)"
                        className="bg-[#f6f7f8] rounded-full p-3"
                        icon={faShare}
                      />
                      Compartir
                    </li>
                    <li className="flex items-center gap-2">
                      {" "}
                      <FontAwesomeIcon
                        size="lg"
                        color="rgb(156 163 175)"
                        className="bg-[#f6f7f8] rounded-full p-3"
                        icon={faShare}
                      />
                      Compartir
                    </li>
                  </ul>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <ul className="flex flex-col gap-3">
                    <li className="flex items-center gap-2">
                      {" "}
                      <FontAwesomeIcon
                        size="lg"
                        color="rgb(156 163 175)"
                        className="bg-[#f6f7f8] rounded-full p-3"
                        icon={faShare}
                      />
                      Compartir
                    </li>
                    <li className="flex items-center gap-2">
                      {" "}
                      <FontAwesomeIcon
                        size="lg"
                        color="rgb(156 163 175)"
                        className="bg-[#f6f7f8] rounded-full p-3"
                        icon={faShare}
                      />
                      Compartir
                    </li>
                    <li className="flex items-center gap-2">
                      {" "}
                      <FontAwesomeIcon
                        size="lg"
                        color="rgb(156 163 175)"
                        className="bg-[#f6f7f8] rounded-full p-3"
                        icon={faShare}
                      />
                      Compartir
                    </li>
                    <li className="flex items-center gap-2">
                      {" "}
                      <FontAwesomeIcon
                        size="lg"
                        color="rgb(156 163 175)"
                        className="bg-[#f6f7f8] rounded-full p-3"
                        icon={faShare}
                      />
                      Compartir
                    </li>
                    <li className="flex items-center gap-2">
                      {" "}
                      <FontAwesomeIcon
                        size="lg"
                        color="rgb(156 163 175)"
                        className="bg-[#f6f7f8] rounded-full p-3"
                        icon={faShare}
                      />
                      Compartir
                    </li>
                  </ul>
                </TabPanel> */}
              </div>
            </div>
            <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md">
              <h2 className="font-semibold text-xl">
                Acreditaciones / Certificaciones / Asosiaciones
              </h2>
              <div className="flex text-xs w-full gap-5">
                <ul className="grid grid-cols-2 gap-y-5 gap-x-3">
                  {oneSchool?.Afiliacions?.map((ac) => (
                    <li className="text-black/60 flex items-center gap-3">
                      <img src={ac.logo} alt="" className="w-10" />
                      {ac.nombre_afiliacion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* <div
              className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md"
              data-aos="zoom-in-right"
              data-aos-duration="1500"
              data-aos-mirror={false}
            >
              <h2 className="font-semibold text-xl">Lugares cercanos</h2>
              <h3 className="font-medium text-lg flex items-center gap-2">
                {" "}
                <FontAwesomeIcon
                  size="lg"
                  color="rgb(156 163 175)"
                  className="bg-[#f4f7f9] rounded-full p-3"
                  icon={faGraduationCap}
                />
                Centros Comerciales
              </h3>
              <ul className="flex justify-between text-black/50 items-center">
                <li>Real Plaza Salaverry (3km)</li>
                <ul className="flex items-center gap-2">
                  <li className="flex item-center">
                    {" "}
                    <Rating value={4} readOnly size="small" />
                  </li>
                  <small className="text-black/50">400 reviews</small>
                </ul>
              </ul>
              <ul className="flex justify-between text-black/50 items-center">
                <li>Real Plaza Salaverry (3km)</li>
                <ul className="flex items-center gap-2">
                  <li className="flex item-center">
                    {" "}
                    <Rating value={4} readOnly size="small" />
                  </li>
                  <small className="text-black/50">400 reviews</small>
                </ul>
              </ul>
              <h3 className="font-medium text-lg flex items-center gap-2">
                {" "}
                <FontAwesomeIcon
                  size="lg"
                  color="rgb(156 163 175)"
                  className="bg-[#f4f7f9] rounded-full p-3"
                  icon={faHouseMedicalFlag}
                />
                Centros Medicos
              </h3>
              <ul className="flex justify-between text-black/50 items-center">
                <li>Real Plaza Salaverry (3km)</li>
                <ul className="flex items-center gap-2">
                  <li className="flex item-center">
                    {" "}
                    <Rating value={4} readOnly size="small" />
                  </li>
                  <small className="text-black/50">400 reviews</small>
                </ul>
              </ul>
              <ul className="flex justify-between text-black/50 items-center">
                <li>Real Plaza Salaverry (3km)</li>
                <ul className="flex items-center gap-2">
                  <li className="flex item-center">
                    {" "}
                    <Rating value={4} readOnly size="small" />
                  </li>
                  <small className="text-black/50">400 reviews</small>
                </ul>
              </ul>
              <h3 className="font-medium text-lg flex items-center gap-2">
                {" "}
                <FontAwesomeIcon
                  size="lg"
                  color="rgb(156 163 175)"
                  className="bg-[#f4f7f9] rounded-full p-3"
                  icon={faCameraRotate}
                />
                Seguridad
              </h3>
              <ul className="flex justify-between text-black/50 items-center">
                <li>Real Plaza Salaverry (3km)</li>
                <ul className="flex items-center gap-2">
                  <li className="flex item-center">
                    {" "}
                    <Rating value={4} readOnly size="small" />
                  </li>
                  <small className="text-black/50">400 reviews</small>
                </ul>
              </ul>
              <ul className="flex justify-between text-black/50 items-center">
                <li>Real Plaza Salaverry (3km)</li>
                <ul className="flex items-center gap-2">
                  <li className="flex item-center">
                    {" "}
                    <Rating value={4} readOnly size="small" />
                  </li>
                  <small className="text-black/50">400 reviews</small>
                </ul>
              </ul>
            </div> */}
          </section>
          <section className="right mt-5  flex flex-col gap-8 w-full">
            {listaParams === "true" ? (
              <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md w-full">
                <h2 className="font-semibold text-xl">Lista de espera</h2>
                <form
                  onSubmit={handleSubmitLista}
                  className="w-full flex flex-col gap-7"
                >
                  <div className="flex w-full gap-5 justify-between">
                    {isAuth ? (
                      <input
                        name="nombreLista"
                        type="text"
                        value={user?.nombre_responsable}
                        className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                        placeholder="Nombre"
                        required
                      />
                    ) : (
                      <input
                        name="nombreLista"
                        type="text"
                        className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                        placeholder="Nombre"
                        required
                      />
                    )}
                    {isAuth ? (
                      <input
                        name="apellidoLista"
                        type="text"
                        value={user?.apellidos_responsable}
                        required
                        className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                      />
                    ) : (
                      <input
                        name="apellidoLista"
                        type="text"
                        required
                        className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                        placeholder="Apellidos"
                      />
                    )}
                  </div>
                  <div className="flex w-full gap-5 justify-between">
                    {isAuth ? (
                      <input
                        name="emailLista"
                        type="email"
                        value={user?.email}
                        className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                        placeholder="Correo"
                        required
                      />
                    ) : (
                      <input
                        name="emailLista"
                        type="email"
                        className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                        placeholder="Correo"
                        required
                      />
                    )}
                    {isAuth ? (
                      <input
                        name="celLista"
                        type="number"
                        pattern="[0-9]{8,15}"
                        value={user?.telefono}
                        required
                        title="Solo se permiten numeros y entre 8 y 10 caracteres"
                        className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                        placeholder="Celular"
                      />
                    ) : (
                      <input
                        name="celLista"
                        type="number"
                        pattern="[0-9]{8,15}"
                        required
                        title="Solo se permiten numeros y entre 8 y 10 caracteres"
                        className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                        placeholder="Celular"
                      />
                    )}
                  </div>

                  <button
                    type="submit"
                    className="border mt-5 mx-auto px-10 py-2 rounded-md shadow-lg bg-[#0061dd] text-white duration-300 cursor-pointer"
                  >
                    INSCRIBIRME
                  </button>
                </form>
                <p className="text-sm p-10">
                  Al enviar estás aceptando los{" "}
                  <Link className="text-[#0061dd] hover:underline">
                    Términos y Condiciones de Uso y la Política de Privacidad
                  </Link>
                </p>
              </div>
            ) : (
              <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md w-full">
                <h2 className="font-semibold text-xl">Solicitar una visita</h2>
                <div
                  onClick={toggleHorarios}
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  {Horarios && (
                    <>
                      <p>Ver la disponibilidad horaria de este colegio </p>
                      <HiChevronDown
                        data-aos-duration="400"
                        data-aos="flip-down"
                      />
                    </>
                  )}
                  {Horarios === false && (
                    <>
                      <p>Ver la disponibilidad horaria de este colegio </p>
                      <HiChevronLeft
                        data-aos-duration="400"
                        data-aos="flip-left"
                      />
                    </>
                  )}
                </div>
                {Horarios && (
                  <>
                    <div className={style.Layout}>
                      {horariosColegio &&
                        horariosColegio?.map((ele) => {
                          console.log(ele.horarios[0]);
                          if (
                            ele.horarios[0]?.desde != undefined &&
                            ele.horarios[0]?.hasta != undefined
                          ) {
                            return (
                              <>
                                <div
                                  // si vacantes estan agotadas deberia aparecer todo en gris

                                  className={style.cardTable}
                                >
                                  <Card
                                    sx={{
                                      display: "flex",
                                      gap: "10px",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      padding: "10px",
                                    }}
                                  >
                                    <p
                                      style={{
                                        fontSize: "14px",
                                        color: "#515151",
                                        fontWeight: "700",
                                      }}
                                    >
                                      {ele.dia}
                                    </p>
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "10px",
                                        fontSize: "12px",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <p>
                                        {ele.horarios[0]?.desde +
                                          " " +
                                          es_AM_PM(ele.horarios[0]?.desde)}{" "}
                                      </p>

                                      <p>
                                        {ele.horarios[0]?.hasta +
                                          " " +
                                          es_AM_PM(ele.horarios[0]?.hasta)}{" "}
                                      </p>
                                    </div>
                                  </Card>
                                </div>
                              </>
                            );
                          } else {
                            return (
                              <>
                                <div
                                  // si vacantes estan agotadas deberia aparecer todo en gris

                                  className={style.cardTable}
                                >
                                  {/* <Card
                                    sx={{
                                      display: "flex",
                                      gap: "10px",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      padding: "10px",
                                    }}
                                  >
                                    <p
                                      style={{
                                        fontSize: "14px",
                                        color: "#515151",
                                        fontWeight: "700",
                                      }}
                                    >
                                      {ele.dia}
                                    </p>
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "10px",
                                        fontSize: "12px",
                                        flexDirection: "column",
                                      }}
                                    >
                                      No disponible
                                    </div>
                                  </Card> */}
                                </div>
                              </>
                            );
                          }
                        })}
                    </div>
                  </>
                )}

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="flex w-full justify-between flex-col gap-4 lg:flex-row">
                    <MobileDatePicker
                      label="Elegir fecha"
                      inputFormat="DD/MM/YYYY"
                      value={date}
                      shouldDisableDate={disableWeekends}
                      onChange={handleChangeDate}
                      renderInput={(params) => <TextField {...params} />}
                      disablePast
                    />
                    <div className="flex flex-col gap-2">
                      <MobileTimePicker
                        label="Elegir hora"
                        value={time}
                        onChange={handleChangeTime}
                        renderInput={(params) => <TextField {...params} />}
                        ampm={false}
                        minutesStep={15}
                        minTime={dayjs("2014-08-18T08:00:00")}
                        maxTime={dayjs("2014-08-18T17:00:00")}
                      />
                      <small className="text-black/50">
                        08:00 - 17:00 / Intervalo 15 min
                      </small>
                    </div>
                  </div>
                </LocalizationProvider>
                <form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-7"
                >
                  <div className="flex gap-5">
                    <input
                      type="button"
                      value={"Presencial"}
                      className={`border w-[120px] ${
                        modo ? "bg-[#0061dd] text-white" : "cursor-pointer"
                      } py-2 rounded-md shadow-lg duration-300`}
                      onClick={handleModo}
                      disabled={modo}
                    />
                    <input
                      type="button"
                      value={"Virtual"}
                      className={`border w-[120px] py-2 rounded-md shadow-lg ${
                        !modo ? "bg-[#0061dd] text-white" : "cursor-pointer"
                      } duration-300`}
                      onClick={handleModo}
                      disabled={!modo}
                    />
                  </div>
                  <div className="flex w-full gap-5 justify-between">
                  {
                    isAuth?  
                     <input
                      name="nombre"
                      type="text"
                      value={user?.nombre_responsable + " " + user?.apellidos_responsable }
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
            )}
            {oneSchool?.Eventos?.length > 0 && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <h2 className="font-semibold text-xl">Eventos</h2>
                </div>

                <SwiperEventos data={oneSchool} />
              </div>
            )}

            <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md w-full">
              <h2 className="font-semibold text-xl">Galería</h2>
              {oneSchool.hasOwnProperty("galeria_fotos") &&
                oneSchool.galeria_fotos !== null &&
                JSON.parse(oneSchool.galeria_fotos).length > 0 && (
                  <QuiltedImageList
                    firstImage={oneSchool.primera_imagen}
                    gallery={JSON.parse(oneSchool.galeria_fotos)}
                    setImage={setImage}
                    setImages={setImages}
                  />
                )}
              <div
                className={`fixed top-0 left-0 z-50 bg-black/90 w-full h-full ${
                  image ? "block" : "hidden"
                }`}
              >
                <button
                  onClick={() => setImage(null)}
                  className="absolute top-2 right-4 z-[100] text-white"
                >
                  Atras
                </button>
                <img
                  src={image}
                  alt=""
                  className="absolute border-4 top-1/2 left-1/2 -translate-x-1/2 rounded-md -translate-y-1/2 block max-w-[80%] max-h-[80%] object-cover"
                />
              </div>
            </div>
            {oneSchool.video_url?.length > 0 && (
              <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md w-full">
                <h2 className="font-semibold text-xl">Video</h2>
                {/* <video
                  className="w-full h-[300px] lg:h-[400px] "
                  src={`${oneSchool.video_url.replace("watch?v=", "embed/")}`}
                ></video> */}
                <video className="w-full h-[300px] lg:h-[400px]" controls>
                  <source src={oneSchool.video_url} type="video/mp4" />
                </video>
              </div>
            )}

            <form
              className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md w-full"
              onSubmit={comentarioSubmit}
            >
              <h2 className="font-semibold text-xl">Deja tu comentario</h2>
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
          </section>
        </main>
      </div>
      {openLogin && <ModalLogin handlerClose={setOpenLogin} />}
    </div>
  );
}

export default SchoolDetail;
