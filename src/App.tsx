import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = 'ALL' | 'COMPLETED' | 'ACTIVE'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'Matrix', isDone: true},
        {id: 2, title: 'StarWars', isDone: true},
        {id: 3, title: 'Jurassic Park', isDone: false},
        {id: 4, title: 'Avengers', isDone: true}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('ALL')

    function removeTask(id: number){
        const filteredTasks = tasks.filter( t => t.id !== id)
        setTasks(filteredTasks)
        console.log(filteredTasks)
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
                  changeFilter={changeFilter}/>
    </div>
  );
}

export default App;
