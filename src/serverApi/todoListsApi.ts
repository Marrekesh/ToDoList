import axios, { AxiosResponse } from "axios";
import {LoginType} from "../pages/login/Login";

// const settings = {
//     withCredentials: true,
//     headers: {
//         'API-KEY': '44b4ed13-0e89-4877-b270-a313fdbdbaba'
//     }
// }

const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '44b4ed13-0e89-4877-b270-a313fdbdbaba'
    }

})
//
export const authApi = {
    me() {
        return instance.get('auth/me');
    },
    login(data: LoginType) {
        return instance.post('auth/login',data)
    },
    logOut() {
        return instance.delete('auth/login')
    }
}

export const todoListApi = {
    getTodoLists() {
        return instance.get<TodoListType[]>(`todo-lists`)
    },
    postTodoLists(title: string)  {
        return instance.post<ResponseType<{ item: TodoListType }>>('todo-lists',{title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    getTasks(todolistId: any) {
        return instance.get(`todo-lists/${todolistId}/tasks`)
    },
    postTask(title: string, todolistId: string) {
        return instance.post(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(taskId: string, todoListId: string, ) {
        return instance.delete(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    changeTaskTitle(title: string, taskId: string, todoListId: string) {
        return instance.put(`todo-lists/${todoListId}/tasks/${taskId}`, {title})
    }
}

// export const authApi = {
//     me() {
//         return axios.get(`https://social-network.samuraijs.com/api/1.1/auth/me`, settings)
//     },
//     login(data: LoginType) {
//         return axios.post(`https://social-network.samuraijs.com/api/1.1/auth/login`,data, settings)
//     },
//     logOut() {
//         return axios.delete(`https://social-network.samuraijs.com/api/1.1/auth/login`, settings)
//     }
// }

// export const todoListApi = {
//     getTodoLists() {
//         return axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists`, settings)
//     },
//     postTodoLists(title: string) {
//         return axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists`,{title, filter: 'all'}, settings)
//     },
//     deleteTodo(todolistId: string) {
//         return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
//     },
//     getTasks(todolistId: any) {
//         return axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, settings)
//     },
//     postTask(title: string, todolistId: string) {
//         return axios.post(
//             `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
//             {title},
//             settings
//             )
//     },
//     deleteTask(taskId: string, todoListId: string, ) {
//         return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}/tasks/${taskId}`, settings)
//     },
//     changeTaskTitle(title: string, taskId: string, todoListId: string) {
//         return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}/tasks/${taskId}`, {title}, settings)
//     }
// }

export type TodoListType = {
    addedDate: string
    id: string
    order: number
    title: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}