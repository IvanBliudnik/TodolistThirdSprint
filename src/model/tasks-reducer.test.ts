import {
	addTaskAC,
	changeTaskStatusAC,
	changeTaskTitleAC,
	removeTaskAC,
	tasksReducer
} from './tasks-reducer'
import { TasksStateType } from '../App'

test('correct task should be deleted from correct array', () => {
	const startState: TasksStateType = {
		todolistId1: [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	}

	const endState = tasksReducer(startState, removeTaskAC({taskId:'2', todolistId: 'todolistId2'}))

	expect(endState).toEqual({
		todolistId1: [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '3', title: 'tea', isDone: false },
		],
	})
})
// toBe строгое сравнение
// toEqual сравнивает вложенные элементы (не строго)
test('correct task should be added to correct array', () => {
	const startState: TasksStateType = {
		todolistId1: [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	}

	const endState = tasksReducer(startState, addTaskAC({ title: 'juice', todolistId: 'todolistId2' }))

	expect(endState['todolistId1'].length).toBe(3) //для того что не испортили
	expect(endState['todolistId2'].length).toBe(4)
	expect(endState['todolistId2'][0].id).toBeDefined() //то что он есть
	expect(endState['todolistId2'][0].title).toBe('juice')
	expect(endState['todolistId2'][0].isDone).toBe(false)
})
test('status of specified task should be changed', () => {
	const startState: TasksStateType = {
		todolistId1: [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	}

	const endState = tasksReducer(
		startState,
		changeTaskStatusAC({
			taskId: '2', //вот эта id
			isDone: false, //мы хотим этим действием сделать для 2 id = false
			todolistId: 'todolistId2', //вот тут
		})
	)

	expect(endState['todolistId2'][1].isDone).toBe(false)
	expect(endState['todolistId1'][1].isDone).toBe(true)
})
test('title of specified task should be changed', () => {
	const startState: TasksStateType = {
		todolistId1: [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	}

	const endState = tasksReducer(
		startState,
		changeTaskTitleAC({
			taskId: '2', //вот эта id
			title: "new title", //мы хотим этим действием сделать для title = new title
			todolistId: 'todolistId2', //вот тут
		})
	)

	expect(endState['todolistId2'][1].title).toBe("new title")
	expect(endState['todolistId1'][1].isDone).toBe("JS")
})