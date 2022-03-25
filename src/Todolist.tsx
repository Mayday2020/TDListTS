import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (id: string)=> void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string)=> void
    changeTaskStatus: (taskId: string, isDone: boolean)=> void
    filter: FilterValuesType
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
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setNewTaskTitle('')
            setError('Field is required')
        }
    }
    const onAllClickHandler = () =>  props.changeFilter('ALL')
    const onActiveClickHandler = () =>  props.changeFilter('ACTIVE')
    const onCompletedClickHandler = () =>  props.changeFilter('COMPLETED')
    const [error, setError] = useState<string | null>(null)
    return (
        <div>
            <h3>{props.title}</h3>
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
                        const onRemoveHandler = () => props.removeTask(t.id)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked)
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