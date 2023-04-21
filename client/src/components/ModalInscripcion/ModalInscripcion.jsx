import React, { useEffect, useState } from "react";
import style from "./ModalInscripcion.module.css";
import CloseButton from "./svg/CloseButton";
import FormInscripcion from "../FormInscripcion/FormInscripcion";
import Payment from "../FormPayment/Payment";
import FormLogin from "../FormLogin/FormLogin";
import { useSelector } from "react-redux";
import { Box, Modal } from "@mui/material";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: '80%',
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "8px",
  p: 2,
};
export default function ModalInscripcion({
  handleClose,
  handleClosePayment,
  OpenPaymentPLan,
}) {
  const { isAuth, success } = useSelector((state) => state.auth);
  console.log(OpenPaymentPLan.price);
  const [OpenRegister, setOpenRegister] = useState(true);
  const [OpenLogin, setOpenLogin] = useState(false);

  const toggleClose = () => {
    handleClose(false);
    handleClosePayment({
      ...OpenPaymentPLan,
      state: false,
      price: 0,
      plan: "",
    });
  };

  return (

    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={styles}>
        <div className={style.DivCloseButton}>
          <div onClick={toggleClose}>
            <CloseButton />
          </div>
        </div>
        {OpenLogin === false && isAuth === false && OpenRegister === true && (
          <FormInscripcion handlerOpenLogin={setOpenLogin} />
        )}
        <div>
          {isAuth === true && (
            <Payment
              plan={OpenPaymentPLan?.plan}
              price={OpenPaymentPLan?.price}
            />
          )}
        </div>
        <div>{OpenLogin === true && isAuth === false && <FormLogin setOpenLogin={setOpenLogin} OpenLogin={OpenLogin} />}</div>
        {/* </div> */}
      </Box>

    </Modal>






  );
}
