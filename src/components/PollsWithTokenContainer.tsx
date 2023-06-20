import React, { useEffect, useState } from "react";
import ButtonCreatePoll from "./buttons/ButtonCreatePoll";
import Poll from "./Poll";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { getPolls, getQuestion, getTokenId } from "../scripts/web3";

function PollsWithTokenContainer() {
  const [pollsData, setPollsData] = useState<any>([]);
  const navigate = useNavigate();
  const store: any = useSelector((state: any) => state);

  useEffect(() => {
    getPolls().then((res) => setPollsData(res));
  }, []);

  const createPoll = async () => {
    navigate('/createpoll')
  };

  return (
    <>
      <div className="poll-with-token-container">
        <div className="button-container">
          <ButtonCreatePoll buttonInner="Создать опрос" func={createPoll} />
        </div>
        <div className="polls-group">
          {pollsData.map((el: any) => (
            <Poll name={el.title} el={el} />
          ))}
        </div>
      </div>
    </>
  );
}

export default PollsWithTokenContainer;
