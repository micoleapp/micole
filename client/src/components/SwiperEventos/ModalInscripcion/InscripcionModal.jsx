import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import InscripcionEvento from "../FormInscripcionEvento/InscripcionEvento";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth:'100%',
  bgcolor: "background.paper",
  boxShadow: " 0px 1px 5px rgba(0, 0, 0, 0.40)",
  border: "none",
  p: 3,
  borderRadius: "10px",
};

export default function InscripcionModal({
  open,
  idEvento,
  setOpen,
  fechaEvento,
  horaEvento,
  nombreEvento
}) {
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal
        sx={{ display: "flex" , maxWidth:'auto'}}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <InscripcionEvento
            fechaEvento={fechaEvento}
            horaEvento={horaEvento}
            idEvento={idEvento}
            nombreEvento={nombreEvento}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </>
  );
}
