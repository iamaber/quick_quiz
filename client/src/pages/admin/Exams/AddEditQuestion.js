import { Modal, Form, message } from "antd";
import React from "react";
import { addQuestionToExam, editQuestionById } from "../../../apicalls/exams";


function AddEditQuestion({ 
  showAddEditQuestionModal,
  setShowAddEditQuestionModal,
  refreshData,
  examId,
  selectedQuestion,
  setSelectedQuestion,
  
}) {
  
  const onFinish = async (values) => {
    try {
      
      const requiredPayload = {
        name: values.name,
        correctOption: values.correctOption,
        options: {
          A: values.A,
          B: values.B,
          C: values.C,
          D: values.D,
        },
        exam: examId,
      };

      let response;
      if (selectedQuestion) {
        response = await editQuestionById({
          ...requiredPayload,
          questionId: selectedQuestion._id,
        });
      } else {
        response = await addQuestionToExam(requiredPayload);
      }
      if (response.success) {
        message.success(response.message);
        refreshData();
        setShowAddEditQuestionModal(false);
      } else {
        message.error(response.message);
      }
      setSelectedQuestion(null);
      
    } catch (error) {
      
      message.error(error.message);
    }
  };
  return (
    <Modal
      title={selectedQuestion ? "Edit Question" : "Add Question"}
      open={showAddEditQuestionModal}
      footer={false}
      onCancel={() => {
        setShowAddEditQuestionModal(false);
        setSelectedQuestion(null);
      }}
    >
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          name: selectedQuestion?.name,
          A: selectedQuestion?.options?.A,
          B: selectedQuestion?.options?.B,
          C: selectedQuestion?.options?.C,
          D: selectedQuestion?.options?.D,
          correctOption: selectedQuestion?.correctOption,
        }}
      >
        <Form.Item name="name" label="Question">
          <input type="text" />
        </Form.Item>
        <Form.Item name="correctOption" label="Correct Option">
          <input type="text" />
        </Form.Item>

        <div className="flex gap-3">
          <Form.Item name="A" label="Option A">
            <input type="text" />
          </Form.Item>
          <Form.Item name="B" label="Option B">
            <input type="text" />
          </Form.Item>
        </div>
        <div className="flex gap-3">
          <Form.Item name="C" label="Option C">
            <input type="text" />
          </Form.Item>
          <Form.Item name="D" label="Option D">
            <input type="text" />
          </Form.Item> 
        </div>

        <div className="flex justify-end mt-2 gap-3">
          <button
            className="primary-outlined-btn"
            type="button"
            onClick={() => setShowAddEditQuestionModal(false)}
          >
            Cancel
          </button>
          <button className="primary-contained-btn">Save</button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddEditQuestion;
