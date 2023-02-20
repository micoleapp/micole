import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";

const Column = ({ column, tasks }) => {

  console.log(tasks)

  return (
    <div className="rounded-md bg-white shadow-md border w-[400px] h-[640px] flex flex-col">
      <div className="flex items-center h-[60px] bg-[#0061dd] rounded-t-md px-2 mb-2">
        <h1 className="text-2xl text-white">{column.title}</h1>
      </div>
      <Droppable droppableId={column.id}>
        {(droppableProvided, droppableSnapshot) => (
          <div
            className="flex p-4 flex-1 flex-col gap-2"
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    className={`flex ${draggableSnapshot.isDragging ? "opacity-50" : "opacity-100"} mb-1 h-[72px] items-center text-black shadow-lg bg-white border rounded-md p-2`}
                  >
                    <h2>{task.content}</h2>
                  </div>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
