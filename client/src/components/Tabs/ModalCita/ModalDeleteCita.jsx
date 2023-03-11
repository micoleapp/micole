import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanSuccessState, deleteCita } from "../../../redux/CitasActions";

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
  const { success, error, loading } = useSelector((state) => state.citas);
  console.log(error);
  const [openDelete, setOpenDelete] = useState(true);
  const [OpenError, setOpenError] = useState(false);

  const dispatch = useDispatch();

  const comprobacion = () => {
    if (error === "El registro no existe.") {
      setOpenError(true);
    }
  };

  const handleDeleteCita = async () => {
    dispatch(deleteCita(IdCita));
    setOpenDelete(false);
    await comprobacion();
  };

  const handleFinalizar = () => {
    handleClose(true);
  };


  return (
    <Box>
      {openDelete === true && success === false && (
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            {openDelete === true && (
              <Typography
                id="keep-mounted-modal-title"
                variant="h6"
                component="h2"
              >
                Cancelar Cita
              </Typography>
            )}
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
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
            </Typography>
          </Box>
        </Modal>
      )}
      {success === "Se eliminó la Cita." && (
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            {openDelete === true && (
              <Typography
                id="keep-mounted-modal-title"
                variant="h6"
                component="h2"
              >
                Cancelar Cita
              </Typography>
            )}
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
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
            </Typography>
          </Box>
        </Modal>
      )}

     {OpenError === true && (
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            {openDelete === true && (
              <Typography
                id="keep-mounted-modal-title"
                variant="h6"
                component="h2"
              >
                Cancelar Cita
              </Typography>
            )}
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
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
                 Error 
                </Typography>
                <p style={{ textAlign: "center" }}>
                  Ha habido un error al cancelar la cita
                  <p>{error}</p>
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
            </Typography>
          </Box>
        </Modal>
      )}
    </Box>
  );
}
