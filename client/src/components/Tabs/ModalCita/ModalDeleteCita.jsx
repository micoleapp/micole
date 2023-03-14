import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanSuccessState, deleteCita } from "../../../redux/CitasActions";
import Swal from "sweetalert2";
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
  const [openDelete, setOpenDelete] = useState(true);
  const dispatch = useDispatch();

  const handleDeleteCita = async  () => {
    dispatch(deleteCita(IdCita));
    setOpenDelete(false);
    handleClose(true);
  };

  return (
    <>
    
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

   
    </Box>
     

    </>
  
  );






}
