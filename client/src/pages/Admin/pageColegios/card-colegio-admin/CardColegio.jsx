import { Button, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import HeadTable from "./headTable/HeadTable";
import style from "./cardColegio.module.css";
import Swal from "sweetalert2";
import axios from "axios";
import { getAllSchools } from "../../../../redux/SchoolsActions";
import LoadingButton from "@mui/lab/LoadingButton";
export default function CardColegio({ input, data, isLoading }) {
  const dispatch = useDispatch();
  console.log(input, data);
  const putActiveColegio = (id) => {
    console.log(id);
    try {
      axios
        .put(`/colegios/activo/${id}`, { isActive: true })
        .then((res) => {
          dispatch(getAllSchools());
          // Swal.fire("Exito", "Datos actualizados", "success");
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Algo salio mal",
            text: err,
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Algo salio mal",
        text: error.response,
      });
    }
  };
  const putDesactiveColegio = (id) => {
    console.log(id);
    try {
      axios
        .put(`/colegios/activo/${id}`, { isActive: false })
        .then((res) => {
          dispatch(getAllSchools());
          // Swal.fire("Exito", "Datos actualizados", "success");
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Algo salio mal",
            text: err.response.data.error,
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Algo salio mal",
        text: error.response,
      });
    }
  };

  function ActDesButton({ isActive, id }) {
    const [Toggle, setToggle] = useState(false);
 
    const toggleBtn = () => {
      setToggle(true);
      if (isActive === true) {
        putDesactiveColegio(id);
      } else {
        putActiveColegio(id);
      }
    };

    return (
      <>
        {isActive === true && (
          <div className={style.itemDiv}>
            {/* {isLoading && <div className={style.loader}></div>} */}
           
              <Button
                onClick={toggleBtn}
                variant="outlined"
                sx={{ fontFamily: "Poppins", fontSize: "1.4vh" }}
              >
                {Toggle === false ? "Desactivar" : "Activar"}
              </Button>
            
          </div>
        )}
        {isActive === false && (
          <div className={style.itemDiv}>
            {/* {isLoading && <div className={style.loader}></div>} */}
          
              <Button
                variant="outlined"
                sx={{ fontFamily: "Poppins", fontSize: "1.4vh" }}
                onClick={toggleBtn}
              >
                {Toggle === false ? "Activar" : "Desactivar"}
              </Button>
          
          </div>
        )}
      </>
    );
  }

  // useEffect(() => {}, [data]);

  return (
    <>
      <HeadTable />
      <div>
        {data &&
          data?.map((ele) => {
            let str = ele.direccion;

            console.log(str);
            let str2 = str?.slice(0, 60);
            console.log(str2);
            return (
              <>
                <div className={style.layout}>
                  {/* foto mas info */}
                  <div className={style.imgInfoDiv}>
                    <img
                      className="object-cover w-40 h-40"
                      src={ele.primera_imagen}
                    />

                    <div>
                      <Typography
                        sx={{
                          padding: "1vh",
                          color: "#0D263B",
                          fontWeight: "600",
                          fontSize: "2.4vh",
                        }}
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        {ele.nombre_colegio}
                      </Typography>
                      <Typography
                        sx={{
                          padding: "1vh",
                          color: "#0D263B",
                          fontWeight: "600",
                          fontSize: "1.5vh",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "1vh",
                          }}
                        >
                          <div className={style.divTypo}>
                            <b style={{ color: "#0061DF" }}>Dirección</b>
                            <p>{str2}</p>
                          </div>
                        </div>
                      </Typography>
                      <Typography
                        sx={{
                          padding: "1vh",
                          color: "#0D263B",
                          fontWeight: "600",
                          fontSize: "1.5vh",
                        }}
                      >
                        <div className={style.divTypo}>
                          <b style={{ color: "#0061DF" }}>Teléfono</b>
                          <p>{ele.telefono}</p>
                        </div>
                      </Typography>
                    </div>
                  </div>

                  {/*  fecha */}
                  <div className={style.itemDiv}>
                    <p>12 de abril del 2023</p>
                  </div>
                  {/*  plan */}
                  <div className={style.itemDiv}>
                    {/* //   Plan_Pago: { id: 1, nombre_plan_pago: 'Free' }, */}
                    <p> {ele.Plan_Pago.nombre_plan_pago}</p>
                  </div>
                  {/* boton */}

                  <ActDesButton
                    // onClick={() => {
                    //   putActiveColegio(ele.id);
                    // }}
                    isActive={ele.isActive}
                    id={ele.id}
                  />
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}
// ubicacion  telefono fecha de registro plan  y logo nombre de colegio
