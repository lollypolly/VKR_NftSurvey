import React, { useState } from "react";
import { Input } from "antd";

function TakingSurveyTextVariant({ text, exportCallback }: any) {
  const [value, setValue] = useState("");

  const handleQuestionText = (event: any) => {
    setValue(event.target.value);
  };

  exportCallback(value);
  return (
    <>
      <div className="surveys-answers">
        <div className="surveys-answers-header">{text}</div>
        <div className="surveys-answers-body">Введите текстовый ответ</div>
        <div className="surveys-answers-input">
          <Input
            className="surveys-answers-input-notselected"
            type="text"
            onChange={handleQuestionText}
          />
        </div>
      </div>
    </>
  );
}

export default TakingSurveyTextVariant;
