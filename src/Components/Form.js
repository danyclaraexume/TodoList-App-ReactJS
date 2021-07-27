import React, { useState } from "react";
import './Form.css'

const Form = (props) => {
    const [name, setName] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim()) {
          return;
        }
        props.addTask(name);
        setName("");
      }

    const handleChange = (e) => {
        setName(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add new task</h2>
            <input 
                className="NewTaskInput"
                type="text"
                id="" 
                name=""
                autoComplete="off"
                value={name}
                onChange={handleChange}
                placeholder="New Task"
            />
            <button type="submit"  className="NewTaskButton">Add</button>
        </form>
    );
}

export default Form;