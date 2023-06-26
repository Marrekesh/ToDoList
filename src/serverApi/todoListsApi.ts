import axios from "axios";
import {LoginType} from "../pages/login/Login";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '44b4ed13-0e89-4877-b270-a313fdbdbaba'
    }
}

export const authApi = {
    me() {
        return axios.get(`https://social-network.samuraijs.com/api/1.1/auth/me`, settings)
    },
    login(data: LoginType) {
        return axios.post(`https://social-network.samuraijs.com/api/1.1/auth/login`,data, settings)
    },
    logOut() {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/auth/login`, settings)
    }
}

export const todoListApi = {
    getTodoLists() {
        return axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists`, settings)
    },
    postTodoLists(title: string) {
        return axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists`,{title, filter: 'all'}, settings)
    },
    deleteTodo(todolistId: string) {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
    },
    getTasks(todolistId: any) {
        return axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, settings)
    },
    postTask(title: string, todolistId: string) {
        return axios.post(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
            {title},
            settings
            )
    },
    deleteTask(taskId: string, todoListId: string, ) {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}/tasks/${taskId}`, settings)
    },
    changeTaskTitle(title: string, taskId: string, todoListId: string) {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}/tasks/${taskId}`, {title}, settings)
    }
}