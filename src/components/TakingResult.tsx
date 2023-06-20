import React, {useEffect, useState} from "react";
import {userAnswers} from "../store/actions/answers";
import {useDispatch, useSelector} from "react-redux";

function TakingResult({text,answersVatiant}:any,{exportCallback}:any) {
    const [valueOne, setValueOne] = useState<any>([])
    const [ev, setEv] = useState<any>([])
    const dispatch = useDispatch()
    useEffect(()=>{arr.push([...arr,valueOne]);
    },[valueOne])
    let arr:any = []

    const handleQuestions = ((event:any) => {
        setEv([...ev,event.target.name])
        setValueOne([...valueOne,event.target.value]);
        if (event.target.name in ev){
            return
        }else
            dispatch(userAnswers.setAnswers([...store.Answers.answers, event.target.value]));
    })
    const store: any = useSelector((state: any) => state);
    return (
        <>
            <div className="surveys-answers">
                <div className="surveys-answers-header">
                    {text}
                </div>
                <div className="surveys-answers-body">
                    Выберите один из предложенных вариантов
                </div>
                {answersVatiant.map((item:any,index:any)=>
                    <div className="radio-buttons-group">
                        <div className="radio-button-answer">
                            {/*<input type="radio" id={index} name={text} value={index} onChange={handleQuestions} defaultValue={0}/>*/}
                            <label htmlFor={text}>{item}</label>
                        </div>
                    </div>)}
            </div>
        </>
    )
}

export default TakingResult;
