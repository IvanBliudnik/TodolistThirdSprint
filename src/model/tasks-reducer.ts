import {TasksStateType} from '../App'
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        //оборачиваем ...state в обьект потому что начальный state = {}
        case 'REMOVE_TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => action.payload.taskId !== task.id)
            }
        }//надо разобраться gpt
        case 'ADD_TASK': {
            return {
                ...state, [action.payload.todolistId]: [{id: v1(), title: action.payload.title, isDone: false}, ...state[action.payload.todolistId]]
            }}
        case 'CHANGE_TASK_STATUS': {
            const { taskId, todolistId, isDone } = action.payload
            return {
            ...state, [todolistId]: state[todolistId].map(t => t.id === taskId ? {...t, isDone} : t),
            }}
            //короткая запись
            // {
            //     ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t),
            // }}
        case 'CHANGE_TASK_TITLE_STATUS': {
            const { taskId, todolistId, title } = action.payload
            return {
                ...state, [todolistId]:state[todolistId].map(t => t.id===taskId? {...t, title:title} : t)}}
        case 'ADD_TODOLIST': {
            return {
                ...state, [action.payload.id]:[]} //создали todolistId3 = []
            }
        case 'REMOVE_TODOLIST': {
                const copyState = {...state} //создали копию state чтобы не мутировать старый state
                delete copyState[action.payload.id] //удалили из копии id
                return copyState //вернули новую копию обьекта
            }
        default:
            throw new Error("I don't understand this type")
    }
}

// Action creators
export const removeTaskAC = (payload: { taskId: string, todolistId: string }) => {
    return {type: 'REMOVE_TASK', payload} as const
}
export const addTaskAC = (payload: { title: string, todolistId: string }) => {
    return {type: 'ADD_TASK', payload} as const
}
export const changeTaskStatusAC = (payload: { taskId: string, todolistId: string, isDone: boolean }) => {
    return {type: 'CHANGE_TASK_STATUS', payload} as const
}
export const changeTaskTitleAC = (payload: { taskId: string, todolistId: string, title: string }) => {
    return {type: 'CHANGE_TASK_TITLE_STATUS', payload} as const
}
// export const addTodolistAC = ( title: string ) => {
//     return {type: 'ADD_TODOLIST', payload: {title, id:v1()}} as const
// } он тоже не нужен тут addTodolistAC в todolistReducer

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleACActionType = ReturnType<typeof changeTaskTitleAC>
// export type AddTodolistActionType = ReturnType<typeof addTodolistAC> берём из todolistReducer тип = AddTodolistActionType

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskActionType | ChangeTaskTitleACActionType | AddTodolistActionType | RemoveTodolistActionType