import {todoReducer} from "./todo-reducer";
import {deleteTodoAction, addTodoAction, changeFilterTodoAction} from "./types";
import {TodoType} from "./types";
import {TaskStateType} from "../components/App/App";
import {taskReducer} from "./tasks-reducer";
const { v4: uuidv4 } = require('uuid');

test('testing add tasks and todos', () => {

    let todolistID1: string = uuidv4()
    let todolistID2: string = uuidv4()

    const todolists: Array<TodoType> = [
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
    const action = addTodoAction('completed')

    const endStateTodo = todoReducer(todolists, action)
    const endStateTasks = taskReducer(tasks, action)

    const keys = Object.keys(endStateTasks)
    const idFromTask = keys[2]
    const idFromTodo = endStateTodo[2].id

    expect(idFromTask).toBe(action.todoId)
    expect(idFromTodo).toBe(action.todoId)
    expect(keys.length).toBe(3)
    expect(endStateTodo.length).toBe(3)


    // expect(endState[0].id).toBe(todolistID2)

})

test('testing delete tasks and todos', () => {

    let todolistID1: string = uuidv4()
    let todolistID2: string = uuidv4()

    const todolists: Array<TodoType> = [
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
    const action = deleteTodoAction(todolistID1)

    const endStateTodo = todoReducer(todolists, action)
    const endStateTasks = taskReducer(tasks, action)


    expect(endStateTodo.length).toBe(1)
    expect(Object.keys(endStateTasks).length).toBe(1)



    // expect(endState[0].id).toBe(todolistID2)

})