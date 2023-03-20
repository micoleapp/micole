import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./CardCita.module.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import LaptopWindowsIcon from "@mui/icons-material/LaptopWindows";
import EventIcon from "@mui/icons-material/Event";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Button, Card, CardContent } from "@mui/material";
import { cleanSuccessState, putCita } from "../../redux/CitasActions";
import { getCitaAgendadas } from "../../redux/SchoolsActions";
import Chip from "@mui/material/node/Chip";
import NotFound from "./svg/notFound";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import Swal from "sweetalert2";
import sliceIntoChunks from "./Paginacion/utils/SliceCitas";
import PaginationCitas from "./Paginacion/PaginationCitas";
import LoadingButton from "@mui/lab/LoadingButton";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Paddock from "./svg/Paddock";
// import sliceIntoChunks from "../"
export default function CardCitas({ filtros }) {
  const { success, loading } = useSelector((state) => state.citas);
  const { oneSchool } = useSelector((state) => state.auth);
  const { citasAgendadas, grados } = useSelector((state) => state.schools);
  const [arrCita, setArrCitas] = React.useState([]);
  const [arrCitaNoPermitidas, setArrCitaNoPermitidas] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const dispatch = useDispatch();
  const [Inactivas, setInactivas] = useState([]);
  const [Activas, setActivas] = useState([]);
  //LOGICA CONFIRMACION DE CITAS
  console.log(citasAgendadas);
  const comprobacion = (iD) => {
    if (success === "Se activo la Cita.") {
      console.log(Inactivas);
      const CitasConfirmadas = Inactivas.find((ele) => ele.id === iD);
      setActivas([...Activas, CitasConfirmadas]);
      setInactivas([Inactivas[0].filter((ele) => ele.id !== iD)]);
      // setArrCitas([arrCita.filter((ele) => ele.id !== iD)]);
      Swal.fire({
        icon: "success",
        title: "La cita ha sido confirmada con exito",
        text: "Se notificará a la familia interesada. Ademas podrás administrar tus citas en la pestaña de control de citas",
      });

      dispatch(cleanSuccessState());
    }
  };

  const handlerPutStateCita = async (iD) => {
    dispatch(putCita(iD));
    await comprobacion(iD);
  };
  //  PAGINADO
  
 
  React.useEffect(() => {
    const allCitas= []
    if(citasAgendadas.length > 0 ){

        let resultadoActivas = sliceIntoChunks(
      citasAgendadas.CitasActivasMesActual,
      10
    );
    setActivas(resultadoActivas);
    let resultadoInactivas = sliceIntoChunks(
      citasAgendadas.CitasPermitidasMesActual,
      10
    );
    setInactivas(resultadoInactivas);
    let resultadoCitaNoPermitidas = sliceIntoChunks(
      citasAgendadas.CitasInactivas,
      10
    );
    setArrCitaNoPermitidas(resultadoCitaNoPermitidas);
   const allCitasActInact = allCitas.concat( citasAgendadas.CitasPermitidasMesActual, citasAgendadas.CitasActivasMesActual)
    let resultadoAllCitas = sliceIntoChunks(
      allCitasActInact,
      10
    );      
    setArrCitas(resultadoAllCitas);
    }
  
  }, []);
console.log(arrCita)
  return (
    <>
      <div
        data-aos="fade-up"
        style={{ height: "70vh", overflowY: "scroll", padding: "10px" }}
      >
        {filtros === "" && (
          <div className={style.layout}>
            {citasAgendadas && arrCita?.length === 0 && (
              <>
                <div
                  data-aos="flip-up"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    color: "#0C2B42",
                    gap: "10px",
                    padding: "20px",
                    minHeight: "100%",
                    boxShadow: "0px 4px 10px rgba(31, 95, 175, 0.15)",
                    fontWeight: "600",
                    backgroundColor: "#fff",
                  }}
                >
                  <ContentPasteSearchOutlinedIcon
                    style={{ color: "#0061DF" }}
                  />
                  <h1>No hay solicitudes pendientes</h1>
                </div>
              </>
            )}

         
            {citasAgendadas &&
              arrCita[page]?.map((cita) => {
                return (
                  <>
                    <div className={style.container}>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          flexDirection: "column",
                          width: "100%",
                          fontSize: "1.8vh",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            flexDirection: "row",
                            alignItems: "center",
                            fontSize: "1.8vh",
                          }}
                        >
                          <img
                            style={{ width: "50px", height: "50px" }}
                            src="https://res.cloudinary.com/dj8p0rdxn/image/upload/v1676414550/xuj9waxpejcnongvhk9o.png"
                            alt=""
                          />
                          <div>
                            <div className={style.divNombreGrado}>
                              <p>{cita.nombre}</p>
                              {grados &&
                                grados.map((ele) => {
                                  console.log(ele.id === cita.GradoId);
                                  if (ele.id === cita.GradoId) {
                                    return (
                                      <Chip
                                        sx={{ height: "20px" }}
                                        color="primary"
                                        label={ele.nombre_grado}
                                      />
                                    );
                                  }
                                })}
                            </div>

                            <div className={style.itemDiv}>
                              <div className={style.itemDiv}>
                                <AccessTimeIcon
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "grey",
                                  }}
                                />
                                <p>{cita.hora_cita}</p>
                              </div>{" "}
                              <div className={style.itemDiv}>
                                <EventIcon
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "grey",
                                  }}
                                />{" "}
                                <p>{cita.fecha_cita}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          width: "100%",
                          justifyContent: "center",
                        }}
                      >
                        {cita.modalidad === "Virtual" && (
                          <LaptopWindowsIcon
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "grey",
                            }}
                          />
                        )}
                        {cita.modalidad === "Presencial" && (
                          <PersonPinIcon
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "grey",
                            }}
                          />
                        )}
                        <p>{cita.modalidad}</p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          width: "100%",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <div className={style.itemDiv}>
                          <PhoneIcon
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "grey",
                            }}
                          />
                          <p>{cita.telefono}</p>
                        </div>

                        <p>{cita.email}</p>
                      </div>
                      {cita.activo === false && (
                        <div>
                          <Button
                            onClick={() => {
                              handlerPutStateCita(cita.id);
                            }}
                            variant="contained"
                          >
                            Confirmar{" "}
                          </Button>
                        </div>
                      )}

                      {cita.activo === true && (
                        <div>
                          <Button
                            disabled
                            onClick={() => {
                              handlerPutStateCita(cita.id);
                            }}
                            variant="contained"
                          >
                            Confirmar{" "}
                          </Button>
                        </div>
                      )}
                    </div>
                  </>
                );
              })}
          </div>
        )}
        {/* BLUR */}

        {filtros === "SinConfirmar" && (
          <>
            {/* solo lo correspondiente al plan */}
            <div className={style.layout}>
              {citasAgendadas && Inactivas.length === 0 && (
                <>
                  <div
                    data-aos="flip-up"
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      color: "#0C2B42",
                      gap: "10px",
                      padding: "20px",
                      minHeight: "100%",
                      boxShadow: "0px 4px 10px rgba(31, 95, 175, 0.15)",
                      fontWeight: "600",
                      paddingBottom:'20px'
                    }}
                  >
                    <ContentPasteSearchOutlinedIcon
                      style={{ color: "#0061DF" }}
                    />
                    {Inactivas.length === 0 && (
                      <h1>No hay solicitudes pendientes</h1>
                    )}
                    {/* { arrCitaNoPermitidas.length > 0 && <h1>Ya has llegado al limite de tu plan</h1>} */}
                  </div>
                </>
              )}
              {citasAgendadas &&
                Inactivas[page]?.map((cita, i) => {
                  return (
                    <>
                      <div className={style.container}>
                        <div
                          style={{
                            display: "flex",
                            gap: "5px",
                            flexDirection: "column",
                            width: "100%",
                            fontSize: "1.8vh",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              flexDirection: "row",
                              alignItems: "center",
                              fontSize: "1.8vh",
                            }}
                          >
                            <img
                              style={{ width: "50px", height: "50px" }}
                              src="https://res.cloudinary.com/dj8p0rdxn/image/upload/v1676414550/xuj9waxpejcnongvhk9o.png"
                              alt=""
                            />
                            <div>
                              <div className={style.divNombreGrado}>
                                <p>{cita.nombre}</p>
                                {grados &&
                                  grados.map((ele) => {
                                    console.log(ele.id === cita.GradoId);
                                    if (ele.id === cita.GradoId) {
                                      return (
                                        <Chip
                                          sx={{ height: "20px" }}
                                          color="primary"
                                          label={ele.nombre_grado}
                                        />
                                      );
                                    }
                                  })}
                              </div>

                              <div className={style.itemDiv}>
                                <div className={style.itemDiv}>
                                  <AccessTimeIcon
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      color: "grey",
                                    }}
                                  />
                                  <p>{cita.hora_cita}</p>
                                </div>{" "}
                                <div className={style.itemDiv}>
                                  <EventIcon
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      color: "grey",
                                    }}
                                  />{" "}
                                  <p>{cita.fecha_cita}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "5px",
                            width: "100%",
                            justifyContent: "center",
                          }}
                        >
                          {cita.modalidad === "Virtual" && (
                            <LaptopWindowsIcon
                              style={{
                                width: "20px",
                                height: "20px",
                                color: "grey",
                              }}
                            />
                          )}
                          {cita.modalidad === "Presencial" && (
                            <PersonPinIcon
                              style={{
                                width: "20px",
                                height: "20px",
                                color: "grey",
                              }}
                            />
                          )}
                          <p>{cita.modalidad}</p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "5px",
                            width: "100%",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <div className={style.itemDiv}>
                            <PhoneIcon
                              style={{
                                width: "20px",
                                height: "20px",
                                color: "grey",
                              }}
                            />
                            <p>{cita.telefono}</p>
                          </div>

                          <p>{cita.email}</p>
                        </div>
                        <div>
                          <Button
                            onClick={() => {
                              handlerPutStateCita(cita.id);
                            }}
                            variant="contained"
                          >
                            Confirmar{" "}
                          </Button>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
            {/* blur + promocion de planes  */}
            {arrCitaNoPermitidas != 0 && (
              <div className={style.promoPlan}>
                <Card
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: "40%",

                    backgroundColor: "#FFF",
                    maxWidth: "30vh",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      gap: "20px",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Paddock />
                    {/* <LockOutlinedIcon sx={{color:'blue', height:'200px'}}/> */}
                    <h1 style={{ fontWeight: "700", fontFamily: "Poppins" }}>
                      Desbloquea más citas mejorando tu plan
                    </h1>
                    <Button variant="contained">Ver planes</Button>
                  </CardContent>
                </Card>
              </div>
            )}
            <div className="blur-sm  z-10">
              {citasAgendadas &&
                arrCitaNoPermitidas.length != 0 &&
                arrCitaNoPermitidas[page]?.map((cita, i) => {
                  return (
                    <>
                      <div className={style.container}>
                        <div
                          style={{
                            display: "flex",
                            gap: "5px",
                            flexDirection: "column",
                            width: "100%",
                            fontSize: "1.8vh",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              flexDirection: "row",
                              alignItems: "center",
                              fontSize: "1.8vh",
                            }}
                          >
                            <img
                              style={{ width: "50px", height: "50px" }}
                              src="https://res.cloudinary.com/dj8p0rdxn/image/upload/v1676414550/xuj9waxpejcnongvhk9o.png"
                              alt=""
                            />
                            <div>
                              <div className={style.divNombreGrado}>
                                <p>{cita.nombre}</p>
                                {grados &&
                                  grados.map((ele) => {
                                    console.log(ele.id === cita.GradoId);
                                    if (ele.id === cita.GradoId) {
                                      return (
                                        <Chip
                                          sx={{ height: "20px" }}
                                          color="primary"
                                          label={ele.nombre_grado}
                                        />
                                      );
                                    }
                                  })}
                              </div>

                              <div className={style.itemDiv}>
                                <div className={style.itemDiv}>
                                  <AccessTimeIcon
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      color: "grey",
                                    }}
                                  />
                                  <p>{cita.hora_cita}</p>
                                </div>{" "}
                                <div className={style.itemDiv}>
                                  <EventIcon
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      color: "grey",
                                    }}
                                  />{" "}
                                  <p>{cita.fecha_cita}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "5px",
                            width: "100%",
                            justifyContent: "center",
                          }}
                        >
                          {cita.modalidad === "Virtual" && (
                            <LaptopWindowsIcon
                              style={{
                                width: "20px",
                                height: "20px",
                                color: "grey",
                              }}
                            />
                          )}
                          {cita.modalidad === "Presencial" && (
                            <PersonPinIcon
                              style={{
                                width: "20px",
                                height: "20px",
                                color: "grey",
                              }}
                            />
                          )}
                          <p>{cita.modalidad}</p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "5px",
                            width: "100%",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <div className={style.itemDiv}>
                            <PhoneIcon
                              style={{
                                width: "20px",
                                height: "20px",
                                color: "grey",
                              }}
                            />
                            <p>{cita.telefono}</p>
                          </div>

                          <p>{cita.email}</p>
                        </div>
                        <div>
                          <Button
                            onClick={() => {
                              handlerPutStateCita(cita.id);
                            }}
                            variant="contained"
                          >
                            Confirmar{" "}
                          </Button>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </>
        )}

        {/*PLAN PREMIUM*/}
        {filtros === "SinConfirmar" &&
          oneSchool.Plan_Pago.nombre_plan_pago === "Premium" && (
            <>
              {/* solo lo correspondiente al plan */}
              <div className={style.layout}>
                {citasAgendadas && Inactivas?.length === 0 && (
                  <>
                    <div
                      data-aos="flip-up"
                      style={{
                        width: "60%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        padding: "20px",
                        minHeight: "100%",
                        boxShadow: "0px 4px 10px rgba(31, 95, 175, 0.15)",
                      }}
                    >
                      <NotFound />
                      <h1>No hay solicitudes pendientes</h1>
                    </div>
                  </>
                )}
                {citasAgendadas &&
                  Inactivas[page]?.map((cita, i) => {
                    return (
                      <>
                        <div className={style.container}>
                          <div
                            style={{
                              display: "flex",
                              gap: "5px",
                              flexDirection: "column",
                              width: "100%",
                              fontSize: "1.8vh",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                flexDirection: "row",
                                alignItems: "center",
                                fontSize: "1.8vh",
                              }}
                            >
                              <img
                                style={{ width: "50px", height: "50px" }}
                                src="https://res.cloudinary.com/dj8p0rdxn/image/upload/v1676414550/xuj9waxpejcnongvhk9o.png"
                                alt=""
                              />
                              <div>
                                <div className={style.divNombreGrado}>
                                  <p>{cita.nombre}</p>
                                  {grados &&
                                    grados.map((ele) => {
                                      console.log(ele.id === cita.GradoId);
                                      if (ele.id === cita.GradoId) {
                                        return (
                                          <Chip
                                            sx={{ height: "20px" }}
                                            color="primary"
                                            label={ele.nombre_grado}
                                          />
                                        );
                                      }
                                    })}
                                </div>

                                <div className={style.itemDiv}>
                                  <div className={style.itemDiv}>
                                    <AccessTimeIcon
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        color: "grey",
                                      }}
                                    />
                                    <p>{cita.hora_cita}</p>
                                  </div>{" "}
                                  <div className={style.itemDiv}>
                                    <EventIcon
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        color: "grey",
                                      }}
                                    />{" "}
                                    <p>{cita.fecha_cita}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "5px",
                              width: "100%",
                              justifyContent: "center",
                            }}
                          >
                            {cita.modalidad === "Virtual" && (
                              <LaptopWindowsIcon
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  color: "grey",
                                }}
                              />
                            )}
                            {cita.modalidad === "Presencial" && (
                              <PersonPinIcon
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  color: "grey",
                                }}
                              />
                            )}
                            <p>{cita.modalidad}</p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "5px",
                              width: "100%",
                              justifyContent: "center",
                              flexDirection: "column",
                            }}
                          >
                            <div className={style.itemDiv}>
                              <PhoneIcon
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  color: "grey",
                                }}
                              />
                              <p>{cita.telefono}</p>
                            </div>

                            <p>{cita.email}</p>
                          </div>
                          <div>
                            <Button
                              onClick={() => {
                                handlerPutStateCita(cita.id);
                              }}
                              variant="contained"
                            >
                              Confirmar{" "}
                            </Button>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
              {/* blur + promocion de planes  */}
              <div className={style.promoPlan}>
                <Card
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: "40%",

                    backgroundColor: "#FFF",
                    maxWidth: "30vh",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      gap: "20px",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Paddock />
                    {/* <LockOutlinedIcon sx={{color:'blue', height:'200px'}}/> */}
                    <h1 style={{ fontWeight: "700", fontFamily: "Poppins" }}>
                      Desbloquea más citas mejorando tu plan
                    </h1>
                    <Button variant="contained">Ver planes</Button>
                  </CardContent>
                </Card>
              </div>
              <div className="blur-sm  z-10">
                {citasAgendadas &&
                  Inactivas[page]?.map((cita, i) => {
                    return (
                      <>
                        <div className={style.container}>
                          <div
                            style={{
                              display: "flex",
                              gap: "5px",
                              flexDirection: "column",
                              width: "100%",
                              fontSize: "1.8vh",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                flexDirection: "row",
                                alignItems: "center",
                                fontSize: "1.8vh",
                              }}
                            >
                              <img
                                style={{ width: "50px", height: "50px" }}
                                src="https://res.cloudinary.com/dj8p0rdxn/image/upload/v1676414550/xuj9waxpejcnongvhk9o.png"
                                alt=""
                              />
                              <div>
                                <div className={style.divNombreGrado}>
                                  <p>{cita.nombre}</p>
                                  {grados &&
                                    grados.map((ele) => {
                                      console.log(ele.id === cita.GradoId);
                                      if (ele.id === cita.GradoId) {
                                        return (
                                          <Chip
                                            sx={{ height: "20px" }}
                                            color="primary"
                                            label={ele.nombre_grado}
                                          />
                                        );
                                      }
                                    })}
                                </div>

                                <div className={style.itemDiv}>
                                  <div className={style.itemDiv}>
                                    <AccessTimeIcon
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        color: "grey",
                                      }}
                                    />
                                    <p>{cita.hora_cita}</p>
                                  </div>{" "}
                                  <div className={style.itemDiv}>
                                    <EventIcon
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        color: "grey",
                                      }}
                                    />{" "}
                                    <p>{cita.fecha_cita}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "5px",
                              width: "100%",
                              justifyContent: "center",
                            }}
                          >
                            {cita.modalidad === "Virtual" && (
                              <LaptopWindowsIcon
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  color: "grey",
                                }}
                              />
                            )}
                            {cita.modalidad === "Presencial" && (
                              <PersonPinIcon
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  color: "grey",
                                }}
                              />
                            )}
                            <p>{cita.modalidad}</p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "5px",
                              width: "100%",
                              justifyContent: "center",
                              flexDirection: "column",
                            }}
                          >
                            <div className={style.itemDiv}>
                              <PhoneIcon
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  color: "grey",
                                }}
                              />
                              <p>{cita.telefono}</p>
                            </div>

                            <p>{cita.email}</p>
                          </div>
                          <div>
                            <Button
                              onClick={() => {
                                handlerPutStateCita(cita.id);
                              }}
                              variant="contained"
                            >
                              Confirmar{" "}
                            </Button>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </>
          )}
        {/*--------------------  FIN  ------------------------------*/}
        {/* citas ya confirmadas */}
        {filtros === "Confirmados" && (
          <div className={style.layout}>
            {citasAgendadas && Activas?.length === 0 && (
              <>
                <div
                  data-aos="flip-up"
                  style={{
                    width: "60%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    padding: "20px",
                    minHeight: "100%",
                    boxShadow: "0px 4px 10px rgba(31, 95, 175, 0.15)",
                  }}
                >
                  <NotFound />
                  <h1>Aun no has confirmado ninguna cita </h1>
                </div>
              </>
            )}

            {Activas &&
              Activas[page]?.map((cita, i) => {
                return (
                  <>
                    <div className={style.container}>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          flexDirection: "column",
                          width: "100%",
                          fontSize: "1.8vh",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            flexDirection: "row",
                            alignItems: "center",
                            fontSize: "1.8vh",
                          }}
                        >
                          <img
                            style={{ width: "50px", height: "50px" }}
                            src="https://res.cloudinary.com/dj8p0rdxn/image/upload/v1676414550/xuj9waxpejcnongvhk9o.png"
                            alt=""
                          />
                          <div>
                            <div className={style.divNombreGrado}>
                              <p>{cita.nombre}</p>
                              {grados &&
                                grados.map((ele) => {
                                  console.log(ele.id === cita.GradoId);
                                  if (ele.id === cita.GradoId) {
                                    return (
                                      <Chip
                                        sx={{ height: "20px" }}
                                        color="primary"
                                        label={ele.nombre_grado}
                                      />
                                    );
                                  }
                                })}
                            </div>

                            <div className={style.itemDiv}>
                              <div className={style.itemDiv}>
                                <AccessTimeIcon
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "grey",
                                  }}
                                />
                                <p>{cita.hora_cita}</p>
                              </div>{" "}
                              <div className={style.itemDiv}>
                                <EventIcon
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "grey",
                                  }}
                                />{" "}
                                <p>{cita.fecha_cita}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          width: "100%",
                          justifyContent: "center",
                        }}
                      >
                        {cita.modalidad === "Virtual" && (
                          <LaptopWindowsIcon
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "grey",
                            }}
                          />
                        )}
                        {cita.modalidad === "Presencial" && (
                          <PersonPinIcon
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "grey",
                            }}
                          />
                        )}
                        <p>{cita.modalidad}</p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          width: "100%",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <div className={style.itemDiv}>
                          <PhoneIcon
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "grey",
                            }}
                          />
                          <p>{cita.telefono}</p>
                        </div>

                        <p>{cita.email}</p>
                      </div>
                      <div>
                        <Button
                          onClick={() => {
                            handlerPutStateCita(cita.id);
                          }}
                          variant="contained"
                          disabled
                        >
                          Confirmada{" "}
                        </Button>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        )}
      </div>
      {/* PAGINADO */}
      <PaginationCitas
        nroPaginas={
          filtros === "Confirmados"
            ? Activas.length
            : filtros === "SinConfirmar"
            ? Inactivas.length
            : filtros === ""
            ? arrCita.length
            : 0
        }
        page={page}
        setPage={setPage}
      />
      <div className={style.layout}></div>
    </>
  );
}
