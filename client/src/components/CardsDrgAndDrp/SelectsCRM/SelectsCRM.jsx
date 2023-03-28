import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectCRM({ label, filtro,setState }) {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
    setState(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
      <InputLabel id="demo-select-small">{label}</InputLabel>
      <Select
        sx={{ border: "none", outline: "none" }}
        labelId="demo-select-small"
        id="demo-select-small"
        value={age}
        label={label}
        onChange={handleChange}
      >
     
          <>
            <MenuItem value={false}>Inactivos</MenuItem>
            <MenuItem value={true}>Activo</MenuItem>
          </>
  
          {/* {filtro === "fecha" && (
          <>
            <MenuItem value={10}>Desactivado</MenuItem>
            <MenuItem value={20}>Activos</MenuItem>
          </>
        )} */}
        
       
      </Select>
    </FormControl>
  );
}