import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import LaptopWindowsIcon from "@mui/icons-material/LaptopWindows";
import EventIcon from "@mui/icons-material/Event";
import Chip from "@mui/material/node/Chip";
import { Button } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { deleteCita } from "../../redux/CitasActions";
import ModalDeleteCita from "./ModalCita/ModalDeleteCita";
import fechaFormat from "../SwiperEventos/utils/fechaFormat";
import es_AM_PM from "../SwiperEventos/utils/horaFormat";
import Swal from "sweetalert2";
export default function NavTabs({ task, handleCloseModal }) {
  const { grados } = useSelector((state) => state.schools);
  const [value, setValue] = useState("1");
  const [OpenDelete, setOpenDelete] = useState(false);
  const [CitaID, setCitaID] = useState("");
  const dispatch = useDispatch();
  console.log(OpenDelete);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Cita" value="1" />
            {/* <Tab label="Documentos" value="2" /> */}
            <Tab label="Contacto" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <div
            style={{
              display: "flex",
              minHeight: "22vh",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <div style={{ display: "flex", gap: "1vh" }}>
              <EventIcon style={{ color: "grey" }} />
              <p> {fechaFormat(task.date)}</p>
            </div>
            <div style={{ display: "flex", gap: "1vh" }}>
              {task.modo === "Virtual" && (
                <LaptopWindowsIcon style={{ color: "grey" }} />
              )}
              {task.modo === "Presencial" && (
                <PersonPinIcon style={{ color: "grey" }} />
              )}
              <p> Modalidad {task.modo}</p>
            </div>
            <div style={{ display: "flex", gap: "1vh" }}>
              <AccessTimeIcon style={{ color: "grey" }} />
              <p>
                {" "}
                
                {""} {task.time +" "+es_AM_PM(task.time)}
              </p>
            </div>
            <div style={{ display: "flex", gap: "1vh" }}>
              {grados &&
                grados.map((ele) => {
                  if (ele.id === task.grado) {
                    return <Chip label={ele.nombre_grado} color="primary" />;
                  }
                })}
              <Chip label={task.añoIngreso} color="primary" />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={() =>
                  //  handleDeleteCita(task.idCita)
                  {
                    setOpenDelete(true);
                    setCitaID(task.idCita);
                  }
                }
                style={{
                  background: "#c01616",
                  width: "100%",
                  fontFamily: "Poppins",
                  fontWeight: "600",
                }}
              >
                Cancelar Cita
              </Button>
            </div>
          </div>
        </TabPanel>

        <TabPanel value="3">
          <div style={{ minHeight: "22vh" }}>
            <div style={{ display: "flex", gap: "1vh" }}>
              <MailOutlineIcon style={{ color: "grey" }} />
              <p>{task.correo}</p>
            </div>
            <div style={{ display: "flex", gap: "1vh" }}>
              <PhoneIcon style={{ color: "grey" }} n />
              <p> {task.celular}</p>
            </div>
          </div>
        </TabPanel>
      </TabContext>
      {OpenDelete && (
        <ModalDeleteCita  HandlerOpendeleteModal={setOpenDelete}  handleClose={handleCloseModal} IdCita={CitaID} />
      )}
    </Box>
  );
}
