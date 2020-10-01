import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './TodoItem.css';

export default function TodoItem({todo, toggleTodoItem, deleteTodoItem}) {

    function handleTodoItemToggled() {
        toggleTodoItem(todo.id);
    }

    function handleDeleteTodoItem() {
        deleteTodoItem(todo.id);
    }

    return (
        <div className="todo-item">
            <label>
            <input type="checkbox" checked={todo.complete} onChange={handleTodoItemToggled} />
                {todo.name}
            </label>
            <button className="delete-button" onClick={handleDeleteTodoItem}><FontAwesomeIcon icon="trash" size="xs" /></button>
        </div>
    )
}
