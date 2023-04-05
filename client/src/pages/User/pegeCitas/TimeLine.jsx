import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import { Typography } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import style from "./timeline.module.css";




const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 15,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#0061DF",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#0061DF",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2.5,
    // width: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: "#0061DF",
  zIndex: 1,
  color: "#fff",
  width: "5vh",
  height: "5vh",
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",

  ...(ownerState.active && {
    backgroundImage: "#0061DF",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#0061DF",
  }),
}));
const ColorlibStepIconRootMobile = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: "#0061DF",
  zIndex: 1,
  color: "#fff",
  width: "6vh",
  height: "6vh",
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",

  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage: "#0061DF",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#0061DF",
  }),
}));
function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}
function ColorlibStepIconMobile(props) {
  const { active, completed, className } = props;
console.log(props)
  const icons = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
  };

  return (
    <ColorlibStepIconRootMobile
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRootMobile>
  );
}
ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

// const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
const steps = [
  "Solicitud de cita",
  "Cita realizada",
  "Aplicacion",
  "Entrevista con el director",
  "Vacante ofrecida",
  "Vacante aceptada",
];
const stepsMobile = [
  "Solicitud cita",
  "Cita realizada",
  "Aplicacion",
  "Entrevista ",
  "Vacante ofrecida",
  "Vacante aceptada",
];
export default function CustomizedSteppers({ cita }) {
  console.log(cita);
  const estados = {
    Solicitud: 0,
    Realizada: 1,
    Aplicacion: 2,
    Entrevista: 3,
    VOfrecida: 4,
    VAceptada: 5,
  };
  const estadosNombres = {
    0: "Confirmada",
    1: "Realizada",
    2: "Exitosa",
    3: "Realizada",
    4: "Ofrecida",
    5: "Aceptada",
  };

  const stepActive = estados[cita.estado];
  console.log(stepActive);
  return (
    <>
      {" "}
      <div className={style.DesktopDiv}>
        <Stack sx={{ width: "100%", paddingTop: "1vh" }} spacing={4}>
          <Stepper
            alternativeLabel
            activeStep={stepActive}
            connector={<ColorlibConnector />}
          >
            {steps.map((label, index) => (
              <Step sx={{ width: "100%" }} key={label}>
                <StepLabel
                  // optional={
                  //   index === stepActive ? (
                  //     <Typography
                  //       variant="subtitle2"
                  //       sx={{
                  //         color: "#0061DF",

                  //         display: "flex",
                  //         gap: "1vh",
                  //       }}
                  //     >
                  //       <div
                  //         style={{
                  //           display: "flex",
                  //           gap: "1vh",
                  //           width: "100%",
                  //           justifyContent: "center",
                  //           alignItems: "center",
                  //         }}
                  //       >
                  //         {estadosNombres[stepActive]}

                  //         <CheckBoxIcon sx={{ width: "2vh" }} />
                  //       </div>
                  //     </Typography>
                  //   ) : null
                  // }
                  // StepIconComponent={ColorlibStepIcon}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
      </div>
      <div className={style.MobileDiv}>
        <Stack sx={{ width: "100%" }} spacing={4}>
          <Stepper
            alternativeLabel
            activeStep={stepActive}
            connector={<ColorlibConnector />}
          >
            {stepsMobile.map((label, index) => (
              <Step  key={label}>
                <StepLabel
                  // optional={
                  //   index === stepActive ? (
                  //     <Typography
                  //       variant="subtitle2"
                  //       sx={{
                  //         color: "#0061DF",
                  //         fontSize: "1.2vh",
                  //       }}
                  //     >
                  //       <p>{estadosNombres[stepActive]}</p>

                  //       <CheckBoxIcon sx={{ width: "2vh" }} />
                  //     </Typography>
                  //   ) : null
                  // }
                  // StepIconComponent={ColorlibStepIconMobile}
              
                >
                  <p style={{ fontSize: "1.2vh" }}>{label}</p>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
      </div>
    </>
  );
}

// const steps = ['Solicitud de cita', 'Cita realizada', 'Aplicacion','Entrevista con el director','Vacante ofrecida','Vacante aceptada'];
