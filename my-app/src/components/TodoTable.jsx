import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrash,
  faCheckCircle,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

export default function TodoListTable({
  todos,
  handleEdit,
  handleDelete,
  toggleFinished,
}) {
  return (
    <div className="table-card">
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr className="table-header">
              <th>ID</th>
              <th>ชื่องาน</th>
              <th>วันที่เริ่ม</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {todos.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-state">
                  ยังไม่มีรายการ กรุณาเพิ่มรายการใหม่
                </td>
              </tr>
            ) : (
              todos.map((todo, index) => (
                <tr key={todo.id} className={todo.finished ? 'finished' : ''}>
                  <td>{index + 1}</td>
                  <td className={todo.finished ? 'text-strikethrough' : ''}>
                    {todo.name}
                  </td>
                  <td>
                    {new Date(todo.date_start).toLocaleDateString('th-TH')}
                  </td>
                  <td>
                    <span
                      onClick={() => toggleFinished(todo.id)}
                      className={`status-badge ${
                        todo.finished ? 'finished' : 'pending'
                      }`}
                    >
                      {todo.finished ? (
                        <>
                          <FontAwesomeIcon icon={faCheckCircle} /> เสร็จแล้ว
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faClock} /> ยังไม่เสร็จ
                        </>
                      )}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleEdit(todo)}
                        className="btn-icon btn-edit"
                        title="แก้ไข"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDelete(todo.id)}
                        className="btn-icon btn-delete"
                        title="ลบ"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}