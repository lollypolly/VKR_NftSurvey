const initialState = {
    pollVariant: [],
};

export const PollVariantReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "pollVariant":
            return {
                ...state,
                pollVariant: action.payload
            }
        default:
            return state
    }
}
