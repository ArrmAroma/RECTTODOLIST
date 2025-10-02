import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faEdit } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export default function TodoForm({
  name,
  setName,
  date_start,
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAdd();
            }}
            placeholder="กรอกสิ่งที่ต้องทำ"
            className="form-input"
          />

        </div>

        <div className="form-group">
          <label className="form-label">วันที่เริ่ม</label>
          <input
            type="date"
            value={date_start} 
            onChange={(e) => setDateStart(e.target.value)}
            className="form-input"
          />

        </div>
      </div>

      <button
        onClick={handleAdd}
        className="btn-primary"
      >
        {editID ? (
          <><FontAwesomeIcon icon={faSave} /> บันทึกการแก้ไข</>
        ) : (
          <><FontAwesomeIcon icon={faPlus} /> เพิ่มรายการ</>
        )}
      </button>
    </div>
  );
}

TodoForm.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  date_start: PropTypes.string.isRequired,
  setDateStart: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  editID: PropTypes.string,
};
