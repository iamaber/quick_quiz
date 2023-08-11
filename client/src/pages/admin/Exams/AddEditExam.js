import { Col, Divider, Form, Row, Select, Table, message } from "antd";
import React, { useEffect } from "react";
import { addExam, getExamById, editExamById } from "../../../apicalls/exams";
import PageTitle from "../../../components/PageTitle";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import AddEditQuestion from "./AddEditQuestion";
import { deleteQuestionById } from "../../../apicalls/exams";

function AddEditExam() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [examData, setExamData] = React.useState(null);
  const [showAddEditQuestionModal, setshowAddEditQuestionModal] =
    React.useState(false);
  const [selectedQuestion, setSelectedQuestion] = React.useState(null);
  const params = useParams();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;

      if (params.id) {
        response = await editExamById({
          ...values,
          examId: params.id,
        });
      } else {
        response = await addExam(values);
      }

      if (response.success) {
        message.success(response.message);
        navigate("/admin/exams");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getExamData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getExamById({
        examId: params.id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setExamData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (params.id) {
      getExamData();
    }
  }, []);

  const deleteQuestion = async (questionId) => {
    try {
      dispatch(ShowLoading());
      const response = await deleteQuestionById({
        questionId,
        examId: params.id,
      });
      dispatch(HideLoading());
      if (response.success) {
        getExamData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const questionsColumns = [
    {
      title: "Question",
      dataIndex: "name",
    },
    {
      title: "Options",
      dataIndex: "options",
      render: (text, record) => {
        return Object.keys(record.options).map((key) => {
          return (
            <div>
              {key}: {record.options[key]}
            </div>
          );
        });
      },
    },

    {
      title: "Correct Option",
      dataIndex: "correctOption",
      render: (text, record) => {
        return ` ${record.correctOption} : ${
          record.options[record.correctOption]
        }`;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        <div className="flex gap-2">
          <i
            classname="ri-pencil-line"
            onClick={() => {
              setSelectedQuestion(record);
              setshowAddEditQuestionModal(true);
            }}
          ></i>
          <i
            classname="ri-delete-bin-line"
            onClick={() => {
              deleteQuestion(record._id);
            }}
          ></i>
        </div>;
      },
    },
  ];
  return (
    <div>
      <PageTitle title={params.id ? "Edit Exam" : "Add Exam"} />

      <div className="divider"></div>

      {(examData || !params.id) && (
        <Form layout="vertical" onFinish={onFinish} initialValues={examData}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Exam Details" key="1">
              <Row gutter={[10, 10]}>
                <Col span={8}>
                  <Form.Item label="Exam Name" name="name">
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Exam Duration" name="duration">
                    <input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Category" name="category">
                    <select name="" id="">
                      <option value="">Select Category</option>
                      <option value="Javascript">Javascript</option>
                      <option value="React">React</option>
                      <option value="Node">Node</option>
                      <option value="MongoDB">MongoDB</option>
                    </select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Total Marks" name="totalMarks">
                    <input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Passing Marks" name="passingMarks">
                    <input type="number" />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex justify-end gap-2">
                <button
                  className="primary-outlined-btn"
                  type="button"
                  onClick={() => navigate("/admin/exams")}
                >
                  Cancel
                </button>
                <button className="primary-contained-btn" type="submit">
                  Save
                </button>
              </div>
            </TabPane>
            {params.id && (
              <TabPane tab="Questions" key="2">
                <div className="flex justify-end">
                  <button
                    className="primary-outlined-btn"
                    type="button"
                    onClick={() => setshowAddEditQuestionModal(true)}
                  >
                    Add Question
                  </button>
                </div>
                <Table
                  columns={questionsColumns}
                  dataSource={examData?.questions || []}
                />
              </TabPane>
            )}
          </Tabs>
        </Form>
      )}

      {showAddEditQuestionModal && (
        <AddEditQuestion
          setshowAddEditQuestionModal={showAddEditQuestionModal}
          examId={params.id}
          refreshData={getExamData}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
        />
      )}
    </div>
  );
}

export default AddEditExam;
