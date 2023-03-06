import React, { useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import SelectCRM from "./CardsDrgAndDrp/SelectsCRM/SelectsCRM";
import { useDispatch, useSelector } from "react-redux";
import { getCita } from "../redux/SchoolsActions";

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  const { citas } = useSelector((state) => state.schools);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};

const initialData = {
  // tasks: {
  //   1: {
  //     id: 1,
  //     celular: 3496213123,
  //     correo: "gorositopedro@gmail.com",
  //     date: "03/03/2023",
  //     modo: "Virtual",
  //     nombre: "Aylen",
  //     time: "20:14",
  //     añoIngreso: "2023",
  //     grado: "4ro Primaria",
  //   },
  //   2: {
  //     id: 2,
  //     celular: 3496213123,
  //     correo: "gorositopedro@gmail.com",
  //     date: "04/03/2023",
  //     modo: "Virtual",
  //     nombre: "Nano",
  //     time: "20:14",
  //     añoIngreso: "2023",
  //     grado: "1ro Primaria",
  //   },
  //   3: {
  //     id: 3,
  //     celular: 3496213123,
  //     correo: "gorositopedro@gmail.com",
  //     date: "12/03/2023",
  //     modo: "Virtual",
  //     nombre: "Enzo",
  //     time: "20:14",
  //     añoIngreso: "2023",
  //     grado: "2ro Primaria",
  //   },
  //   4: {
  //     id: 4,
  //     celular: 3496213123,
  //     correo: "gorositopedro@gmail.com",
  //     date: "20/03/2023",
  //     modo: "Virtual",
  //     nombre: "Maximo Gutierrez",
  //     time: "20:14",
  //     añoIngreso: "2023",
  //     grado: "3ro Primaria",
  //   },
  //   5: {
  //     id: 5,
  //     celular: 3496213123,
  //     correo: "gorositopedro@gmail.com",
  //     date: "02/03/2023",
  //     modo: "Virtual",
  //     nombre: "Roberto",
  //     time: "20:14",
  //     añoIngreso: "2023",
  //     grado: "4ro Primaria",
  //   },
  // },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Solicitud de cita",
      taskIds: [1, 2, 3, 4],
    },
    "column-2": {
      id: "column-2",
      title: "Cita realizada",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Aplicacion",
      taskIds: [],
    },
    "column-4": {
      id: "column-4",
      title: "Entrevista con el director",
      taskIds: [],
    },
    "column-5": {
      id: "column-5",
      title: "Vacante ofrecida",
      taskIds: [],
    },
    "column-6": {
      id: "column-6",
      title: "Vacante aceptada",
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: [
    "column-1",
    "column-2",
    "column-3",
    "column-4",
    ,
    "column-5",
    ,
    "column-6",
  ],
};

function DragAndDrop() {
  const [state, setState] = React.useState(initialData);
 

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCita());
  }, []);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    // If user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If the user drops within the same column but in a different positoin
    const sourceCol = state.columns[source.droppableId];
    const destinationCol = state.columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }

    // If the user moves from one column to another
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    setState(newState);

    alert(
      `Moviste la tarea ${removed} desde ${sourceCol.title} hacia ${
        destinationCol.title
      }! \nTu tarea es ${JSON.stringify(state.tasks[removed])}`
    );
  };

  return (
    <DragDropContext Scrollable onDragEnd={onDragEnd}>
      <div className="flex flex-col text-base py-2 w-full min-h-screen gap-5 duration-300  mb-6 bg-[#f6f7f8] text-[#0061dd]">
        <div className="flex items-center flex-col my-5 ">
          {/* aca van los select de año de ingreso y grado*/}
          <div style={{ display: "flex", width: "100%" }}>
            <SelectCRM label="Grado" />
            <SelectCRM label="Año" />
          </div>
        </div>
        <div className="flex flex-col text-base lg:flex-row justify-between gap-5 px-4">
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </div>
      </div>
    </DragDropContext>
  );
}

export default DragAndDrop;
