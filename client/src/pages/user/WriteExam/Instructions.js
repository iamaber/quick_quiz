import React from 'react';
import { useNavigate } from "react-router-dom";

function Instructions({ examData, setView, startTimer }) { // Added curly braces around examData
  return (
    <div className='flex flex-col items-center gap-5'>
      <ul className="flex flex-col gap-1">
        <h1 className="text-2xl underline text-center"> Instructions </h1> {/* Fixed "classname" to "className" */}
        <li>Exam must be completed in {examData.duration} seconds.</li>
        <li>Exam will be submitted automatically after {examData.duration} seconds.</li>
        <li>Once submitted, you cannot change your answers.</li>
        <li>Do not refresh the page.</li>
        <li>You can score up to <span className="font-bold">{examData.totalMarks}</span> marks.</li>
        <li>Passing marks for the exam is <span className="font-bold">{examData.passingMarks}</span>.</li>
      </ul>
      <button
        className="primary-outlined-btn"
        onClick={() => {
          startTimer();
          setView("questions");
        }}
      >
        Start Exam
      </button>
    </div>
  );
}

export default Instructions;
