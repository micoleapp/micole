import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clannDetailid, getSchoolDetail } from "../redux/SchoolsActions";
import banner from "../assets/ejemplobanner.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/premium.png";
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
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Maps from "../components/Maps";
import { a11yProps, TabPanel } from "../components/Tabs";
import { Rating } from "@mui/material";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers";
import axios from "axios";

function QuiltedImageList({ firstImage, gallery, setImage }) {
  return (
    <div className="w-full px-4">
      <img
        src={firstImage}
        alt=""
        onClick={() => setImage(firstImage)}
        className="cursor-pointer rounded-md"
      />
      <div className="flex gap-5 mt-2 overflow-x-scroll w-full pb-2">
        {gallery?.map((item, index) => (
          <img
            key={index}
            src={item}
            className="cursor-pointer z-25 object-cover h-24 rounded-md"
            onClick={() => setImage(item)}
          />
        ))}
      </div>
    </div>
  );
}

function SchoolDetail() {
  const { id } = useParams();
  const { oneSchool } = useSelector((state) => state.schools);

  const stringyDate = (date) => {
    if (date.toString().length === 1) {
      return "0" + date++;
    } else {
      return date;
    }
  };

  const [image, setImage] = useState(null);


  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSchoolDetail(id));
    return () => {
      dispatch(clannDetailid());
    }
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
    nombre: "",
    celular: "",
    correo: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      e.target["nombre"].value === "" ||
      e.target["cel"].value === "" ||
      e.target["email"].value === ""
    ) {
      return alert("Llena todos los campos para poder continuar");
    }
    axios.post('http://localhost:3000/citas', cita)
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

  const [comentario,setComentario] = useState({
    rating: 0,
    nombre: "",
    email: "",
    comentario: ""
  });

  useEffect(() => {
    setComentario({
      ...comentario,
      rating: Number(((ratingNivel + ratingAtencion + ratingInfraestructura + ratingUbicacion + ratingLimpieza + ratingPrecio) / 6).toFixed(2))
    })
  },[ratingNivel , ratingAtencion , ratingInfraestructura , ratingUbicacion , ratingLimpieza ,ratingPrecio])

  const comentarioSubmit = (e) => {
    e.preventDefault();
    if(e.target["name"].value === "" || e.target["email"].value === "" || e.target["comentario"].value === "" || comentario.rating === 0.00){
      return alert("Llena todos los campos para poder continuar");
    }
    axios.post('http://localhost:3000/review', comentario)
  }

  const disableWeekends = (date) => {
    return date.day() === 0 || date.day() === 6;
  };

  return (
    <div className="bg-[#f6f7f8]">
      <img
        src={oneSchool.primera_imagen}
        alt="banner"
        className="object-cover w-full h-[500px]"
      />
      <div className="p-8 px-5 lg:px-[100px]" data-aos-mirror={false} data-aos="fade-up" data-aos-duration='1000'>
        <div className="header drop-shadow-md">
          <h1 className="text-2xl  font-semibold">
            {oneSchool.nombre_escuela}
          </h1>
          <div>
            <div className="flex justify-between flex-col gap-5 lg:flex-row mt-2 lg:mt-0">
              <div className="flex gap-5 items-start lg:items-center flex-col lg:flex-row text-black/70">
                <h2>{oneSchool.direccion} </h2>
                <div className="flex gap-5 items-center">
                  <span className="bg-black/80 min-w-fit py-1 px-2 rounded-sm text-white text-sm flex items-center">
                    5 vacantes
                  </span>
                  <span className="bg-black/80 min-w-fit py-1 px-2 rounded-sm text-white text-sm flex items-center">
                    2do grado
                  </span>
                  <span className="bg-black/80 min-w-fit py-1 px-2 rounded-sm text-white text-sm flex items-center">
                    2022
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-5 text-black/70">
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
            <div className="flex gap-5 items-start">
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
              <div className="flex flex-col gap-2 text-center">
                <FontAwesomeIcon
                  size="lg"
                  color="rgb(156 163 175)"
                  icon={faPaperclip}
                />
                <span className="text-sm text-gray-400"> Mixto</span>
              </div>
              <div className="flex flex-col gap-2 text-center">
                <FontAwesomeIcon
                  size="lg"
                  color="rgb(156 163 175)"
                  icon={faDoorOpen}
                />
                <span className="text-sm text-gray-400">2 Salones</span>
              </div>
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
            <div>
              <h1 className="font-semibold">S/ 800/mes</h1>
              <small>Cuota de ingreso: S/ 10,000</small>
            </div>
          </div>
        </div>
        <main className="flex gap-5 flex-col lg:flex-row">
          <section className="left mt-5 flex flex-col gap-8 w-full">
            <div className="p-5 bg-white flex flex-col gap-2 rounded-md shadow-md"  data-aos="zoom-in-right" data-aos-duration='1500' data-aos-mirror={false}                >
              <h2 className="font-semibold text-xl">Descripcion</h2>
              <p className="text-black/60 text-base">{oneSchool.descripcion}</p>
            </div>
            <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md"    data-aos="zoom-in-right" data-aos-duration='1500' data-aos-mirror={false}               >
              <h2 className="font-semibold text-xl">Ubicacion</h2>
              <div className="flex text-xs w-full justify-between">
                <ul className="flex flex-col gap-3">
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">
                      Direccion:{" "}
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
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">Zip: </span>
                    365448
                  </li>
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
                    United State
                  </li>
                </ul>
              </div>
              <Maps />
            </div>
            <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md"   data-aos="zoom-in-right" data-aos-duration='1500' data-aos-mirror={false}               >
              <h2 className="font-semibold text-xl">Detalles del Colegio</h2>
              <div className="flex text-xs w-full flex-col lg:flex-row gap-3 justify-between">
                <ul className="flex flex-col gap-3">
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
                      Fundacion:{" "}
                    </span>
                    {oneSchool.fecha_fundacion}
                  </li>
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">Niveles: </span>
                    Inicial, primaria, secundaria
                  </li>
                </ul>
                <ul className="flex flex-col gap-3">
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">
                      Profesores:{" "}
                    </span>
                    8
                  </li>
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">Salones: </span>
                    3
                  </li>
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">
                      Director:{" "}
                    </span>
                    {oneSchool.nombre_director}
                  </li>
                </ul>
                <ul className="flex flex-col gap-3">
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
                </ul>
              </div>
            </div>
            <div className="p-5 bg-white flex flex-col gap-2 rounded-md shadow-md"   data-aos="zoom-in-right" data-aos-duration='1500' data-aos-mirror={false}                >
              <h2 className="font-semibold text-xl">
                Propuesta Valor Educativo
              </h2>
              <p className="text-black/60 text-base">
                {oneSchool.propuesta_valor}
              </p>
            </div>
            <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md"     data-aos="zoom-in-right" data-aos-duration='1500' data-aos-mirror={false}              >
              <h2 className="font-semibold text-xl">Infraestructura</h2>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
              >
                <Tab
                  style={{
                    fontSize: "11px",
                    fontFamily: "Poppins",
                    textTransform: "capitalize",
                  }}
                  label="Administrativa"
                  {...a11yProps(0)}
                />
                <Tab
                  style={{
                    fontSize: "11px",
                    fontFamily: "Poppins",
                    textTransform: "capitalize",
                  }}
                  label="Artistica"
                  {...a11yProps(1)}
                />
                <Tab
                  style={{
                    fontSize: "11px",
                    fontFamily: "Poppins",
                    textTransform: "capitalize",
                  }}
                  label="Deportiva"
                  {...a11yProps(2)}
                />
                {/* <Tab
                  style={{
                    fontSize: "16px",
                    fontFamily: "Poppins"
                  }}
                  label="Toggles"
                  {...a11yProps(3)}
                />*/}
                <Tab
                  style={{
                    fontSize: "11px",
                    fontFamily: "Poppins",
                    textTransform: "capitalize",
                  }}
                  label="Enseñanza"
                  {...a11yProps(3)}
                />
                <Tab
                  style={{
                    fontSize: "11px",
                    fontFamily: "Poppins",
                    textTransform: "capitalize",
                  }}
                  label="Laboratorio"
                  {...a11yProps(4)}
                />
                {/*<Tab
                  style={{
                    fontSize: "16px",
                    fontFamily: "Poppins"
                  }}
                  label="AWS S3 Config"
                  {...a11yProps(5)}
                />*/}
              </Tabs>

              <div className="flex text-xs w-full justify-between">
                <TabPanel value={value} index={0}>
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
                </TabPanel>
              </div>
            </div>
            <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md"    data-aos="zoom-in-right" data-aos-duration='1500' data-aos-mirror={false}             >
              <h2 className="font-semibold text-xl">
                Acreditaciones / Certificaciones / Asosiaciones
              </h2>
              <div className="flex text-xs w-full gap-5">
                <ul className="flex flex-col gap-5">
                  <li className="text-black/60 flex items-center gap-3">
                    <img src={logo} alt="" className="w-10" />
                    Great Place to Study
                  </li>
                  <li className="text-black/60 flex items-center gap-3">
                    <img src={logo} alt="" className="w-10" />
                    Great Place to Study
                  </li>{" "}
                  <li className="text-black/60 flex items-center gap-3">
                    <img src={logo} alt="" className="w-10" />
                    Great Place to Study
                  </li>
                </ul>
                <ul className="flex flex-col gap-5">
                  <li className="text-black/60 flex items-center gap-3">
                    <img src={logo} alt="" className="w-10" />
                    Great Place to Study
                  </li>
                  <li className="text-black/60 flex items-center gap-3">
                    <img src={logo} alt="" className="w-10" />
                    Great Place to Study
                  </li>
                  <li className="text-black/60 flex items-center gap-3">
                    <img src={logo} alt="" className="w-10" />
                    Great Place to Study
                  </li>
                </ul>
              </div>
            </div>
            <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md"   data-aos="zoom-in-right" data-aos-duration='1500' data-aos-mirror={false}               >
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
            </div>
          </section>
          <section className="right mt-5  flex flex-col gap-8 w-full">
            <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md w-full"     data-aos="zoom-in-left" data-aos-duration='1500'  data-aos-mirror={false}              >
              <h2 className="font-semibold text-xl">Solicitar una visita</h2>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="flex w-full justify-between flex-col gap-4 lg:flex-row">
                  <MobileDatePicker
                    label="Elejir fecha"
                    inputFormat="DD/MM/YYYY"
                    value={date}
                    shouldDisableDate={disableWeekends}
                    onChange={handleChangeDate}
                    renderInput={(params) => <TextField {...params} />}
                    disablePast
                  />
                  <div className="flex flex-col gap-2">
                    <MobileTimePicker
                      label="Elejir hora"
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
                  <input
                    name="nombre"
                    type="text"
                    className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                    placeholder="Nombre"
                    onChange={(e)=>{
                      setCita({...cita, nombre: e.target.value})
                    }}
                    required
                  />
                  <input
                    name="cel"
                    type="number"
                    pattern="[0-9]{8,15}" required
                    title="Solo se permiten numeros y entre 8 y 10 caracteres"
                    className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                    placeholder="Celular"
                    onChange={(e)=>{
                      setCita({...cita, celular: Number(e.target.value)})
                    }}
                  />
                </div>
                <input
                  name="email"
                  type="email"
                  className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                  placeholder="Correo"
                  onChange={(e)=>{
                    setCita({...cita, correo: e.target.value})
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
            <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md w-full" data-aos="zoom-in-left" data-aos-duration='1500'  data-aos-mirror={false}>
              <h2 className="font-semibold text-xl">Galeria</h2>
              {oneSchool.hasOwnProperty("galeria_fotos") && (
                <QuiltedImageList
                  firstImage={oneSchool.primera_imagen}
                  gallery={JSON.parse(oneSchool.galeria_fotos)}
                  setImage={setImage}
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
            <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md w-full" data-aos="zoom-in-left" data-aos-duration='1500'  data-aos-mirror={false}>
              <h2 className="font-semibold text-xl">Video</h2>
              <video width="750" height="500" controls className="rounded-md">
                <source src={oneSchool.video_url && oneSchool.video_url.trim()} type="video/mp4" />
              </video>
            </div>
            <form className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md w-full" onSubmit={comentarioSubmit} data-aos="zoom-in-left" data-aos-duration='1500'  data-aos-mirror={false}>
              <h2 className="font-semibold text-xl">Deja tu comentario</h2>
              <div className="flex flex-col lg:grid grid-cols-2 text-black/70">
                <div>
                  <h2>Nivel de enseñanza</h2>
                  <Rating
                    name="simple-controlled"
                    value={ratingNivel}
                    max={10}
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
                    max={10}
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
                    max={10}
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
                    max={10}
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
                    max={10}
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
                    max={10}
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setRatingPrecio(newValue);
                    }}
                  />
                </div>
              </div>
                <div className="flex items-center">

                <h2>Total: </h2>
                <Rating
                  id="rating"
                  name="simple-controlled"
                  value={(ratingNivel + ratingAtencion + ratingInfraestructura + ratingUbicacion + ratingLimpieza + ratingPrecio)/6}
                  max={10}
                  precision={0.5}
                  readOnly
                />
                
                </div>
                <div className="flex w-full gap-5 justify-between">
                  <input
                    name="name"
                    type="text"
                    className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                    placeholder="Nombre"
                    required
                    onChange={(e) => {
                      setComentario({
                        ...comentario,
                        nombre: e.target.value
                      })
                    }}
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                    placeholder="Email"
                    onChange={(e) => {
                      setComentario({
                        ...comentario,
                        email: e.target.value
                      })
                    }}
                  />
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
                      comentario: e.target.value
                    })
                  }}
                />
                <button type="submit" className="p-3 bg-[#0061dd] text-white rounded-md hover:bg-[#0759c3] duration-300">Enviar reseña</button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default SchoolDetail;
