import React, {useCallback} from 'react';
import {changeTaskChecked} from "../../state/task-reducer/task-type";
import {Checkbox, IconButton} from "@mui/material";
import EditSpan from "../editSpan/EditSpan";
import {Delete} from "@mui/icons-material";

import { deleteTaskThunk, changeTaskTitle } from '../../state/task-reducer/thunks-task-reducer';
import {useAppDispatch} from "../../hooks/reduxHooks";

type TaskPropType = {
    id: string
    todoId: string
    isDone: boolean
    title: string
}

const Tasks = React.memo(({id, todoId, isDone, title}: TaskPropType) => {
    const dispatch = useAppDispatch()

    const checkedTaskHandler = () => {
        const action = changeTaskChecked(id, todoId)
        dispatch(action)
    }
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
            checked={isDone}
            onChange={checkedTaskHandler}
        />
        <EditSpan callback={changStatusEditSpan} title={title}/>
        <IconButton  onClick={removeTaskHandler}>
            <Delete/>
        </IconButton>
    </div>
});

export default Tasks;