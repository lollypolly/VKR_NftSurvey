import React, {useEffect, useState} from "react";
import {Input} from "antd";

function PollsOneVariantType({number,exportCallback,text}:any) {
    const [questionOneVariant, setQuestionOneVariant] = useState([]);
    const [answersOneVariant, setAnswersOneVariant] = useState(["",""]);

    exportCallback(questionOneVariant,answersOneVariant)

    const handleQuestionOneVariantChange = ((event:any) => {
        const newValue:any = event.target.value
        setQuestionOneVariant(newValue);
    })
    const handleAnswerOneVariantChange = (index:any, event:any) => {
        const newAnswers:any = [...answersOneVariant];
        newAnswers[index] = event.target.value;
        setAnswersOneVariant(newAnswers);
    };
    const addAnswerOneVariant = () => {
        if (answersOneVariant.length < 10) {
            const newAnswers: any = [...answersOneVariant, ''];
            setAnswersOneVariant(newAnswers)
        }
    };

    return (
        <>
            <div className="poll-input-container">
                <div className="poll-input-header">
                    <label className="lable">{number}{text}</label>
                    <Input type="text" value={questionOneVariant} onChange={handleQuestionOneVariantChange} />
                </div>
            </div>
            <div className="poll-input-container">
                <div className="poll-input-text">Варианты ответа</div>
                <div style={{width: "100%"}}>
                    {answersOneVariant.map((answer:any, index:any) => (
                        <>
                            <Input
                                style={{marginBottom: "10px", width:"100%"}}
                                key={index}
                                type="text"
                                value={answer}
                                onChange={(event) => handleAnswerOneVariantChange(index, event)}
                            />
                        </>
                ))}
                </div>
                <button className="poll-button-bold question-button-bold" onClick={addAnswerOneVariant}>Добавить вариант</button>
            </div>
        </>
    )

}

export default PollsOneVariantType;
