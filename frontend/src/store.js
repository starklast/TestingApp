import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { answerReduser, timeTest, testReduser } from './redusers/';

const reducer = combineReducers({
  answers: answerReduser,
  timeTest,
  testDescription: testReduser,
});

const middleWare = [thunk];
const initialValue = {}; // { math: { loading: false, value: 0 }, sec: 0 };

const store = createStore(
  reducer,
  initialValue,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
