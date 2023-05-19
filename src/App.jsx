import React, { useState } from 'react';
import './App.css';

export default function AddTask() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [updateForm, setUpdateForm] = useState({
    id: null,
    taskname: '',
  });

  function handleNewTask(event) {
    setNewTask(event.target.value);
  }

  function addToList() {
    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      taskname: newTask,
      completed: false,
    };
    setTodoList([...todoList, task]);
    setNewTask('');
  }

  function deleteTask(task) {
    const newTodoList = todoList.filter((t) => t !== task);
    setTodoList(newTodoList);
  }

  function updateTask(task) {
    setUpdateForm({
      id: task.id,
      taskname: task.taskname,
    });
  }

  function handleUpdateForm(event) {
    const { name, value } = event.target;
    setUpdateForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const updatedTodoList = todoList.map((task) => {
      if (task.id === updateForm.id) {
        return {
          ...task,
          taskname: updateForm.taskname,
        };
      }
      return task;
    });
    setTodoList(updatedTodoList);
    setUpdateForm({
      id: null,
      taskname: '',
    });
  }

  function toggleCompletion(task) {
    const updatedTodoList = todoList.map((t) => {
      if (t === task) {
        return {
          ...t,
          completed: !t.completed,
        };
      }
      return t;
    });
    setTodoList(updatedTodoList);
  }

  return (
    <div className='container'>
      <h1>A TODO LIST APPLICATION</h1>
      <input type='text' value={newTask} onChange={handleNewTask} />
      <button onClick={addToList}>Add Task</button>
      <div>
        <p className='joj'>Below is the list that you have created</p>
        {todoList.map((task) => (
          <div
            className={`listing ${task.completed ? 'completed' : '' } goon`}
            key={task.id}          >
            <i>
              <p className='now'>{task.taskname}</p>
            </i>
            <button onClick={() => deleteTask(task)} className='btn'>Delete</button>
            <div>
              {updateForm.id === task.id ? (
                <form onSubmit={handleSubmit}>
                  <textarea
                    name='taskname'
                    value={updateForm.taskname}
                    onChange={handleUpdateForm}
                    cols='30'
                    rows='10'
                  ></textarea>
                  <button type='submit'>Update</button>
                </form>
              ) : (
                <>
                  <button onClick={() => updateTask(task)}  className='btn'>Edit</button>
                  <button onClick={() => toggleCompletion(task)}  className='btn'>
                    {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
