import React, { useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import SelectCRM from "./CardsDrgAndDrp/SelectsCRM/SelectsCRM";
import { useDispatch, useSelector } from "react-redux";

import { updateTask, updateColumn, getCita } from "../redux/CitasActions";

// const reorderColumnList = (sourceCol, startIndex, endIndex) => {
//   const newTaskIds = Array.from(sourceCol.taskIds);

//   const [removed] = newTaskIds.splice(startIndex, 1);

//   newTaskIds.splice(endIndex, 0, removed);
//   console.log(newTaskIds)
//   const newColumn = {
//     ...sourceCol,
//     taskIds: newTaskIds,
//   };

//   return newColumn;
// };

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newTaskIds = [...sourceCol.taskIds];

  const [removed] = newTaskIds.splice(startIndex, 1);

  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};

function DragAndDrop() {
   const { citasAgendadas } = useSelector((state) => state.schools);
  const { tasks, columns, columnOrder, success} = useSelector((state) => state.citas);
  const [state, setState] = React.useState({ tasks, columns, columnOrder });
  const dispatch = useDispatch();
 console.log(success)
 
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
    const sourceCol = columns[source.droppableId];

    const destinationCol = columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );
      const newState = {
        ...state,
        columns: {
          ...columns,
          [newColumn.id]: newColumn,
        },
      };
      dispatch(updateColumn(newState.columns));

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
    dispatch(updateColumn(newState.columns));
    // const taskId = tasks[removed]
    // const NuevoEstado = destinationCol.estado 
   dispatch(updateTask(tasks[removed],destinationCol.estado ));
    setState(newState);

    // alert(
    //   `Moviste la tarea ${removed} desde ${sourceCol.title} hacia ${
    //     destinationCol.title
    //   }! \nTu tarea es ${JSON.stringify(tasks[removed])}`
    // );

  };


useEffect(() => {
    dispatch(getCita());
    
  }, [citasAgendadas.CitasActivas?.length, success ]);


  return (
    <DragDropContext Scrollable onDragEnd={onDragEnd}>
      <div className="flex flex-col text-base py-2 w-full min-h-screen gap-5 duration-300  mb-6 bg-[#f6f7f8] text-[#0061dd]">
        <div className="flex items-center flex-col my-5 ">
          {/* aca van los select de año de ingreso y grado*/}
          {/* <div style={{ display: "flex", width: "100%" }}>
            <SelectCRM label="Grado" />
            <SelectCRM label="Año" />
          </div> */}
        </div>
        <div className="flex flex-col text-base lg:flex-row justify-between gap-5 px-4">
          {columnOrder?.map((columnId) => {
            const column = columns[columnId];

            const tasksArr = columns[columnId].taskIds.map(
              (taskIds) => tasks[taskIds]
            );

            return (
              <Column key={column.id} column={column} tasksArr={tasksArr} />
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
}

export default DragAndDrop;