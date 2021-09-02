import React from 'react';
import './viewTest.css';
export default function ViewTest({ testData }) {
  return (
    <div>
      {testData.description}
      <ul>
        {testData.testStages.map((testStage) => (
          <ViewTestStage testStageData={testStage} />
        ))}
      </ul>
    </div>
  );
}

function ViewTestStage({ testStageData }) {
  return (
    <li>
      {testStageData.description}
      <ul>
        {testStageData.questions.map((questionData) => (
          <ViewQuestion questionData={questionData} />
        ))}
      </ul>
    </li>
  );
}
function ViewQuestion({ questionData }) {
  return (
    <li>
      {questionData.question.description}
      <ul>
        {questionData.question.answers.map((answer) => (
          <ViewAnswer answerData={answer} />
        ))}
      </ul>
    </li>
  );
}
function ViewAnswer({ answerData }) {
  return (
    <li className={answerData.correct && 'testView_correctAnswer'}>
      {answerData.answer}
    </li>
  );
}
