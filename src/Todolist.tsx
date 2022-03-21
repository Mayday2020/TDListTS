import React from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
type PropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (id: number)=> void
    changeFilter: (value: FilterValuesType) => void
}
export function Todolist(props: PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map( t => {
                        return <li>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={()=> props.removeTask(t.id)}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={ ()=> props.changeFilter('ALL')}>All</button>
                <button onClick={ ()=> props.changeFilter('ACTIVE')}>Active</button>
                <button onClick={ ()=> props.changeFilter('COMPLETED')}>Complete</button>
            </div>
        </div>
    )
}