import React, { useEffect, useState } from "react";
import ButtonCreatePoll from "../buttons/ButtonCreatePoll";
import Button500 from "../buttons/Button500";
import ButtonBack from "../buttons/ButtonBack";
import { useNavigate } from "react-router";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import TakingSurveyOneVariant from "./TakingSurvayOneVariant";
import { userAnswers } from "../../store/actions/answers";
import {
  answerQuestions,
  getQuestion,
} from "../../scripts/web3";

function Index() {
  const [el, setEl] = useState<any>([]);
  const [answerList, setAnswerList] = useState<any>([]);
  const [allData, setAllData] = useState<any>([]);

  const [valueAnswerText, setValueAnswerText] = useState<any>([]);
  const [valueQuestionOneVariant, setValueQuestionOneVariant] = useState<any>(
    []
  );
  const [valueAnswerOneVariant, setValueAnswerOneVariant] = useState<any>([]);
  const [valueQuestionManyVariant, setValueQuestionManyVariant] = useState<any>(
    []
  );
  const [valueAnswerManyVariant, setValueAnswerManyVariant] = useState<any>([]);
  const [storeData, setStoreData] = useState<any>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store: any = useSelector((state: any) => state);
  // const data = store?.ElementData?.element[0]?.Opros[0]
  console.log(
    "store?.ElementData?.element[0]?.id",
    store?.ElementData?.element[0]?.id
  );
  console.log(
    "store?.ElementData?.element[0]?.id",
    store?.ElementData?.element[0]?.questionsAmount
  );
  console.log("store in INDEX", store);

  useEffect(() => {
    getQuestion(
      Number(store?.ElementData?.element[0]?.id),
      Number(store?.ElementData?.element[0]?.questionsAmount)
    ).then((res) => setAllData(res));
  }, []);

  console.log("AllDataaaaaaaaaa", allData);
  const handleShare = () => {
    var url = window.location.href; // Replace with your desired URL
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
  const goBack = () => {
    navigate("/polls");
  };
  const handleExportedValuePollText = (answer: any) => {
    setValueAnswerText(answer);
    console.log("setValueQuestionText(questionValue)", answer);
    // setValueAnswerOneVariant(answerValue)
  };
  const handleExportedValueOneVariant = (questionValue: any, answer: any) => {
    setValueQuestionOneVariant(questionValue);
    setValueAnswerOneVariant(answer);
    console.log(
      "setValueQuestionText(questionValue)",
      valueQuestionOneVariant,
      valueAnswerOneVariant
    );
    // setValueAnswerOneVariant(answerValue)
  };
  const handleExportedValueManyVariant = (questionValue: any, answer: any) => {
    setValueQuestionManyVariant(questionValue);
    setValueAnswerManyVariant(answer);
    console.log(
      "setValueQuestionText(questionValue)",
      valueQuestionOneVariant,
      valueAnswerOneVariant
    );
    // setValueAnswerOneVariant(answerValue)
  };

  const handleCompleteTakingSurways = async () => {

    dispatch(userAnswers.setAnswers([storeData]));

    await answerQuestions(
      Number(store.ElementData.element[0].id),
      store.Answers.answers,
      [""],
      [1, 1]
    );
    navigate("/resultemail");
  };

  let tyoeOfQuestion = allData?.map((el: any) => {
    return (
      <TakingSurveyOneVariant text={el.question} answersVatiant={el?.options} />
    );
  });
  console.log("tyoeOfQuestion-tyoeOfQuestion-tyoeOfQuestion", tyoeOfQuestion);
  return (
    <div className="main1">
      <Header />
      <div
        className="taking-survey-container"
        style={{ height: "85%", overflow: "auto" }}
      >
        <div className="taking-survey-header">
          <div className="taking-survey-header-left-side">
            Опрос без названия
          </div>
          <div className="taking-survey-header-right-side">
            <div className="text-edit" onClick={handleEdit}>
              Редактировать
            </div>
            <ButtonCreatePoll buttonInner="Поделиться" func={handleShare} />
          </div>
        </div>
        <div style={{ overflow: "auto", height: "100vh" }}>
          {tyoeOfQuestion}
        </div>

        <div style={{ marginTop: "10px", width: "100%" }}>
          <Button500
            buttonInner="Завершить прохождение опроса"
            func={handleCompleteTakingSurways}
            defaultClass={"poll-button-bold w-100"}
          />
        </div>
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

export default Index;
