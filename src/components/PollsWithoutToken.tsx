import React from "react";
import Button500 from "./buttons/Button500";
import { useNavigate } from "react-router";
import { getTokenId, getUserInfo, walletConnection } from "../scripts/web3";

function PollsWithoutToken() {
  const navigate = useNavigate();
  const buyToken = async () => {
    let err;
    let account: any = await walletConnection()
      .then((account) => {
        console.log("Connected account:", account);
      })
      .catch((error) => {
        err = error;
        console.error("Error:", error);
        if (err === 4001) {
          alert("Подключите свой кошелек !!!");
        }
      });

    if (account !== 0 && err !== 4001) {
      let tokenId = await getTokenId(account);

      if (tokenId !== 0) {
        navigate("/profile");
      } else {
        navigate("/createtoken");
      }
    }
  };
  return (
    <div className="buy-token">
      <div className="buy-token-content">
        <div className="buy-token-header">
          У вас еще нет токена для прохождения опросов
        </div>
        <Button500
          func={buyToken}
          buttonInner="Начать"
          defaultClass="button-500"
        />
      </div>
    </div>
  );
}

export default PollsWithoutToken;
