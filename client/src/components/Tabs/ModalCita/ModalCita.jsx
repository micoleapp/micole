import { Box, Modal, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCita } from "../../../redux/CitasActions";
import { getCitas } from "../../../redux/CitasSlice";
import NavTabs from "../TabsCita";
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

export default function ModalCita({ task, handleClose, open }) {



  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          Cita Agendada
        </Typography>
        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "70px", height: "70px" }}
              src="https://res.cloudinary.com/dj8p0rdxn/image/upload/v1676414550/xuj9waxpejcnongvhk9o.png"
              alt=""
            />
            <h1>{task.nombre}</h1>
            <div />

            <NavTabs handleCloseModal={handleClose} task={task} />
          </div>
        </Typography>
      </Box>
    </Modal>
  );
}
