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
import {
  filterAdminState,
  getColegiosSearch,
} from "../../../../redux/SchoolsActions";
import SelectCRM from "../../../../components/CardsDrgAndDrp/SelectsCRM/SelectsCRM";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
export default function SearchCoelegio({
  handlerInput,
  data,
  nroColegios,
  vacante,
  modalFiltro
}) {
  const { distrits } = useSelector((state) => state.schools);
  const [OptionSelected, setOptionSelected] = useState("");
  const [OptionSelectedState, seOptionSelectedState] = useState("");
  const [filterSelected, setFilterSelected] = useState({
    state: "",
    distrito: "",
  });
const [openMFiltros, setOpenMFiltros] = useState(false)
  let nombresColegio = data && data?.map((x) => x.nombre_colegio);
  let nameUnique = nombresColegio?.filter(
    (x, i) => nombresColegio.indexOf(x) === i
  );

  const dispatch = useDispatch();
  console.log(filterSelected);
  const handleChangeState = (event) => {
    dispatch(filterAdminState());
    setFilterSelected({
      ...filterSelected,
      state: event.target.value,
    });
  };

  const handleChangeDistrito = (event) => {
    setFilterSelected({
      ...filterSelected,
      distrito: event.target.value,
    });
  };
  const SubmitSearch = (event) => {
    handlerInput(OptionSelected);
    if (vacante === false) {
      dispatch(getColegiosSearch(OptionSelected));
    }
    if (vacante === true) {
      try {
        axios
          .get(`/colegios?&search=${OptionSelected}`)
          .then((res) => {
            handlerInput(res.data.colegios);
          })
          .catch((err) => console.log(err.message));
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  // filterAdminState
  console.log(OptionSelectedState);
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
        {vacante === false && (
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
        )}

        <div className={style.divDesktop}>
          <Autocomplete
            sx={{ width: "40vh", fontSize: "1vh" }}
            size="small"
            id="Tipo"
            freeSolo
            onChange={(e, v) => setOptionSelected(v)}
            options={data && nameUnique?.map((option) => option)}
            renderInput={(params) => (
              <TextField
                sx={{ fontSize: "1vh" }}
                {...params}
                onChange={({ target }) => setOptionSelected(target.value)}
                label="Buscar Colegio"
              />
            )}
          />
        </div>
        <div className={style.divMobile}>
          <Autocomplete
            sx={{ width: "20vh", fontSize: "1vh" }}
            size="small"
            id="Tipo"
            freeSolo
            onChange={(e, v) => setOptionSelected(v)}
            options={data && nameUnique?.map((option) => option)}
            renderInput={(params) => (
              <TextField
                sx={{ fontSize: "1vh" }}
                {...params}
                onChange={({ target }) => setOptionSelected(target.value)}
                label="Buscar Colegio"
              />
            )}
          />
        </div>

        <Button
          sx={{ fontWeight: "600", height: "4.2vh" }}
          variant="contained"
          onClick={SubmitSearch}
        >
          <SearchIcon />
        </Button>
       {vacante === false && <div className={style.btnFiltroResponsive}>
          <Button
            sx={{
              fontWeight: "600",
              height: "4.2vh",
              backgroundColor: "#FFFF",
              color: "#0D263B",
            }}
            variant="contained"
            onClick={()=>   modalFiltro(true)}
          >
            <TuneIcon />
          </Button>
        </div>}

   
      </div>
    </>
  );
}
