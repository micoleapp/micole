import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
const steps = [
  "Datos Principales",
  "Infraestructura",
  "Acreditaciones",
  "Multimedia",
];
const levels = [
  { nombre: "Preescolar" },
  { nombre: "Primaria" },
  { nombre: "Secundaria" },
  { nombre: "Bachillerato" },
  { nombre: "Universidad" },
];
import { CiUser, CiClock1 } from "react-icons/ci";
import { BsPlusCircleDotted, BsWindowDock } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { useEffect } from "react";
import { getAllCategories } from "../redux/SchoolsActions";
import { useState } from "react";

function DashboardSchool() {
  const [page, setPage] = React.useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.schools);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const [categoryName, setCategoryName] = useState([]);
  const [levelName, setLevelName] = useState([]);
  return (
    <div className="flex">
      <section className="leftshadow bg-white w-1/4 shadow-leftshadow items-center flex justify-center z-50">
        <ul className="flex flex-col gap-4">
          <button
            className="flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white"
            onClick={() => setPage(0)}
          >
            <CiUser className="text-xl text-[#0061dd] group-focus:text-white group-hover:text-white" />
            <span className="text-sm text-black/80 group-focus:text-white group-hover:text-white">
              Perfil del colegio
            </span>
          </button>
          <button
            className="flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white"
            onClick={() => setPage(1)}
          >
            <BsPlusCircleDotted className="text-xl text-[#0061dd] group-focus:text-white group-hover:text-white" />
            <span className="text-sm text-black/80 group-focus:text-white group-hover:text-white">
              Vacantes disponibles
            </span>
          </button>
          <button
            className="flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white"
            onClick={() => setPage(2)}
          >
            <CiClock1 className="text-xl text-[#0061dd] group-focus:text-white group-hover:text-white" />
            <span className="text-sm text-black/80 group-focus:text-white group-hover:text-white">
              Horario para citas{" "}
            </span>
          </button>
          <button
            className="flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white"
            onClick={() => setPage(3)}
          >
            <BsWindowDock className="text-xl text-[#0061dd] group-focus:text-white group-hover:text-white" />
            <span className="text-sm text-black/80 group-focus:text-white group-hover:text-white">
              Mi plan
            </span>
          </button>
          <button
            className="flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white"
            onClick={() => setPage(4)}
          >
            <AiOutlineLogout className="text-xl text-[#0061dd] group-focus:text-white group-hover:text-white" />
            <span className="text-sm text-black/80 group-focus:text-white group-hover:text-white">
              Logout
            </span>
          </button>
        </ul>
      </section>
      <section className="right w-full bg-[#f6f7f8] px-32 py-12">
        {page === 0 ? (
          <Box sx={{ width: "100%", height: "100%" }}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <div className="mt-10">
              {allStepsCompleted() ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {activeStep === 0 && (
                    <form className="flex flex-col gap-7">
                      <div className="flex flex-col">
                        <label htmlFor="name" className="text-lg">
                          Nombre del Colegio
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="p-3 rounded-md border-2  outline-none"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="description" className="text-lg">
                          Descripcion
                        </label>
                        <textarea
                          name="description"
                          id="description"
                          className="p-3 rounded-md border-2 outline-none"
                          rows={5}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="propuesta" className="text-lg">
                          Propuesta de Valor Educativa
                        </label>
                        <textarea
                          name="propuesta"
                          id="propuesta"
                          className="p-3 rounded-md border-2 outline-none"
                          rows={5}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                          <label htmlFor="categoria" className="text-lg">
                            Categoria
                          </label>
                          <small>Puede marcar mas de una opción</small>
                        </div>
                        <div className="grid grid-cols-3">
                          {categories?.map((category) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(event, target) => {
                                    if (target) {
                                      setCategoryName([
                                        ...categoryName,
                                        category.nombre_categoria,
                                      ]);
                                    } else {
                                      setCategoryName(
                                        categoryName.filter(
                                          (cat) =>
                                            cat !== category.nombre_categoria
                                        )
                                      );
                                    }
                                  }}
                                />
                              }
                              label={category.nombre_categoria}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="director" className="text-lg">
                          Nombre del Director
                        </label>
                        <input
                          type="text"
                          name="director"
                          id="director"
                          className="p-3 rounded-md border-2  outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-5">
                        <div className="flex flex-col">
                          <label htmlFor="fundacion" className="text-lg">
                            Año de Fundación
                          </label>
                          <input
                            type="text"
                            name="fundacion"
                            id="fundacion"
                            className="p-3 rounded-md border-2  outline-none"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="ruc" className="text-lg">
                            N° RUC
                          </label>
                          <input
                            type="text"
                            name="ruc"
                            id="ruc"
                            className="p-3 rounded-md border-2  outline-none"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="ugel" className="text-lg">
                            UGEL
                          </label>
                          <input
                            type="text"
                            name="ugel"
                            id="ugel"
                            className="p-3 rounded-md border-2  outline-none"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="area" className="text-lg">
                            Área del campus (m2)
                          </label>
                          <input
                            type="text"
                            name="area"
                            id="area"
                            className="p-3 rounded-md border-2  outline-none"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="ingles" className="text-lg">
                            Hr/Semana idioma Inglés
                          </label>
                          <input
                            type="text"
                            name="ingles"
                            id="ingles"
                            className="p-3 rounded-md border-2  outline-none"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="alumnos" className="text-lg">
                            Cantidad de Alumnos
                          </label>
                          <input
                            type="text"
                            name="alumnos"
                            id="alumnos"
                            className="p-3 rounded-md border-2  outline-none"
                          />
                        </div>
                      </div>
                      <div className="flex gap-5">
                        {levels?.map((level) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={(event, target) => {
                                  if (target) {
                                    setLevelName([...levelName, level.nombre]);
                                  } else {
                                    setLevelName(
                                      levelName.filter(
                                        (lev) => lev !== level.nombre
                                      )
                                    );
                                  }
                                }}
                              />
                            }
                            label={level.nombre}
                          />
                        ))}
                      </div>
                    </form>
                  )}

                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleNext} sx={{ mr: 1 }}>
                      Next
                    </Button>
                    {activeStep !== steps.length &&
                      (completed[activeStep] ? (
                        <Typography
                          variant="caption"
                          sx={{ display: "inline-block" }}
                        >
                          Step {activeStep + 1} already completed
                        </Typography>
                      ) : (
                        <Button onClick={handleComplete}>
                          {completedSteps() === totalSteps() - 1
                            ? "Finish"
                            : "Complete Step"}
                        </Button>
                      ))}
                  </Box>
                </React.Fragment>
              )}
            </div>
          </Box>
        ) : page === 1 ? (
          <div>1</div>
        ) : page === 2 ? (
          <div>2</div>
        ) : page === 3 ? (
          <div>3</div>
        ) : page === 4 ? (
          <div>4</div>
        ) : null}
      </section>
    </div>
  );
}

export default DashboardSchool;
