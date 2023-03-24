import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

import style from "./searchColegio.module.css";
import { useState } from "react";

import { Button, IconButton, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { getColegiosSearch } from "../../../../redux/SchoolsActions";
export default function SearchCoelegio({ handlerInput, data , nroColegios }) {
  const [OptionSelected, setOptionSelected] = useState("");
  const  dispatch   = useDispatch()
  // "http://localhost:3001/colegios?limit=10&page=1&search="mateo""
  const SubmitSearch = (event) => {
    handlerInput(OptionSelected);
    dispatch(getColegiosSearch(OptionSelected))
  };

console.log(OptionSelected)
  return (
    <>
    <div style={{display:'flex', gap:'1rem' ,alignItems:'center'}}>
        <Typography
        sx={{fontFamily:'Poppins', fontWeight:'600' , color:'#0061DF', fontSize:'1.4vh'}}
        >
              {  nroColegios && nroColegios} Colegios
        </Typography>
      
           <Autocomplete
        sx={{ width: "40vh" }}
        size='small'
        id="Tipo"
        freeSolo
        onChange={(e, v) => setOptionSelected(v)}
        options={data?.map((option) => option.nombre_colegio)}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={({ target }) => setOptionSelected(target.value)}
            label="Buscar Colegio"
           
          />
        )}
      />
        <Button
            size="small"
            sx={{fontWeight:'600', height:'4vh'}}
            variant="contained"
            onClick={SubmitSearch}
          >
            Buscar
          </Button>
    </div>
   
    </>
  );
}
