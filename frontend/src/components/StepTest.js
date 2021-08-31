import React from 'react';
import { useSelector } from 'react-redux';
import Question from './Question';
import { Button } from '@material-ui/core';
function StepTest({ stepData, idTest, idStep, confirmStep }) {
  const answers = useSelector((state) => state.answers);
  const nextStep = () => {
    confirmStep.event();
  };
  const availableNexStep =
    answers.filter(
      (item) => (item.idTest === idTest) & (item.idStep === idStep)
    ).length === stepData.questions.length;

  return (
    <div>
      <div>{stepData.description}</div>
      <div>
        {stepData.questions.map((item, index) => (
          <Question
            key={index}
            data={item}
            idTest={idTest}
            idStep={idStep}
            idQuestion={index}
          />
        ))}
      </div>
      <div>
        <Button onClick={nextStep} disabled={!availableNexStep}>
          {confirmStep.lable}
        </Button>
      </div>
    </div>
  );
}

export default StepTest;
