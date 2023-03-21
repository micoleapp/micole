import {
  Button,
  Divider,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import TextEvento from "../TextEvento";

export default function InscripcionEvento({
  idEvento,
  fechaEvento,
  horaEvento,
  nombreEvento,
}) {
  console.log(horaEvento, fechaEvento, idEvento, nombreEvento);

  return (
    <>
      <div style={{display:'flex', flexDirection:'column'}} > 
   
        <Typography
          sx={{ padding: "10px" }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Evento {nombreEvento && nombreEvento}
          <Divider
            sx={{ color: "blue", border: "1px solid #0061DF" }}
            variant="middle"
          />
        </Typography>

        <FormControl>
          <TextField
            sx={{ minWidth: "20vh" }}
            id="outlined-search"
            label="Nombre"
            type="number"
            // onChange={({ target }) => setData({ ...data, nombre: target.value })}
          />
          <TextField
            // sx={{ width: "100%" }}
            id="outlined-search"
            label="Celular"
            type="number"
            // onChange={({ target }) => setData({ ...data, celular: target.value })}
          />
          <TextField
            // sx={{ width: "100%" }}
            id="outlined-search"
            label="Correo"
            type="email"
            // onChange={({ target }) => setData({ ...data, email: target.value })}
          />
          <Button variant="contained"> INSCRIBIRME </Button>
        </FormControl>
      </div>
    </>
  );
}
