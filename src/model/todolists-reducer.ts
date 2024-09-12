import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
	{id: todolistID1, title: 'What to learn', filter: 'all'},
	{id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType) => {
	switch (action.type) {
		case 'REMOVE_TODOLIST': {
			return state.filter(tl => tl.id !== action.payload.id)
		}

		case 'ADD_TODOLIST': {
			const newTodolist: TodolistType = {id: action.payload.id, title: action.payload.title, filter: 'all'}
			return [...state, newTodolist]
		}

		case 'CHANGE-TODOLIST-TITLE': {
			return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
		}

		case 'CHANGE-TODOLIST-FILTER': {
			return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
		}

		default:
			throw new Error("I don't understand this type")
	}
}

// Action creators
export const removeTodolistAC = (todolistId: string) => {
	return {type: 'REMOVE_TODOLIST', payload: {id: todolistId}} as const
}

export const addTodolistAC = (title: string) => {
	return {type: 'ADD_TODOLIST', payload: {title, id: v1()}} as const //тут тоже прописываем добавление id
};

export const changeTodolistTitleAC = (id: string, title: string) => {
	return {type: 'CHANGE-TODOLIST-TITLE', payload: {id, title}} as const
};

export const changeTodolistFilter = (id: string, filter: FilterValuesType) => {
	return {type: 'CHANGE-TODOLIST-FILTER', payload: {id, filter}} as const //добавили id для генерирования
}

// Actions types
//старая версия
// export type RemoveTodolistActionType = {
// 	type: 'REMOVE-TODOLIST';
// 	payload: {
// 		id: string;
// 	}
// }
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC> //{type: 'REMOVE-TODOLIST', payload: {id: todolistId}} as const
//старая версия
// export type AddTodolistActionType = {
// 	type: 'ADD_TODOLIST';
// 	payload: {
// 		title: string;
// 	}
// };
export type AddTodolistActionType = ReturnType<typeof addTodolistAC> //{type: 'ADD-TODOLIST', payload: {title}} as const
//старая версия
// export type ChangeTodolistTitleActionType = {
// 	type: 'CHANGE-TODOLIST-TITLE';
// 	payload: {
// 		id: string;
// 		title: string;
// 	}
// };
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC> //{type: 'CHANGE-TODOLIST-TITLE', payload: {id, title}} as const
//старая версия
// export type ChangeTodolistFilterActionType = {
// 	type: 'CHANGE-TODOLIST-FILTER';
// 	payload: {
// 		id: string;
// 		filter: FilterValuesType;
// 	}
// };
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilter> //{type: 'CHANGE-TODOLIST-FILTER', payload: {id, filter}} as const

type ActionsType = RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType

