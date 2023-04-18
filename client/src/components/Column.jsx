import React, { useState, useEffect } from "react";
import { getCita } from "../redux/CitasActions";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import Chip from "@mui/material/Chip";
import { useDispatch, useSelector } from "react-redux";
const yearNow = new Date().getFullYear();
import ModalCita from "./Tabs/ModalCita/ModalCita";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
const Column = ({ column, tasksArr }) => {
  const { success} = useSelector((state) => state.citas);
  const dispatch = useDispatch();

  const { grados } = useSelector((state) => state.schools);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const handleOpen = (event) => {
    setOpen(true);
    console.log(event.target.value);
  };
  const handleClose = () => setOpen(false);
  console.log(tasksArr);
  // useEffect(() => {}, [success]);
  const añoActual = yearNow;
  const añoSig = yearNow + 1;
  const añoDsdelSig = yearNow + 2;
  // className="  max-h-12 overflow-y-scroll " 
  return (
    <>
      <div className="rounded-md  bg-[#FFFF] bg-[#FFFF]shadow-md border  max-w-xs min-h-20 min-w-max w-full flex flex-col">
        <div className="flex items-center gap-3  bg-[#0061dd]  justify-center text-center rounded-t-md py-3">
          <h1 className="text-[1.4vh] text-white">{column.title}</h1>
          <Badge badgeContent={column.taskIds.length} sx={{background:'#0061dd', color:'#fff'}} >
            {/* <MailIcon color="action" /> */}
          </Badge>
        </div>
        <Droppable droppableId={column.id}>
          {(droppableProvided, droppableSnapshot) => (
            <div
              className="flex p-2 flex-1 flex-col gap-2 max-h-96 overflow-y-scroll "

              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
              // className="p-2"
            >
              {tasksArr.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={`${task.id}`}
                  index={index}
                >
                  {(draggableProvided, draggableSnapshot) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      className={`flex ${
                        draggableSnapshot.isDragging
                          ? "opacity-50"
                          : "opacity-100"
                      } mb-1 h-[110px] items-center flex-col justify-evenly text-black shadow-lg bg-white border rounded-md p-2`}
                    >
                      {" "}
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <h2 className="text-[1.7vh]">{task.nombre}</h2>
                        <div>
                          <Chip
                            onClick={() => {
                              setOpen(true);
                              setValue(task);
                            }}
                            value={`${task.id}`}
                            label="+"
                            size="small"
                            style={{
                              backgroundColor: "#4A91F9",
                              color: "#FFF",
                            }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                      >
                        {grados &&
                          grados.map((ele) => {
                            if (ele.id === task.grado) {
                              return (
                                <Chip
                                  sx={{
                                    fontSize: "1.3vh",
                                    color: "#000",
                                    fontWeight: "500",
                                    width: "90%",
                                    height: "50%",
                                    fontFamily: "Poppins",
                                  }}
                                  label={ele.nombre_grado}
                                />
                              );
                            }
                          })}
                        {task.añoIngreso === añoActual.toString() ? (
                          <Chip
                            label={task.añoIngreso}
                            small
                            sx={{
                              fontSize: "1.3vh",
                              backgroundColor: "#F44428",
                              color: "#ffff",
                              fontWeight: "600",
                              width: "50%",
                              height: "50%",
                              fontFamily: "Poppins",
                            }}
                          />
                        ) : task.añoIngreso === añoSig.toString() ? (
                          <Chip
                            label={task.añoIngreso}
                            sx={{
                              fontSize: "1.3vh",
                              backgroundColor: "#FBBC04",
                              color: "#ffff",
                              fontWeight: "600",
                              width: "50%",
                              height: "50%",
                              fontFamily: "Poppins",
                            }}
                          />
                        ) : (
                          <Chip
                            label={task.añoIngreso}
                            sx={{
                              fontSize: "1.3vh",
                              backgroundColor: "#48C740",
                              color: "#ffff",
                              fontWeight: "600",
                              width: "50%",
                              height: "50%",
                              fontFamily: "Poppins",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {open && (
                <div>
                  <ModalCita
                    handleClose={handleClose}
                    open={open}
                    task={value}
                  />
                </div>
              )}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
};

export default Column;
