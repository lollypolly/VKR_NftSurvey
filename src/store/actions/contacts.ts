function setFirstName (data:any) {
    return { type: "firstName", payload: data };
}

function setEmail (data:any) {
    return { type: "email", payload: data };
}

function setBday (data:any) {
    return { type: "bDay", payload: data };
}
function setLastName (data:any) {
    return {
        type: "lastName",
        payload: data
    };
}

function setGender (data:any) {
    return { type: "gender", payload: data };
}


function setTel (data:any) {
    return { type: "tel", payload: data};
}

export const userActions = {
    setFirstName,
    setLastName,
    setGender,
    setEmail,
    setBday,
    setTel,
};
