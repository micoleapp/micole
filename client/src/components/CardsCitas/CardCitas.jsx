import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./CardCita.module.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import LaptopWindowsIcon from "@mui/icons-material/LaptopWindows";
import EventIcon from "@mui/icons-material/Event";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Button } from "@mui/material";
import { putCita } from "../../redux/CitasActions";
import { getCitaAgendadas } from "../../redux/SchoolsActions";
export default function CardCitas() {
  const { citasAgendadas, grados } = useSelector((state) => state.schools);
  const [idCita, setIdCita] = useState("");
  const [grado, setGrado] = useState("");
  console.log(citasAgendadas);
 console.log(grados.find((ele)=> ele.id === 1).nombre_grado)
//  let lpm =  grados.find((type) => type.id === 0 ).nombre_grado

  const dispatch = useDispatch();
  const handlerPutStateCita = () => {
    console.log(idCita);

    dispatch(putCita(idCita));
  };

  useEffect(() => {
    dispatch(getCitaAgendadas);
  }, [idCita]);

  return (
    <>
      <div className={style.layout}>
        {citasAgendadas &&
          citasAgendadas.CitasInactivas.map((cita) => {
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
                        {
                        
                        // setGrado(  grados.find((ele)=> ele.id === cita.grado ).nombre_grado)
                        }
                          {/* cita.grado */} 
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
                      onClick={(event) => {
                        setIdCita(cita.id);
                        handlerPutStateCita(event);

                        // setEstado(cita.estado);
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
        {citasAgendadas &&
          citasAgendadas.CitasActivas.map((cita) => {
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
                          {/* cita.grado */} <p>1ro - Primaria</p>
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
                      onClick={(event) => {
                        setIdCita(cita.id);
                        handlerPutStateCita(event);

                        // setEstado(cita.estado);
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
    </>
  );
}
