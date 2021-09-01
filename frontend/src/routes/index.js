import Home from '../pages/Home';
import Questions from '../pages/Questions';
import Result from '../pages/Result';
import Admin from '../pages/Admin';

import { HOME, QUESTIONS, RESULT, ADMIN } from '../constants';
export const routes = [
  {
    pageName: HOME,
    title: 'Test descriptions',
    path: '/',
    component: Home,
  },
  {
    pageName: QUESTIONS,
    title: 'QUESTION',
    path: '/questions/',
    component: Questions,
  },
  {
    pageName: RESULT,
    title: 'RESULT',
    path: '/result',
    component: Result,
  },
  {
    pageName: ADMIN,
    title: 'ADMIN',
    path: '/admin',
    component: Admin,
  },
];
export const getPathByName = (name) => {
  let pathItem = routes.find((item) => item.pageName === name);
  if (!pathItem) {
    pathItem = routes.find((item) => item.pageName === HOME);
  }
  return pathItem.path;
};

export const getPathByStepID = (idTest, idStep) => {
  let questionPath = getPathByName(QUESTIONS);
  return questionPath
    .replace(/:idTest/, `${idTest}`)
    .replace(/:idStep/, `${idStep}`);
};
