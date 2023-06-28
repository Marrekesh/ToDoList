import React, {ChangeEvent, useCallback} from 'react';
// import {changeTaskChecked} from "../../state/task-reducer/task-type";
import {Checkbox, IconButton} from "@mui/material";
import EditSpan from "../editSpan/EditSpan";
import {Delete} from "@mui/icons-material";

import {changeTaskTitle, deleteTaskThunk} from '../../state/task-reducer/thunks-task-reducer';
import {useAppDispatch} from "../../hooks/reduxHooks";
import {TaskStatus, TaskType} from "../../serverApi/todoListsApi";

type TaskPropType = {
    task: TaskType
    id: string
    todoId: string
    title: string
    changeStatus: (id: string, status: TaskStatus, todolistId: string) => void
}

const Tasks = React.memo(({id, todoId, task, title, changeStatus}: TaskPropType) => {
    const dispatch = useAppDispatch()



    const checkedTaskHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.checked
        changeStatus(id, value ? TaskStatus.Completed : TaskStatus.New  ,todoId)
    }, [task.id, todoId])


    const removeTaskHandler = () => {
        dispatch(deleteTaskThunk(id, todoId))
    }

    const changStatusEditSpan = useCallback((title: string) => {
        // const action = changeTitleTaskAction(title, id, todoId)
        // dispatch(action)
        dispatch(changeTaskTitle(title, id, todoId))
    },[dispatch, id])

    return <div key={id}>
        <Checkbox
            color='primary'
            checked={task.status === TaskStatus.Completed}
            onChange={checkedTaskHandler}
        />
        <EditSpan callback={changStatusEditSpan} title={task.title}/>
        <IconButton  onClick={removeTaskHandler}>
            <Delete/>
        </IconButton>
    </div>
});

export default Tasks;