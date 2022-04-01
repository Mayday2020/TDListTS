import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    todolistId: string
    title: string,
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string)=> void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string)=> void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string)=> void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}
export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter'){
            addTask()
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== ''){
            props.addTask(newTaskTitle.trim(), props.todolistId)
            setNewTaskTitle('')
        } else {
            setNewTaskTitle('')
            setError('Field is required')
        }
    }
    const onAllClickHandler = () =>  props.changeFilter('ALL', props.todolistId)
    const onActiveClickHandler = () =>  props.changeFilter('ACTIVE', props.todolistId)
    const onCompletedClickHandler = () =>  props.changeFilter('COMPLETED', props.todolistId)
    const [error, setError] = useState<string | null>(null)
    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }
    return (
        <div>
            <h3>{props.title} <button onClick={removeTodolist}>x</button></h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={addTask}>+</button>
                { error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map( t => {
                        const onRemoveHandler = () => props.removeTask(t.id, props.todolistId)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId)
                        }
                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onChangeStatusHandler}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'ALL' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'ACTIVE' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'COMPLETED' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Complete</button>
            </div>
        </div>
    )
}