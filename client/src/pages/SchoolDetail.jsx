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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import dayjs from "dayjs";
import axios from "axios";
import style from "./SchoolD.module.css";
import SwiperEventos from "../components/SwiperEventos/SwiperEventos";
import ModalLogin from "../components/ModalLogin/ModalLogin";
import { setVacantesRedux } from "../redux/AuthActions";
import SliderC from "../components/SliderC";
import SecCitas from "../components/SchoolDetail-CITAS/SecCitas";
import InfoGeneral from "./SchoolDetail/InfoColegios/InfoGeneral";
import Comentarios from "./SchoolDetail/Comentarios/Comentarios";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Infraestructura from "./SchoolDetail/InfoColegios/Infraestructura/Infraestructura";
import Acreditaciones from "./SchoolDetail/InfoColegios/Acreditaciones/Acreditaciones";
import Maps from "../components/Maps";
import Ubicacion from "./SchoolDetail/Ubicacion/Ubicacion";
import { Tabs } from "@mui/material";
import SwDetail from "./SchoolDetail/SwipperDetail/SwDetail";
import FormListaEspera from "./SchoolDetail/Form-lista-espera/FormListEspera";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CitasD from "./SchoolDetail/Citas/CitasD";
function QuiltedImageList({ firstImage, gallery, setImage, setImages }) {
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
            onClick={() => setImages({ open: true, src: gallery })}
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
  const [images, setImages] = useState({
    open: false,
    src: []
  })

  const { user, isAuth, vacantes } = useSelector((state) => state.auth);

  const location = useLocation();

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



  const [openLogin, setOpenLogin] = useState(false);

  document.title = oneSchool?.nombre_colegio?.length > 0 ? oneSchool.nombre_colegio : "MiCole"

  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);

  };
  console.log(oneSchool.galeria_fotos)
  return (


    <>

      <div className="bg-[#f6f7f8]  ">
        {images.open && <SliderC setImages={setImages} images={images.src}></SliderC>}
        {oneSchool?.primera_imagen?.length > 0 ?
          <SwDetail />
          : <div className="w-full h-[500px] flex justify-center items-center">
            <CircularProgress
              size="5rem"
              style={{ color: '#0061dd' }}
            />
          </div>}
        {/* BODY DETAIL----------------lg:px-[100px]-------*/}
        <div
          className='flex flex-col  sm:flex-row  pl-1 pb-20 justify-around' >
          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* compartir en redes */}
            <div className="pl-1 flex pt-10  pb-2 flex-row ">
              <span className="flex items-center gap-0">
             
             
                <ShareOutlinedIcon  sx={{color:'#696969', padding:'2px'}}/>
                <p className="  text-[#696969] pl-1 text-[1.9vh]">
                  Compartir
                </p>
              </span>
              <span className="flex items-center pl-3 gap-0">
                {" "}
             
                <FavoriteBorderOutlinedIcon sx={{color:'#696969', padding:'2px'}}/>
                <p className="pl-1  text-[#696969] m-0 text-[1.9vh]">Favoritos
                </p>
              </span>
            </div>
            {/*nombre colegio */}
            <h1 className="pl-3 lg:pl-0 font-semibold m-0  text-[#0D263B] text-[3.2vh]">
              {oneSchool.nombre_colegio}
            </h1>
            <h2 className='pl-3 lg:pl-0 text-[#696969] text-[2vh]'>
              {oneSchool.direccion}{" "}
            </h2>
            <div>
              <div className={style.responsiveHead} >
                <div className=" min-w-fit  max-w-fit">

                  {/* divs negro */}
                  <div className="flex gap-2 lg:flex-row  pb-1 ">
                    <span className="bg-[#0D263B] text-[1.6vh] min-w-fit m-0 px-3 p-0 text-white rounded-sm  flex items-center">
                      {currentVacante &&
                        Number(currentVacante[0]?.capacidad) -
                        Number(currentVacante[0]?.alumnos_matriculados)}{" "}
                      Vacantes
                    </span>
                    <span className="bg-[#0D263B] text-[1.6vh] min-w-fit m-0 px-3 p-0 text-white rounded-sm flex items-center">
                      {nombre_grado}
                    </span>
                    <span className="bg-[#0D263B] text-[1.6vh] min-w-fit m-0 px-3 p-0 rounded-sm text-white  flex items-center">
                      {ingresoParams}
                    </span>
                  </div>

                </div>
                {/* COUTA DE INGRESO */}
                {currentVacante && (
                  <div className="flex flex-col w-full ">
                    <small>
                      <p className="font-semibold  text-[#0D263B] text-[2.5vh]"> Pensión: S/   {currentVacante.length > 0 && currentVacante[0].cuota_pension} mes </p>

                    </small>
                    <small>
                      <p className="text-[#696969] text-[1.9vh]">  Cuota de ingreso: S/{" "}
                        {currentVacante.length > 0 && currentVacante[0].cuota_ingreso}{" "}
                      </p>

                    </small>

                    <small>
                      <p className="text-[#696969] text-[1.9vh]">
                        Cuota de matricula: S/{" "}
                        {currentVacante.length > 0 && currentVacante[0].matricula}
                      </p>


                    </small>
                  </div>
                )}
              </div>

            </div>
            {/* ICONS HEAD */}

            <div className="pt-4 h-fit gap-5  flex  justify-between items-start lg:items-start  flex-col">
              <div className={style.divIconsHead}>
                {" "}
                <div className="flex  flex-row  gap-3 text-center">
                  <FontAwesomeIcon
                    size="sm"
                    color="#696969"
                    icon={faUsers}
                  />
                  <span className="text-[1.9vh] text-[#696969] ">
                    {oneSchool.numero_estudiantes} Alumnos
                  </span>
                </div>
                {oneSchool?.Categoria?.map((cat) => (
                  <div className="flex flex-row items-center min-w-[20vh] gap-3 text-center">
                    <img
                      src={cat.logo_categoria}
                      alt="logo_categoria"
                      className="w-4 object-cover  invert-[40%]"
                    />
                    <span className="text-[1.9vh] text-[#696969]">
                      {cat.nombre_categoria}{" "}
                    </span>
                  </div>
                ))}

                <div className="flex flex-row gap-3 text-center">
                  <FontAwesomeIcon
                    size="sm"
                    color="#696969"
                    icon={faCalendar}
                  />
                  <span className="text-[1.9vh] text-[#696969]">
                    Fundación: {oneSchool.fecha_fundacion}{" "}
                  </span>
                </div>
                <div className="flex flex-row gap-3 text-center">
                  <FontAwesomeIcon
                    size="sm"
                    color="#696969"
                    icon={faSchool}
                  />
                  <span className="text-[1.9vh] text-[#696969]">
                    UGEL: {oneSchool.ugel}{" "}
                  </span>
                </div>
              </div>



            </div>
          </div>

          {/* TABS DETAIL */}
          <main className="flex gap-5 flex-col lg:flex-row">

            <div className={style.divBox}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    variant="scrollable"
                    scrollButtons={true}
                    aria-label="scrollable prevent TabList example"
                    onChange={handleChange} >
                    <Tab sx={{ textTransform: 'none' }} label="Datos Generales" value="1" />
                    <Tab sx={{ textTransform: 'none' }} label="Infraestructura" value="2" />
                    <Tab sx={{ textTransform: 'none' }} label="Acreditaciones" value="3" />
                    <Tab sx={{ textTransform: 'none' }} label="Ubicacion" value="4" />
                    <Tab sx={{ textTransform: 'none' }} label="Reservar Citas" value="5" />
                    <Tab sx={{ textTransform: 'none' }} label="Eventos" value="6" />
                    <Tab sx={{ textTransform: 'none' }} label="Comentarios" value="7" />
                    <Tab sx={{ textTransform: 'none' }} label="Multimedia" value="8" />

                  </TabList>
                </Box>
                <TabPanel value="1">
                  <InfoGeneral />
                </TabPanel>
                <TabPanel value="2">
                  <Infraestructura />
                </TabPanel>
                <TabPanel value="3">
                  <Acreditaciones />
                </TabPanel>
                <TabPanel value="4">
                  <Ubicacion />
                </TabPanel>
                {/* // SACAR UNA CITA    //  Lista de espera */}
                <TabPanel value="5">
                  {listaParams === "true" ? (
                    //  Lista de espera
                    <FormListaEspera gradoId={Number(gradoParams)} año={Number(ingresoParams)} />
                  ) : (
                    // SACAR UNA CITA
                    <CitasD ingresoParams={ingresoParams} nombre_grado={nombre_grado}/>
                  )}
                </TabPanel>
                {/* Eventos */}
                <TabPanel value="6">

                  {oneSchool?.Eventos?.length > 0 && (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "10px",
                        padding:' 1.25rem'
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <h2 className="font-semibold  text-[#0D263B] text-[2.4vh]">Eventos</h2>
                      </div>

                      <SwiperEventos data={oneSchool} />
                    </div>
                  )}
                </TabPanel>
                <TabPanel value="7">
                  <Comentarios id={id} />
                </TabPanel>
                {/* GALERIA / VIDEO */}
                <TabPanel value="8">
                  <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md w-full">
                    <h2 className="font-semibold  text-[#0D263B] text-[2.4vh]">Galería</h2>
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
                      className={`fixed top-0 left-0 z-50 bg-black/90 w-full h-full ${image ? "block" : "hidden"
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
                    <div className=" bg-white flex flex-col gap-5 rounded-md w-full">
                      <h2 className="font-semibold  text-[#0D263B] text-[2.4vh]">Video</h2>

                      <video className="w-full h-[300px] lg:h-[400px]" controls>
                        <source src={oneSchool.video_url} type="video/mp4" />
                      </video>
                    </div>
                  )}
                </TabPanel>
              </TabContext>
            </div>

          </main>
          {/* ------------------------------------------------------------------------------- */}
        </div>
        {openLogin && <ModalLogin handlerClose={setOpenLogin} />}
      </div>
    </>


  );
}

export default SchoolDetail;
