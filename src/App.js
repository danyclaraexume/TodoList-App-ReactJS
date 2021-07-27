import React, { useState, useRef, useEffect } from "react";
import './App.css';
import Task from './Components/Task';
import Form from "./Components/Form";
import FilterButton from "./Components/FilterButton";


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

const App = (props) => {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map(task => {
      if (id === task.id)
        return {...task, completed: !task.completed}
      return task;
    });
    setTasks(updatedTasks);
  }


  const deleteTask = (id) => {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }


  const editTask = (id, newName) => {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) 
        return {...task, name: newName}
      return task;
    });
    setTasks(editedTaskList);
  }

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const addTask = (name) => {
    const newTask = { 
      id: "todo-" + Math.random() * (5 - 1000), 
      name: name, 
      completed: false 
    };
    
    setTasks([...tasks, newTask]);
  }

  
  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Task
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="App">
      <div className="form-wrapper">
        <Form addTask={addTask} />
      </div>
      <div className="filterList">
        <div className="filters">
          {filterList}
        </div>
        <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
          {headingText}
        </h2>
      </div>
      <ul>{taskList}</ul>
    </div>
  );
}

export default App;
