import React, { cloneElement, useState } from "react";
import Header from "./Header";
import { Input, Spin } from "antd";
import Button500 from "./buttons/Button500";
import ButtonBack from "./buttons/ButtonBack";
import PollsTextType from "./PollsTextType";
import PollsOneVariantType from "./PollsOneVariantType";
import PollsManyVariantType from "./PollsManyVariantType";
import { useDispatch, useSelector } from "react-redux";
import { userPolls } from "../store/actions/polls";
import { useNavigate } from "react-router";
import {
  addEmailsToPrivatePoll,
  createPoll,
  fillQuestion,
  fillQuestions,
  getAllQuestionqs,
  getCreatedPolls,
  getPolls,
  getQuestion,
  getTokenId,
  getUsersSurvey,
} from "../scripts/web3";
import { log } from "util";

function FillingQuestion() {
  const [valueQuestionText, setValueQuestionText] = useState<any>([]);
  const [valueAnswerText, setValueAnswerText] = useState<any>([]);
  const [valueQuestionOneVariant, setValueQuestionOneVariant] = useState<any>(
    []
  );
  const [valueAnswerOneVariant, setValueAnswerOneVariant] = useState<any>([]);
  const [valueQuestionManyVariant, setValueQuestionManyVariant] =
    useState<any>();
  const [valueAnswerManyVariant, setValueAnswerManyVariant] = useState<any>();
  const [inputList, setInputList] = useState<any>([]);
  const [innerButton, setInnerButton] = useState<any>("Готово");
  const [questiontList, setQuestionList] = useState<any>([]);
  const [isSelected, setIsSelected] = useState("");
  const [isFinished, setIsFinished] = useState<any>(false);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [newArray, setNewArray] = useState<any>([]);
  const [count, setcounter] = useState<any>(0);
  const store: any = useSelector((state: any) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick1 = () => {
    setActive1(true);
    setActive2(false);
    setActive3(false);
    setIsSelected("text");
  };
  const handleClick2 = () => {
    setActive2(true);
    setActive1(false);
    setActive3(false);
    setIsSelected("oneVariant");
  };
  const handleClick3 = () => {
    setActive3(true);
    setActive1(false);
    setActive2(false);
    setIsSelected("manyVariant");
  };

  const handleExportedValuePollText = (
    questionValue: any,
    answerValue: any
  ) => {
    setValueQuestionText(questionValue);
    setValueAnswerText(answerValue);
  };

  const handleExportedValuePollOneVariant = (
    questionValue: any,
    answerValue: any
  ) => {
    setValueQuestionOneVariant(questionValue);
    setValueAnswerOneVariant(answerValue);
  };

  const handleExportedValuePollManyVariant = (
    questionValue: any,
    answerValue: any
  ) => {
    setValueQuestionManyVariant(questionValue);
    setValueAnswerManyVariant(answerValue);
  };
  const onAddQuestion = () => {
    if (count < store.PollVariant.pollVariant.qtQuestion) {
      let c: any = count + 1;
      setcounter(c);
    }

    if (questiontList.length === 2)
      setQuestionList(
        questiontList.concat(
          <PollsTextType
            text="Введите вопрос (Тип: Текстовый)"
            exportCallback={handleExportedValuePollText}
          />
        )
      );
    if (questiontList.length === 0)
      setQuestionList(
        questiontList.concat(
          <PollsOneVariantType
            text="Введите вопрос (Тип: C 1 вариантам ответа)"
            exportCallback={handleExportedValuePollOneVariant}
          />
        )
      );
    if (questiontList.length === 1)
      setQuestionList(
        questiontList.concat(
          <PollsManyVariantType
            text="Введите вопрос (Тип: C несколькими вариантами ответа)"
            exportCallback={handleExportedValuePollManyVariant}
          />
        )
      );
  };

  let type = questiontList.map((el: any) => el.props.text);

  let count1:any = 0

  const handleCompleteCreateAnswer = async () => {
    let tyoeOfQuestion = type.map((name: string, index: any) => {
      if (name === "Введите вопрос (Тип: C 1 вариантам ответа)") {
        return valueQuestionOneVariant;
      } else if (
        name === "Введите вопрос (Тип: C несколькими вариантами ответа)"
      ) {
        return valueQuestionManyVariant;
      } else if (name === "Введите вопрос (Тип: Текстовый)") {
        return valueQuestionText;
      }
    });

    let typeOfAnswer = type.map((name: string, index: any) => {
      if (name === "Введите вопрос (Тип: C 1 вариантам ответа)") {
        return valueAnswerOneVariant;
      } else if (
        name === "Введите вопрос (Тип: C несколькими вариантами ответа)"
      ) {
        return valueAnswerManyVariant;
      } else if (name === "Введите вопрос (Тип: Текстовый)") {
        return valueAnswerText;
      }
    });
    let qType = type.map((name: string, index: any) => {
      if (name === "Введите вопрос (Тип: C 1 вариантам ответа)") {
        return 0;
      } else if (
        name === "Введите вопрос (Тип: C несколькими вариантами ответа)"
      ) {
        return 0;
      } else if (name === "Введите вопрос (Тип: Текстовый)") {
        return 0;
      }
    });
    let lengthOfInputs = type.map((name: string, index: any) => {
      if (name === "Введите вопрос (Тип: C 1 вариантам ответа)") {
        return valueAnswerOneVariant.length;
      } else if (
        name === "Введите вопрос (Тип: C несколькими вариантами ответа)"
      ) {
        return valueAnswerManyVariant.length;
      } else if (name === "Введите вопрос (Тип: Текстовый)") {
        return valueAnswerText.length;
      }
    });
    let typeOfAnswers = typeOfAnswer.flat(Infinity);

    dispatch(
      userPolls.setPolls({
        questiontList: [tyoeOfQuestion],
        answerList: [typeOfAnswers],
      })
    );
if (store.PollsData.polls[0]?.questiontList[0]?.length && store.PollsData.polls[0]?.answerList[0]?.length) {
  await createPoll(
      store.PollVariant.pollVariant.name,
      store.PollVariant.pollVariant.limiteHour,
      store.PollVariant.pollVariant.limiteUser,
      false,
      store.PollVariant.pollVariant.qtQuestion
  );

  let createdPolls = [];
  let tokenId = await getTokenId(localStorage.getItem("account"));
  createdPolls = await getCreatedPolls(tokenId);
  const lastElement = await createdPolls[createdPolls.length - 1];
  const lastElementNum = Number(lastElement);
  let questionList = await store.PollsData.polls[0]?.questiontList[0];
  let answeList = await store.PollsData.polls[0]?.answerList[0];

  await fillQuestions(
      await lastElementNum,
      await questionList,
      await answeList,
      await lengthOfInputs,
      await qType
  ).then((res:any)=>{if (res === undefined) navigate("/polls")});
}
count1 ++
setInnerButton("нажмите, чтобы создать ответы")
  };

  const goBack = () => {
    navigate("/createpoll");
  };

  return (
    <div className="create-poll-container">
      <Header />
      <div className="header-text">Заполнение вопросов</div>
      <div className="poll">
        <div className="poll-input-container">
          <div className="question-input-header">Опрос без названия</div>
          <div className="question-input-text">Выберете тип вопроса</div>
        </div>
        <div className="filling-question-buttons-group">
          <button
            className={!active1 ? "poll-button" : "poll-button-bold"}
            onClick={handleClick1}

          >
            Текстовый
          </button>
          <button
            className={!active2 ? "poll-button" : "poll-button-bold"}
            onClick={handleClick2}
          >
            С одним вариантом
          </button>
          <button
            className={!active3 ? "poll-button" : "poll-button-bold"}
            onClick={handleClick3}
          >
            С несколькими вариантами
          </button>
        </div>
        <div style={{ marginTop: "10px", width: "100%" }}>
          <Button500
            buttonInner="Добавить вопрос"
            defaultClass="button-500"
            func={onAddQuestion}
          />
        </div>
        {questiontList.length ? questiontList : ""}
        <div className="counter">
          Заполнено {count} из {store.PollVariant.pollVariant.qtQuestion}{" "}
          вопросов
        </div>
        <div style={{ marginTop: "10px", width: "100%" }}>
          <div style={{width:"100%",display:"flex",justifyContent:"center",alignContent:"center"}}>
            {count1 === 2 ? <Spin /> : ""}
          </div>
          <Button500
            buttonInner={innerButton}
            func={handleCompleteCreateAnswer}
            defaultClass={
              count < store.PollVariant.pollVariant.qtQuestion
                ? "poll-button w-100"
                : "poll-button-bold w-100"
            }
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

export default FillingQuestion;
