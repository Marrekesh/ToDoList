import {todoReducer} from "./todo-reducer";
import {deleteTodoAction, addTodoAction, changeFilterTodoAction, TodoType} from "./todo-type";
const { v4: uuidv4 } = require('uuid');

let todolistID1: string
let todolistID2: string
let todolists: Array<TodoType>

beforeEach(() => {
    todolistID1 = uuidv4()
    todolistID2 = uuidv4()

    todolists = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
})

test('testing delete todos', () => {


    const endState = todoReducer(todolists, deleteTodoAction(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)

})

test('testing add todos', () => {

    const endState = todoReducer(todolists, addTodoAction('What to fuck'))

    expect(endState.length).toBe(3)
    // expect(endState[0].id).toBe(todolistID2)

})

test('testing change filter for todos', () => {


    const endState = todoReducer(todolists, changeFilterTodoAction(todolistID1,'completed'))

    expect(endState[0].filter).toBe('completed')
    // expect(endState[0].id).toBe(todolistID2)

})