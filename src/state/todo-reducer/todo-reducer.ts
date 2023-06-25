import   {setTodolistsAC, TodoType, ActionTodoType} from "./todo-type";


const initialState: Array<TodoType> = []

export const todoReducer = (state: Array<TodoType> = initialState, action: ActionTodoType): Array<TodoType> => {
    switch (action.type) {
        case 'DELETE-TODO':
            return state.filter(item => item.id !== action.id)
        case 'ADD-TODO': {
            return [...state, {
                id: action.todoId,
                title: action.title,
                filter: 'all',
                entityStatus: "idle"
            }]
        }
        case 'CHANGE-FILTER-TODO': {
            return state.map(item => item.id === action.id ? {...item, filter: action.filter} : item)
        }
        case 'SET-TODOLISTS': {
            return action.todoLists.map(tl => ({
                ...tl,
                filter: 'all',
                entityStatus: "idle"
            }))
        }
        case 'CHANGE-ENTITY-TODO': {
            return state.map(todo => todo.id === action.id ? {...todo, entityStatus: action.entityStatus}: todo)
        }
        default:
            return state
    }
}

