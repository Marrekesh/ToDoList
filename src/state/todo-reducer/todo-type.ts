// import {SetStatusType, SetErrorType} from "../app-reducer/app-reducer";
// import {RequestStatusType} from "../app-reducer/app-reducer";
// import {TodoListType} from "./todo-reducer";
//
// const { v4: uuidv4 } = require('uuid');
//
// // export type TodoType = {
// //     id: string
// //     title: string
// //     filter: filterType
// //     entityStatus: RequestStatusType
// // }
//
//
//
//
//
// // export type ArrayTaskType = Array<SingleTaskType>
// // export type ArrayBtnInfoType = Array<BtnInfoType>
// export type filterType = 'all' | 'active' | 'completed'
//
//
// //ACTION TYPES
//
export type RemoveTodoActionType = {
    type: 'DELETE-TODO'
    id: string
}
//
// export type AddTodoActionType = {
//     type: 'ADD-TODO'
//     todoList: TodoListType
// }
//
// export type ChangeFilterActionType = {
//     type: 'CHANGE-FILTER-TODO'
//     id: string
//     filter: filterType
// }
//
//
// export type SetTodolistsActionType = {
//     type: 'SET-TODOLISTS'
//     todoLists: Array<TodoListType>
// }
//
// export type ChangeEntityStatusActionType = {
//     type: 'CHANGE-ENTITY-TODO'
//     id: string,
//     entityStatus: RequestStatusType
// }
//
// export type ClearDataType = {
//     type: 'CLEAR-DATA'
// }
//
// //ACTION TYPES
//
//
// export type ActionTodoType =
//      RemoveTodoActionType    |
//      AddTodoActionType       |
//      ChangeFilterActionType  |
//      SetTodolistsActionType  |
//      SetStatusType           |
//      ChangeEntityStatusActionType |
//      SetErrorType |
//      ClearDataType
//
//
// //ACTIONS CREATORS
// export const setTodolistsAC = (todoLists: Array<TodoListType>): SetTodolistsActionType => {
//     return {type: 'SET-TODOLISTS', todoLists}
// }
// export const deleteTodoAction = (id: string): RemoveTodoActionType => {
//     return {type: 'DELETE-TODO', id}
// }
//
// export const addTodoAction = (todoList: TodoListType): AddTodoActionType => {
//     return {type: 'ADD-TODO', todoList}
// }
//
// export const changeFilterTodoAction = (id: string, filter: filterType): ChangeFilterActionType => {
//     return {type: 'CHANGE-FILTER-TODO', id, filter}
// }
//
// export const changeEntityStatusAction = (id: string, entityStatus: RequestStatusType): ChangeEntityStatusActionType => {
//     return {type: "CHANGE-ENTITY-TODO", id, entityStatus}
// }
//
// export const clearDataAction = (): ClearDataType => {
//     return {type: 'CLEAR-DATA'}
// }

