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
  

  useEffect(() => {
    dispatch(getNombresColegios());

      let gradoNiveles = oneSchool?.Nivels?.filter((ele) => ele.id);
      dispatch(getVacantes(gradoNiveles));
 
  }, []);

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

      <div className="flex gap-2 min-h-screen flex-col w-full lg:w-[900px] overflow-hidden">
        <GridVacantesAdmin
          oneSchool={oneSchool}
          setVacantesOff={setVacantesOffTwo}
          año={yearNow + 1}
        />
      </div>

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
