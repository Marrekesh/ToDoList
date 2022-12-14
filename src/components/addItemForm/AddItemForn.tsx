import React, {ChangeEvent, useMemo, useState} from 'react';
import {TextField, IconButton} from "@mui/material";

import c from './addItemForm.module.css'

type AddItemFormType = {
    addItem: (title: string) => void
}

const AddItemForm = React.memo(({addItem}: AddItemFormType) => {
    console.log('AddItemForm')
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const taskTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        setTitle(e.target.value)
    }

    const addTaskHandler = () => {
        if (title.trim().length === 0) {
            setError('Введите название!')
            return
        }
        addItem(title)
        setTitle('')
    }

    const errorInputClass = error ? c.errorInput : ''
    const errorBlock = error ? <div className={c.errorText}>{error}</div> : null

    return (
        <div className={c.addItemForm}>
            <div>
                <TextField
                    variant='outlined'
                    className={errorInputClass}
                    value={title}
                    onChange={taskTextHandler}
                    error={!!error}
                    helperText={error}
                />
                <IconButton color='primary' onClick={addTaskHandler}>+</IconButton>
            </div>
            {/*{errorBlock}*/}
        </div>
    );
});

export default AddItemForm;