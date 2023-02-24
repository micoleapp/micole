import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Column from "./Column";

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};

const initialData = {
  tasks: {
    1: { id: 1, content: "Test de prueba 1" },
    2: { id: 2, content: "Test de prueba 2" },
    3: { id: 3, content: "Test de prueba 3" },
    4: { id: 4, content: "Test de prueba 4" },
    5: { id: 5, content: "Test de prueba 5" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "TO-DO",
      taskIds: [1, 2, 3, 4],
    },
    "column-2": {
      id: "column-2",
      title: "IN-PROGRESS",
      taskIds: [5],
    },
    "column-3": {
      id: "column-3",
      title: "COMPLETED",
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3"],
};

function DragAndDrop() {
  const [state, setState] = React.useState(initialData);

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

    alert(`Moviste la tarea ${removed} desde ${sourceCol.title} hacia ${destinationCol.title}! \nTu tarea es ${JSON.stringify(state.tasks[removed])}`)
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col py-2 w-full min-h-screen gap-5 duration-300  mb-6 bg-[#f6f7f8] text-[#0061dd]">
        <div className="flex items-center flex-col my-5 ">
          <h1 className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-sky-300 to-blue-600">Drag and drop</h1>
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-5 px-4">
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
