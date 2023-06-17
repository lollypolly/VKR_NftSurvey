import React, { useState } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ButtonCreatePoll from "./buttons/ButtonCreatePoll";
import TakingSurveyTextVariant from "./takingsurvey/TakingSurveyTextVariant";
import TakingSurveyOneVariant from "./takingsurvey/TakingSurvayOneVariant";
import TakingSurveyManyVariant from "./takingsurvey/TakingSurveyManyVariant";
import Button500 from "./buttons/Button500";
import ButtonBack from "./buttons/ButtonBack";

function Repeat() {
  const [el, setEl] = useState<any>([]);
  const [valueQuestionText, setValueQuestionText] = useState<any>([]);
  const navigate = useNavigate();
  const store: any = useSelector((state: any) => state);
  const data = store?.ElementData?.element[0]?.Opros[0];

  const handleShare = () => {
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
    navigate("/rezult");
  };
  const goBack = () => {
    navigate("/answers");
  };
  const handleCompleteTakingSurways = () => {};
  const handleExportedValuePollText = (questionValue: any) => {
    setValueQuestionText(questionValue);
    // setValueAnswerOneVariant(answerValue)
  };
  let tyoeOfQuestion = data.map((el: any) => {
    if (el.type === "2") {
      return (
        <TakingSurveyTextVariant
          text={el.question}
          exportCallback={handleExportedValuePollText}
        />
      );
    } else if (el.type === "0") {
      return (
        <TakingSurveyOneVariant text={el.question} answersVatiant={el.answer} />
      );
    } else if (el.type === "1") {
      return (
        <TakingSurveyManyVariant
          text={el.question}
          answersVatiant={el.answer}
        />
      );
    }
  });
  return (
    <div className="main1">
      <Header />
      <div className="taking-survey-container">
        <div className="taking-survey-header">
          <div className="taking-survey-header-left-side">
            Опрос без названия
          </div>
          <div className="taking-survey-header-right-side">
            <div className="text-edit" onClick={handleEdit}>
              Редактировать
            </div>
            <div className="text-edit" onClick={handleRezult}>
              Результаты
            </div>
            <ButtonCreatePoll buttonInner="Поделиться" func={handleShare} />
          </div>
        </div>
        <div
          className="taking-survey-header-left-side"
          style={{ marginTop: "20px" }}
        >
          Вы уже прошли данный опрос
        </div>

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
