import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getPathByName } from '../routes/';
import { HOME } from '../constants/';
function Result() {
  const history = useHistory();
  const testDescription = useSelector((state) => state?.testDescription);
  const testResult = testDescription?.testResult;

  useEffect(() => {
    if (!testDescription.loading && (!testDescription || !testDescription.id)) {
      history.push(getPathByName(HOME));
    }
  }, [history, testDescription]);

  if (testDescription.loading) {
    return <div>loading...</div>;
  }
  if (!testDescription || !testDescription.id) {
    return <></>;
  }

  const { correctPercent, startTime, endTime, countQuestions } = testResult;

  const summaryTime = Math.floor(
    (new Date(endTime) - new Date(startTime)) / 1000
  );
  const averageTime = summaryTime / (countQuestions ? countQuestions : 1);

  return (
    <div>
      <div>Summary time: {summaryTime}s</div>
      <div>Average time for each question : {averageTime}s</div>
      <div>Percent correct answer: {correctPercent}%</div>
    </div>
  );
}

export default Result;
