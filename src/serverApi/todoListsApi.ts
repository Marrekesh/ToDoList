import axios from "axios";

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
    }

}