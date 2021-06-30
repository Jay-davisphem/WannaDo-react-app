import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import { nanoid } from 'nanoid';
import usePrevious from './components/usePrevious';
const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

const App = (props) => {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');
  const listHeadingRef = useRef(null);

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
    // if this task has the same ID as the edited task
    if (id === task.id) {
      // use object spread to make a new object
      // whose `completed` prop has been inverted
      return {...task, completed: !task.completed}
    }
    return task;
  });
  setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const refTasks = tasks.filter(task => (task.id !== id));
    setTasks(refTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo id={task.id} name={task.name}
        completed={task.completed} key={task.id}
        togTaskComp={toggleTaskCompleted}
        delTask={deleteTask}
        editTask={editTask}/>
    ));
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton key={name} name={name}
    isPressed={name === filter}
    setFilter={setFilter}/>
  ));
  function addTask(name) {
    const newTask = {"id": `todo-${nanoid()}`, "name": name, "completed": false};
    setTasks([...tasks, newTask]);}


  let ttext;
  if(tasks.length)
    ttext = `${tasks.length === 1? '1 task':
      tasks.length + ' tasks'} remaining`
  else
    ttext = 'No Task';
  const prevTaskLength = usePrevious(tasks.length);
  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

/*  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem('tasks')) || tasks);
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('tasks', tasks || props.tasks);
  }, [tasks]);*/
  return (
    <div className="todoapp stack-large">
      <h1>WannaDo</h1>
      <Form onSubmit={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {ttext}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
};
export default App;
