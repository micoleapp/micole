import React, { useState } from "react";
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
export default function CardCitas() {
  const { citasAgendadas } = useSelector((state) => state.schools);
  const [idCita, setidCita] = useState("");
  const [Estado, setEstado] = useState("");
  console.log(citasAgendadas);
  
  const dispatch =useDispatch()
  const handlerPutStateCita = () => {
    console.log(idCita);
  const estado = "Pendiente"
    dispatch(putCita(idCita,estado))
  };
  return (
    <>
      <div className={style.layout}>
        {citasAgendadas &&
          citasAgendadas.map((cita) => {
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
                        handlerPutStateCita();
                        setidCita(cita.id);
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
      </div>
    </>
  );
}
