import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { getPathByName } from '../routes/';
import { getNewTest, startTestAction } from '../actions/testActions';
import { QUESTIONS } from '../constants';
function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const testInfo = useSelector((store) => store.testDescription);
  //console.log(testInfo);
  useEffect(() => {
    if (Object.keys(testInfo).length === 0) {
      dispatch(getNewTest());
    }
  }, [dispatch, history, testInfo]);

  /*   const testID = getTestID();
  const testInfo = getTestDescription(testID); */
  const error = testInfo === null ? true : false;
  const getTest = () => {
    dispatch(getNewTest());
  };

  const startTest = () => {
    dispatch(startTestAction(testInfo.testId));
    history.push(getPathByName(QUESTIONS));
  };
  return (
    <>
      {(error || testInfo.loading) && <div> loading...</div>}

      {!error && !testInfo.loading && (
        <div>
          <div>{testInfo.description}</div>
          <Button onClick={() => getTest()}>Get test</Button>
          <Button onClick={() => startTest()}>Start</Button>
        </div>
      )}
    </>
  );
}

export default Home;
