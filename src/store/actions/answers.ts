function setAnswers (data:any) {
    return { type: "answers", payload: data};
}

export const userAnswers = {
    setAnswers
};
