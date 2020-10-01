import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import {v4 as generateId} from 'uuid';

const LOCAL_STORAGE_KEY = 'TODO_LIST';

function App() {

  const [todoList, setTodoList] = useState([]);
  const todoInput = useRef();

  useEffect(() => {
    setTodoList(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  function handleAddTodo() {
    const newTodos = [...todoList];
    newTodos.push({
      id: generateId(),
      name: todoInput.current.value,
      complete: false
    });
    setTodoList(newTodos);
    todoInput.current.value = null;
  }

  function handleClearCompleted() {
    setTodoList(todoList.filter(todo => !todo.complete));
  }

  function toggleTodoItem(id) {
    const newTodos = [...todoList];
    const targetTodo = newTodos.find(todo => todo.id === id);
    targetTodo.complete = !targetTodo.complete;
    setTodoList(newTodos);
  }

  function deleteTodoItem(id) {
    setTodoList(todoList.filter(todo => todo.id !== id));
  }

  return (
    <div className="todo-container">
      <div className="todo-header">TODO</div>
      <div className="complete-count"><b>{todoList.filter(todo => !todo.complete).length}</b> items left to complete</div>
      <TodoList todoList={todoList} toggleTodoItem={toggleTodoItem} deleteTodoItem={deleteTodoItem}/>

      <div className="todo-input-label">What needs to be done?</div>
      <input className="form-control" type="text" ref={todoInput}/>
      <div className="button-container">
        <button className="btn btn-primary" onClick={handleAddTodo}>Add Todo</button>
        <button className="btn btn-secondary" onClick={handleClearCompleted}>Clear Completed</button>
      </div>
    </div>
  );
}

export default App;
