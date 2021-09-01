import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Question from '../components/Question';

import { getPathByName } from '../routes/';
import { RESULT, HOME } from '../constants/';
import StageButton from '../components/StageButton';
import Timer from '../components/Timer';

function Questions() {
  const history = useHistory();
  const testDescription = useSelector((state) => state.testDescription);
  const stepData = testDescription.testStage;
  console.log('PAGE Questions');
  console.log(`testDescription.loading ${testDescription?.loading}`);
  // const lastStep = !(testDescription.stepsCount - 1 > idStep);

  console.log(testDescription?.testStage?.testCompleted);
  useEffect(() => {
    if (!testDescription.loading && (!testDescription || !testDescription.id)) {
      history.push(getPathByName(HOME));
    } else if (
      testDescription.testStage &&
      testDescription.testStage.testCompleted
    ) {
      console.log(`go to result`);
      history.push(getPathByName(RESULT));
    }
  }, [history, testDescription]);

  if (testDescription.loading) {
    return <div>loading...</div>;
  }
  if (!testDescription || !testDescription.id) {
    return <></>;
  }
  if (testDescription?.testStage?.testCompleted) {
    return <></>;
  }
  const { completed } = stepData;
  return (
    <div>
      <Timer />
      <div>{stepData.description}</div>
      <div>
        {stepData.questions.map((item, index) => (
          <Question key={item.id} data={{ ...item, completed }} />
        ))}
      </div>
      <StageButton />
    </div>
  );
}

export default Questions;
