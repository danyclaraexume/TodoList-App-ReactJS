import { useEffect, useRef, useState } from 'react'
import EditIcon from '../Images/edit.png'
import DeleteIcon from '../Images/delete.png'
import './Task.css'

const Task = (props) => {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState('');

    const editFieldRef = useRef(null);

    function handleChange(e) {
        setNewName(e.target.value);
    }

    return (
        <li>
            <div>
                <input 
                    id={props.id} 
                    type="checkbox"
                    value={newName || props.name}
                    onChange={handleChange}
                    ref={editFieldRef}
                />
                <label className="todo-label" htmlFor={props.id}>{props.name}</label>
                <button onClick={() => props.deleteTask(props.id)}><img src={EditIcon} alt="Edit"/></button>
                <button><img src={DeleteIcon} alt="delete"/></button>
            </div>
        </li>
    );
}

export default Task;