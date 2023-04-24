import {
  Button,
  Divider,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import SwalProp from "../../../exports/SwalProp";
import FormLogin from "../../FormLogin/FormLogin";
import ModalLogin from "../../ModalLogin/ModalLogin";
// solo enviar id evento y usuario
export default function InscripcionEvento({
  idEvento,
  fechaEvento,
  horaEvento,
  nombreEvento,
  handleClose,
}) {
  const { user, isAuth } = useSelector((state) => state.auth);
  const [openLogin, setOpenLogin] = useState(false);
  console.log(horaEvento, fechaEvento, idEvento, nombreEvento);
  const onSubmit = () => {
    if (isAuth) {
      const idUser = user.id;
      handleClose();
      axios
        .post(`/eventos/registration`, { idEvento, idUser })
        .then((res) => {
          handleClose();
          SwalProp({
            status: true,
            title: "Inscripcion Exitosa!",
            text: "",
          });

        })
        .catch((err) => {
          SwalProp({
            status: false,
            title: "Algo salió mal",
            text: err.response.data.error,
          });
        });
    } else {
      handleClose();
      Swal.fire({
        icon: "info",
        title: "Inicia Sesion",
        text: "Debes iniciar sesion o registrarte para inscribirte al evento",

        confirmButtonAriaLabel: "Iniciar Sesion",
      });

      return;
    }
  };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {openLogin === false && (
          <>
            <Typography
              sx={{ paddingBottom: "1rem", fontSize: "2.4vh" }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Evento {nombreEvento && nombreEvento}
              <Divider
                sx={{
                  color: "blue",
                  border: "1px solid #0061DF",
                  width: "14vh",
                }}
                // variant="middle"
              />
            </Typography>

            <Typography
              sx={{ paddingBottom: "1rem", fontSize: "1.8vh" }}
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
              <div style={{ display: "flex", gap: "1vh" }}>
                <TextField
                  sx={{ width: "30vh" }}
                  id="outlined-search"
                  label="Nombre"
                  type="text"
                  value={user?.nombre_responsable}
                  // onChange={({ target }) => setData({ ...data, nombre: target.value })}
                />
                <TextField
                  sx={{ width: "30vh" }}
                  id="outlined-search"
                  label="Celular"
                  type="number"
                  value={user?.telefono}
                  // onChange={({ target }) => setData({ ...data, celular: target.value })}
                />
              </div>

              <TextField
                sx={{ width: "100%" }}
                id="outlined-search"
                label="Correo"
                type="email"
                value={user?.email}
                // onChange={({ target }) => setData({ ...data, email: target.value })}
              />
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={onSubmit}
                  variant="contained"
                  sx={{ width: "20vh" }}
                >
                  {" "}
                  INSCRIBIRME{" "}
                </Button>
              </div>
            </FormControl>
          </>
        )}
      </div>
    </>
  );
}
