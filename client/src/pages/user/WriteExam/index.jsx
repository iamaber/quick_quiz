import React, { useEffect, useState } from "react";
import { getExamById } from "../../../apicalls/exams";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import Instructions from "./Instructions";
import { useSelector } from 'react-redux';
import { addReport } from "../../../apicalls/reports";







function WriteExam() {
  const [examData, setExamData] = React.useState(null);
  const [questions, setQuestions] = React.useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = React.useState(0);
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const [result, setResult] = React.useState({});
  const [secondsLeft, setSecondsLeft] = useState(0); // Corrected default value
  const params = useParams();
  const navigate = useNavigate();
  const [view, setView] = useState("Instructions");
  const [timeUp, setTimeUp] = useState(false); // Corrected boolean value
  const [intervalId, setIntervalId] = useState(null);
  const {user} = useSelector (state => state.user);
  
 

  const getExamData = async () => {
    try {
      const response = await getExamById({
        examId: params.id,
      });

      if (response.success) {
        setQuestions(response.data.questions);
        setExamData(response.data);
        setSecondsLeft(response.data.duration);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const calculateResult = async() => {
    try {let correctAnswers = [];
      let wrongAnswers = [];
  
      questions.forEach((question, index) => {
        if (question.correctOption === selectedOptions[index]) {
          correctAnswers.push(question);
        } else {
          wrongAnswers.push(question);
        }
      });
  
      let verdict = "Pass";
      if (correctAnswers.length < examData.passingMarks) {
        verdict = "Fail";
      }
      const tempResult= (
        {
          correctAnswers,
          wrongAnswers,
          verdict,
        }
      )
  
      setResult();
      const response =await addReport({
  
        exam: params.id,
        result : tempResult,
        user : user._id,
  
      });
      if (response.success){
        setView("result");
      }else{
        MessageEvent.error(response.message);
      }
  
      setView("result");
      
    } catch (error) {
      message.error(error.message);
      
    }
  };

  const startTimer = () => {
    const totalSeconds = examData.duration;
    const intervalId = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds = totalSeconds - 1; // Corrected variable name to totalSeconds
        setSecondsLeft(totalSeconds);
      } else {
        setTimeUp(true); // Corrected boolean value to true
      }
    }, 1000);
    setIntervalId(intervalId);
  };

  useEffect(() => {
    if (timeUp && view === "questions") {
      clearInterval(intervalId);
      calculateResult();
    }
  }, [timeUp]);

  useEffect(() => {
    if (params.id) {
      getExamData();
    }
  }, []);

  return (
    examData && (
      <div className="mt-2">
        <div className="divider"></div>
        <h1 className="text-center"></h1>
        <div className="divider"></div>
        {view === "Instructions" && <Instructions examData={examData} setView={setView} startTimer={startTimer} />}
        {view === "questions" && (
          <div className="flex flex-col gap-2">
            <div className="flex jusify-between">
            <h1 className="text-2xl">
              {selectedQuestionIndex + 1}: {questions[selectedQuestionIndex].name}
            </h1>
            <div className="timer">


            </div>
            </div>
            <div className="flex flex-col gap-2">
              {Object.keys(questions[selectedQuestionIndex].options).map((option, index) => (
                <div
                  className={`flex gap-2 flex-col ${
                    selectedOptions[selectedQuestionIndex] === option 
                      ? "selected-option"
                      : "option"
                  }`}
                  key={index}
                  onClick={() => {
                    setSelectedOptions({
                      ...selectedOptions,
                      [selectedQuestionIndex]: option,
                    });
                  }}
                >
                  <h1 className="text-xl">
                    {option} : {questions[selectedQuestionIndex].options[option]}
                  </h1>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              {selectedQuestionIndex > 0 && (
                <button
                  className="primary-outlined-btn"
                  onClick={() => {
                    setSelectedQuestionIndex(selectedQuestionIndex - 1);
                  }}
                >
                  Previous
                </button>
              )}

              {selectedQuestionIndex < questions.length - 1 && (
                <button
                  className="primary-contained-btn"
                  onClick={() => {
                    setSelectedQuestionIndex(selectedQuestionIndex + 1);
                  }}
                >
                  Next
                </button>
              )}

              {selectedQuestionIndex === questions.length - 1 && (
                <button
                  className="primary-contained-btn"
                  onClick={() => {
                    calculateResult();
                  }}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}

        {view === "result" && (
          <div className="flex  items-center mt-2 justify-center">
            <div className="flex flex-col gap-2 result">
              <h1 className="text-2xl">Result</h1>
              <div className="marks">
                <h1 className="text-md">Total Marks : {examData.totalMarks}</h1>
                <h1 className="text-md">Obtained Marks : {result.correctAnswers.length}</h1>
                <h1 className="text-md">Wrong Answers : {result.correctAnswers.length}</h1>
                <h1 className="text-md">Passing Marks : {result.correctAnswers.length}</h1>
                <h1 className="text-md">VERDICT :</h1>
              </div>
            </div>
            <div className="lottie-animation">
            {result.verdict === "Pass" && (
              <lottie-player
                src="https://lottie.host/bd6a18dc-8dba-443f-ac4f-a422a1a3ffbf/QltougELfM.json"
                background="#FFFFFF"
                speed="1"
                style={{ height: "300px" }}
                loop
                autoplay
              ></lottie-player>
            )}
            {result.verdict === "Fail" && (
              <lottie-player
                src="https://lottie.host/19f37d48-6935-490d-8f0c-495cc1f10e30/ebCrFnYOF2.json" 
                background="#FFFFFF"
                speed="1" 
                loop
                autoplay
              ></lottie-player>
            )}
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default WriteExam;
