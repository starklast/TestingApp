import { SENDANSWER, STARTTEST, STOPTEST } from '../constants/';
export function sendAnswer({ id, data }) {
  return async (dispatch, getState) => {
    //dispatch({ type: LOADING });
    dispatch({
      type: SENDANSWER,
      payload: { id, data },
    });
  };
}

export function startTest({ idTest }) {
  return async (dispatch, getState) => {
    //dispatch({ type: LOADING });

    dispatch({
      type: STARTTEST,
      payload: new Date(),
    });
  };
}
export function stopTest({ idTest }) {
  return async (dispatch, getState) => {
    //dispatch({ type: LOADING });

    dispatch({
      type: STOPTEST,
      payload: new Date(),
    });
  };
}
