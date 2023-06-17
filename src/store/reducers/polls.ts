const initialState = {
    polls: [],
};

export const PollsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'polls':
            return {
                polls: [...state.polls.concat(action.payload)]

                // poll: action.payload
            }
        default:
            return state
    }
}
