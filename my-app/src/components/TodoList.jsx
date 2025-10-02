import { useEffect, useState } from 'react';
import * as todoService from '../services/todoService';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableList } from '@fortawesome/free-solid-svg-icons';
import { createTodoSchema, updateTodoSchema, deleteTodoSchema, toggleFinishedSchema } from '../validators/todoValidator';

import TodoForm from './TodoForm';
import TodoTable from './TodoTable';
import TodoSummary from './TodoSummary';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState('');
  const [date_start, setDateStart] = useState('');
  const [editID, setEditingID] = useState(null);

  // โหลด todos ตอนเปิดหน้า
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const res = await todoService.getTodos();
      if (!res.data || !res.data.data) return;
      // res.data.data.todolist คือ array ของ todos
      setTodos(res.data.data.todolist || []);
    } catch (err) {
      console.error(err);
      alert('โหลดรายการล้มเหลว');
    }
  };


 const handleAdd = async () => {
  try {
    const data = { name, date_start };
    console.log("handleAdd called");
    console.log("name:", name);
    console.log("date_start:", date_start);
    console.log("editID:", editID);

    if (editID) {
      const { error } = updateTodoSchema.validate({ id: editID, ...data }, { abortEarly: true });
      if (error) return alert(error.details[0].message);

      await todoService.updateTodo(editID, data);
      setEditingID(null);
    } else {
      const { error } = createTodoSchema.validate(data, { abortEarly: true });
      if (error) return alert(error.details[0].message);

      await todoService.createTodo(data);
    }

    await loadTodos();
    setName('');
    setDateStart('');
  } catch (err) {
    console.error(err);
    alert('บันทึกล้มเหลว');
  }
};


  const handleEdit = (todo) => {
    setName(todo.name);
    setDateStart (todo.date_start.substring(0, 10)); // format YYYY-MM-DD
    setEditingID(todo._id);
  };

  const handleDelete = async (id) => {
    const { error } = deleteTodoSchema.validate({ id });
    if (error) return alert(error.details[0].message);

    if (window.confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) {
      try {
        await todoService.deleteTodo(id);
        setTodos(todos.filter(todo => todo._id !== id));
        if (editID === id) {
          setName("");
          setDateStart ("");
          setEditingID(null);
        }
      } catch (err) {
        console.error(err);
        alert("ลบรายการล้มเหลว");
      }
    }
  };

  const toggleFinished = async (id) => {
    const todo = todos.find(t => t._id === id);
    console.log(`id: ${id}, finished: ${!todo.finished}`);
    if (!todo) return;

    const { error } = toggleFinishedSchema.validate({ id, finished: !todo.finished });
    if (error) return alert(error.details[0].message);

    try {
      await todoService.toggleFinished(id, !todo.finished );
      setTodos(todos.map(t => t._id === id ? { ...t, finished: !t.finished } : t));
    } catch (err) {
      console.error(err);
      alert(" ");
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <h1 className="title"><FontAwesomeIcon icon={faTableList} /> MY TO DO LIST </h1>

        <TodoForm
          name={name}
          setName={setName}
          date_start={date_start}
          setDateStart ={setDateStart}
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
