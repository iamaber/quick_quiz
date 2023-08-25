import React, { useEffect } from 'react';
import { message, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllExams } from '../../../apicalls/exams';
import PageTitle from '../../../components/PageTitle';

function Home() {
  const [exams, setExams] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);

  const getExams = async () => {
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

  useEffect(() => {
    getExams();
  }, []);

  return (
    user && (
      <div>
        <PageTitle title={`Hi ${user.name}, Welcome to Quick Quiz`} />
        <div className="divider"></div>
        <Row gutter={[16, 16]}>
          {exams.map((exam) => (
            <Col key={exam._id} span={6}>
              <div className="card lg flex flex-col gap-1 p-2">
                <h1 className="text-2xl">{exam?.name}</h1>
                <h1 className="text-md">Category: {exam?.category}</h1>
                <h1 className="text-md">Total Marks: {exam?.totalMarks}</h1>
                <h1 className="text-md">Passing Marks: {exam?.passingMarks}</h1>
                <h1 className="text-md">Duration: {exam?.duration}</h1>
                <button
                  className="primary-outlined-btn"
                  onDoubleClick={() => navigate(`/user/write-exam/${exam?._id}`)}
                >
                  Start Exam
                </button>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    )
  );
}

export default Home;
