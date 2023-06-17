import React, { useEffect, useState } from "react";
import Header from "./Header";
import Button500 from "./buttons/Button500";
import { Input } from "antd";
import { useNavigate } from "react-router";
import { userActions } from "../store/actions/contacts";
import { useDispatch, useSelector } from "react-redux";
import { Variant } from "../store/actions/pollVariant";
import { addEmailsToPrivatePoll, createPoll, getPolls } from "../scripts/web3";

function CreatePoll() {
  const [active, setActive] = useState(false);
  const [emailList, setInputList] = useState<any>([]);
  const [limiteHour, setLimiteHoure] = useState<any>("");
  const [limiteUser, setLimiteUser] = useState<any>("");
  const [name, setName] = useState<any>("");
  const [qtQuestion, setQtQuestion] = useState<any>("");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const store: any = useSelector((state: any) => state.PollVariant);

  const handleClick1 = () => {
    setActive(false);
  };
  const handleClick2 = () => {
    setActive(true);
  };
  const onAddInputClick = () => {
    setInputList(emailList.concat(<Input key={emailList.length} />));
  };

  const handleFillingQuestion = async () => {
    dispatch(
      Variant.setPollVariant({
        email: emailList,
        limiteHour: limiteHour,
        limiteUser: limiteUser,
        name: name,
        qtQuestion: qtQuestion,
      })
    );

    if (limiteUser && limiteHour && name && qtQuestion) {
      navigate("/fillingquestion");
    } else alert("Пожалуйста, заполните все поля");
  };
  const addEmailInput = () => {
    const newEmail: any = [...emailList, ""];
    setInputList(newEmail);
  };
  const handleEmailValue = (index: any, event: any) => {
    const newInput: any = [...emailList];
    newInput[index] = event.target.value;
    setInputList(newInput);
  };

  return (
    <div className="create-poll-container">
      <Header />
      <div className="header-text">Создание опроса</div>
      <div className="poll">
        <div className="poll-input-container">
          <div className="poll-input-header">Введите название опроса</div>
          <Input
            onChange={(event: any) => setName(event.target.value)}
            type="text"
            defaultValue={"Опрос без названия"}
          />
        </div>
        <div className="poll-input-container">
          <div className="poll-input-header">
            Время окончания (в секундах от текущего времени)
          </div>
          <div className="poll-input-text">
            Если нет лимита по времени, то укажите 0
          </div>
          <Input
            onChange={(event: any) => setLimiteHoure(event.target.value)}
            type="number"
          />
        </div>
        <div className="poll-input-container">
          <div className="poll-input-header">Лимит пользователей</div>
          <div className="poll-input-text">
            Если нет лимита по количеству пользователей, то укажите 0
          </div>
          <Input
            onChange={(event: any) => setLimiteUser(event.target.value)}
            type="number"
          />
        </div>
        <div className="poll-input-container">
          <div className="poll-input-header">Приватность</div>
          <div className="poll-buttons-group">
            <button
              className={active ? "poll-button" : "poll-button-bold"}
              onClick={handleClick1}
            >
              Публичный{" "}
            </button>
            <button
              className={!active ? "poll-button" : "poll-button-bold"}
              onClick={handleClick2}
            >
              Приватный
            </button>
          </div>
        </div>
        <div className={!active ? "display-none" : "poll-input-container"}>
          <div className="poll-input-text">
            Введите почты участников опроса, для возможности прохождения опроса,
            опрос будет доступен когда вы заполните вопросы
          </div>
          {emailList.map((email: any, index: any) => (
            <>
              <Input
                key={index}
                type="email"
                value={email}
                onChange={(event) => handleEmailValue(index, event)}
              />
            </>
          ))}
          <button className="poll-button-bold" onClick={addEmailInput}>
            Добавить почту участника
          </button>
        </div>
        <div className="poll-input-container">
          <div className="poll-input-header">Количество вопросов</div>
          <Input
            type="number"
            onChange={(event: any) => setQtQuestion(event.target.value)}
          />
        </div>
        <div style={{ marginTop: "36px", width: "100%" }}>
          <Button500
            buttonInner="Перейти к заполнению вопросов"
            defaultClass="button-500"
            func={handleFillingQuestion}
          />
        </div>
      </div>
    </div>
  );
}

export default CreatePoll;
