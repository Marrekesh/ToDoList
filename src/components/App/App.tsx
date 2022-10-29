import React from 'react';
import './App.css';
import {useState} from "react";
import TodoList from "../TodoList/TodoList";
const { v4: uuidv4 } = require('uuid');

type SingleTaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type BtnInfoType = {
    id: string,
    title: filterType
}

export type ArrayTaskType = Array<SingleTaskType>
export type ArrayBtnInfoType = Array<BtnInfoType>
export type filterType = 'all' | 'active' | 'completed'


function App() {

    const [tasks, setTasks] = useState<ArrayTaskType>([
        {id: uuidv4(), title: 'HTML & CSS', isDone: true},
        {id: uuidv4(), title: 'Javascript', isDone: false},
        {id: uuidv4(), title: 'ReactJS', isDone: false},
    ])

    const [filter, setFilter] = useState<filterType>('all')

    const [btnInfo, setBtnInfo] = useState<ArrayBtnInfoType>([
        {id: uuidv4(), title: 'all'},
        {id: uuidv4(), title: 'active'},
        {id: uuidv4(), title: 'completed'},
    ])

    const addTask = (title: string) => {
        const task = {
            id: uuidv4(),
            title,
            isDone: false
        }

        setTasks([...tasks, task])
    }

    const removeTask = (id: string) => {
        const updateTasks = tasks.filter(item => item.id !== id)
        setTasks(updateTasks)
    }

    const changeFilter = (item: filterType) => {
        setFilter(item)
    }

    const filteredTasks = (initialTasks: ArrayTaskType, filter: filterType): ArrayTaskType  => {
        switch (filter) {
            case 'all':
                return initialTasks
            case 'active':
               return initialTasks.filter(item => !item.isDone)
            case 'completed':
                return initialTasks.filter(item => item.isDone)
            default:
                return initialTasks
        }
    }

    const alreadyFilteredTask = filteredTasks(tasks, filter)


    return (
        <div className="App">
            <TodoList
                title={'What to learn'}
                tasks={alreadyFilteredTask}
                btnInfo={btnInfo}
                filter={filter}
                changeFilter={changeFilter}
                addTask={addTask}
                removeTasks={removeTask}
                />
        </div>
    );
}

export default App;
