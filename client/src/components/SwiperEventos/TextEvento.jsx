import { Button } from "@mui/material";
import React from "react";

export default function TextEvento({
  nombreEvento,
  description,
  fechaEvento,
  horaEvento,
  idColegio,
}) {
  return (
    <div>
      {nombreEvento && <p>{nombreEvento}</p>}
      {description && <p>{description}</p>}
      {fechaEvento && <p>{fechaEvento}</p>}
      {horaEvento && <p>{horaEvento}</p>}
      <Button variant="contained" color='primary'>Incribirme </Button>
    </div>
  );
}
