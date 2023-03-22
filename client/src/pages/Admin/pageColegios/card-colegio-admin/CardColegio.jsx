import { Button, Card, Typography } from "@mui/material";
import React from "react";
import HeadTable from "./headTable/HeadTable";

export default function CardColegio({ input, data }) {
  console.log(input, data);

  return (
    <>
      <HeadTable />
      <div>
        {data?.map((ele) => {
          let str = ele.direccion;

          console.log(str);
          let str2 = str?.slice(0, 60);
          console.log(str2);
          return (
            <>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  padding: "1rem",
                }}
              >
                {/* foto mas info */}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
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
                          textOverflow: "ellipsis",
                        }}
                      >
                        <div
                          style={{
                            maxWidth: "35vh",
                            display: "flex",
                            gap: "1vh",
                          }}
                        >
                          <b style={{ color: "#0061DF" }}>Dirección</b>
                          <p>{str2}</p>
                        </div>

                        {}
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
                      <div style={{ display: "flex", gap: "1vh" }}>
                        <b style={{ color: "#0061DF" }}>Teléfono</b>
                        <p>{ele.telefono}</p>
                      </div>
                    </Typography>
                  </div>
                </div>

                {/*  fecha */}
                <div style={{width:'50%'}}>
                  <p>12 de abril del 2023</p>
                </div>
                {/*  plan */}
                <div style={{width:'50%'}}>
                  <p>Premiun</p>
                </div >
                {/* boton */}
                <div style={{width:'50%'}}>
                  <Button variant="outlined">Desactivar</Button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
// ubicacion  telefono fecha de registro plan  y logo nombre de colegio
