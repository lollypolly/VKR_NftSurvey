import { configureStore } from "@reduxjs/toolkit";
import { UserDataReducer } from "./reducers/contacts";
import { PollsReducer } from "./reducers/polls";
import {ElementReducer} from "./reducers/element";
import {PollVariantReducer} from "./reducers/pollVariant";
import {AnswerReducer} from "./reducers/answers";

const reducer = {
  UserData: UserDataReducer,
  PollsData: PollsReducer,
  ElementData: ElementReducer,
  PollVariant: PollVariantReducer,
  Answers:AnswerReducer
};

const store = configureStore({
  reducer,
});

export default store;
