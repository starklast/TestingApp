import {
  SENDANSWER,
  STARTTEST,
  STOPTEST,
  GETTESTINFO,
  LOADING,
  NEXTSTAGE,
  TESTRESULT,
  LOADINGCOMPLETE,
  COMPLETESTAGE,
} from '../constants/';

export const testReduser = (state = {}, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case LOADINGCOMPLETE:
      return { ...state, loading: false };
    case GETTESTINFO:
      return { ...state, ...action.payload };
    case STARTTEST:
      return { ...state, ...action.payload };
    case NEXTSTAGE:
      return { ...state, ...action.payload };
    case COMPLETESTAGE:
      return { ...state, ...action.payload };
    case TESTRESULT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const answerReduser = (state = {}, action) => {
  switch (action.type) {
    case SENDANSWER:
      const newState = { ...state };
      newState[action.payload.id] = action.payload.data;
      return newState;

    default:
      return state;
  }
};

export const timeTest = (
  state = { startTime: null, endTime: null },
  action
) => {
  switch (action.type) {
    /*   case STARTTEST:
      return { ...state, startTime: action.payload }; */
    case STOPTEST:
      return { ...state, endTime: action.payload };

    default:
      return state;
  }
};
