const initialState = {
    firstName: "",
    lastName: "",
    gender: "",
    bDay: "",
    email: "",
    tel: "",
};

export const UserDataReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'firstName':
            return {
                ...state,
                firstName: action.payload
            }
        case 'lastName':
            return {
                ...state,
                lastName: action.payload
            }
        case 'gender':
            return {
                ...state,
                gender: action.payload
            }
            case 'bDay':
            return {
                ...state,
                bDay: action.payload
            }
            case 'email':
            return {
                ...state,
                email: action.payload
            }
            case "tel":
                return {
                    ...state,
                    tel: action.payload
                }
        default:
            return state
    }
}
