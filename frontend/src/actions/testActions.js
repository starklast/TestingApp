import {
  LOADING,
  GETTESTINFO,
  STARTTEST,
  NEXTSTAGE,
  TESTRESULT,
  COMPLETESTAGE,
  LOADINGCOMPLETE,
} from '../constants/';
import { testService } from '../api/server';
export function getNewTest() {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING });
    const { id, description } = await testService.getNewTestData();
    dispatch({
      type: GETTESTINFO,
      payload: { testId: id, description },
    });
    dispatch({ type: LOADINGCOMPLETE });
  };
}
export function startTestAction(testId) {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING });
    const { id, startTime } = await testService.startTest(testId);
    const testStage = await testService.getNextTestStage(id);

    dispatch({
      type: STARTTEST,
      payload: { started: true, id, startTime, testStage },
    });
    dispatch({ type: LOADINGCOMPLETE });
  };
}
export function getNextStageAction() {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING });
    const state = getState();
    const testStage = await testService.getNextTestStage(
      state.testDescription.id
    );
    console.log(testStage);
    dispatch({
      type: NEXTSTAGE,
      payload: { testStage },
    });
    console.log('test completed');

    if (testStage?.testCompleted) {
      const testResult = await testService.getTestResult(
        state.testDescription.id
      );
      dispatch({
        type: TESTRESULT,
        payload: { testResult },
      });
    }
    dispatch({ type: LOADINGCOMPLETE });
  };
}
export function completeStage() {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING });
    const state = getState();
    const data = {};
    data['id'] = state.testDescription.id;
    console.log(Object.keys(state.answers));
    data['questions'] = Object.keys(state.answers).map((key) => {
      return {
        id: key,
        answers: Object.keys(state.answers[key]).reduce((res, keyAnswer) => {
          console.log(
            `state.answers[key]=${state.answers[key]} keyAnswer=${keyAnswer}`
          );
          if (state.answers[key][keyAnswer]) {
            res.push(keyAnswer);
          }
          return res;
        }, []),
      };
    });

    await testService.completeStage(data);
    const testStage = await testService.getQuestionWhithAnswers(
      state.testDescription.id
    );
    dispatch({
      type: COMPLETESTAGE,
      payload: { testStage },
    });
    //dispatch(getNextStageAction());
    dispatch({ type: LOADINGCOMPLETE });
  };
}
