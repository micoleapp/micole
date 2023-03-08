import React, { useState ,useEffect} from "react";
import { getCita } from "../redux/CitasActions";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import Chip from "@mui/material/Chip";
import { useDispatch, useSelector } from "react-redux";

import ModalCita from "./Tabs/ModalCita/ModalCita";

const Column = ({ column, tasksArr }) => {
  const { citasAgendadas } = useSelector((state) => state.schools);
  const dispatch = useDispatch();


  const { grados } = useSelector((state) => state.schools);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const handleOpen = (event) => {
    setOpen(true);
    console.log(event.target.value);
  };
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    dispatch(getCita());
    
  }, [citasAgendadas.CitasActivas?.length]);

  return (
    <>
      <div className="rounded-md bg-white shadow-md border max-w-xs h-min w-full flex flex-col">
        <div className="flex items-center   bg-[#0061dd] justify-center text-center py-2 rounded-t-md px-2 h-20">
          <h1 className="text-sm text-white">{column.title}</h1>
        </div>
        <Droppable droppableId={column.id}>
          {(droppableProvided, droppableSnapshot) => (
            <div
              // className="flex p-4 flex-1 flex-col gap-2"

              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
              className="p-2"
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
                        <h2>{task.nombre}</h2>
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
                              return <Chip label={ele.nombre_grado} />;
                            }
                          })}
                        <Chip label={task.añoIngreso} />
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
