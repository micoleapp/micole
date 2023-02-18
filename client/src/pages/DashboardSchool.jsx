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
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  Autocomplete,
} from "@react-google-maps/api";

const libraries = ["places"];

const steps = [
  "Datos Principales",
  "Infraestructura",
  "Acreditaciones",
  "Multimedia",
];
const levels = [
  { nombre: "Preescolar" },
  { nombre: "Primaria" },
  { nombre: "Secundaria" },
  { nombre: "Bachillerato" },
  { nombre: "Universidad" },
];
import { CiUser, CiClock1 } from "react-icons/ci";
import { BsPlusCircleDotted, BsWindowDock } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { useEffect } from "react";
import {
  getAllCategories,
  getAllDepartaments,
  getAllDistrits,
  getAllProvincias,
} from "../redux/SchoolsActions";
import { useState } from "react";
import { useRef } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

function DashboardSchool() {
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

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
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
        direccion: place.address_components[1].long_name + " " + place.address_components[0].long_name,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      })
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const [datosPrincipales, setDatosPrincipales] = useState({
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
  });

  console.log(datosPrincipales);

  return (
    <div className="flex">
      <section className="leftshadow min-h-screen bg-white w-1/4 shadow-leftshadow flex justify-center z-50">
        <ul className="flex flex-col gap-4 absolute top-48">
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
      <section className="right w-full bg-[#f6f7f8] px-32 py-12">
        {page === 0 ? (
          <Box sx={{ width: "100%", height: "100%" }}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <div className="mt-10">
              {allStepsCompleted() ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
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
                        <div className="grid grid-cols-3">
                          {categories?.map((category) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={datosPrincipales.categoria.includes(category.nombre_categoria)}
                                  onChange={(event, target) => {
                                    if(target) {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        categoria: [...datosPrincipales.categoria, category.nombre_categoria]
                                      })
                                    } else{
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        categoria: datosPrincipales.categoria.filter(cat => cat !== category.nombre_categoria)
                                      })
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
                      <div className="grid grid-cols-3 gap-5">
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
                        <div>
                          {levels?.map((level) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                onChange={(event, target) => {
                                  if(target) {
                                    setDatosPrincipales({
                                      ...datosPrincipales,
                                      niveles: [...datosPrincipales.niveles, level.nombre]
                                    })
                                  } else{
                                    setDatosPrincipales({
                                      ...datosPrincipales,
                                      niveles: datosPrincipales.niveles.filter(cat => cat !== level.nombre)
                                    })
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
                        <div className="flex w-full gap-5">
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
                                onChange={(e)=>{
                                  setDepartamento(e.target.value)
                                  setDatosPrincipales({
                                    ...datosPrincipales,
                                    departamento: e.target.value
                                  })
                                }}
                                label="Selecciona una Provincia"
                                className="bg-white"
                                defaultValue={""}
                              >
                                {departaments.map((type, index) => (
                                  <MenuItem
                                    value={type}
                                    key={type.index}
                                  >
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
                                onChange={(e)=>{
                                  setProvincia(e.target.value)
                                  setDatosPrincipales({
                                    ...datosPrincipales,
                                    provincia: e.target.value
                                  })
                                }}
                                label="Selecciona una Provincia"
                                className="bg-white"
                                defaultValue={""}
                              >
                                {provincias.map((type, index) => (
                                  <MenuItem
                                    value={type}
                                    key={type.index}
                                  >
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
                                onChange={(e)=>{
                                  setDistrito(e.target.value)
                                  setDatosPrincipales({
                                    ...datosPrincipales,
                                    distrito: e.target.value
                                  })
                                }}
                                label="Selecciona una Provincia"
                                className="bg-white"
                                defaultValue={""}
                              >
                                {distrits.map((type, index) => (
                                  <MenuItem
                                    value={type}
                                    key={type.index}
                                  >
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
                              <div className="flex w-full gap-5">
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
                                  className="p-3 rounded-md border-2 bg-white outline-none"
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
                                  className="p-3 rounded-md border-2 bg-white outline-none"
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
                                  className="p-3 rounded-md border-2 bg-white outline-none"
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
                    </form>
                  )}

                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleNext} sx={{ mr: 1 }}>
                      Next
                    </Button>
                    {activeStep !== steps.length &&
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
                      ))}
                  </Box>
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
