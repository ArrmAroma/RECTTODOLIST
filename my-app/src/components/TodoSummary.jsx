import React from 'react';
import PropTypes from 'prop-types';

export default function TodoSummary({ todos }) {
  if (todos.length === 0) {
    return null;
  }

  const finishedCount = todos.filter((t) => t.finished).length;
  const pendingCount = todos.length - finishedCount;

  return (
    <div className="summary">
      ทั้งหมด {todos.length} รายการ | เสร็จแล้ว {finishedCount} รายการ | ยังไม่เสร็จ {pendingCount} รายการ
    </div>
  );
}

TodoSummary.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      date_start: PropTypes.string.isRequired,
      finished: PropTypes.bool.isRequired,
    })
  ).isRequired,
};
