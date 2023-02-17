import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSchoolDetail } from "../redux/SchoolsActions";
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

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { borderRadius } from "@mui/system";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

function QuiltedImageList({setImage}) {
  return (
    <ImageList
      sx={{ width: "100%", height: 450, margin: 'auto' }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item,index) => (
        
        <ImageListItem key={item.img}>
          <img
            {...srcset(item.img, 121)}
            alt={item.title}
            loading="lazy"
            className="cursor-pointer z-25 object-cover rounded-md"
            onClick={()=>setImage(item.img)}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast'
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee'
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats'
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil'
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms'
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike'
  },
];
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

  const [image,setImage] = useState(null)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSchoolDetail(id));
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
      e.target["name"].value === "" ||
      e.target["cel"].value === "" ||
      e.target["email"].value === ""
    ) {
      return alert("Llena todos los campos para poder continuar");
    }
    setCita({
      ...cita,
      nombre: e.target["name"].value,
      celular: e.target["cel"].value,
      correo: e.target["email"].value,
    });
    console.log(cita);
  };

  const handleModo = () => {
    setModo(!modo);
    setCita({
      ...cita,
      modo: !modo ? "Presencial" : "Virtual",
    });
  };


  return (
    <div className="bg-[#f6f7f8]">
      <img
        src={banner}
        alt="banner"
        className="object-cover w-full h-[500px]"
      />
      <div className="p-8 px-5 lg:px-[100px]">
        <div className="header drop-shadow-md">
          <h1 className="text-2xl  font-semibold">Colegio Los Alamos</h1>
          <div>
            <div className="flex justify-between flex-col gap-5 lg:flex-row mt-2 lg:mt-0">
              <div className="flex gap-5 items-start lg:items-center flex-col lg:flex-row text-black/70">
                <h2>Calle Estados Unidos 721, Jesus Maria</h2>
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
                    size="md"
                    color="rgb(156 163 175)"
                    className="bg-white rounded-full p-3"
                    icon={faShare}
                  />
                  Compartir
                </span>
                <span className="flex items-center gap-2">
                  {" "}
                  <FontAwesomeIcon
                    size="md"
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
                <span className="text-sm text-gray-400">368 Alumnos</span>
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
                <span className="text-sm text-gray-400">2 Salones</span>
              </div>
              <div className="flex flex-col gap-2 text-center">
                <FontAwesomeIcon
                  size="lg"
                  color="rgb(156 163 175)"
                  icon={faSchool}
                />
                <span className="text-sm text-gray-400">2 Salones</span>
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
            <div className="p-5 bg-white flex flex-col gap-2 rounded-md shadow-md">
              <h2 className="font-semibold text-xl">Descripcion</h2>
              <p className="text-black/60 text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                dolores dolorum facilis tempore ut, voluptatibus perferendis!
                Nihil amet maiores mollitia est aspernatur consequatur placeat
                velit quae dolorem ex vitae repellendus sunt quis numquam
                corrupti minima nam, officiis totam odio repellat cupiditate
                soluta adipisci nemo veniam.{" "}
              </p>
            </div>
            <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md">
              <h2 className="font-semibold text-xl">Ubicacion</h2>
              <div className="flex text-xs w-full justify-between">
                <ul className="flex flex-col gap-3">
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">
                      Direccion:{" "}
                    </span>
                    329 Queensberry Street
                  </li>
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">
                      Departamento:{" "}
                    </span>
                    New Jersey State
                  </li>
                </ul>
                <ul className="flex flex-col gap-3">
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">
                      Distrito:{" "}
                    </span>
                    Jersey City
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
                    Greenville
                  </li>
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">Pais: </span>
                    United State
                  </li>
                </ul>
              </div>
              <Maps />
            </div>
            <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md">
              <h2 className="font-semibold text-xl">Detalles del Colegio</h2>
              <div className="flex text-xs w-full flex-col lg:flex-row gap-3 justify-between">
                <ul className="flex flex-col gap-3">
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">RUC: </span>
                    128380912879
                  </li>
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">Area: </span>
                    1560 Sq Ft
                  </li>
                  <li className="text-black/60">
                    <span className="font-semibold text-black ">
                      Fundacion:{" "}
                    </span>
                    2021-09-14
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
                    Juan Perez
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
            <div className="p-5 bg-white flex flex-col gap-2 rounded-md shadow-md">
              <h2 className="font-semibold text-xl">
                Propuesta Valor Educativo
              </h2>
              <p className="text-black/60 text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                dolores dolorum facilis tempore ut, voluptatibus perferendis!
                Nihil amet maiores mollitia est aspernatur consequatur placeat
                velit quae dolorem ex vitae repellendus sunt quis numquam
                corrupti minima nam, officiis totam odio repellat cupiditate
                soluta adipisci nemo veniam.{" "}
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
            <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md">
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
            <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md">
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
            <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md w-full">
              <h2 className="font-semibold text-xl">Solicitar una visita</h2>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="flex w-full justify-between flex-col gap-4 lg:flex-row">
                  <MobileDatePicker
                    label="Elejir fecha"
                    inputFormat="DD/MM/YYYY"
                    value={date}
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
                    <small className="text-black/50">08:00 - 17:00 / Intervalo 15 min</small>
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
                    name="name"
                    type="text"
                    className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                    placeholder="Nombre"
                  />
                  <input
                    name="cel"
                    type="text"
                    pattern="[0-9]{8,12}"
                    title="Solo se permiten numeros y entre 8 y 10 caracteres"
                    className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                    placeholder="Celular"
                  />
                </div>
                <input
                  name="email"
                  type="email"
                  className="p-3 border-b-2 border-[#0061dd3a] text-base outline-0 w-full"
                  placeholder="Correo"
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
            <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md w-full">
            <h2 className="font-semibold text-xl">Galeria</h2>
            <QuiltedImageList setImage={setImage} />
            <div className={`fixed top-0 left-0 z-50 bg-black/90 w-full h-full ${image ? "block" : "hidden"}`}>
              <button onClick={()=>setImage(null)} className="absolute top-2 right-4 z-[100] text-white">Atras</button>
              <img src={image} alt="" className="absolute border-4 top-1/2 left-1/2 -translate-x-1/2 rounded-md -translate-y-1/2 block max-w-[80%] max-h-[80%] object-cover "/>
            </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default SchoolDetail;
