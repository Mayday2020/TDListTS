import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';

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
                <IconButton onClick={removeTodolist}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map( t => {
                        const onRemoveHandler = () => props.removeTask(t.id, props.todolistId)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.todolistId)
                        }
                        return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <Checkbox checked={t.isDone} onChange={onChangeStatusHandler}/>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            <IconButton onClick={onRemoveHandler}>
                                <Delete />
                            </IconButton>
                        </div>
                    })
                }
            </div>
            <div style={{padding: '3px'}}>
                <Button variant={props.filter === 'ALL' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>All</Button>
                <Button color={'primary'} variant={props.filter === 'ACTIVE' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button color={"secondary"} variant={props.filter === 'COMPLETED' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Complete</Button>
            </div>
        </div>
    )
}
