import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import ContentLoader from "react-content-loader";
import { Rating, Typography, Pagination, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  faCamera,
  faPlayCircle,
  faSearch,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { CiBag1 } from "react-icons/ci";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { ImTicket } from "react-icons/im";
import { ImAttachment } from "react-icons/im";
import { HiOutlineUsers } from "react-icons/hi";

import {
  getAllDepartaments,
  getAllDistrits,
  getFilterHome,
  getFilterListSchool,
  setPrecios,
} from "../redux/SchoolsActions";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

const yearNow = new Date().getFullYear();
const Ingreso2 = [yearNow, yearNow + 1, yearNow + 2];

const types = [
  {
    value: "mayor_precio_pension",
    label: "Mayor Precio Pensión",
    onClick: () => {
      console.log("Mayor Precio");
    },
  },
  {
    value: "menor_precio_pension",
    label: "Menor Precio Pensión",
    onClick: () => {
      console.log("Menor Precio");
    },
  },
  {
    value: "",
    label: "",
    onClick: () => {
      console.log("divider");
    },
  },
  {
    value: "mayor_precio_matricula",
    label: "Mayor Precio Matricula",
    onClick: () => {
      console.log("Mayor Precio");
    },
  },
  {
    value: "menor_precio_matricula",
    label: "Menor Precio Matricula",
    onClick: () => {
      console.log("Menor Precio");
    },
  },
  {
    value: "",
    label: "",
    onClick: () => {
      console.log("divider");
    },
  },
  {
    value: "mayor_precio_ingreso",
    label: "Mayor Precio Ingreso",
    onClick: () => {
      console.log("Mayor Precio");
    },
  },
  {
    value: "menor_precio_ingreso",
    label: "Menor Precio Ingreso",
    onClick: () => {
      console.log("Menor Precio");
    },
  },
  {
    value: "",
    label: "",
    onClick: () => {
      console.log("divider");
    },
  },
  {
    value: "mayor_rating",
    label: "Mayor Rating",
    onClick: () => {
      console.log("Mayor Precio");
    },
  },
  {
    value: "menor_rating",
    label: "Menor Rating",
    onClick: () => {
      console.log("Menor Precio");
    },
  },
];
function valuetext(value) {
  return `${value}°C`;
}

function valuetext2(value) {
  return `${value}°C`;
}

const minDistance = 100;
function ListSchool() {
  const dispatch = useDispatch();
  const {
    filtersSchools: allschools,
    loading,
    distrits,
    grados,
    categories,
    pagination,
    dificultades,
    metodos,
    precios
  } = useSelector((state) => state.schools);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setPrecios())
  }, []); 
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const [distritParams, setDistritParams] = React.useState(
    params.get("distrito")
  );
  const [gradoParams, setGradoParams] = React.useState(params.get("grado"));
  const [ingresoParams, setIngresoParams] = React.useState(
    params.get("ingreso")
  );

  const [categoriaParam, setCategoriaParam] = React.useState(
    params.get("categoria")
  );

  const [distritName, setDistritName] = React.useState(
    distritParams !== "false" ? [Number(distritParams)] : []
  );
  const [gradoName, setGradoName] = React.useState(
    gradoParams !== "false" ? Number(gradoParams) : []
  );
  const [ingresoName, setIngresoName] = React.useState(
    ingresoParams !== "false" ? Number(ingresoParams) : []
  );
  const [order, setOrder] = React.useState([]);
  const [categorias, setCategorias] = React.useState([]);
  const [english, setEnglish] = React.useState(40);

  const handleChangeEnglish = (event, newValue) => {
    setEnglish(newValue);
  };

  const [type, setType] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [rating, setRating] = React.useState(null);
  const [value1, setValue1] = React.useState(precios.length > 0 ? precios[0] : 0);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  
  const [value2, setValue2] = React.useState(precios.length > 0 ? precios[1] : 5000);
  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue2([Math.min(newValue[0], value2[1] - minDistance), value2[1]]);
    } else {
      setValue2([value2[0], Math.max(newValue[1], value2[0] + minDistance)]);
    }
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };



  const [dificultadesArray, setDificultadesArray] = useState([]);
  const [metodosArray, setMetodosArray] = useState([]);

  useEffect(() => {
    dispatch(getFilterListSchool(data, page));
  }, [page, order]);
  const items = [1, 2, 3, 4, 5];
  const [toggle, setToggle] = useState(false);
  const [toggleDistrits, setToggleDistrits] = useState(false);
  const [toggleGrado, setToggleGrado] = useState(false);
  const [toggleTypes, setToggleTypes] = useState(false);
  const [toggleAño, setToggleAño] = useState(false);
  const [toggleDificultad, setToggleDificultad] = useState(false);
  const [toggleMetodo, setToggleMetodo] = useState(false);

  const data = {
    distrits: distritName,
    grado: gradoName,
    tipo: categorias,
    pension: [value1[0], value1[1]],
    cuota: [value2[0], value2[1]],
    rating,
    ingles: english,
    ingreso: ingresoName,
    order: order,
    dificultades: dificultadesArray,
    metodos: metodosArray,
    search: "",
  };

  const handleSubmitData = (e) => {
    e.preventDefault();
    setPage(1);
    dispatch(getFilterListSchool(data, page));
  };

  const handleSort = (value) => {
    setPage(1);
    setOrder(value);
  };
  const goToDetails = (id,lista) => {
    if (gradoName.length === 0 || ingresoName.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes seleccionar un grado y un año de ingreso",
      });
      return;
    } else {
      window.open(`/#/schooldetail/${id}?grado=${gradoName}&ingreso=${ingresoName}&lista=${lista}`,"_blank");
    }
  };

  function FavoritoButton() {
    const [favorito, setFavorito] = useState(false);

    const toggleFavorito = () => {
      setFavorito(!favorito);
    };

    return (
      <button className="text-2xl" onClick={toggleFavorito}>
        {favorito ? "❤️" : "🤍"}
      </button>
    );
  }

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const [searchTerm, setSerchTerm] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    let newData = {...data, search:searchTerm}
    setPage(1);
    dispatch(getFilterListSchool(newData, page));
  }
  return (
    <div
      className="flex flex-col py-5 px-0 lg:p-5 bg-[#f6f7f8] "

      data-aos-duration="1000"
      data-aos-mirror={false}
    >
      <h1 className="text-center mt-2 text-2xl font-semibold drop-shadow-md">
        Encuentra el colegio ideal
      </h1>
      <div className="flex flex-col lg:flex-row p-5 gap-10 ">
        <section
          className={`lg:w-1/4 w-full flex flex-col gap-5 rounded-md relative duration-300 lg:h-min bg-white shadow-lg p-10 transition-all`}
        >
          <h2 className="font-semibold text-2xl drop-shadow-md">Filtros</h2>
          <button
            className="absolute block lg:hidden left-0 right-0"
            onClick={() => setToggle(!toggle)}
          >
            {" "}
            <FontAwesomeIcon
              size="lg"
              color="rgb(156 163 175)"
              icon={faArrowDown}
              className={`${toggle ? "-rotate-180" : ""} duration-200`}
            />
          </button>
          <div
            className={`${
              toggle
                ? "flex lg:flex flex-col gap-5"
                : "hidden lg:flex flex-col gap-5"
            }`}
          >
            <div>
              <div className="flex items-center gap-5 z-50 ">
                <Typography id="input-slider" gutterBottom fontWeight="bold">
                  Distritos
                </Typography>
                <button onClick={() => setToggleDistrits(!toggleDistrits)}>
                  {" "}
                  <FontAwesomeIcon
                    size="lg"
                    icon={faArrowDown}
                    className={`${
                      toggleDistrits ? "-rotate-180" : ""
                    } duration-200`}
                  />
                </button>
              </div>
              <div
                className={
                  toggleDistrits
                    ? "block h-[200px] overflow-y-scroll"
                    : "hidden"
                }
              >
                <FormGroup>
                  {distrits?.map((distrit) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            Number(distritParams) === distrit.id ||
                            distritName.includes(distrit.id)
                          }
                          onChange={(event, target) => {
                            if (target) {
                              setDistritParams(distrit.id);
                              setDistritName([...distritName, distrit.id]);
                            } else {
                              setDistritParams(false);
                              setDistritName(
                                distritName.filter(
                                  (dist) => dist !== distrit.id
                                )
                              );
                            }
                          }}
                        />
                      }
                      label={distrit.nombre_distrito}
                    />
                  ))}
                </FormGroup>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-5 z-50">
                <Typography id="input-slider" gutterBottom fontWeight="bold">
                  Tipo de Colegios
                </Typography>
                <button onClick={() => setToggleTypes(!toggleTypes)}>
                  {" "}
                  <FontAwesomeIcon
                    size="lg"
                    icon={faArrowDown}
                    className={`${
                      toggleTypes ? "-rotate-180" : ""
                    } duration-200`}
                  />
                </button>
              </div>
              <div
                className={
                  toggleTypes ? "block h-[200px] overflow-y-scroll" : "hidden"
                }
              >
                <FormGroup>
                  {categories &&
                    categories.length > 0 &&
                    categories?.map((cat,index) => (
                      <FormControlLabel
                      key={index}
                        control={
                          <Checkbox
                            checked={
                              categorias == cat.id || categoriaParam == cat.id
                            }
                            onChange={(event, target) => {
                              if (target) {
                                setCategoriaParam(cat.id);
                                setCategorias(cat.id);
                              } else {
                                setCategoriaParam(null);
                                setCategorias([]);
                              }
                            }}
                          />
                        }
                        label={cat.nombre_categoria}
                      />
                    ))}
                </FormGroup>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-5 z-50 ">
                <Typography id="input-slider" gutterBottom fontWeight="bold">
                  Grados
                </Typography>
                <button onClick={() => setToggleGrado(!toggleGrado)}>
                  {" "}
                  <FontAwesomeIcon
                    size="lg"
                    icon={faArrowDown}
                    className={`${
                      toggleGrado ? "-rotate-180" : ""
                    } duration-200`}
                  />
                </button>
              </div>
              <div
                className={
                  toggleGrado ? "block h-[200px] overflow-y-scroll" : "hidden"
                }
              >
                <FormGroup>
                  {grados?.map((grado) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            Number(gradoParams) === grado.id ||
                            gradoName == grado.id
                          }
                          onChange={(event, target) => {
                            if (target) {
                              setGradoParams(grado.id);
                              setGradoName(grado.id);
                            } else {
                              setGradoParams(false);
                              setGradoName([]);
                            }
                          }}
                        />
                      }
                      label={grado.nombre_grado}
                    />
                  ))}
                </FormGroup>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-5 z-50 ">
                <Typography id="input-slider" gutterBottom fontWeight="bold">
                  Año de ingreso
                </Typography>
                <button onClick={() => setToggleAño(!toggleAño)}>
                  {" "}
                  <FontAwesomeIcon
                    size="lg"
                    icon={faArrowDown}
                    className={`${toggleAño ? "-rotate-180" : ""} duration-200`}
                  />
                </button>
              </div>
              <div
                className={
                  toggleAño ? "block h-[150px] overflow-y-scroll" : "hidden"
                }
              >
                <FormGroup>
                  {Ingreso2?.map((año, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={
                            Number(ingresoParams) === año || ingresoName == año
                          }
                          onChange={(event, target) => {
                            if (target) {
                              setIngresoParams(año);
                              setIngresoName(año);
                            } else {
                              setIngresoParams(false);
                              setIngresoName([]);
                            }
                          }}
                        />
                      }
                      label={año}
                    />
                  ))}
                </FormGroup>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-5 z-50 ">
                <Typography id="input-slider" gutterBottom fontWeight="bold">
                  Apto para
                </Typography>
                <button onClick={() => setToggleDificultad(!toggleDificultad)}>
                  {" "}
                  <FontAwesomeIcon
                    size="lg"
                    icon={faArrowDown}
                    className={`${
                      toggleDificultad ? "-rotate-180" : ""
                    } duration-200`}
                  />
                </button>
              </div>
              <div
                className={
                  toggleDificultad
                    ? "block h-[150px] overflow-y-scroll"
                    : "hidden"
                }
              >
                <FormGroup>
                  {dificultades?.map((dif, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          size="small"
                          checked={dificultadesArray.includes(
                            dif.id_dificultad
                          )}
                          onChange={(event, target) => {
                            if (target) {
                              setDificultadesArray([
                                ...dificultadesArray,
                                dif.id_dificultad,
                              ]);
                            } else {
                              setDificultadesArray(
                                dificultadesArray.filter(
                                  (dificultad) =>
                                    dificultad !== dif.id_dificultad
                                )
                              );
                            }
                          }}
                        />
                      }
                      label={dif.nombre_dificultad}
                    />
                  ))}
                </FormGroup>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-5 z-50 ">
                <Typography id="input-slider" gutterBottom fontWeight="bold">
                  Métodos pedagógicos
                </Typography>
                <button onClick={() => setToggleMetodo(!toggleMetodo)}>
                  {" "}
                  <FontAwesomeIcon
                    size="lg"
                    icon={faArrowDown}
                    className={`${
                      toggleMetodo ? "-rotate-180" : ""
                    } duration-200`}
                  />
                </button>
              </div>
              <div
                className={
                  toggleMetodo ? "block h-[150px] overflow-y-scroll" : "hidden"
                }
              >
                <FormGroup>
                  {metodos?.map((dif, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={metodosArray.includes(dif.id_metodo)}
                          onChange={(event, target) => {
                            if (target) {
                              setMetodosArray([...metodosArray, dif.id_metodo]);
                            } else {
                              setMetodosArray(
                                metodosArray.filter(
                                  (dificultad) => dificultad !== dif.id_metodo
                                )
                              );
                            }
                          }}
                        />
                      }
                      label={dif.nombre_metodo}
                    />
                  ))}
                </FormGroup>
              </div>
            </div>
            <div className="drop-shadow-md">
              <Typography id="input-slider" gutterBottom fontWeight="bold">
                Pensión (s/)
              </Typography>
              <Slider
                getAriaLabel={() => "Minimum distance"}
                value={value1}
                onChange={handleChange1}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
                step={100}
                min={0}
                max={4000}
              />
              <div className="flex w-full gap-5 justify-around">
                <div className="bg-[#edf4fe] rounded-sm shadow-md p-2 text-[#0061dd] w-full text-center">
                  ${value1[0]}
                </div>
                <div className="bg-[#edf4fe] rounded-sm shadow-md p-2 text-[#0061dd] w-full text-center">
                  ${value1[1]}
                </div>
              </div>
            </div>
            <div className="drop-shadow-md">
              <Typography id="input-slider" gutterBottom fontWeight="bold">
                Cuota de ingreso (s/)
              </Typography>
              <Slider
                getAriaLabel={() => "Minimum distance"}
                value={value2}
                onChange={handleChange2}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext2}
                disableSwap
                step={100}
                min={0}
                max={4000}
              />
              <div className="flex w-full gap-5 justify-around">
                <div className="bg-[#edf4fe] rounded-sm shadow-md p-2 text-[#0061dd] w-full text-center">
                  ${value2[0]}
                </div>
                <div className="bg-[#edf4fe] rounded-sm shadow-md p-2 text-[#0061dd] w-full text-center">
                  ${value2[1]}
                </div>
              </div>
            </div>
            <div className="drop-shadow-md">
              <Typography id="input-slider" gutterBottom fontWeight="bold">
                Calificación
              </Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                max={5}
                precision={0.5}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </div>
            <div className="drop-shadow-md">
              <Typography id="input-slider" gutterBottom fontWeight="bold">
                Inglés
              </Typography>
              <Slider
                aria-label="English"
                min={0}
                max={100}
                value={english}
                onChange={handleChangeEnglish}
                valueLabelDisplay="auto"
              />
              <div className="bg-[#edf4fe] rounded-sm shadow-md p-2 text-[#0061dd] w-full text-center">
                {english > 40 ? <>Colegios Bilingües</> : <>{english} (Hrs/semana)</>}
                
              </div>
            </div>
            <button
              onClick={handleSubmitData}
              className="bg-[#0061dd] text-white w-full p-3 rounded-sm flex justify-center items-center gap-5"
            >
              <FontAwesomeIcon size="lg" icon={faSearch} />
              BUSCAR
            </button>
          </div>
        </section>
        <section className="lg:w-3/4 w-full lg:pr-10 lg:pb-10 p-0 flex flex-col gap-5">
          <div className="flex items-center justify-between drop-shadow-md">
            <small>
              Mostrando{" "}
              <span className="font-semibold">{allschools.length}</span> de{" "}
              <span className="font-semibold"> {pagination?.count}</span>{" "}
              {/* de <span className="font-semibold">{pagination?.count}</span>{" "} */}
              resultados{" "}
            </small>
            <FormControl
              variant="standard"
              style={{ width: "200px", height: "70px" }}
              size="small"
            >
              <InputLabel id="demo-simple-select-standard-label">
                Ordenar por
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-type-select-standard"
                value={type}
                onChange={handleChangeType}
                label="Tipo de colegio"
              >
                {types.map((type, index) => (
                  <MenuItem
                    value={type.value}
                    key={index}
                    onClick={() => type.value !== "" && handleSort(type.value)}
                  >
                    <ListItemText primary={type.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="bg-white w-fit flex px-2 py-1 rounded-md border">
            <form
            className="flex"
            onSubmit={(e)=>handleSearch(e)}
            >
            <input value={searchTerm} placeholder="Buscar por nombre.." onChange={(e)=>setSerchTerm(e.target.value)} type="text" name="search" id="search" className="outline-none w-[300px] lg:w-[400px]" onKeyDown={(e) => {if (e.key === "Enter") {handleSearch(e);}}}/>
            <label htmlFor="search" className="text-[#0061dd] cursor-pointer">
              <button type="submit">
              <FontAwesomeIcon icon={faSearch} className="hover:scale-125 duration-200"/>
              </button>
            </label>

            </form>
          </div>
          {allschools?.length === 0 && (
            <h1>No hay colegios que coincidan con esos filtros</h1>
          )}
          <div className="flex flex-col gap-5">
            {allschools.length > 0
              ? allschools?.map((school, index) => {
                  return (
                    <div
                      key={school.id}
                      className={`flex border rounded-md shadow-md bg-white gap-2 flex-col md:flex-row`}
                    >
                      {" "}
                      <div className="relative">
                        <img
                          src={school.primera_imagen}
                          alt={school.title}
                          className="h-full max-h-[255px] w-[400px] object-cover"
                        />
                        {/* <span className="absolute bg-[#0061dd] text-white p-1 px-2 rounded-md top-3 left-3">
                          DESTACADO
                        </span> */}
                        {school?.Vacantes?.length > 0 &&
                          ingresoName &&
                          gradoName &&
                          school?.Vacantes?.filter(
                            (vac) =>
                              vac.GradoId === gradoName &&
                              vac.año === ingresoName
                          )[0]?.hasOwnProperty("capacidad") &&
                          school?.Vacantes?.filter(
                            (vac) =>
                              vac.GradoId === gradoName &&
                              vac.año === ingresoName
                          )[0]?.hasOwnProperty("año") && (
                            <span
                              className={`absolute ${
                                school?.Vacantes?.filter(
                                  (vac) =>
                                    vac.GradoId === gradoName &&
                                    vac.año === ingresoName
                                )[0].capacidad -
                                  school?.Vacantes?.filter(
                                    (vac) =>
                                      vac.GradoId === gradoName &&
                                      vac.año === ingresoName
                                  )[0].alumnos_matriculados >
                                0
                                  ? "bg-green-500/80"
                                  : "bg-red-500/80"
                              } text-white p-1 px-2 rounded-md top-14 xl:top-3 xl:right-3 ml-3 w-fit`}
                            >
                              {school?.Vacantes?.length > 0 &&
                              ingresoName &&
                              gradoName &&
                              school?.Vacantes?.filter(
                                (vac) =>
                                  vac.GradoId === gradoName &&
                                  vac.año === ingresoName
                              )[0].hasOwnProperty("capacidad") &&
                              school?.Vacantes?.filter(
                                (vac) =>
                                  vac.GradoId === gradoName &&
                                  vac.año === ingresoName
                              )[0].hasOwnProperty("año") &&
                              school?.Vacantes?.filter(
                                (vac) =>
                                  vac.GradoId === gradoName &&
                                  vac.año === ingresoName
                              )[0].capacidad -
                                school?.Vacantes?.filter(
                                  (vac) =>
                                    vac.GradoId === gradoName &&
                                    vac.año === ingresoName
                                )[0].alumnos_matriculados >
                                0
                                ? school?.Vacantes?.filter(
                                    (vac) =>
                                      vac.GradoId === gradoName &&
                                      vac.año === ingresoName
                                  )[0].capacidad -
                                  school?.Vacantes?.filter(
                                    (vac) =>
                                      vac.GradoId === gradoName &&
                                      vac.año === ingresoName
                                  )[0].alumnos_matriculados +
                                  " Vacantes"
                                : "No hay vacantes"}{" "}
                            </span>
                          )}

                        <div className="flex absolute gap-5 text-white bottom-3 left-3 bg-black/50 p-2 rounded-md">
                          <span className="flex hover:scale-110 duration-200 cursor-pointer items-center gap-2">
                            <FontAwesomeIcon size="lg" icon={faCamera} />
                            {school.galeria_fotos &&
                              JSON.parse(school.galeria_fotos).length}
                          </span>
                          <span className="flex hover:scale-110 duration-200 cursor-pointer items-center gap-2">
                            {" "}
                            <FontAwesomeIcon size="lg" icon={faPlayCircle} />
                          </span>
                        </div>
                      </div>
                      <div className="w-full p-5  flex flex-col justify-between gap-5">
                        <div className="flex justify-between gap-4 xl:gap-0 flex-col xl:flex-row">
                          <div className="flex flex-col gap-4 w-full">
                            <div className="flex flex-col w-fit gap-2">
                              <h1 className="font-semibold text-lg">
                                {school.nombre_colegio}{" "}
                              </h1>
                              <small className="text-gray-400">
                                {school.direccion}{" "}
                              </small>
                            </div>
                            {/* <div className="flex items-center justify-center w-fit gap-10">
                              <div className="flex flex-col items-center gap-2 text-center">
                                <FontAwesomeIcon
                                  size="lg"
                                  color="rgb(156 163 175)"
                                  icon={faUsers}
                                />
                                <span className="text-sm text-gray-400">
                                  {school.numero_estudiantes} Alumnos
                                </span>
                              </div>
                              {school?.Categoria?.map((cat) => (
                                <div className="flex flex-col items-center gap-2 text-center">
                                  <img
                                    src={cat.logo_categoria}
                                    alt="logo_categoria"
                                    className="w-4 object-cover invert-[40%] drop-shadow-md"
                                  />
                                  <span className="text-sm text-gray-400">
                                    {cat.nombre_categoria}{" "}
                                  </span>
                                </div>
                              ))}
                            </div> */}

                            <div className="grid grid-cols-2 grid-rows-3 w-max gap-x-2 gap-y-2">
                              {school.Vacantes.length > 0 && (
                                <small className="text-gray-400 flex gap-1 items-center">
                                  {" "}
                                  <span className="text-xl">
                                    <CiBag1></CiBag1>
                                  </span>{" "}
                                  Cuota de ingreso: S/{" "}
                                  {
                                    school.Vacantes.filter(
                                      (el) =>
                                        el.año === ingresoName &&
                                        el.GradoId === gradoName
                                    )[0]?.cuota_ingreso
                                  }
                                </small>
                              )}
                              <small className="text-gray-400 flex gap-1 items-center">
                                <span className="text-xl">
                                  <HiOutlineUsers></HiOutlineUsers>
                                </span>{" "}
                                {school.numero_estudiantes} Alumnos
                              </small>
                              {school.Vacantes.length > 0 && (
                                <small className="text-gray-400 flex gap-1 items-center">
                                  <span className="text-xl">
                                    <FaRegMoneyBillAlt></FaRegMoneyBillAlt>
                                  </span>
                                  Matricula: S/{" "}
                                  {
                                    school.Vacantes.filter(
                                      (el) =>
                                        el.año === ingresoName &&
                                        el.GradoId === gradoName
                                    )[0]?.matricula
                                  }
                                </small>
                              )}
                              {school?.Categoria.length < 2 ? (
                                <small className="text-gray-400 flex gap-1 items-center">
                                  <span className="text-xl text-gray-400">
                                    <ImAttachment></ImAttachment>
                                  </span>
                                  {school?.Categoria?.map(
                                    (cat) => cat.nombre_categoria
                                  ).join(", ")}{" "}
                                </small>
                              ) : (
                                <small className="text-gray-400 flex gap-1 items-center">
                                  <span className="text-xl text-gray-400">
                                    <ImAttachment></ImAttachment>
                                  </span>
                                  {school?.Categoria?.slice(0, 1)
                                    .map((cat) => cat.nombre_categoria)
                                    .join(", ")}
                                  ... +{school?.Categoria?.slice(1).length}{" "}
                                </small>
                              )}
                              {school.Vacantes.length > 0 && (
                                <small className="text-gray-400 flex gap-1 items-center">
                                  <span className="text-xl">
                                    <ImTicket></ImTicket>
                                  </span>
                                  Pensión: S/{" "}
                                  {
                                    school.Vacantes.filter(
                                      (el) =>
                                        el.año === ingresoName &&
                                        el.GradoId === gradoName
                                    )[0]?.cuota_pension
                                  }
                                </small>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 w-full items-end justify-between">
                            <h1>
                              {school.Provincium.nombre_provincia},{" "}
                              {school.Distrito.nombre_distrito}{" "}
                            </h1>
                            
                            {school?.Vacantes?.length > 0 &&
                              school?.Vacantes?.filter(
                                (vac) =>
                                  vac.GradoId === gradoName &&
                                  vac.año === ingresoName
                              )[0]?.hasOwnProperty("capacidad") &&
                              school?.Vacantes?.filter(
                                (vac) =>
                                  vac.GradoId === gradoName &&
                                  vac.año === ingresoName
                              )[0]?.hasOwnProperty("año") &&
                              school?.Vacantes?.filter(
                                (vac) =>
                                  vac.GradoId === gradoName &&
                                  vac.año === ingresoName
                              )[0].capacidad -
                                school?.Vacantes?.filter(
                                  (vac) =>
                                    vac.GradoId === gradoName &&
                                    vac.año === ingresoName
                                )[0].alumnos_matriculados >
                                0
                                ?                             <button
                                onClick={() => goToDetails(school.id,false)}
                                className="bg-[#edf4fe] hover:scale-110 w-full duration-200 cursor-pointer rounded-sm shadow-md disabled:bg-slate-500/20 disabled:text-white disabled:line-through p-2 text-[#0061dd] text-center font-semibold"
                              >
                                VER DETALLE
                              </button>
                                : school?.Vacantes?.filter(
                                  (vac) =>
                                    vac.GradoId === gradoName &&
                                    vac.año === ingresoName
                                )[0]?.capacidad -
                                  school?.Vacantes?.filter(
                                    (vac) =>
                                      vac.GradoId === gradoName &&
                                      vac.año === ingresoName
                                  )[0]?.alumnos_matriculados ==
                                  0
                                  ?   <button onClick={() => goToDetails(school.id,true)} className="bg-[#dcffe2] hover:scale-110 duration-200 cursor-pointer rounded-sm shadow-md p-2 text-[#3cff7d] font-semibold w-full">
                                VER DETALLE
                              </button> :   null}


                          </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-5 justify-between items-center mt-2">
                          <div className="flex gap-5">
                            <Rating
                              name="simple-controlled"
                              value={school.rating/2}
                              readOnly
                              max={5}
                            />
                          </div>
                          <FavoritoButton />
                          {/* <div className="flex gap-5">
                            <FontAwesomeIcon
                              size="lg"
                              icon={faUpRightAndDownLeftFromCenter}
                              className="hover:scale-110 duration-200 cursor-pointer"
                            />
                            <FontAwesomeIcon
                              size="lg"
                              icon={faCirclePlus}
                              className="hover:scale-110 duration-200 cursor-pointer"
                            />
                            <FontAwesomeIcon
                              size="lg"
                              icon={faHeart}
                              className="hover:scale-110 duration-200 cursor-pointer"
                            />
                          </div> */}
                        </div>
                      </div>
                    </div>
                  );
                })
              : items.map((item, key) => (
                  <ContentLoader
                    key={key}
                    speed={3}
                    width={"100%"}
                    height={"100%"}
                    viewBox="0 0 500 120"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                    <rect x="110" y="8" rx="3" ry="3" width="120" height="10" />
                    <rect x="110" y="25" rx="3" ry="3" width="100" height="6" />
                    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                    <rect x="110" y="56" rx="3" ry="3" width="310" height="6" />
                    <rect x="110" y="72" rx="3" ry="3" width="300" height="6" />
                    <rect x="110" y="88" rx="3" ry="3" width="178" height="6" />
                    <rect width="100" height="100" />
                  </ContentLoader>
                ))}
            <Box
              justifyContent={"start"}
              alignItems={"center"}
              display={"flex"}
              sx={{ margin: "20px 0px" }}
            >
              <Pagination
                count={pagination.pages}
                onChange={handlePageChange}
                page={page}
                color="primary"
              />
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ListSchool;
