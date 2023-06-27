import   {setTodolistsAC, ActionTodoType, TodoListDomainType} from "./todo-type";


const initialState: Array<TodoListDomainType> = []

export const todoReducer = (state: Array<TodoListDomainType> = initialState, action: ActionTodoType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'DELETE-TODO':
            return state.filter(item => item.id !== action.id)
        case 'ADD-TODO': {
            // return [...state,
            //     {id: action.todoId, title: action.title, filter: 'all', entityStatus: "idle", addedDate: 'kj', order: 2}
            // ]
            return [{...action.todoList, filter: 'all', entityStatus: 'idle'}, ...state]
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
        case "CLEAR-DATA":
            return []
        default:
            return state
    }
}

