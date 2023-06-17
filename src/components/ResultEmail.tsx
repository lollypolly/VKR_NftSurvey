import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ButtonCreatePoll from "./buttons/ButtonCreatePoll";
import TakingSurveyTextVariant from "./takingsurvey/TakingSurveyTextVariant";
import TakingSurveyOneVariant from "./takingsurvey/TakingSurvayOneVariant";
import TakingSurveyManyVariant from "./takingsurvey/TakingSurveyManyVariant";
import Button500 from "./buttons/Button500";
import ButtonBack from "./buttons/ButtonBack";
import { getQuestion, getTokenId, getUsersAnswers } from "../scripts/web3";
import TakingResult from "./TakingResult";

function Repeat() {
  const [el, setEl] = useState<any>([]);
  const [result, setResult] = useState<any>([]);
  const [qResult, setQresult] = useState<any>([]);
  const [valueQuestionText, setValueQuestionText] = useState<any>([]);
  const navigate = useNavigate();
  const store: any = useSelector((state: any) => state);

  useEffect(() => {
    getUsersAnswers(
      Number(localStorage.getItem("tokenID")),
      store?.ElementData?.element[0]?.id,
      store?.ElementData?.element[0]?.questionsAmount
    ).then((res: any) => setResult(res));
    getQuestion(
      Number(store?.ElementData?.element[0]?.id),
      Number(store?.ElementData?.element[0]?.questionsAmount)
    ).then((res) => setQresult(res));
  }, []);

  let allData: any = [];
  if (qResult && result && qResult.length === result.length) {
    for (let i = 0; i < qResult.length; i++) {
      allData.push({
        question: qResult[i][0],
        answer: [qResult[i].options[i]],
      });
    }
  }
  const handleShare = () => {
    // Define the URL you want to copy
    var url = window.location.href; // Replace with your desired URL

    // Write the URL to the clipboard
    navigator.clipboard
      .writeText(url)
      .then(function () {
        // Success! The URL has been copied to the clipboard
        alert("URL copied to clipboard!");
      })
      .catch(function (error) {
        // An error occurred while copying the URL
        console.error("Failed to copy URL:", error);
      });
  };
  const handleEdit = () => {};
  const handleRezult = () => {
    navigate("/polls");
  };
  const goBack = () => {
    navigate("/polls");
  };
  const handleCompleteTakingSurways = () => {};
  const handleExportedValuePollText = (questionValue: any) => {
    setValueQuestionText(questionValue);
  };
  let tyoeOfQuestion = allData.map((el: any) => {
    return <TakingResult text={el.question} answersVatiant={el.answer} />;
  });
  return (
    <div className="main1">
      <Header />
      <div className="taking-survey-container">
        <div className="taking-survey-header">
          <div className="taking-survey-header-left-side">Результаты</div>
          <div className="taking-survey-header-right-side">
            {/*<div className="text-edit" onClick={handleEdit}>Редактировать</div>*/}
            <div className="text-edit" onClick={handleRezult}>
              Перейти в списку опросов
            </div>
            <ButtonCreatePoll buttonInner="Поделиться" func={handleShare} />
          </div>
        </div>
        {/*<div className="taking-survey-header-left-side" style={{marginTop:"20px"}}>Вы уже прошли данный опрос</div>*/}
        {/*<div className="taking-email-container" style={{ marginTop: "20px" }}>*/}
        {/*<div className="email-header">*/}
        {/*    <div className="left">Участники</div>*/}
        {/*    <div className="left">7 участников</div>*/}
        {/*</div>*/}
        {/*  <div className="left">Почты</div>*/}
        {/*  <div className="emails">email@mail.ru</div>*/}
        {/*</div>*/}
        {tyoeOfQuestion}

        <div style={{ marginTop: "10px", width: "100%" }}>
          <ButtonBack
            buttonInner="Назад"
            func={goBack}
            defaultClass="button-back bacgroundbtn"
          />
        </div>
      </div>
    </div>
  );
}

export default Repeat;
