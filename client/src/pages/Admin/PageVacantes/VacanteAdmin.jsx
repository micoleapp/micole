import React, { useEffect, useState } from "react";
import GridVacantes from "../../../components/GridVacantes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "@mui/material/Box";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { getOneSchool } from "../../../redux/SchoolsSlice";
import { useSelector, useDispatch } from "react-redux";
import SearchCoelegio from "../pageColegios/search-colegio-admin/SearchCoelegio";
import { getNombresColegios, getVacantes } from "../../../redux/SchoolsActions";
import GridVacantesAdmin from "./grid-vacantes-admin/GridVacantesAdmin";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
export default function VacanteAdmin() {
  const [vacantes, setVacantes] = useState(0);
  const [vacantesOffOne, setVacantesOffOne] = useState(true);
  const [vacantesOffTwo, setVacantesOffTwo] = useState(true);
  const [vacantesOffThree, setVacantesOffThree] = useState(true);
  const yearNow = new Date().getFullYear();
  const dispatch = useDispatch();
  const [Input, setInput] = useState("");
  const { nameColegio } = useSelector((state) => state.schools);
  let oneSchool = Input && Object.assign({}, ...Input);
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getNombresColegios());
  }, [Input !== ""]);

  useEffect(() => {
    let gradoNiveles = oneSchool?.Nivels?.filter((ele) => ele.id);
    dispatch(getVacantes(gradoNiveles));
  }, [Input]);
  console.log(Input);
  return (
    <div className="flex gap-2 min-h-screen flex-col w-full lg:w-[900px] overflow-hidden">
      <h1 className="text-2xl">Vacantes disponibles</h1>

      <div style={{ padding: "1rem" }}>
        <p style={{ paddingBottom: "1rem" }}>Elegir Colegio</p>

        <SearchCoelegio
          handlerInput={setInput}
          nroColegios={nameColegio?.length}
          data={nameColegio && nameColegio}
          vacante={true}
        />
      </div>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label={yearNow} value="1" />
              <Tab label={yearNow + 1} value="2" />
              <Tab label={yearNow + 2} value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {!oneSchool && (
              <div
                data-aos="flip-up"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  color: "#0C2B42",
                  gap: "10px",
                  padding: "20px",
                  minHeight: "100%",
                  boxShadow: "0px 4px 10px rgba(31, 95, 175, 0.15)",
                  fontWeight: "600",
                  backgroundColor: "#fff",
                }}
              >
                <ContentPasteSearchOutlinedIcon style={{ color: "#0061DF" }} />
                <h1>Debes realizar una busqueda</h1>
              </div>
            )}
            {oneSchool && (
              <div className="flex gap-2 min-h-screen flex-col w-full lg:w-[900px] overflow-hidden">
                <GridVacantesAdmin
                  oneSchool={oneSchool && oneSchool}
                  setVacantesOff={setVacantesOffTwo}
                  año={yearNow}
                />
              </div>
            )}
          </TabPanel>
          <TabPanel value="2">
            {!oneSchool && (
              <div
                data-aos="flip-up"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  color: "#0C2B42",
                  gap: "10px",
                  padding: "20px",
                  minHeight: "100%",
                  boxShadow: "0px 4px 10px rgba(31, 95, 175, 0.15)",
                  fontWeight: "600",
                  backgroundColor: "#fff",
                }}
              >
                <ContentPasteSearchOutlinedIcon style={{ color: "#0061DF" }} />
                <h1>Debes realizar una busqueda</h1>
              </div>
            )}
            {oneSchool && (
              <div className="flex gap-2 min-h-screen flex-col w-full lg:w-[900px] overflow-hidden">
                <GridVacantesAdmin
                  oneSchool={oneSchool && oneSchool}
                  setVacantesOff={setVacantesOffTwo}
                  año={yearNow + 1}
                />
              </div>
            )}
          </TabPanel>
          <TabPanel value="3">
            {!oneSchool && (
              <div
                data-aos="flip-up"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  color: "#0C2B42",
                  gap: "10px",
                  padding: "20px",
                  minHeight: "100%",
                  boxShadow: "0px 4px 10px rgba(31, 95, 175, 0.15)",
                  fontWeight: "600",
                  backgroundColor: "#fff",
                }}
              >
                <ContentPasteSearchOutlinedIcon style={{ color: "#0061DF" }} />
                <h1>Debes realizar una busqueda</h1>
              </div>
            )}
            {oneSchool && (
              <GridVacantesAdmin
                oneSchool={oneSchool && oneSchool}
                setVacantesOff={setVacantesOffTwo}
                año={yearNow + 2}
              />
            )}
          </TabPanel>
        </TabContext>
      </Box>

      {/* <small>
        Debera enviar el formulario de al menos 1 de los 3 años antes de
        continuar
      </small>
      <button
        className="flex font-semibold justify-between items-center bg-white p-2 rounded-md shadow-md"
        onClick={() => (vacantes === 0 ? setVacantes(null) : setVacantes(0))}
      >
        {" "}
        <span>2023</span>{" "}
        <FontAwesomeIcon
          size="lg"
          icon={vacantes === 0 ? faArrowUp : faArrowDown}
        />{" "}
      </button>
      {vacantes === 0 && (
        <GridVacantes setVacantesOff={setVacantesOffOne} año={yearNow} />
      )}
      <button
        className="flex font-semibold justify-between items-center bg-white p-2 rounded-md shadow-md"
        onClick={() => (vacantes === 1 ? setVacantes(null) : setVacantes(1))}
      >
        {" "}
        <span>2024</span>{" "}
        <FontAwesomeIcon
          size="lg"
          icon={vacantes === 1 ? faArrowUp : faArrowDown}
        />{" "}
      </button>
      {vacantes === 1 && (
        <GridVacantes setVacantesOff={setVacantesOffTwo} año={yearNow + 1} />
      )}
      <button
        className="flex font-semibold justify-between items-center bg-white p-2 rounded-md shadow-md"
        onClick={() => (vacantes === 2 ? setVacantes(null) : setVacantes(2))}
      >
        {" "}
        <span>2025</span>{" "}
        <FontAwesomeIcon
          size="lg"
          icon={vacantes === 2 ? faArrowUp : faArrowDown}
        />{" "}
      </button>
      {vacantes === 2 && (
        <GridVacantes setVacantesOff={setVacantesOffThree} año={yearNow + 2} />
      )} */}
    </div>
  );
}
