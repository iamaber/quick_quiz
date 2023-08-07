import React from 'react'
import PageTitle from '../../../components/PageTitle';

function Exams() {
  return (
    <div>
      <div className="flex justify-between mt-2 items-end">
        <PageTitle title="Exams" />

        <button
          className="primary-outlined-btn flex items-center">
          <i className="ri-add-line"></i>
          Add Exam
        </button> 
      </div>
    </div>
  );
}

export default Exams;