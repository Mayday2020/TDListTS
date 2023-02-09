import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from './tasks-reducer'
import {TasksStateType, TodolistType} from '../App'
import {v1} from "uuid";
import {AddTodolistAC, ChangeTodolistTitleAC, todolistsReducer} from "./todolists-reducer";
import exp from "constants";

test('correct task should be deleted from correct array', () => {
    const startState : TasksStateType = {
        "todolistId1" : [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "REACT", isDone: false }
        ],
        "todolistId2" : [
            { id: "1", title: "bread", isDone: true },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    }

    const action = RemoveTaskAC('2', "todolistId2")
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every( t => t.id != '2')).toBeTruthy()
})

test('task should be added to correct array', () => {
    const startState : TasksStateType = {
        "todolistId1" : [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "REACT", isDone: false }
        ],
        "todolistId2" : [
            { id: "1", title: "bread", isDone: true },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    }

    const action = AddTaskAC('juce', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
    const startState : TasksStateType = {
        "todolistId1" : [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "REACT", isDone: false }
        ],
        "todolistId2" : [
            { id: "1", title: "bread", isDone: true },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    }

    const action = ChangeTaskStatusAC("2","todolistId2", false)
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].isDone).toBeFalsy()
    expect(endState["todolistId1"][1].isDone).toBeTruthy()
})

test('correct task should change its name', () => {
    const startState : TasksStateType = {
        "todolistId1" : [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "REACT", isDone: false }
        ],
        "todolistId2" : [
            { id: "1", title: "bread", isDone: true },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    }
    let newTaskTitle = "Typescript";

    const action = ChangeTaskTitleAC('todolistId1', '2', newTaskTitle);

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId1"][1].title).toBe(newTaskTitle)
    expect(endState["todolistId2"][1].title).toBe('milk')
});

test('add todolist', () => {
    const startState : TasksStateType = {
        "todolistId1" : [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "REACT", isDone: false }
        ],
        "todolistId2" : [
            { id: "1", title: "bread", isDone: true },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    }
    let newTodolistTitle = 'newTodolist'

    const action = AddTodolistAC(newTodolistTitle)
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey){
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})