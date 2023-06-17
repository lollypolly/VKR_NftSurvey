const initialState = {
    answers: [],
};

export const AnswerReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "answers":
            return {

                ...state,
                answers: action.payload
            }
        default:
            return state
    }
}
