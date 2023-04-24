import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "./List.module.css";
import NorthIcon from "@mui/icons-material/North";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import SouthIcon from "@mui/icons-material/South";
import SwalProp from "../../exports/SwalProp";
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
import { useSelector } from "react-redux";
import fechaFormat from "../../components/SwiperEventos/utils/fechaFormat";
export default function ListadeEspera() {
  const { grados } = useSelector((state) => state.schools);
  const [orderSelected, setOrderSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataFiltrada, setDataFiltrada] = useState([]);

  const handleChangeState = (event) => {
    let state = event.target.value;
    setOrderSelected(state);
    const ColegioId = localStorage.getItem("ColegioId");
    console.log(ColegioId);
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      // ?order=${state}
      axios
        .get(`/lista/colegio/${ColegioId}`)
        .then((res) => {
          setDataFiltrada(res.data);
          // const eventosPaginados = sliceIntoChunks(res.data, 10);
          // setDataFiltrada(eventosPaginados);
          // setIsLoading(false);
        })
        .catch((err) => {
          SwalProp({
            status: false,
            title: "Oops...",
            text: err.response.data.error,
          });
        });
    } catch (err) {
      SwalProp({
        status: false,
        title: "Oops...",
        text: err.message,
      });
    }
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const ColegioId = localStorage.getItem("id");
      console.log(ColegioId);
      // ?order=${state}
      axios
        .get(`/lista/colegio/${ColegioId}`)
        .then((res) => {
          setDataFiltrada(res.data);
          // const eventosPaginados = sliceIntoChunks(res.data, 10);
          // setDataFiltrada(eventosPaginados);
          // setIsLoading(false);
        })
        .catch((err) => {
          SwalProp({
            status: false,
            title: "Oops...",
            text: err.response.data.error,
          });
        });
    } catch (err) {
      SwalProp({
        status: false,
        title: "Oops...",
        text: err.message,
      });
    }
  }, []);

  console.log(dataFiltrada);
  return (
    <>
      <div>
        <Typography variant="h6" sx={{ color: "#0D263B" }}>
          Lista de Espera
        </Typography>
      </div>
      <div className={style.divFiltro}>
        <p
          style={{
            paddingTop: "1.1vh",
            fontSize: "1.6vh",
          }}
        >
          Ordenar por{" "}
        </p>
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 100 }}
          size="small"
        >
          <InputLabel id="demo-select-small">Fecha</InputLabel>

          <Select
            sx={{ border: "none", outline: "none", fontSize: "2vh" }}
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
      </div>
      <div className={style.layout}>
        {dataFiltrada.length === 0 ? (
          <div
            style={{
              width: "80%",
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
            <h1>Aun no hay familias en tu lista de espera.</h1>
          </div>
        ) : (
          <div style={{display:'flex', gap:'2vh',flexDirection:'column',width:'100%'}}>
            {dataFiltrada&&dataFiltrada?.map((ele) => {
              // const gradoDeEspera = grados?.find((g) => g.id === ele.GradoId);
              // console.log(gradoDeEspera);
              return (
                <>
                  <div className={style.container}>
                    <div
                      style={{
                        display: "flex",
                        gap: "1vh",
                        flexDirection: "row",
                        alignItems: "center",
                        fontSize: "1.8vh",
                      }}
                    >
                      <img
                        style={{ width: "5vh", height: "1h" }}
                        src="https://res.cloudinary.com/dj8p0rdxn/image/upload/v1676414550/xuj9waxpejcnongvhk9o.png"
                        alt=""
                      />
                    </div>

                    {/* <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    width: "100%",
                    justifyContent: "space-around",
                    flexDirection: "row",
                  }}
                > */}
                    <div className={style.divInfo}>
                      <div>
                        <div className={style.divNombreGrado}>
                          <p>{ele.User.nombre_responsable}</p>
                          <p>{ele.User.apellidos_responsable}</p>
                        </div>
                        <div className={style.divDatos}>
                          <div className={style.itemDiv}>
                            <p>
                              <b>Telefono</b>{" "}
                            </p>
                            <p>{ele.User.telefono}</p>
                          </div>
                          <div className={style.itemDiv}>
                            <p>
                              {" "}
                              <b>Grado </b>
                            </p>

                            <p>{ele.Grado.nombre_grado}</p>
                          </div>
                          <div className={style.itemDiv}>
                            <p>
                              {" "}
                              <b>Año </b>
                            </p>

                            <p>{ele.año}</p>
                          </div>


                          <div className={style.itemDiv}>
                            <p>
                              <b>Email</b>{" "}
                            </p>
                            <p>{ele.User.Auth.email}</p>
                          </div>
                          <div className={style.itemDiv}>
                            <p>
                              <b>Fecha</b>
                            </p>
                            <p>{fechaFormat(ele.createdAt)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* </div> */}
                </>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
