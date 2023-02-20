import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import ListItemText from "@mui/material/ListItemText";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Squash as Hamburger } from "hamburger-react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useWindowSize from 'react-use-window-size';
import Logo from '../assets/logoPayment.png'
import Confetti from "react-confetti";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  Autocomplete,
} from "@react-google-maps/api";
import {
  Administrativa,
  Artistica,
  Deportiva,
  Enseñanza,
  Laboratorios,
} from "../MockupInfo/Infraestructura";
import {
  Acreditaciones,
  Alianzas,
  Asociaciones,
  Certificaciones,
} from "../MockupInfo/Afiliaciones";
import { levels } from "../MockupInfo/Niveles";
import { steps } from "../MockupInfo/Pasos";

import { CiUser, CiClock1 } from "react-icons/ci";
import { BsPlusCircleDotted, BsWindowDock } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { RiImageAddLine } from "react-icons/ri";
import { useEffect } from "react";
import {
  getAllCategories,
  getAllDepartaments,
  getAllDistrits,
  getAllProvincias,
} from "../redux/SchoolsActions";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";

const libraries = ["places"];

const containerStyle = {
  width: "100%",
  height: "400px",
};

function StandardImageList({ list, setImage,eliminarImagenDePreview }) {
  return (
    <ImageList sx={{ width: "100%", height: 450 }} cols={3} rowHeight={400}>
      {list.map((item) => (
        <ImageListItem key={item}>
          <button onClick={()=>eliminarImagenDePreview(item)} className="absolute bg-[#0061dd]/30 right-2 top-2 text-white hover:bg-[#0061dd] p-2 rounded-md duration-300">Quitar</button>
          <img
            src={item}
            alt={item}
            loading="lazy"
            onClick={() => setImage(item)}
            className="cursor-pointer"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

function DashboardSchool() {
  const { width, height } = useWindowSize();
  const [page, setPage] = React.useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const dispatch = useDispatch();
  const { categories, provincias, distrits, departaments } = useSelector(
    (state) => state.schools
  );

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllDepartaments());
    dispatch(getAllDistrits());
    dispatch(getAllProvincias());
  }, []);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleCompleteDatosPrincipales = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    setAllData({ ...allData, ...datosPrincipales });
    handleNext();
  };

  const handleCompleteInfraestructura = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    setAllData({ ...allData, infraestructura });
    handleNext();
  };

  const handleCompleteAcreditaciones = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    setAllData({ ...allData, acreditaciones });
    handleNext();
  };

  const handleCompleteMultimedia = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    setAllData({ ...allData, multimedia });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setDatosPrincipales(initialDatosPrincipales);
    setInfraestructura(initialInfraestructura);
    setAcreditaciones(initialAcreditaciones);
  };

  const [categoryName, setCategoryName] = useState([]);
  const [levelName, setLevelName] = useState([]);

  const [provincia, setProvincia] = useState([]);

  const handleChangeProvincia = (event) => {
    setProvincia(event.target.value);
  };

  const [distrito, setDistrito] = useState([]);

  const handleChangeDistrito = (event) => {
    setDistrito(event.target.value);
  };

  const [departamento, setDepartamento] = useState([]);

  const handleChangeDepartamento = (event) => {
    setDepartamento(event.target.value);
  };

  let libRef = React.useRef(libraries);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB9qHB47v8fOmLUiByTvWinUehYqALI6q4",
    libraries: libRef.current,
  });

  const [center, setCenter] = React.useState({
    lat: -12.046374,
    lng: -77.042793,
  });

  const [map, setMap] = React.useState(null);
  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const zoom = 18;
    map.setZoom(zoom);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const direccion = useRef();

  const [autocomplete, setAutocomplete] = useState(null);

  const onLoadPlace = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const [direc, setDirec] = useState(null);
  const [latitud, setLatitud] = useState(null);
  const [longitud, setLongitud] = useState(null);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      console.log(place)
      setDirec(
        place.address_components[1].long_name +
          " " +
          place.address_components[0].long_name
      );
      setLatitud(place.geometry.location.lat());
      setLongitud(place.geometry.location.lng());
      setCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      setDatosPrincipales({
        ...datosPrincipales,
        direccion:
          place.address_components[1].long_name +
          " " +
          place.address_components[0].long_name,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const initialDatosPrincipales = {
    nombreColegio: "",
    descripcion: "",
    propuesta: "",
    categoria: [],
    nombreDirector: "",
    fundacion: null,
    ruc: null,
    ugel: null,
    area: null,
    ingles: null,
    alumnos: null,
    niveles: [],
    departamento: {},
    provincia: {},
    distrito: {},
    direccion: "",
    lat: 0,
    lng: 0,
  };

  const [datosPrincipales, setDatosPrincipales] = useState(
    initialDatosPrincipales
  );

  const datosPrincipalesCompleted = () => {
    if (
      datosPrincipales.nombreColegio !== "" &&
      datosPrincipales.descripcion !== "" &&
      datosPrincipales.propuesta !== "" &&
      datosPrincipales.categoria.length !== 0 &&
      datosPrincipales.nombreDirector !== "" &&
      datosPrincipales.fundacion !== null &&
      datosPrincipales.ruc !== null &&
      datosPrincipales.ugel !== null &&
      datosPrincipales.area !== null &&
      datosPrincipales.ingles !== null &&
      datosPrincipales.alumnos !== null &&
      datosPrincipales.niveles.length !== 0 &&
      datosPrincipales.departamento !== {} &&
      datosPrincipales.provincia !== {} &&
      datosPrincipales.distrito !== {} &&
      datosPrincipales.direccion !== "" &&
      datosPrincipales.lat !== 0 &&
      datosPrincipales.lng !== 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const initialInfraestructura = {
    laboratorio: [],
    artistica: [],
    deportiva: [],
    administrativa: [],
    enseñanza: [],
  };

  const [infraestructura, setInfraestructura] = useState(
    initialInfraestructura
  );

  const infraestructuraCompleted = () => {
    if (
      infraestructura.laboratorio.length > 0 &&
      infraestructura.artistica.length > 0 &&
      infraestructura.deportiva.length > 0 &&
      infraestructura.administrativa.length > 0 &&
      infraestructura.enseñanza.length > 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const initialAcreditaciones = {
    afiliaciones: [],
    alianzas: [],
    certificaciones: [],
    asociaciones: [],
  };

  const [acreditaciones, setAcreditaciones] = useState(initialAcreditaciones);

  const acreditacionesCompleted = () => {
    if (
      acreditaciones.afiliaciones.length > 0 &&
      acreditaciones.alianzas.length > 0 &&
      acreditaciones.certificaciones.length > 0 &&
      acreditaciones.asociaciones.length > 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const [isOpen, setOpen] = useState(false);

  const windowSize = useRef(window.innerWidth);

  const [files, setFiles] = useState(null);

  function handleFilesSubmit(e) {
    e.preventDefault();
    let arrayImages = []
    preview?.map(async (image, index) => {
      const formData = new FormData();
      try {
        formData.append("file", image);
        formData.append("upload_preset", "tcotxf16");
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/de4i6biay/image/upload",
          formData
        );
        arrayImages.push(res.data.secure_url)
      } catch (error) {
        console.log(error);
      }
      setMultimedia({
        ...multimedia,
        images: arrayImages,
      });
    });

  }

  const [multimedia, setMultimedia] = useState({
    images: [],
    video_url: "",
  });

  const [preview, setPreview] = useState([]);

  useEffect(() => {
    if (files !== null) {
      Object.values(files).map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPreview((prev) => [...prev, reader.result]);
        };
      });
    }
  }, [files]);

  const eliminarImagenDePreview = (img) => {
    setPreview(preview.filter((image) => image !== img));
  }

  const [image, setImage] = useState(null);

  const multimediaCompleted = () => {
    if (multimedia.images.length !== 0 && multimedia.video_url !== "") {
      return false;
    } else {
      return true;
    }
  };

  const [allData, setAllData] = useState({});

  const handleSubmitFormComplete = (e) => {
    e.preventDefault();
    console.log(allData)
  }

  console.log(multimedia)

  return (
    <div className="flex lg:flex-row flex-col">
      <section
        className={`leftshadow ${
          !isOpen
            ? "h-[50px] lg:h-full lg:min-h-full"
            : "h-[300px] lg:h-full lg:min-h-full"
        } duration-300 overflow-hidden bg-white w-full lg:w-1/4 shadow-leftshadow flex justify-center z-50`}
      >
        <div className="absolute left-5 block lg:hidden">
          <Hamburger toggled={isOpen} toggle={setOpen} color="#0061dd" />
        </div>
        <ul
          className={`${
            !isOpen ? "hidden" : "flex"
          } lg:flex flex-col justify-center gap-4 static lg:absolute lg:top-48`}
        >
          <button
            className="flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white"
            onClick={() => setPage(0)}
          >
            <CiUser className="text-xl text-[#0061dd] group-focus:text-white group-hover:text-white" />
            <span className="text-sm text-black/80 group-focus:text-white group-hover:text-white">
              Perfil del colegio
            </span>
          </button>
          <button
            className="flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white"
            onClick={() => setPage(1)}
          >
            <BsPlusCircleDotted className="text-xl text-[#0061dd] group-focus:text-white group-hover:text-white" />
            <span className="text-sm text-black/80 group-focus:text-white group-hover:text-white">
              Vacantes disponibles
            </span>
          </button>
          <button
            className="flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white"
            onClick={() => setPage(2)}
          >
            <CiClock1 className="text-xl text-[#0061dd] group-focus:text-white group-hover:text-white" />
            <span className="text-sm text-black/80 group-focus:text-white group-hover:text-white">
              Horario para citas{" "}
            </span>
          </button>
          <button
            className="flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white"
            onClick={() => setPage(3)}
          >
            <BsWindowDock className="text-xl text-[#0061dd] group-focus:text-white group-hover:text-white" />
            <span className="text-sm text-black/80 group-focus:text-white group-hover:text-white">
              Mi plan
            </span>
          </button>
          <button
            className="flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white"
            onClick={() => setPage(4)}
          >
            <AiOutlineLogout className="text-xl text-[#0061dd] group-focus:text-white group-hover:text-white" />
            <span className="text-sm text-black/80 group-focus:text-white group-hover:text-white">
              Logout
            </span>
          </button>
        </ul>
      </section>
      <section className="right w-full bg-[#f6f7f8] p-5 lg:px-32 lg:py-12">
        {page === 0 ? (
          <Box sx={{ width: "100%", height: "100%" }}>
            <Stepper
              nonLinear
              activeStep={activeStep}
              orientation={width > 700 ? "horizontal" : "vertical"}
            >
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton
                    color="inherit"
                    // disabled={!completed[index]}
                    onClick={handleStep(index)}
                  >
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <div className="mt-10">
              {allStepsCompleted() ? (
                <React.Fragment>
                  <Confetti width={width-10} height={width > 900 ? height+155 : height} style={{zIndex:500,position: "fixed"}}  />
                  <div className={`h-screen flex flex-col gap-10 justify-center`}>
                    <h1 className="text-4xl text-center font-bold mt-5">Felicitaciones completaste todos los pasos</h1>
                    <p className="text-center">Porfavor envia el formulario hacia nuestra base de datos para continuar</p>
                    <img src={Logo} alt="" className="object-cover mx-auto"/>
                    <button type="submit" className="bg-[#0061dd] text-white rounded-md mx-auto p-3" onClick={handleSubmitFormComplete}>Enviar datos</button>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleReset}>Reset</Button>
                    </Box>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {activeStep === 0 && (
                    <form className="flex flex-col gap-7">
                      <div className="flex flex-col">
                        <label
                          htmlFor="nombreColegio"
                          className="text-lg font-medium"
                        >
                          Nombre del Colegio
                        </label>
                        <input
                          type="text"
                          name="nombreColegio"
                          id="nombreColegio"
                          className="p-3 rounded-md border-2  outline-none"
                          value={datosPrincipales.nombreColegio}
                          onChange={(e) =>
                            setDatosPrincipales({
                              ...datosPrincipales,
                              nombreColegio: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="descripcion"
                          className="text-lg font-medium"
                        >
                          Descripcion
                        </label>
                        <textarea
                          name="descripcion"
                          id="descripcion"
                          className="p-3 rounded-md border-2 outline-none"
                          rows={5}
                          onChange={(e) =>
                            setDatosPrincipales({
                              ...datosPrincipales,
                              descripcion: e.target.value,
                            })
                          }
                          value={datosPrincipales.descripcion}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="propuesta"
                          className="text-lg font-medium"
                        >
                          Propuesta de Valor Educativa
                        </label>
                        <textarea
                          name="propuesta"
                          id="propuesta"
                          className="p-3 rounded-md border-2 outline-none"
                          rows={5}
                          onChange={(e) =>
                            setDatosPrincipales({
                              ...datosPrincipales,
                              propuesta: e.target.value,
                            })
                          }
                          value={datosPrincipales.propuesta}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                          <label
                            htmlFor="categoria"
                            className="text-lg font-medium"
                          >
                            Categoria
                          </label>
                          <small>Puede marcar mas de una opción</small>
                        </div>
                        <div className="flex flex-col lg:grid grid-cols-3">
                          {categories?.map((category) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={datosPrincipales.categoria.includes(
                                    category.nombre_categoria
                                  )}
                                  onChange={(event, target) => {
                                    if (target) {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        categoria: [
                                          ...datosPrincipales.categoria,
                                          category.nombre_categoria,
                                        ],
                                      });
                                    } else {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        categoria:
                                          datosPrincipales.categoria.filter(
                                            (cat) =>
                                              cat !== category.nombre_categoria
                                          ),
                                      });
                                    }
                                  }}
                                />
                              }
                              label={category.nombre_categoria}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="director"
                          className="text-lg font-medium"
                        >
                          Nombre del Director
                        </label>
                        <input
                          type="text"
                          name="director"
                          id="director"
                          className="p-3 rounded-md border-2  outline-none"
                          onChange={(e) =>
                            setDatosPrincipales({
                              ...datosPrincipales,
                              nombreDirector: e.target.value,
                            })
                          }
                          value={datosPrincipales.nombreDirector}
                        />
                      </div>
                      <div className="flex flex-col lg:grid grid-cols-3 gap-5">
                        <div className="flex flex-col">
                          <label
                            htmlFor="fundacion"
                            className="text-lg font-medium"
                          >
                            Año de Fundación
                          </label>
                          <input
                            type="number"
                            name="fundacion"
                            id="fundacion"
                            className="p-3 rounded-md border-2  outline-none"
                            onChange={(e) =>
                              setDatosPrincipales({
                                ...datosPrincipales,
                                fundacion: Number(e.target.value),
                              })
                            }
                            value={datosPrincipales.fundacion}
                            pattern="^(17|20)\d{2}$"
                            title="Solo se permiten numeros, 4 caracteres y un año superior a 1700"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="ruc" className="text-lg font-medium">
                            N° RUC
                          </label>
                          <input
                            type="number"
                            name="ruc"
                            id="ruc"
                            className="p-3 rounded-md border-2  outline-none"
                            onChange={(e) =>
                              setDatosPrincipales({
                                ...datosPrincipales,
                                ruc: Number(e.target.value),
                              })
                            }
                            value={datosPrincipales.ruc}
                            pattern="^[0-9]+"
                            title="Solo se permiten numeros"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="ugel" className="text-lg font-medium">
                            UGEL
                          </label>
                          <input
                            type="number"
                            name="ugel"
                            id="ugel"
                            className="p-3 rounded-md border-2  outline-none"
                            onChange={(e) =>
                              setDatosPrincipales({
                                ...datosPrincipales,
                                ugel: Number(e.target.value),
                              })
                            }
                            value={datosPrincipales.ugel}
                            pattern="^[0-9]+"
                            title="Solo se permiten numeros"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="area" className="text-lg font-medium">
                            Área del campus (m2)
                          </label>
                          <input
                            type="number"
                            name="area"
                            id="area"
                            className="p-3 rounded-md border-2  outline-none"
                            pattern="^[0-9]+"
                            title="Solo se permiten numeros"
                            onChange={(e) =>
                              setDatosPrincipales({
                                ...datosPrincipales,
                                area: Number(e.target.value),
                              })
                            }
                            value={datosPrincipales.area}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="ingles"
                            className="text-lg font-medium"
                          >
                            Hr/Semana idioma Inglés
                          </label>
                          <input
                            type="number"
                            name="ingles"
                            id="ingles"
                            className="p-3 rounded-md border-2  outline-none"
                            pattern="^[0-9]+"
                            title="Solo se permiten numeros"
                            onChange={(e) =>
                              setDatosPrincipales({
                                ...datosPrincipales,
                                ingles: Number(e.target.value),
                              })
                            }
                            value={datosPrincipales.ingles}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="alumnos"
                            className="text-lg font-medium"
                          >
                            Cantidad de Alumnos
                          </label>
                          <input
                            type="number"
                            name="alumnos"
                            id="alumnos"
                            className="p-3 rounded-md border-2  outline-none"
                            pattern="^[0-9]+"
                            title="Solo se permiten numeros"
                            onChange={(e) =>
                              setDatosPrincipales({
                                ...datosPrincipales,
                                alumnos: Number(e.target.value),
                              })
                            }
                            value={datosPrincipales.alumnos}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-col">
                          <label
                            htmlFor="alumnos"
                            className="text-lg font-medium"
                          >
                            Niveles
                          </label>
                          <small>Puede marcar mas de una opción</small>
                        </div>
                        <div className="flex flex-col lg:grid grid-cols-2">
                          {levels?.map((level) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(event, target) => {
                                    if (target) {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        niveles: [
                                          ...datosPrincipales.niveles,
                                          level.nombre,
                                        ],
                                      });
                                    } else {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        niveles:
                                          datosPrincipales.niveles.filter(
                                            (cat) => cat !== level.nombre
                                          ),
                                      });
                                    }
                                  }}
                                />
                              }
                              label={level.nombre}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex w-full flex-col gap-5">
                        <h1 className="text-2xl font-medium">Ubicación</h1>
                        <div className="flex w-full gap-5 flex-col lg:flex-row">
                          <div className="flex flex-col w-full gap-3">
                            <label className="text-lg font-medium">
                              Departamento
                            </label>
                            <FormControl size="medium" className="w-full">
                              <InputLabel id="demo-simple-select-standard-label">
                                Selecciona un Departamento
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-type-select-standard"
                                value={departamento}
                                onChange={(e) => {
                                  setDepartamento(e.target.value);
                                  setDatosPrincipales({
                                    ...datosPrincipales,
                                    departamento: e.target.value,
                                  });
                                }}
                                label="Selecciona una Provincia"
                                className="bg-white"
                                defaultValue={""}
                              >
                                {departaments.map((type, index) => (
                                  <MenuItem value={type} key={type.index}>
                                    <ListItemText
                                      primary={type.nombre_departamento}
                                    />
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                          <div className="flex flex-col w-full gap-3">
                            <label className="text-lg font-medium">
                              Provincia
                            </label>

                            <FormControl size="medium" className="w-full">
                              <InputLabel id="demo-simple-select-standard-label">
                                Selecciona una Provincia
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-type-select-standard"
                                value={provincia}
                                onChange={(e) => {
                                  setProvincia(e.target.value);
                                  setDatosPrincipales({
                                    ...datosPrincipales,
                                    provincia: e.target.value,
                                  });
                                }}
                                label="Selecciona una Provincia"
                                className="bg-white"
                                defaultValue={""}
                              >
                                {provincias.map((type, index) => (
                                  <MenuItem value={type} key={type.index}>
                                    <ListItemText
                                      primary={type.nombre_provincia}
                                    />
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                          <div className="flex flex-col w-full gap-3">
                            <label className="text-lg font-medium">
                              Distrito
                            </label>

                            <FormControl size="medium" className="w-full">
                              <InputLabel id="demo-simple-select-standard-label">
                                Selecciona un Distrito
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-type-select-standard"
                                value={distrito}
                                onChange={(e) => {
                                  setDistrito(e.target.value);
                                  setDatosPrincipales({
                                    ...datosPrincipales,
                                    distrito: e.target.value,
                                  });
                                }}
                                label="Selecciona una Provincia"
                                className="bg-white"
                                defaultValue={""}
                              >
                                {distrits.map((type, index) => (
                                  <MenuItem value={type} key={type.index}>
                                    <ListItemText
                                      primary={type.nombre_distrito}
                                    />
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                        <div className="flex flex-col gap-5">
                          <label
                            htmlFor="direccion"
                            className="text-lg font-medium"
                          >
                            Dirección
                          </label>
                          {isLoaded && (
                            <>
                              <div className="flex flex-col lg:flex-row w-full gap-5">
                                <Autocomplete
                                  onPlaceChanged={onPlaceChanged}
                                  onLoad={onLoadPlace}
                                >
                                  <input
                                    type="text"
                                    className="p-3 rounded-md border-2  outline-none"
                                    ref={direccion}
                                  />
                                </Autocomplete>
                                <input
                                  type="text"
                                  name="direccion"
                                  id="direccion"
                                  className={`p-3 rounded-md border-2 ${
                                    direc === null ? "bg-inherit" : "bg-white"
                                  }  outline-none`}
                                  placeholder="Dirección"
                                  value={direc}
                                  disabled
                                  onChange={(e) => {
                                    setDatosPrincipales({
                                      ...datosPrincipales,
                                      direccion: e.target.value,
                                    });
                                  }}
                                />
                                <input
                                  type="text"
                                  name="lat"
                                  id="lat"
                                  className={`p-3 rounded-md border-2 ${
                                    latitud === null ? "bg-inherit" : "bg-white"
                                  }  outline-none`}
                                  placeholder="Latitud"
                                  value={latitud}
                                  disabled
                                  onChange={(e) => {
                                    setDatosPrincipales({
                                      ...datosPrincipales,
                                      lat: e.target.value,
                                    });
                                  }}
                                />
                                <input
                                  type="text"
                                  name="lng"
                                  id="lng"
                                  className={`p-3 rounded-md border-2 ${
                                    longitud === null
                                      ? "bg-inherit"
                                      : "bg-white"
                                  }  outline-none`}
                                  placeholder="Longitud"
                                  value={longitud}
                                  disabled
                                  onChange={(e) => {
                                    setDatosPrincipales({
                                      ...datosPrincipales,
                                      lng: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                              <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                onLoad={onLoad}
                                onUnmount={onUnmount}
                              >
                                {center.lat !== 0 && center.lng !== 0 && (
                                  <MarkerF position={center}></MarkerF>
                                )}

                                <></>
                              </GoogleMap>{" "}
                            </>
                          )}
                        </div>
                      </div>
                      <Box
                        sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                      >
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button
                          onClick={handleCompleteDatosPrincipales}
                          sx={{ mr: 1 }}
                          disabled={datosPrincipalesCompleted()}
                        >
                          Next
                        </Button>
                        {/* {activeStep !== steps.length &&
                      (completed[activeStep] ? (
                        <Typography
                          variant="caption"
                          sx={{ display: "inline-block" }}
                        >
                          Step {activeStep + 1} already completed
                        </Typography>
                      ) : (
                        <Button onClick={handleComplete}>
                          {completedSteps() === totalSteps() - 1
                            ? "Finish"
                            : "Complete Step"}
                        </Button>
                      ))} */}
                      </Box>
                    </form>
                  )}
                  {activeStep === 1 && (
                    <div className="flex flex-col gap-5">
                      <h1 className="text-2xl">
                        Almenos una casilla de cada categoria debe ser
                        seleccionada
                      </h1>
                      <div className="flex flex-col lg:flex-row gap-5">
                        <div>
                          <div className="flex flex-col">
                            <label
                              htmlFor="categoria"
                              className="text-lg font-medium"
                            >
                              Laboratorio
                            </label>
                            <small>Puede marcar mas de una opción</small>
                          </div>
                          <div className="flex flex-col">
                            {Laboratorios?.map((lab) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={infraestructura.laboratorio.includes(
                                      lab
                                    )}
                                    onChange={(event, target) => {
                                      if (target) {
                                        setInfraestructura({
                                          ...infraestructura,
                                          laboratorio: [
                                            ...infraestructura.laboratorio,
                                            lab,
                                          ],
                                        });
                                      } else {
                                        setInfraestructura({
                                          ...infraestructura,
                                          laboratorio:
                                            infraestructura.laboratorio.filter(
                                              (cat) => cat !== lab
                                            ),
                                        });
                                      }
                                    }}
                                  />
                                }
                                label={lab}
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="flex flex-col">
                            <label
                              htmlFor="categoria"
                              className="text-lg font-medium"
                            >
                              Artistica
                            </label>
                            <small>Puede marcar mas de una opción</small>
                          </div>
                          <div className="flex flex-col">
                            {Artistica?.map((art) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={infraestructura.artistica.includes(
                                      art
                                    )}
                                    onChange={(event, target) => {
                                      if (target) {
                                        setInfraestructura({
                                          ...infraestructura,
                                          artistica: [
                                            ...infraestructura.artistica,
                                            art,
                                          ],
                                        });
                                      } else {
                                        setInfraestructura({
                                          ...infraestructura,
                                          artistica:
                                            infraestructura.artistica.filter(
                                              (cat) => cat !== art
                                            ),
                                        });
                                      }
                                    }}
                                  />
                                }
                                label={art}
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="flex flex-col">
                            <label
                              htmlFor="categoria"
                              className="text-lg font-medium"
                            >
                              Deportiva
                            </label>
                            <small>Puede marcar mas de una opción</small>
                          </div>
                          <div className="flex flex-col">
                            {Deportiva?.map((dep) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={infraestructura.deportiva.includes(
                                      dep
                                    )}
                                    onChange={(event, target) => {
                                      if (target) {
                                        setInfraestructura({
                                          ...infraestructura,
                                          deportiva: [
                                            ...infraestructura.deportiva,
                                            dep,
                                          ],
                                        });
                                      } else {
                                        setInfraestructura({
                                          ...infraestructura,
                                          deportiva:
                                            infraestructura.deportiva.filter(
                                              (cat) => cat !== dep
                                            ),
                                        });
                                      }
                                    }}
                                  />
                                }
                                label={dep}
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="flex flex-col">
                            <label
                              htmlFor="categoria"
                              className="text-lg font-medium"
                            >
                              Administrativa
                            </label>
                            <small>Puede marcar mas de una opción</small>
                          </div>
                          <div className="flex flex-col">
                            {Administrativa?.map((adm) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={infraestructura.administrativa.includes(
                                      adm
                                    )}
                                    onChange={(event, target) => {
                                      if (target) {
                                        setInfraestructura({
                                          ...infraestructura,
                                          administrativa: [
                                            ...infraestructura.administrativa,
                                            adm,
                                          ],
                                        });
                                      } else {
                                        setInfraestructura({
                                          ...infraestructura,
                                          administrativa:
                                            infraestructura.administrativa.filter(
                                              (cat) => cat !== adm
                                            ),
                                        });
                                      }
                                    }}
                                  />
                                }
                                label={adm}
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="flex flex-col">
                            <label
                              htmlFor="categoria"
                              className="text-lg font-medium"
                            >
                              Enseñanza
                            </label>
                            <small>Puede marcar mas de una opción</small>
                          </div>
                          <div className="flex flex-col">
                            {Enseñanza?.map((ens) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={infraestructura.enseñanza.includes(
                                      ens
                                    )}
                                    onChange={(event, target) => {
                                      if (target) {
                                        setInfraestructura({
                                          ...infraestructura,
                                          enseñanza: [
                                            ...infraestructura.enseñanza,
                                            ens,
                                          ],
                                        });
                                      } else {
                                        setInfraestructura({
                                          ...infraestructura,
                                          enseñanza:
                                            infraestructura.enseñanza.filter(
                                              (cat) => cat !== ens
                                            ),
                                        });
                                      }
                                    }}
                                  />
                                }
                                label={ens}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <Box
                        sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                      >
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button
                          onClick={handleCompleteInfraestructura}
                          sx={{ mr: 1 }}
                          disabled={infraestructuraCompleted()}
                        >
                          Next
                        </Button>
                        {/* {activeStep !== steps.length &&
                      (completed[activeStep] ? (
                        <Typography
                          variant="caption"
                          sx={{ display: "inline-block" }}
                        >
                          Step {activeStep + 1} already completed
                        </Typography>
                      ) : (
                        <Button onClick={handleComplete}>
                          {completedSteps() === totalSteps() - 1
                            ? "Finish"
                            : "Complete Step"}
                        </Button>
                      ))} */}
                      </Box>
                    </div>
                  )}
                  {activeStep === 2 && (
                    <div className="flex flex-col gap-5">
                      <h1 className="text-2xl">
                        Almenos una casilla de cada categoria debe ser
                        seleccionada
                      </h1>
                      <div className="flex flex-col lg:flex-row gap-5">
                        <div className="flex flex-col gap-7">
                          <div>
                            <div className="flex flex-col">
                              <label
                                htmlFor="categoria"
                                className="text-lg font-medium"
                              >
                                Afiliaciones
                              </label>
                              <small>Puede marcar mas de una opción</small>
                            </div>
                            <div className="flex flex-col">
                              {Acreditaciones?.map((acc) => (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={acreditaciones.afiliaciones.includes(
                                        acc
                                      )}
                                      onChange={(event, target) => {
                                        if (target) {
                                          setAcreditaciones({
                                            ...acreditaciones,
                                            afiliaciones: [
                                              ...acreditaciones.afiliaciones,
                                              acc,
                                            ],
                                          });
                                        } else {
                                          setAcreditaciones({
                                            ...acreditaciones,
                                            afiliaciones:
                                              acreditaciones.afiliaciones.filter(
                                                (cat) => cat !== acc
                                              ),
                                          });
                                        }
                                      }}
                                    />
                                  }
                                  label={acc}
                                />
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="flex flex-col">
                              <label
                                htmlFor="categoria"
                                className="text-lg font-medium"
                              >
                                Alianzas
                              </label>
                              <small>Puede marcar mas de una opción</small>
                            </div>
                            <div className="flex flex-col">
                              {Alianzas?.map((all) => (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={acreditaciones.alianzas.includes(
                                        all
                                      )}
                                      onChange={(event, target) => {
                                        if (target) {
                                          setAcreditaciones({
                                            ...acreditaciones,
                                            alianzas: [
                                              ...acreditaciones.alianzas,
                                              all,
                                            ],
                                          });
                                        } else {
                                          setAcreditaciones({
                                            ...acreditaciones,
                                            alianzas:
                                              acreditaciones.alianzas.filter(
                                                (cat) => cat !== all
                                              ),
                                          });
                                        }
                                      }}
                                    />
                                  }
                                  label={all}
                                />
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="flex flex-col">
                              <label
                                htmlFor="categoria"
                                className="text-lg font-medium"
                              >
                                Certificaciones
                              </label>
                              <small>Puede marcar mas de una opción</small>
                            </div>
                            <div className="flex flex-col">
                              {Certificaciones?.map((cert) => (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={acreditaciones.certificaciones.includes(
                                        cert
                                      )}
                                      onChange={(event, target) => {
                                        if (target) {
                                          setAcreditaciones({
                                            ...acreditaciones,
                                            certificaciones: [
                                              ...acreditaciones.certificaciones,
                                              cert,
                                            ],
                                          });
                                        } else {
                                          setAcreditaciones({
                                            ...acreditaciones,
                                            certificaciones:
                                              acreditaciones.certificaciones.filter(
                                                (cat) => cat !== cert
                                              ),
                                          });
                                        }
                                      }}
                                    />
                                  }
                                  label={cert}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex flex-col">
                            <label
                              htmlFor="categoria"
                              className="text-lg font-medium"
                            >
                              Asociaciones
                            </label>
                            <small>Puede marcar mas de una opción</small>
                          </div>
                          <div className="flex flex-col">
                            {Asociaciones?.map((asc) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={acreditaciones.asociaciones.includes(
                                      asc
                                    )}
                                    onChange={(event, target) => {
                                      if (target) {
                                        setAcreditaciones({
                                          ...acreditaciones,
                                          asociaciones: [
                                            ...acreditaciones.asociaciones,
                                            asc,
                                          ],
                                        });
                                      } else {
                                        setAcreditaciones({
                                          ...acreditaciones,
                                          asociaciones:
                                            acreditaciones.asociaciones.filter(
                                              (cat) => cat !== asc
                                            ),
                                        });
                                      }
                                    }}
                                  />
                                }
                                label={asc}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <Box
                        sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                      >
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button
                          onClick={handleCompleteAcreditaciones}
                          sx={{ mr: 1 }}
                          disabled={acreditacionesCompleted()}
                        >
                          Next
                        </Button>
                        {/* {activeStep !== steps.length &&
                                        (completed[activeStep] ? (
                                          <Typography
                                            variant="caption"
                                            sx={{ display: "inline-block" }}
                                          >
                                            Step {activeStep + 1} already completed
                                          </Typography>
                                        ) : (
                                          <Button onClick={handleComplete}>
                                            {completedSteps() === totalSteps() - 1
                                              ? "Finish"
                                              : "Complete Step"}
                                          </Button>
                                        ))} */}
                      </Box>
                    </div>
                  )}
                  {activeStep === 3 && (
                    <div className="flex flex-col gap-5">
                      <h1 className="text-2xl">Agregar imagenes</h1>
                      <small>
                        Deberas subir las imagenes con el boton{" "}
                        <span className="font-bold">Upload</span> antes de
                        proseguir
                      </small>
                      <div className="flex flex-col lg:flex-row gap-5">
                        <form
                          onSubmit={handleFilesSubmit}
                          className="flex flex-col"
                        >
                          <div className="file-select flex w-full">
                            <label
                              htmlFor="image"
                              className="bg-white cursor-pointer p-5 w-full h-full shadow-md flex justify-center flex-col items-center rounded-t-md"
                            >
                              <RiImageAddLine className="text-7xl text-[#0061dd] group-focus:text-white group-hover:text-white" />
                              <span className="text-sm mx-auto text-center text-[#0061dd]">
                                Agregar imagenes
                              </span>{" "}
                            </label>
                            <input
                              type="file"
                              id="image"
                              name="image"
                              accept="image/png,image/jpeg"
                              onChange={(e) => setFiles(e.target.files)}
                              multiple
                              className="hidden"
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={files !== null && preview.length !== 0 ? false : true}
                            className="p-2 bg-[#0061dd] disabled:bg-[#0061dd]/50 text-white rounded-b-md"
                          >
                            Upload
                          </button>
                        </form>
                        {files !== null && preview.length !== 0 && (
                          <>
                            <div className="border-2 rounded-md overflow-hidden p-2 bg-white">
                              <StandardImageList
                                eliminarImagenDePreview={eliminarImagenDePreview}
                                setImage={setImage}
                                list={preview}
                              />
                            </div>
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
                                className="absolute border-4 top-1/2 left-1/2 -translate-x-1/2 rounded-md -translate-y-1/2 block max-w-[80%] max-h-[80%] object-cover "
                              />
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex flex-col gap-3">
                        <label
                          htmlFor="nombreColegio"
                          className="text-lg font-medium"
                        >
                          Video Url
                        </label>
                        <input
                          type="url"
                          name="video"
                          id="video"
                          className="p-3 rounded-md border-2  outline-none"
                          value={multimedia.video_url}
                          onChange={(e) =>
                            setMultimedia({
                              ...multimedia,
                              video_url: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Box
                        sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                      >
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button
                          onClick={handleCompleteMultimedia}
                          sx={{ mr: 1 }}
                          disabled={multimediaCompleted()}
                        >
                          Next
                        </Button>
                        {/* {activeStep !== steps.length &&
                                        (completed[activeStep] ? (
                                          <Typography
                                            variant="caption"
                                            sx={{ display: "inline-block" }}
                                          >
                                            Step {activeStep + 1} already completed
                                          </Typography>
                                        ) : (
                                          <Button onClick={handleComplete}>
                                            {completedSteps() === totalSteps() - 1
                                              ? "Finish"
                                              : "Complete Step"}
                                          </Button>
                                        ))} */}
                      </Box>
                    </div>
                  )}
                </React.Fragment>
              )}
            </div>
          </Box>
        ) : page === 1 ? (
          <div>1</div>
        ) : page === 2 ? (
          <div>2</div>
        ) : page === 3 ? (
          <div>3</div>
        ) : page === 4 ? (
          <div>4</div>
        ) : null}
      </section>
    </div>
  );
}

export default DashboardSchool;
