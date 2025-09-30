import React from 'react';

export default function TodoSummary({ todos }) {
  if (todos.length === 0) {
    return null;
  }

  const finishedCount = todos.filter((t) => t.finished).length;
  const pendingCount = todos.length - finishedCount;

  return (
    <div className="summary">
      ทั้งหมด {todos.length} รายการ | เสร็จแล้ว {finishedCount} รายการ | ยังไม่เสร็จ{' '}
      {pendingCount} รายการ
    </div>
  );
}