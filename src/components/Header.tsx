import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const email: any = useSelector((state: any) => state.UserData.email);

  return (
    <header className="header">
      <div className="header-left-side">
        <span>NFTsurvey</span>
      </div>
      <div className="buttons">
        <Link to="*">
          <button>Выйти</button>
        </Link>
        <Link to="/">
          <button>Опросы</button>
        </Link>
        {!email ? (
          <Link to="/profile">
            <button>Профиль</button>
          </Link>
        ) : (
          <Link to="/">
            <button>Профиль</button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
