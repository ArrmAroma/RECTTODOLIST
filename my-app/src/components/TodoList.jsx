import { useState } from 'react';
import '../App.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableList } from '@fortawesome/free-solid-svg-icons';

import TodoForm from './TodoForm';
import TodoTable from './TodoTable';
import TodoSummary from './TodoSummary';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [editID, setEditingID] = useState(null);

  const handleAdd = () => {
    if (!name || !dateStart) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    if (editID !== null) {
      setTodos(todos.map(todo =>
        todo.id === editID
          ? { ...todo, name, date_start: dateStart }
          : todo
      ));
      setEditingID(null);
    } else {
      const newTodo = {
        id: Date.now(),
        name,
        date_start: dateStart,
        finished: false
      };
      setTodos([...todos, newTodo]);
    }

    setName('');
    setDateStart('');
  };

  const handleEdit = (todo) => {
    setName(todo.name);
    setDateStart(todo.date_start);
    setEditingID(todo.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('คุณต้องการลบรายการนี้ใช่หรือไม่?')) {
      setTodos(todos.filter(todo => todo.id !== id));
      if (editID === id) {
        setName('');
        setDateStart('');
        setEditingID(null);
      }
    }
  };

  const toggleFinished = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, finished: !todo.finished } : todo
    ));
  };

  return (
    <div className="container">
      <div className="wrapper">
        <h1 className="title"><FontAwesomeIcon icon={faTableList} /> MY TO DO LIST </h1>

        <TodoForm
          name={name}
          setName={setName}
          dateStart={dateStart}
          setDateStart={setDateStart}
          handleAdd={handleAdd}
          editID={editID}
        />

        <TodoTable
          todos={todos}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          toggleFinished={toggleFinished}
        />

        <TodoSummary todos={todos} />
      </div>
    </div>
  );
}