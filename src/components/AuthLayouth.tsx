import React, { useEffect, useState } from "react";
import Header from "./Header";
import PollsWithoutToken from "./PollsWithoutToken";
import { useSelector } from "react-redux";
import PollsWithToken from "./PollsWithToken";
import { getTokenId, walletConnection } from "../scripts/web3";

function AuthLayout() {
  const [status, setStatus] = useState<any>(false);

  const store: any = useSelector((state: any) => state);
  let err;
  let account: any = walletConnection()
    .then((account) => {})
    .catch((error) => {
      err = error;
      console.error("Error:", error);
      if (err === 4001) {
        alert("Подключите свой кошелек !!!");
      }
    });

  getTokenId(account).then((result: any) => {
    if (result > 0) {
      setStatus(true);
    } else {
      setStatus(false);
    }
    localStorage.setItem("tokenID", result);
  });

  return (
    <div>
      <div className={status ? "main1" : "main"}>
        <Header />
        {status ? <PollsWithToken /> : <PollsWithoutToken />}
      </div>
    </div>
  );
}

export default AuthLayout;
