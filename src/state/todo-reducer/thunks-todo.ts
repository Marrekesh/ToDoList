import { todoListApi } from "../../serverApi/todoListsApi"
import { Dispatch } from "redux"
import {appActions} from "../app-reducer/app-reducer";
import {todoActions, toDoThunk} from "./todo-reducer";






// export const postTodoThunk = (title: string) => (dispatch: Dispatch) => {
//     dispatch(appActions.setStatus({status: 'loading'}))
//     todoListApi.postTodoLists(title)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 console.log(res)
//                 dispatch(todoActions.addTodoList({todoList: res.data.data.item}))
//             } else if (res.data.messages.length) {
//                 dispatch(appActions.setError({error: res.data.messages[0]}))
//             }
//
//         })
//         .finally(() => dispatch(appActions.setStatus({status: 'successed'})))
// }

// export const deleteTodoThunk = (todolistId: string) => (dispatch: Dispatch) => {
//     dispatch(appActions.setStatus({status: 'loading'}))
//     dispatch(todoActions.changeEntityStatus({id: todolistId, entityStatus: "loading"}))
//     todoListApi.deleteTodo(todolistId)
//         .then(res => {
//             if (res.status === 200)
//                 dispatch(todoActions.removeTodoList({id: todolistId}))
//                 dispatch(appActions.setStatus({status: 'successed'}))
//                 dispatch(todoActions.changeEntityStatus({id: todolistId, entityStatus: "idle"}))
//         })
//         .catch(error => {
//             dispatch(appActions.setStatus({status: 'successed'}))
//             dispatch(todoActions.changeEntityStatus({id: todolistId, entityStatus: "idle"}))
//             dispatch(appActions.setError({error: error.message}))
//         })
//
// }

// export const fetchTodoListThunk = (dispatch: Dispatch) => {
//     dispatch(appActions.setStatus({status: 'loading'}))
//     todoListApi.getTodoLists()
//         .then(res => {
//             console.log(res)
//             dispatch(toDoThunk.fetchTodoList(arg: {todoLists: res.data}))
//             dispatch(appActions.setStatus({status: 'successed'}))
//         })
// }