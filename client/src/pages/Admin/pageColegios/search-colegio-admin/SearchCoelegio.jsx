import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";

import SearchIcon from "@mui/icons-material/Search";
import style from "./searchColegio.module.css";
import { useEffect, useState } from "react";

import { Button, IconButton, Typography } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { useDispatch, useSelector } from "react-redux";
import { getColegiosSearch } from "../../../../redux/SchoolsActions";
import SelectCRM from "../../../../components/CardsDrgAndDrp/SelectsCRM/SelectsCRM";
import axios from "axios";
export default function SearchCoelegio({ handlerInput, data, nroColegios }) {
  const [OptionSelected, setOptionSelected] = useState("");  
  const [nombreColegio, setNombreColegio] = useState([]);
  const dispatch = useDispatch();
  // "http://localhost:3001/colegios?limit=10&page=1&search="mateo""
  const SubmitSearch = (event) => {
    handlerInput(OptionSelected);
    dispatch(getColegiosSearch(OptionSelected));
  };





  console.log(OptionSelected);
  const dataOption = nombreColegio.filter((ele)=> ele.nombre_colegio) 
   console.log(dataOption);
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          fontSize: "10px",
          alignItems: "center",
        }}
      >
        <div className={style.FiltrosResponsive}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: "600",
              color: "#0061DF",
              fontSize: "1.2vh",
            }}
          >
            {nroColegios && nroColegios} Colegios
          </Typography>
        </div>

        <Autocomplete
          sx={{ width: "40vh", fontSize: "1vh" }}
          size="small"
          id="Tipo"
          freeSolo
          onChange={(e, v) => setOptionSelected(v)}
          options={data?.map((option) => option.nombre_colegio)}
          renderInput={(params) => (
            <TextField
              sx={{ fontSize: "1vh" }}
              {...params}
              onChange={({ target }) => setOptionSelected(target.value)}
              label="Buscar Colegio"
            />
          )}
        />
        <Button
          sx={{ fontWeight: "600", height: "4.2vh" }}
          variant="contained"
          onClick={SubmitSearch}
        >
          <SearchIcon />
        </Button>
        <div className={style.btnFiltroResponsive}>
          <Button
            sx={{
              fontWeight: "600",
              height: "4.2vh",
              backgroundColor: "#FFFF",
              color: "#0D263B",
            }}
            variant="contained"
            onClick={SubmitSearch}
          >
            <TuneIcon />
          </Button>
        </div>
        <div className={style.FiltrosResponsive}>
          <SelectCRM label={"Estado"} filtro={"estado"} />
          {/* <SelectCRM label={"Fecha"} filtro={"fecha"} /> */}
        </div>
      </div>
    </>
  );
}
