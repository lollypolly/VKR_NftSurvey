const initialState = {
    element: "",
};

export const ElementReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "element":
            return {
                ...state,
                element: action.payload
            }
        default:
            return state
    }
}
