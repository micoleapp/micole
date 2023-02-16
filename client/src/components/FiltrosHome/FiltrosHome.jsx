import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./FiltrosHome.module.css";
import Select from "@mui/material/Select";

import ListItemText from "@mui/material/ListItemText";
import Icon_filters_home from "./svg/Icon_filters_home";
import MockupDistritos from "../../MockupInfo/MockupDistritos";
import MockupGrados from "../../MockupInfo/MockupGrados";
import MockupCategoria from "../../MockupInfo/MockupCategoria";
import FormControl from "@mui/material/FormControl";
import { MenuItem } from "@mui/material";

import { InputLabel } from "@mui/material";
const Ingreso = ["2023", "2024", "2025"];
//className="text-xs"
function FiltrosHome() {
  const [OpenFilter, setOpenFilter] = useState(false);
  const toggleFilters = () => {
    setOpenFilter(!OpenFilter);
  };
  return (
    <div className={style.filtros_container}>
      <div className={style.container_select}>
        <div className={style.select}>
          <p>Distrito</p>
          <FormControl
            variant="standard"
            style={{ width: "150px" }}
            size="small"
          >
            <InputLabel
              className="text-xl"
              id="demo-simple-select-standard-label"
            >
              Selecciona un distrito
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-type-select-standard"
              // value={type}
              // onChange={handleChangeType}
              label="Tipo de colegio"
            >
              {MockupDistritos.map((type) => (
                <MenuItem value={type} key={type}>
                  <ListItemText primary={type} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={style.select}>
          <p>Grado</p>
          <FormControl
            variant="standard"
            style={{ width: "150px" }}
            size="small"
          >
            <InputLabel
              className="text-xl"
              id="demo-simple-select-standard-label"
            >
              Selecciona un grado
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-type-select-standard"
              // value={type}
              // onChange={handleChangeType}
              label="Tipo de colegio"
            >
              {MockupGrados.map((type) => (
                <MenuItem value={type} key={type}>
                  <ListItemText primary={type} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <select className="text-xs">
            <option>Selecciona un grado</option>
            {MockupGrados.map((distrito) => {
              return (
                <>
                  <option className={style.option}>{distrito}</option>
                </>
              );
            })}
          </select> */}
        </div>
        <div className={style.select}>
          <p>Ingreso</p>
          <FormControl
            variant="standard"
            style={{ width: "150px" }}
            size="small"
          >
            <InputLabel
              className="text-xl"
              id="demo-simple-select-standard-label"
            >
              Selecciona año de ingreso
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-type-select-standard"
              // value={type}
              // onChange={handleChangeType}
              label="Tipo de colegio"
            >
              {Ingreso.map((type) => (
                <MenuItem value={type} key={type}>
                  <ListItemText primary={type} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className={style.masFiltros} onClick={toggleFilters}>
          <Icon_filters_home />
          <p> Mas filtros</p>
        </div>

        <div className={style.container_button}>
          <Link to="/listschool?distrito=algundistrito">
            <button>Buscar</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FiltrosHome;
