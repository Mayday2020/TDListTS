import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'ALL' | 'COMPLETED' | 'ACTIVE'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'Matrix', isDone: true},
        {id: v1(), title: 'StarWars', isDone: true},
        {id: v1(), title: 'Jurassic Park', isDone: false},
        {id: v1(), title: 'Avengers', isDone: true}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('ALL')

    function removeTask(id: string){
        const filteredTasks = tasks.filter( t => t.id !== id)
        setTasks(filteredTasks)
        console.log(filteredTasks)
    }
    function addTask(title: string){
        let newTask = { id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }
    function changeFilter(value: FilterValuesType){
        setFilter(value)
    }
    let tasksForTodolist = tasks
    if (filter === 'COMPLETED'){
        tasksForTodolist = tasks.filter( t => t.isDone)
    }
    if (filter === 'ACTIVE'){
        tasksForTodolist = tasks.filter( t => !t.isDone)
    }
  return (
    <div className="App">
        <Todolist title='What to know?'
                  tasks={tasksForTodolist}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}/>
    </div>
  );
}

export default App;
