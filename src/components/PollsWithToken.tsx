import React, { useState } from "react";
import ButtonCreatePoll from "./buttons/ButtonCreatePoll";
import Poll from "./Poll";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import PollsWithTokenContainer from "./PollsWithTokenContainer";
import Index from "./takingsurvey";

function PollsWithToken() {
  const [isClickedPolls, setIsClickedPolls] = useState(true);

  const store: any = useSelector((state: any) => state.PollsData.polls);

  const navigate = useNavigate();

  return (
    <div style={{ overflow: "auto", height: "auto" }}>
      <PollsWithTokenContainer />
    </div>
  );
}

export default PollsWithToken;
