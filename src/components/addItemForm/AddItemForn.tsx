import React, {ChangeEvent, useState} from 'react';

import c from './addItemForm.module.css'

type AddItemFormType = {
    addItem: (title: string) => void
}

const AddItemForm = ({addItem}: AddItemFormType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const taskTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
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
                <input className={errorInputClass} value={title} onChange={taskTextHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            {errorBlock}
        </div>
    );
};

export default AddItemForm;