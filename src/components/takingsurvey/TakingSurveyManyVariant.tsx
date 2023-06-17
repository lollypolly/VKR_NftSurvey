import React, { useState } from "react";
import { Input } from "antd";

function TakingSurveyManyVariant({ text, answersVatiant }: any) {
  const [valueMany, setValueMany] = useState([]);

  const handleQuestions = (event: any) => {
    setValueMany(valueMany.concat(event.target.value));
  };

  return (
    <>
      <div className="surveys-answers">
        <div className="surveys-answers-header">{text}</div>
        <div className="surveys-answers-body">
          Выберите один или несколько предложенных вариантов
        </div>
        {answersVatiant.map((item: any, index: any) => (
          <div className="radio-buttons-group">
            <div className="radio-button-answer">
              <input
                type="radio"
                id={index}
                name={index}
                value={index}
                onChange={handleQuestions}
              />
              <label htmlFor={index}>{item}</label>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TakingSurveyManyVariant;
