import React, {useCallback} from 'react';
import {changeTaskChecked, changeTitleTaskAction, removeTaskAction} from "../../state/task-reducer/task-type";
import {Checkbox, IconButton} from "@mui/material";
import EditSpan from "../editSpan/EditSpan";
import {Delete} from "@mui/icons-material";
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
        const action = removeTaskAction(id, todoId)
        dispatch(action)
    }

    const changStatusEditSpan = useCallback((title: string) => {
        const action = changeTitleTaskAction(title, id, todoId)
        dispatch(action)
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