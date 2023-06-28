import React, { useCallback, useEffect} from 'react';
import {ArrayBtnInfoType, filterType} from "../../pages/todoLists/TodoLists";
import {Button} from "@mui/material";
import Tasks from "../tasks/Tasks";
import AddItemForm from "../addItemForm/AddItemForn";
import { Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import c from "./todoList.module.css";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {postTaskThunk, fetchTasksThunk} from "../../state/task-reducer/thunks-task-reducer";
import {RequestStatusType} from "../../state/app-reducer/app-reducer";
import {TaskStatus} from "../../serverApi/todoListsApi";

type ToDoPropsType = {
    todoId: string
    title: string
    filter: filterType
    changeFilter: (item: filterType, todolistId: string) => void
    btnInfo: ArrayBtnInfoType
    deleteTodos: (id: string) => void
    entityStatus: RequestStatusType
    changeStatus: (id: string, status: TaskStatus, todolistId: string) => void

}

const TodoList = React.memo((
    {
        todoId,
        title,
        filter,
        btnInfo,
        changeFilter,
        deleteTodos,
        entityStatus,
        changeStatus

    }: ToDoPropsType
) => {
    const tasks = useAppSelector(state => state.task[todoId])
    const dispatch = useAppDispatch()


    const addTaskHandler = useCallback((title: string) => {
        dispatch(postTaskThunk(title, todoId))
    }, [dispatch, todoId])

    let allTodolistTasks = tasks
    let tasksForToDoList = allTodolistTasks

    if (filter === 'active') {
        tasksForToDoList = allTodolistTasks.filter(tasks => tasks.status = TaskStatus.New)
    }

    if (filter === 'completed') {
        tasksForToDoList = allTodolistTasks.filter(tasks => tasks.status = TaskStatus.Completed)
    }


    const btnInfoList = btnInfo.map(item => {
        const changeFilterHandler = () => changeFilter(item.title, todoId)
        const btnClasses = filter === item.title ? c.btnActive : ''
        return <Button variant="contained"
                       className={btnClasses}
                       onClick={changeFilterHandler}
                       color={filter === item.title ? 'secondary' : 'primary'}
                       key={item.id}
                        >{item.title}
                </Button>
    })

    //delete task
    const deleteTodoHandler = () => deleteTodos(todoId)

    useEffect(()=> {
        dispatch(fetchTasksThunk(todoId))
    }, [])

    return (
        <div>
            <h3>{title}
                <IconButton disabled={entityStatus === "loading"} onClick={deleteTodoHandler}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm disabled={entityStatus === "loading"} addItem={addTaskHandler}/>
            <div>
                {   tasksForToDoList.length ?

                    tasksForToDoList.map((task) => {
                       return <Tasks
                           changeStatus={changeStatus}
                           task={task}
                           key={task.id}
                           id={task.id}
                           todoId={todoId}
                           title={task.title}/>
                    })
                    : <div>Нет тасок</div>

                }
            </div>
            <div>
                {btnInfoList}
            </div>
        </div>
    );
});

export default TodoList;