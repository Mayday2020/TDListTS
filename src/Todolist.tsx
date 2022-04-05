import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string)=> void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}
export function Todolist(props: PropsType) {

    const onAllClickHandler = () =>  props.changeFilter('ALL', props.todolistId)
    const onActiveClickHandler = () =>  props.changeFilter('ACTIVE', props.todolistId)
    const onCompletedClickHandler = () =>  props.changeFilter('COMPLETED', props.todolistId)
    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.todolistId)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map( t => {
                        const onRemoveHandler = () => props.removeTask(t.id, props.todolistId)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.todolistId)
                        }
                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onChangeStatusHandler}/>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
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
