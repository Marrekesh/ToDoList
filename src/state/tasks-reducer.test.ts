import {todoReducer} from "./todo-reducer";
import {addTaskAction, changeTaskChecked, removeTaskAction, changeTitleTaskAction} from "./types";
import {useState} from "react";
import {TaskStateType} from "../components/App/App";
import {taskReducer} from "./tasks-reducer";

const { v4: uuidv4 } = require('uuid');
type TodoType = {
    id: string
    title: string
    filter: string
}

let todolistID1: string
let todolistID2: string

let tasks: TaskStateType


beforeEach(() => {
    todolistID1 = uuidv4()
    todolistID2 = uuidv4()

    tasks = {
        [todolistID1]: [
            {id: uuidv4(), title: 'HTML&CSS', isDone: true},
            {id: uuidv4(), title: 'JS', isDone: true},
            {id: uuidv4(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: uuidv4(), title: 'Rest API', isDone: true},
            {id: uuidv4(), title: 'GraphQL', isDone: false},
        ]
    }
})

test('testing add tasks', () => {


    const endState = taskReducer(tasks ,addTaskAction('Privet',todolistID1))

    expect(endState[todolistID1].length).toBe(4)
    expect(endState[todolistID2].length).toBe(2)
})

test('testing remove tasks', () => {

    let todolistID1: string = uuidv4()
    let todolistID2: string = uuidv4()

    let tasks: TaskStateType = {
        [todolistID1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ]
    }

    const endState = taskReducer(tasks , removeTaskAction('3',todolistID1))

    expect(endState[todolistID1].length).toBe(2)
    expect(endState[todolistID2].length).toBe(2)
})

test('testing change checked', () => {

    let todolistID1: string = uuidv4()
    let todolistID2: string = uuidv4()

    let tasks: TaskStateType = {
        [todolistID1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ]
    }

    const endState = taskReducer(tasks , changeTaskChecked('1', todolistID1))

    expect(endState[todolistID1][0].isDone).toBe(false)
    expect(endState[todolistID1][1].isDone).toBe(true)
})

test('testing change task title', () => {

    let todolistID1: string = uuidv4()
    let todolistID2: string = uuidv4()


    let todolists: Array<TodoType>  = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    let tasks: TaskStateType = {
        [todolistID1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ]
    }

    const endState = taskReducer(tasks , changeTitleTaskAction('Kakashka', '1', todolistID1))

    expect(endState[todolistID1][0].title).toBe('Kakashka')
    // expect(endState[todolistID1][1].isDone).toBe(true)
})