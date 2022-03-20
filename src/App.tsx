import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {

    let tasks1: TaskType[] = [
        {id: 1, title: 'CSS&HTML', isDone: true},
        {id: 2, title: 'Javascript', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ]
    let tasks2: TaskType[] = [
        {id: 1, title: 'Matrix', isDone: true},
        {id: 2, title: 'StarWars', isDone: true},
        {id: 3, title: 'Jurassic Park', isDone: false}
    ]
  return (
    <div className="App">
        <Todolist title='What to learn?' tasks={tasks1}/>
        <Todolist title='What to buy?' tasks={tasks2}/>
    </div>
  );
}

export default App;
