import {
  Button,
  Divider,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";

import React from "react";


export default function InscripcionEvento({
  idEvento,
  fechaEvento,
  horaEvento,
  nombreEvento,
}) {
  console.log(horaEvento, fechaEvento, idEvento, nombreEvento);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{paddingBottom: "1rem" , fontSize:'2.4vh'}}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Evento {nombreEvento && nombreEvento}
          <Divider
            sx={{ color: "blue", border: "1px solid #0061DF", width: "14vh" }}
            // variant="middle"
          />
        </Typography>

        <Typography
         sx={{paddingBottom: "1rem" , fontSize:'1.8vh'}}
          id="modal-modal-title"
          variant="p"
          component="p"
        >
          <div style={{ display: "flex", gap: "1vh" }}>
            <p>
              {" "}
              <b>Fecha </b>
            </p>
            <p>{fechaEvento}</p>
          </div>
          <div style={{ display: "flex", gap: "1vh" }}>
            <p>
              {" "}
              <b>Hora </b>
            </p>
            <p>{horaEvento}</p>
          </div>
        </Typography>

        <FormControl style={{ display: "flex", gap: "2vh" }}>
          <div style={{ display: "flex", gap: "1vh"}}>
            <TextField
              sx={{ width: "30vh" }}
              id="outlined-search"
              label="Nombre"
              type="text"
              // onChange={({ target }) => setData({ ...data, nombre: target.value })}
            />
            <TextField
              sx={{ width: "30vh" }}
              id="outlined-search"
              label="Celular"
              type="number"
              // onChange={({ target }) => setData({ ...data, celular: target.value })}
            />
          </div>

          <TextField
            sx={{ width: "100%" }}
            id="outlined-search"
            label="Correo"
            type="email"
            // onChange={({ target }) => setData({ ...data, email: target.value })}
          />
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <Button variant="contained" sx={{ width: "20vh" }}>
              {" "}
              INSCRIBIRME{" "}
            </Button>
          </div>
        </FormControl>
      </div>
    </>
  );
}
