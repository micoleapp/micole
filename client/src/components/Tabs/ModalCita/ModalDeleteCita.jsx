import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCita } from "../../../redux/CitasActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "8px",
  p: 2,
};

export default function ModalDeleteCita({
  IdCita,
  handleClose,
  HandlerOpendeleteModal,
}) {
  const { success, error } = useSelector((state) => state.citas);
  console.log(error);
  const [openExito, setOpenExito] = useState(false);

  const dispatch = useDispatch();

  const handleDeleteCita = () => {
    dispatch(deleteCita(IdCita));
    if (success === "Se eliminó la Cita.") {
      setOpenExito(true);
    }
  };

  const handleFinalizar = () => {
    handleClose(true);
  };

  return (
    <Box>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          {openExito === false && (
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              Cancelar Cita
            </Typography>
          )}
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            {openExito === false && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "20px",
                  flexDirection: "column",
                }}
              >
                <h1> Estas seguro de canclear esta cita ? </h1>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Button variant="contained" onClick={handleDeleteCita}>
                    Si
                  </Button>
                  <Button
                    onClick={() => HandlerOpendeleteModal(false)}
                    variant="contained"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
            {openExito === true && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "20px",
                  flexDirection: "column",
                }}
              >
                <Typography
                  id="keep-mounted-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Cita Cancelada con Exito!
                  
                </Typography>
                <p style={{ textAlign: "center" }}>
                  Enviaremos un correo a la familia avisando que la cita ha sido
                  cancelada
                </p>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Button variant="contained" onClick={handleFinalizar}>
                    Finalizar
                  </Button>
                </div>
              </div>
            )}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}
