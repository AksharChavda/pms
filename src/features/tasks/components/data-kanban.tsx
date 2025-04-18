import { Task, TaskStatus } from "../types";
import React, { useEffect, useCallback, useState } from 'react'
import {
    DragDropContext,
    Draggable,
    Droppable,
    type DropResult
} from '@hello-pangea/dnd'
import { KanbanColumnHeader } from "./kanban-column-header";
import { KanbanCard } from "./kanban-card";

const boards: TaskStatus[] = [
    TaskStatus.BACKLOG,
    TaskStatus.TODO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.IN_REVIEW,
    TaskStatus.DONE
]

type TaskState = {
    [key in TaskStatus]: Task[]
}

interface DataKanbanProps {
    data: Task[]
    onChange: (tasks: {
        $id: string,
        status: TaskStatus,
        position: number
    }[]) => void;
}

export const DataKanban = ({
    data,
    onChange
}: DataKanbanProps) => {
    // Initialize state outside the render function
    const [tasks, setTasks] = useState<TaskState>({
        [TaskStatus.BACKLOG]: [],
        [TaskStatus.TODO]: [],
        [TaskStatus.IN_PROGRESS]: [],
        [TaskStatus.IN_REVIEW]: [],
        [TaskStatus.DONE]: []
    });

    // Use useEffect to update the state when props change
    useEffect(() => {
        const newTasks: TaskState = {
            [TaskStatus.BACKLOG]: [],
            [TaskStatus.TODO]: [],
            [TaskStatus.IN_PROGRESS]: [],
            [TaskStatus.IN_REVIEW]: [],
            [TaskStatus.DONE]: []
        }

        // Sort the tasks first
        const sortedData = [...data];
        
        // Distribute tasks to their respective columns
        sortedData.forEach((task) => {
            newTasks[task.status].push(task);
        });

        // Sort tasks by position within each column
        Object.keys(newTasks).forEach((status) => {
            newTasks[status as TaskStatus].sort((a, b) => a.position - b.position);
        });

        setTasks(newTasks);
    }, [data]);

    const onDragEnd = useCallback((result: DropResult) => {
        if (!result.destination) return;

        const { source, destination } = result;
        const sourceStatus = source.droppableId as TaskStatus;
        const destStatus = destination.droppableId as TaskStatus;

        setTasks((prevTasks) => {
            // Create deep copies to avoid mutation
            const newTasks = { ...prevTasks };
            
            // Make sure we're working with arrays
            const sourceColumn = [...newTasks[sourceStatus]];
            const destColumn = [...newTasks[destStatus]];
            
            // Move the task between columns
            const [movedTask] = sourceColumn.splice(source.index, 1);
            
            if (!movedTask) {
                console.error("No Task Found");
                return prevTasks;
            }

            // Update task status if it moved to a new column
            const updatedMovedTask = sourceStatus !== destStatus
                ? { ...movedTask, status: destStatus }
                : movedTask;

            // Insert at new position
            destColumn.splice(destination.index, 0, updatedMovedTask);
            
            // Update the state
            newTasks[sourceStatus] = sourceColumn;
            newTasks[destStatus] = destColumn;
            
            return newTasks;
        });

        // Calculate the updated positions separately
        let updatesPayload: { $id: string; status: TaskStatus; position: number }[] = [];
        
        setTasks((currentTasks) => {
            // Create new array to store updates
            updatesPayload = [];
            
            // Find the moved task
            const movedTaskId = result.draggableId;
            
            // Update positions for destination column
            currentTasks[destStatus].forEach((task, index) => {
                const newPosition = Math.min((index + 1) * 1000, 1_000_000);
                
                if (task.$id === movedTaskId) {
                    updatesPayload.push({
                        $id: task.$id,
                        status: destStatus,
                        position: newPosition
                    });
                } else if (task.position !== newPosition) {
                    updatesPayload.push({
                        $id: task.$id,
                        status: destStatus,
                        position: newPosition
                    });
                }
            });
            
          
            if (sourceStatus !== destStatus) {
                currentTasks[sourceStatus].forEach((task, index) => {
                    const newPosition = Math.min((index + 1) * 1000, 1_000_000);
                    if (task.position !== newPosition) {
                        updatesPayload.push({
                            $id: task.$id,
                            status: sourceStatus,
                            position: newPosition
                        });
                    }
                });
            }
            
            return currentTasks;
        });
        
        // Only call onChange if we have updates
        if (updatesPayload.length > 0) {
            onChange(updatesPayload);
        }
    }, [onChange]);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex overflow-x-auto">
                {boards.map((board) => {
                    return (
                        <div key={board} className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]">
                            <KanbanColumnHeader
                                board={board}
                                taskCount={tasks[board]?.length || 0}
                            />
                            <Droppable droppableId={board}>
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="min-h-[200px] py-1.5"
                                    >
                                        {tasks[board]?.map((task, index) => (
                                            <Draggable key={task.$id} draggableId={task.$id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                    >
                                                        <KanbanCard task={task} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    )
                })}
            </div>
        </DragDropContext>
    )
}