import {combineReducers} from '@reduxjs/toolkit';
import {UserDataReducer} from "./contacts";
import {PollsReducer} from "./polls";
import {ElementReducer} from "./element";
import {AnswerReducer} from "./answers";
import {PollVariantReducer} from "./pollVariant";

export const rootReducer = combineReducers({
    userData: UserDataReducer,
    pollsData: PollsReducer,
    elementData: ElementReducer,
    answer: AnswerReducer,
    pollVatiant: PollVariantReducer
});
