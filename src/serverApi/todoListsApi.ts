import axios from "axios";
import {TodoType} from "../state/types";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '44b4ed13-0e89-4877-b270-a313fdbdbaba'
    }
}

export const todoListApi = {
    getTodoLists() {
        return axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists`, settings)
    },
    postTodoLists() {
        return axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists`,{title: 'React&Redux', filter: 'all'}, settings)

    },
    getTasks(todolistId: any) {
        return axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`)
    }
}