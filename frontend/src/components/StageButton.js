import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';

import { completeStage, getNextStageAction } from '../actions/testActions';

export default function StageButton() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const questions = store?.testDescription?.testStage?.questions;
  const completed = store?.testDescription?.testStage?.completed;
  const answers = store?.answers;
  let actionAvailable = false;
  if (questions && answers) {
    actionAvailable = questions.every((item) => answers[item.id]);
  }
  console.log(`actionAvailable = ${actionAvailable}`);
  return (
    <Button
      disabled={!actionAvailable}
      onClick={() => {
        dispatch(completed ? getNextStageAction() : completeStage());
      }}
    >
      {completed ? 'next' : 'confirm'}
    </Button>
  );
}
