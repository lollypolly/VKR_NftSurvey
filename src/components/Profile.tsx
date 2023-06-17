import React, { useEffect, useState } from "react";
import Header from "./Header";
import Button500 from "./buttons/Button500";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { userInfo } from "os";
import { changeUserData, getUserInfo } from "../scripts/web3";

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>();
  useEffect(() => {
    getUserInfo().then((res) => setUserData(res));
  }, []);

  const firstName: any = useSelector((state: any) => state.UserData.firstName);
  const lastName: any = useSelector((state: any) => state.UserData.lastName);
  const gender: any = useSelector((state: any) => state.UserData.gender);
  const birthDay: any = useSelector((state: any) => state.UserData.bDay);
  const email: any = useSelector((state: any) => state.UserData.email);
  const tel: any = useSelector((state: any) => state.UserData.tel);

  const updatedUserData = async () => {
    navigate("/updatedata");
  };
  return (
    <div className="profile-main">
      <Header />
      <div className="profile">
        <div className="my-profile-header">Мой Профиль</div>
        <div className="my-profile-text">
          Вы приобрели NFT токен, теперь вы можете участвовать и создавать
          опросы
        </div>
        <div className="experience">
          <div className="experience-left-side">Опыт в опросах</div>
          <div className="experience-right-side">{userData?.experience}</div>
        </div>
        <div className="experience">
          <div className="experience-left-side">Имя</div>
          <div className="experience-right-side">{userData?.name}</div>
        </div>
        <div className="experience">
          <div className="experience-left-side">Фамилия</div>
          <div className="experience-right-side">{userData?.lastName}</div>
        </div>
        <div className="experience">
          <div className="experience-left-side">Пол</div>
          {userData?.gender === "1" ? (
            <div className="experience-right-side">Женщина</div>
          ) : (
            <div className="experience-right-side">Мужчина</div>
          )}
        </div>
        <div className="experience">
          <div className="experience-left-side">Почта</div>
          <div className="experience-right-side">
            {userData?.email.slice(0, 7)}
          </div>
        </div>
        <div className="experience">
          <div className="experience-left-side">Дата рождения</div>
          <div className="experience-right-side">{userData?.birthDate}</div>
        </div>
        <div className="experience">
          <div className="experience-left-side">Номер телефона</div>
          <div className="experience-right-side">{userData?.phoneNumber}</div>
        </div>
        <div style={{ marginTop: "36px", width: "100%" }}>
          <Button500
            buttonInner="Изменить данные профиля"
            defaultClass="button-500"
            func={updatedUserData}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
