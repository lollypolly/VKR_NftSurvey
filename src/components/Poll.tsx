import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { userActions } from "../store/actions/contacts";
import { clickEl } from "../store/actions/element";
import TakingSurveyTextVariant from "./takingsurvey/TakingSurveyTextVariant";
import Header from "./Header";
import PollsManyVariantType from "./PollsManyVariantType";
import { getUsersAnswers } from "../scripts/web3";

function Poll({ name, el }: any) {
  const [item, setItem] = useState<any>("");
  const [ans, setAns] = useState<any>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store: any = useSelector((state: any) => state);

  useEffect(() => {}, [item]);

  const onGetQuestions = () => {
    setItem(el);
    let tokenID = Number(localStorage.getItem("tokenID"));
    getUsersAnswers(
      tokenID,
      store?.ElementData?.element[0]?.id,
      store?.ElementData?.element[0]?.questionsAmount
    ).then((res: any) => {
      if (!res.length) {
        navigate("/answers");
      } else {
        navigate("/rezult");
      }
    });

    dispatch(clickEl.setEl([el]));
  };
  let account = localStorage.getItem("account");

  const firstName: any = useSelector((state: any) => state.UserData.firstName);
  return (
    <div className="poll-container" onClick={onGetQuestions}>
      <div className="poll-container-left">{name}</div>
      <div className="poll-container-right">
        <div
          className={el.creator === account ? "blue-side" : "blue-side-none"}
        >
          {el.creator === account ? "Вы создатель опроса" : ""}
        </div>
        <div className="dots-group"></div>
      </div>
    </div>
  );
}
export default Poll;
