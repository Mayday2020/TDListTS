import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = 'ALL' | 'COMPLETED' | 'ACTIVE'
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: TaskType[]
}
function App() {

    function removeTask(id: string, todolistId: string){
        let tasks = tasksObj[todolistId]
        const filteredTasks = tasks.filter( t => t.id !== id)
        tasksObj[todolistId] = filteredTasks;
        setTasksObj({...tasksObj})
    }
    function addTask(title: string, todolistId: string){
        let newTask = { id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [newTask, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasksObj({...tasksObj})
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string){
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if(task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }
    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string){
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if(task) {
            task.title = newTitle
            setTasksObj({...tasksObj})
        }
    }
    function changeFilter(value: FilterValuesType, todolistId: string){
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist){
            todolist.filter = value
            setTodolists([...todolists])
        }
    }
    function removeTodolist(todolistId: string){
        let filteredTodolists = todolists.filter((tl) => tl.id !== todolistId)
        setTodolists(filteredTodolists)
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }
    function changeTodolistTitle(todolistId: string, newTitle: string){
        let todolist = todolists.find(t => t.id === todolistId)
        if(todolist){
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to look?', filter: 'ACTIVE'},
        {id: todolistId2, title: 'What to learn?', filter: 'COMPLETED'}
    ])
    let [tasksObj, setTasksObj] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'Matrix', isDone: true},
            {id: v1(), title: 'StarWars', isDone: true},
            {id: v1(), title: 'Jurassic Park', isDone: false},
            {id: v1(), title: 'Avengers', isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'Javascript', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false}
        ]
    })
    function addTodolist(title: string){
        let todolist: TodolistType = {id: v1(), title: title, filter: 'ALL'}
        setTodolists([todolist, ...todolists])
        setTasksObj({...tasksObj, [todolist.id]: []})
    }

  return (
    <div className="App">
        <AddItemForm addItem={addTodolist}/>
        {
            todolists.map((tl) => {
                let tasksForTodolist = tasksObj[tl.id]
                if (tl.filter === 'COMPLETED'){
                    tasksForTodolist = tasksForTodolist.filter( t => t.isDone)
                }
                if (tl.filter === 'ACTIVE'){
                    tasksForTodolist = tasksForTodolist.filter( t => !t.isDone)
                }
                return <Todolist key={tl.id}
                          todolistId={tl.id}
                          title={tl.title}
                          tasks={tasksForTodolist}
                          removeTask={removeTask}
                          changeFilter={changeFilter}
                          addTask={addTask}
                          changeTaskStatus={changeStatus}
                          changeTaskTitle={changeTaskTitle}
                          filter={tl.filter}
                          removeTodolist={removeTodolist}
                          changeTodolistTitle={changeTodolistTitle}
                />
            })
        }
    </div>
  );
}

export default App;
