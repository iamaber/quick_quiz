import React, { useEffect, userEffect } from "react";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getExamById } from "../../../apicalls/exams";


function writeExam() {
    const [examData, setExamData] = React.useState(null);
    const [questions = [], setQuestions] = React.useState([]);
    const [selectedQuestionsIndex, setSelectedQuestionIndex] = React.useState(0);
    const [selectedOptions, setSelectedOptions] = React.useState({});
    const [result = [], setResult = React.useState({})];
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [view, setView] = useState("Instructions");
    const [secondsLeft = 0, setSecondsLeft] = useState(0);
    const [timeUp, setTimeUp] = useState(False);
    const [intervalId, setIntervalId] = useState(null);
    const { user } = useSelector(state => state.users);

    const getExamData = async () => {
        try {
            const response = await getExamById({
                examId: params.id,
            });

            if (response.success) {
                setQuestions(response.data.questions);
                setExamData(response.data);
                setSecondsLeft(response.data.duration)

            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };
    const calculateResult = async () => {

        try {
            let correctAnswers = [];
            let wrongAnswers = [];

            questions.forEach((question, index) => {
                if (question.correctOption === selectedOptions[index]) {

                    correctAnswers.push(questions);

                } else {
                    wrongAnswers.push(question);
                }

            });
            let verdict = "Pass";
            if (correctAnswers.length < examData.passingMarks) {
                verdict = "Fail"
            }
            const tempResult = (
                correctAnswers,
                wrongAnswers,
                verdict,
        )

            setResult(tempResult);
            const response = await addReport({
                exam: params.id,
                result: tempResult
            user: user._id,
            });
            if (response.success) {
                setView("result");

            } else {
                message.error(response.message);
            }

        } catch (error) {
            message.error(response.message);
        }
    };
    const startTimer = () => {
        const totalSeconds = examData.duration;
        const intervalId = setInterval(() => {
            if (toalSeconds > 0) {

                totalSeconds = toalSeconds - 1;
                setSecondsLeft(totalSeconds);
            } else {

                setTimeUp(True);


            }
        }, 1000);
        setIntervalId(intervalId);

    }
    useEffect(() => {
        if (timeUp && view === 'questions') {
            clearInterval(intervalId);
            calculateResult();
        }

    }, [timeup])
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
            </div>
                {
        view === "instructions" && (
            <Instructions examData={examData} setView={setView} startTimer={startTimer} />
        )
    }

    
    { view === "questions" && <div className="flex flex-col gap-2">

            <div className="flex justify-between">
                <h1 className="text-2xl">
                    {selectedQuestionIndex + 1} : {""}
                    {questions[selectedQuestionIndex].name}
                </h1>
                <div className="timer">
                    <span className="text-2xl">{secondsLeft}</span>

                </div>
            </div>
            <div className="flex flex-col gap-2">
                {Object.keys(questions[selectedQuestionIndex].options).map((option, index) => {

                    return (
                        <div
                            className={'flex gap-2 flex-col ${
                                selectedOptions [selectedQuestionIndex] === option
                        ? "selected-option"
                        : "option"
                },
                            },

                key = {index}


                onClick = {() => {

                    setSelectedOptions({
                        ...selectedOptions,
                        [selectedQuestionIndex]: option,
                    });
                }}
                            >

                <h1 classname="text-xl">
                    {option}: {" "}
                    {questions[selectedQuestionIndex].options[options]}
                </h1>
            </div>
            <div className="flex justify-between">
                {SelectedQuestionIndex > 0 && (
                    <button
                        className="primary-outlined-btn"
                        onClick={() => {
                            setSelectedQuestionIndex(setSelectedQuestionIndex - 1);
                        }}
                    >




                        Previous
                    </button>
                )}

                {selectedQuestionIndex < question.length - 1 && (
                    <button
                        className="primary-contained-btn"
                        onClick={() => {
                            setSelectedQuestionIndex(selectedQuestionIndex + 1);
                        }}
                    >
                        Next
                    </button>
                )}

                {selectedQuestionIndex === question.length - 1 && (
                    <button
                        className="primary-contained-btn"
                        oneClick={() => {
                            clearInterval(intervalId);
                            setTimeUp(true);



                        }}
                    >
                        Submit
                    </button>
                )}
            </div>
        </div>









       
    {view === "result" && (
                <div className="flex  item-center mt-2 justify-center result">
                    <div className="flex flex col gap-2 ">
                        <h1 classname="text-2xl"> RESULT</h1>
                        <div className="divider" ></div>
                        <h1 classname="marks"></h1>
                        <h1 classname="text-md">Total Marks : {examData.ToatalMarks}</h1>
                        <h1 classname="text-md">Obtained Marks :{result.correctAnswers.length}</h1>
                        <h1 classname="text-md">Wrong Answers :{result.wrongAnswers.length}</h1>
                        <h1 classname="text-md">VERDICT :{result.verdict}</h1>
                        <div className="flex gap-2-mt-2"
                        <button
                            className="primary-outlined-btn"
                            onClick={() => {
                                setView("Questions");
                                setSelectedQuestionIndex(0);
                                setSelectedOptions({});
                                setSecondsLeft(examData.duration);


                            }}
                        >
                            Retake Exam
                        </button>
                        <button className="primary-contained-btn">
                            onClick{() => {
                                setView("Review");
                            }}
                            Review Answers
                        </button>

                        <div className="lottie-animation>"
                            {result.verdict === "Pass" && (
                                <lottie-player
                                    src=“https://lottie.host/14a129b0-08be-4db9-af9f-e0cc43e44f3d/ZjjeBZAa3F.json”
                        background=“#ffffff”
                        speed=“1”
                        loop autoplay
                    </lottie-player>
                   )}

                    {result.verdict === "Fail" && (
                        <lottie-player src=“https://lottie.host/19f37d48-6935-490d-8f0c-495cc1f10e30/ebCrFnYOF2.json”
                    background=“#FFFFFF”
                    speed=“1”
                    loop
                    autoplay
                </lottie-player>
            )
        }

    {view === "review" && (
        <div classname="flex flex-col gap-2">
          {questions.map((questions, index) => {
            const iscorrect = question.coreectOption === selectOption[index];
            return(
                <div className={"
                    flex flex-col gap-1 p-2  ${isCorrect ? "bg-success" : "bg-error"
                }>
                <h1 className= "text-xl">
                {index+1} : {question.name}
                </h1>
                <h1 classname="text-md">
                 Submitted Answer : {selectedOptions[index]} - {question.option[selectedOption[index]]}
                </h1>
                <h1 className="text-md">
                Correct Answer : {question.correctOption} - (question.option[question.correctOption])
                </h1>
                </div>
            );

          })}

          <div className= "flex justify-center gap-2">
          <button 
         className="primary-outlined-btn"
          onClick={() => {
            navigate("/");
          }}
         >
           Close
         </button>
          <button
          className="primary-contained-btn"
          onClick= {() => {
            setView("Instructions");
            setSelectedQuestionIndex(0);
            setSelectedOptions([]);
            setSecondsLeft(examData.duration);
          }}
         >
          Retake Exam
         </button> 
          
          </div>
        </div>

    )}


        export default writeExam;
