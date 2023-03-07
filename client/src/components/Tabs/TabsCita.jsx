import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";

export default function NavTabs({ task }) {
  const [value, setValue] = useState("1");
console.log(task)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Cita" value="1" />
            <Tab label="Documentos" value="2" />
            <Tab label="Contacto" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <div>
            <p> Dia : {task.date}</p>
            <p> Modalidad : {task.modo}</p>
            <p> Hora : {task.time}</p>
            <p>Grado : {task.grado}</p>
            <p>Ingreso : {task.añoIngreso}</p>
          </div>
        </TabPanel>
        <TabPanel value="2">
          <div style={{ minHeight: "120px" }}>
            <p>Documentos : 2 de 5</p>
          </div>
        </TabPanel>
        <TabPanel value="3">
          <div style={{ minHeight: "120px" }}>
            <p>Correo : {task.correo}</p>
            <p> Celular : {task.celular}</p>
          </div>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
