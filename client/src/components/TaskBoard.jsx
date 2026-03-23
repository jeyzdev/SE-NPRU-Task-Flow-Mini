import { useEffect } from "react";
import TaskForm from "./TaskForm";
import { useTaskStore } from "../store/useTaskStore";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskItem from "./TaskItem";

export default function TaskBoard() {
  const { fetchTasks, updateTaskStatus, tasks, isLoadingTasks } =
    useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const columns = ["todo", "in_progress", "done"];
  const columnTitles = {
    todo: "To Do",
    in_progress: "In Progress",
    done: "Done",
  };

  const tasksByStatus = (status) => tasks.filter((t) => t.status === status);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    // ถ้าวางที่เดิมเป๊ะ ไม่ต้องทำอะไร
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // ย้ายข้าม Column
    if (destination.droppableId !== source.droppableId) {
      // draggableId ตรงนี้คือ String(task._id) ที่เราส่งไป
      updateTaskStatus(draggableId, destination.droppableId);
    }
  };

  if (isLoadingTasks) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="flex-1 p-6 overflow-x-auto min-h-screen">
      <h1 className="text-2xl font-bold mb-4">My Tasks Board</h1>
      <TaskForm />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 mt-6 items-start">
          {columns.map((col) => (
            <div key={col} className="w-80 flex flex-col">
              <h3 className="font-bold text-lg mb-4 flex justify-between px-2">
                {columnTitles[col]}
                <span className="badge badge-sm">
                  {tasksByStatus(col).length}
                </span>
              </h3>

              <Droppable droppableId={col}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`bg-base-200 rounded-xl p-4 min-h-[600px] transition-colors ${
                      snapshot.isDraggingOver ? "bg-base-300" : ""
                    }`}
                  >
                    {tasksByStatus(col).map((task, index) => (
                      <Draggable
                        draggableId={String(task._id)}
                        index={index}
                        key={String(task._id)}
                      >
                        {(provided, snapshot) => (
                          <TaskItem
                            task={task}
                            provided={provided}
                            snapshot={snapshot}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
