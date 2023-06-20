import React, { useState } from "react";
import { Form, Input, Button, Spin } from "antd";
import type { FormItemProps } from "antd";
import Button500 from "./buttons/Button500";

import ButtonBack from "./buttons/ButtonBack";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/actions/contacts";
import {
  createNFT,
  getTokenId,
  getUserInfo,
  walletConnection,
} from "../scripts/web3";

const MyFormItemContext = React.createContext<(string | number)[]>([]);

interface MyFormItemGroupProps {
  prefix: string | number | (string | number)[];
  children: React.ReactNode;
}

function toArr(
  str: string | number | (string | number)[]
): (string | number)[] {
  return Array.isArray(str) ? str : [str];
}

const MyFormItemGroup = ({ prefix, children }: MyFormItemGroupProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(
    () => [...prefixPath, ...toArr(prefix)],
    [prefixPath, prefix]
  );

  return (
    <MyFormItemContext.Provider value={concatPath}>
      {children}
    </MyFormItemContext.Provider>
  );
};

const MyFormItem = ({ name, ...props }: FormItemProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName =
    name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

  return <Form.Item name={concatName} {...props} />;
};

function FormCreateToken() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store: any = useSelector((state: any) => state);
  const firstName: any = useSelector((state: any) => state.UserData.firstName);
  const email: any = useSelector((state: any) => state.UserData.email);
  console.log("H", firstName);

  const onFinish = async (value: any) => {
    dispatch(userActions.setBday(value.userData.birthday));
    dispatch(userActions.setEmail(value.userData.email));
    dispatch(userActions.setFirstName(value.userData.firstName));
    dispatch(userActions.setLastName(value.userData.lastName));
    dispatch(userActions.setTel(value.userData.tel));
    dispatch(userActions.setGender(value.userData.gender));
    console.log("Form Create Token dispach data", store);

    console.log(store.UserData.email);

    await createNFT(
      value.userData.firstName,
      value.userData.lastName,
      value.userData.birthday,
      value.userData.tel,
      value.userData.email,
      value.userData.gender
    );
    navigate("/profile");
  };
  const onUpdate = () => {};

  const backTo = () => {
    navigate("/polls");
  };
  const goToProfile = () => {
    navigate("/profile");
  };
  return (
    <div className="form-create-token-main">
      <div className="create-token-form-header">Покупка NFT токена</div>
      <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
        <MyFormItemGroup prefix="userData">
          <MyFormItem
            name="firstName"
            label="Имя"
            rules={[
              { required: true, message: "Пожалуйста, введите Ваше имя!" },
            ]}
          >
            <Input
              id="name"
              autoComplete={"undefined"}
              placeholder="Введите ваше имя"
            />
          </MyFormItem>
          <MyFormItem
            name="lastName"
            label="Фамилия"
            rules={[
              { required: true, message: "Пожалуйста, введите вашу фамилию!" },
            ]}
          >
            <Input
              id="lastName"
              autoComplete={"undefined"}
              placeholder="Введите вашу фамилию"
            />
          </MyFormItem>
          <MyFormItem
            name="gender"
            label=""
            rules={[
              { required: true, message: "Пожалуйста, введите ваш пол!" },
            ]}
          >
            <div className="radio-buttons-group">
              <div className="radio-button">
                <input type="radio" id="man" name="man" value="0" />
                <label htmlFor="man">Мужчина</label>
              </div>
              <div className="radio-button">
                <input type="radio" id="woman" name="man" value="1" />
                <label htmlFor="woman">Женщина</label>
              </div>
            </div>
          </MyFormItem>
          <MyFormItem
            name="birthday"
            label="Дата рождения"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите свой день рождения!",
              },
            ]}
          >
            <Input
              id="bDay"
              autoComplete={"undefined"}
              placeholder="16.02.2001"
            />
          </MyFormItem>
          <MyFormItem
            name="email"
            label="Почта"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите адрес электронной почты!",
              },
            ]}
          >
            <Input
              id="email"
              autoComplete={"undefined"}
              type="email"
              placeholder="Введите адрес электронной почты"
            />
          </MyFormItem>
          <MyFormItem
            name="tel"
            label="Номер телефона"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите свой номер телефона!",
              },
            ]}
          >
            <Input id="tel" placeholder="Введите номер телефона" />
          </MyFormItem>
        </MyFormItemGroup>

        <div className="buttons-group">
          {store.UserData.email ? <Spin /> : ""}
          <Button500
            type="primary"
            htmlType="submit"
            buttonInner="Купить"
            defaultClass="button-500"
          />
          <ButtonBack
            type="primary"
            buttonInner="Назад"
            func={backTo}
            defaultClass="button-back"
          />
        </div>
      </Form>
    </div>
  );
}

export default FormCreateToken;
