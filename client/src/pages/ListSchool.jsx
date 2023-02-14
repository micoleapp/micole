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
import { Link } from "react-router-dom";
import {
  faCamera,
  faPlayCircle,
  faSearch,
  faUsers,
  faPaperclip,
  faDoorOpen,
  faUpRightAndDownLeftFromCenter,
  faCirclePlus,
  faHeart,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { getAllSchools } from "../redux/SchoolsActions";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

const pageSize = 5;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const distrits = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];
const types = ["Religoso", "Hombres", "Mujeres", "Mixtos"];
function valuetext(value) {
  return `${value}°C`;
}

function valuetext2(value) {
  return `${value}°C`;
}

const minDistance = 10;
function ListSchool() {
  /*
 
  para agarrar los querys

  const location = useLocation();

  const params = new URLSearchParams(location.search);

  console.log(params.get("distrito"));

  */

  const [distritName, setDistritName] = React.useState([]);

  const handleChangeDistrit = (event) => {
    const {
      target: { value },
    } = event;
    setDistritName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const [english, setEnglish] = React.useState(10);

  const handleChangeEnglish = (event, newValue) => {
    setEnglish(newValue);
  };

  const [type, setType] = React.useState("");

  const [value1, setValue1] = React.useState([20, 37]);

  const [rating, setRating] = React.useState(2);

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

  const [value2, setValue2] = React.useState([20, 37]);

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

  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const dispatch = useDispatch();
  const { allschools, loading } = useSelector((state) => state.schools);

  useEffect(() => {
    dispatch(getAllSchools());
  }, []);

  useEffect(() => {
    if (allschools.length > 0) {
      const schools = allschools.slice(pagination.from, pagination.to);
      setPagination({ ...pagination, count: allschools.length, data: schools });
    }
  }, [allschools, pagination.from, pagination.to]);

  const [disabledPage, setDisabledPage] = useState(false);
  const handlePageChange = (event, page) => {
    setDisabledPage(true);
    setPagination({ data: {} });
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
    setTimeout(() => {
      setDisabledPage(false);
    }, 1000);
  };
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const items = [1, 2, 3, 4, 5];

  const [toggle, setToggle] = useState(false);
  const [toggleDistrits, setToggleDistrits] = useState(false);
  const [toggleTypes, setToggleTypes] = useState(false);

  return (
    <div className="flex flex-col py-5 px-0 lg:p-5 bg-[#f6f7f8] ">
      <h1 className="text-center mt-2 text-2xl font-semibold drop-shadow-md">
        Encuentra el colegio ideal
      </h1>
      <div className="flex flex-col lg:flex-row p-5 gap-10 m-5 ">
        <section className="lg:w-1/4 w-full flex flex-col gap-5 rounded-md h-min bg-white shadow-lg p-10 ">
          <h2 className="font-semibold text-2xl drop-shadow-md">Filtros</h2>
          <button
            className="absolute block lg:hidden left-0 right-0"
            onClick={() => setToggle(!toggle)}
          >
            {" "}
            <FontAwesomeIcon
              size="lg"
              color="rgb(156 163 175)"
              icon={toggle ? faArrowUp : faArrowDown}
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
              <div className="flex items-center gap-5 z-50">
                <Typography id="input-slider" gutterBottom fontWeight="bold">
                  Distritos
                </Typography>
                <button onClick={() => setToggleDistrits(!toggleDistrits)}>
                  {" "}
                  <FontAwesomeIcon
                    size="lg"
                    icon={toggleDistrits ? faArrowUp : faArrowDown}
                  />
                </button>
              </div>
              <div className={toggleDistrits ? "block" : "hidden"}>
                <FormGroup>
                  {distrits.map((distrit) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(event, target) => {
                            console.log({ event, target });
                          }}
                        />
                      }
                      label={distrit}
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
                    icon={toggleTypes ? faArrowUp : faArrowDown}
                  />
                </button>
              </div>
              <div className={toggleTypes ? "block" : "hidden"}>

              <FormGroup>
                {types.map((type) => (
                  <FormControlLabel control={<Checkbox />} label={type} />
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
                max={10}
                value={english}
                onChange={handleChangeEnglish}
                valueLabelDisplay="auto"
              />
              <div className="bg-[#edf4fe] rounded-sm shadow-md p-2 text-[#0061dd] w-full text-center">
                {english} (Hrs/semana)
              </div>
            </div>
            <button className="bg-[#0061dd] text-white w-full p-3 rounded-sm flex justify-center items-center gap-5">
              <FontAwesomeIcon size="lg" icon={faSearch} />
              BUSCAR
            </button>
          </div>
        </section>
        <section className="lg:w-3/4 w-full lg:pl-10 lg:pr-10 lg:pb-10 p-0 flex flex-col gap-5">
          <div className="flex items-center justify-between drop-shadow-md">
            <small>
              Mostrando <span className="font-semibold">{pageSize}</span> de{" "}
              <span className="font-semibold">{pagination?.count}</span>{" "}
              resultados{" "}
            </small>
            <FormControl
              variant="standard"
              style={{ width: "200px", height: "70px" }}
              size='small'
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
                {types.map((type) => (
                  <MenuItem value={type} key={type}>
                    <ListItemText primary={type} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex flex-col gap-5">
            {!loading
              ? pagination?.data?.map((school) => (
                  <div
                    key={school.id}
                    className="flex border rounded-md shadow-md bg-white p-2 items-center gap-2 flex-col md:flex-row"
                  >
                    {" "}
                    <div className="relative">
                      <img
                        src={school.image}
                        alt={school.title}
                        className="w-[400px] h-64 object-cover"
                      />
                      <span className="absolute bg-[#0061dd] text-white p-1 px-2 rounded-md top-3 left-3">
                        DESTACADO
                      </span>
                      <span className="absolute animate-bounce bg-black/80 text-white p-1 px-2 rounded-md top-14 xl:top-3 xl:right-3 ml-3 w-fit">
                        9 VACANTES
                      </span>
                      <div className="flex absolute gap-5 text-white bottom-3 left-3 bg-black/50 p-2 rounded-md">
                        <span className="flex hover:scale-110 duration-200 cursor-pointer items-center gap-2">
                          <FontAwesomeIcon size="lg" icon={faCamera} />
                          22
                        </span>
                        <span className="flex hover:scale-110 duration-200 cursor-pointer items-center gap-2">
                          {" "}
                          <FontAwesomeIcon size="lg" icon={faPlayCircle} />9
                        </span>
                      </div>
                    </div>
                    <div className="w-full p-5  flex flex-col justify-between gap-5 drop-shadow-md">
                      <div className="flex justify-between gap-4 xl:gap-0 flex-col xl:flex-row">
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col w-fit gap-2">
                            <h1 className="font-semibold text-lg">
                              {school.title}{" "}
                            </h1>
                            <small className="text-gray-400">
                              {school.category}{" "}
                            </small>
                          </div>
                          <div className="flex w-fit gap-10">
                            <div className="flex flex-col text-center">
                              <FontAwesomeIcon
                                size="lg"
                                color="rgb(156 163 175)"
                                icon={faUsers}
                              />
                              <span className="text-sm text-gray-400">
                                368 Alumnos
                              </span>
                            </div>
                            <div className="flex flex-col text-center">
                              <FontAwesomeIcon
                                size="lg"
                                color="rgb(156 163 175)"
                                icon={faPaperclip}
                              />
                              <span className="text-sm text-gray-400">
                                {" "}
                                Mixto
                              </span>
                            </div>
                            <div className="flex flex-col text-center">
                              <FontAwesomeIcon
                                size="lg"
                                color="rgb(156 163 175)"
                                icon={faDoorOpen}
                              />
                              <span className="text-sm text-gray-400">
                                2 Salones
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-between">
                          <h1>Numero: +54123123123</h1>
                          <Link
                            to={`/schooldetail/${school.id}`}
                            className="bg-[#edf4fe] hover:scale-110 duration-200 cursor-pointer rounded-sm shadow-md p-2 text-[#0061dd] w-full text-center font-semibold"
                          >
                            VER DETALLE
                          </Link>
                        </div>
                      </div>

                      <hr />

                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <small>Cuota de ingreso: S/ {school.price} </small>
                          <span className="font-semibold">
                            S/ {school.price * 100}/mes
                          </span>
                        </div>
                        <div className="flex gap-5">
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
                        </div>
                      </div>
                    </div>
                  </div>
                ))
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
                count={Math.ceil(pagination.count / pageSize)}
                onChange={handlePageChange}
                color="primary"
                disabled={disabledPage}
              />
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ListSchool;
