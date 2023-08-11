import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import { message, Table } from "antd";
import { deleteExamById, getAllExams } from "../../../apicalls/exams";
import { useDispatch } from "react-redux";

function Exams() {
  const navigate = useNavigate();
  const [exams, setExams] = React.useState([]);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Exam Name",
      dataIndex: "name",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Total Marks",
      dataIndex: "totalMarks",
    },
    {
      title: "Passing Marks",
      dataIndex: "passingMarks",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <i
            className="ri-pencil-line"
            onClick={() => navigate(`/admin/exams/edit/${record._id}`)}
          ></i>
          <i
            className="ri-delete-bin-line"
            onClick={() => deleteExam(record._id)}
          ></i>
        </div>
      ),
    },
  ];

  const getExamsData = async () => {
    try {
      const response = await getAllExams();

      if (response.success) {
        setExams(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const deleteExam = async (examId) => {
    try {
      
      const response = await deleteExamById({
        examId,
      });

      if (response.success) {
        message.success(response.message);
        getExamsData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getExamsData();
  }, []);

  return (
    <div>
      <div className="flex justify-between mt-2 items-end">
        <PageTitle title="Exams" />

        <button
          className="primary-outlined-btn flex items-center"
          onClick={() => navigate("/admin/exams/add")}
        >
          <i className="ri-add-line"></i>
          Add Exam
        </button>
      </div>
      <div className="divider"></div>
      <Table columns={columns} dataSource={exams} />
    </div>
  );
}
export default Exams;
