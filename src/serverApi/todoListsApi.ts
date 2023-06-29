import axios, { AxiosResponse } from "axios";
import {LoginType} from "../pages/login/Login";
import {TodoListType} from "../state/todo-reducer/todo-reducer";
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
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    postTask(title: string, todolistId: string) {
        return instance.post(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(taskId: string, todoListId: string, ) {
        return instance.delete(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    changeTaskTitle(title: string, taskId: string, todoListId: string) {
        return instance.put(`todo-lists/${todoListId}/tasks/${taskId}`, {title})
    },
    updateTask(todoId: string, taskId: string, model: UpdateTaskModel) {
        return instance.put(`todo-lists/${todoId}/tasks/${taskId}`, model)
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



export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}


export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hight = 2
}

export enum TaskStatus {
    New = 0,
    InProgress = 1,
    Completed = 2
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatus
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type GetTasksResponseType = {
    totalCount: number
    error: null | string
    items: TaskType[]
}

export type UpdateTaskModel = {
    title: string
    description: string
    completed: boolean
    status: TaskStatus
    priority: TaskPriorities
    startDate: string
    deadline: string
}



