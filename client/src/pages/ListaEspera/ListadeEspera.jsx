import { Typography } from "@mui/material";
import React, { useState } from "react";
import style from "./List.module.css";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import Swal from "sweetalert2";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import sliceIntoChunks from "../../components/CardsCitas/Paginacion/utils/SliceCitas";
import axios from "axios";
export default function ListadeEspera() {
  const [orderSelected, setOrderSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataFiltrada, setDataFiltrada] = useState([]);
  const handleChangeState = (event) => {
    let state = event.target.value;
    setOrderSelected(state);
  
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const ColegioId = localStorage.getItem('ColegioId')
      // ?order=${state}
      axios
        .get(`/listaDeEspera/colegio/${ColegioId}`)
        .then((res) => {
          setDataFiltrada(res.data);
          // const eventosPaginados = sliceIntoChunks(res.data, 10);
          // setDataFiltrada(eventosPaginados);
          // setIsLoading(false);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.error,
          });
        });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    }
  };

  console.log(dataFiltrada)
  return (
    <>
      <div>
        <Typography variant="h6" sx={{ color: "#0D263B" }}>
          Lista de Espera
        </Typography>
      </div>
     
      <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 100 }}
            size="small"
          >
            <InputLabel id="demo-select-small">Fecha</InputLabel>

            <Select
              sx={{ border: "none", outline: "none"  , fontSize:'2vh'}}
              labelId="demo-select-small"
              id="demo-select-small"
              // value={orderSelected}
              label={"Fecha"}
              onChange={handleChangeState}

            >
              <MenuItem value="ASC">
                {" "}
                Fecha <NorthIcon sx={{ width: "2vh" }} />{" "}
              </MenuItem>
              <MenuItem value="DESC">
                {" "}
                Fecha <SouthIcon sx={{ width: "2vh" }} />{" "}
              </MenuItem>
            </Select>
          </FormControl>
     
     
      <div className={style.container}>
        <div
          style={{
            display: "flex",
            gap: "5px",
            flexDirection: "column",
            width: "100%",
            fontSize: "1.8vh",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexDirection: "row",
              alignItems: "center",
              fontSize: "1.8vh",
            }}
          >
            <img
              style={{ width: "50px", height: "50px" }}
              src="https://res.cloudinary.com/dj8p0rdxn/image/upload/v1676414550/xuj9waxpejcnongvhk9o.png"
              alt=""
            />
            <div>
              <div className={style.divNombreGrado}>
                <p>Nombre</p>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "5px",
            width: "100%",
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          <div className={style.itemDiv}>
            <p>
              <b>Telefono</b>{" "}
            </p>
            <p>31234535</p>
          </div>
          <div className={style.itemDiv}>
            <p>
              {" "}
              <b>Grado </b>
            </p>
            <p>1ro-Primaria</p>
          </div>
          <div className={style.itemDiv}>
            <p>
              <b>Email</b>{" "}
            </p>
            <p>sad@gmaiil.com</p>
          </div>
          <div className={style.itemDiv}>
            <p>
              <b>Fecha</b>
            </p>
            <p>22 de abril del 2023</p>
          </div>
        </div>
      </div>
    </>
  );
}
