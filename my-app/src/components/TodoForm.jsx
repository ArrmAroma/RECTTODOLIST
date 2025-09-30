import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faEdit } from '@fortawesome/free-solid-svg-icons';

export default function TodoForm({
  name,
  setName,
  dateStart,
  setDateStart,
  handleAdd,
  editID,
}) {
  return (
    <div className="form-card">
      <h2 className="form-title">
        {editID ? (
          <><FontAwesomeIcon icon={faEdit} /> แก้ไขรายการ</>
        ) : (
          <><FontAwesomeIcon icon={faPlus} /> เพิ่มรายการใหม่</>
        )}
      </h2>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">สิ่งที่ต้องทำ</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="กรอกสิ่งที่ต้องทำ"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">วันที่เริ่ม</label>
          <input
            type="date"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      <button onClick={handleAdd} className="btn-primary">
        {editID ? (
          <><FontAwesomeIcon icon={faSave} /> บันทึกการแก้ไข</>
        ) : (
          <><FontAwesomeIcon icon={faPlus} /> เพิ่มรายการ</>
        )}
      </button>
    </div>
  );
}