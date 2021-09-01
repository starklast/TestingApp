import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormLabel,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from '@material-ui/core';
import { sendAnswer } from '../actions/answerActions';
import './question.css';

function Question({ data: { id, description, answers, completed } }) {
  const dispatch = useDispatch();
  const answer = useSelector((state) =>
    state.answers[id] ? state.answers[id] : {}
  );
  //const [answer, setAnswer] = React.useState('');
  console.log(`{ component Question } completed=${completed} answer=${answer}`);

  const handleChange = (event) => {
    chancgeAnswer({ ...answer, [event.target.name]: event.target.checked });
  };

  const chancgeAnswer = (data) => {
    // setAnswer(data);
    dispatch(sendAnswer({ id, data }));
  };

  useEffect(() => {
    if (!completed) {
      //setAnswer('');
      dispatch(sendAnswer({ id, data: {} }));
    }
  }, [id, completed, dispatch]);
  let classNameForAnswer = '';
  return (
    <div>
      <FormGroup>
        <FormLabel component='legend'>{description}</FormLabel>
        {answers.map((item) => {
          classNameForAnswer = '';
          if (completed && answer[item.id] && item.correct) {
            classNameForAnswer = 'correctAnswer';
          } else if (completed && answer[item.id] && !item.correct) {
            classNameForAnswer = 'wrongAnswer';
          } else if (completed && !answer[item.id] && item.correct) {
            classNameForAnswer = 'correctAnswer';
          }
          return (
            <div key={item.id} className={classNameForAnswer}>
              <FormControlLabel
                disabled={completed}
                control={
                  <Checkbox
                    checked={answer[item.id] || false}
                    onChange={handleChange}
                    name={item.id}
                    color='primary'
                  />
                }
                label={item.answer}
              />
            </div>
          );
        })}
      </FormGroup>

      {/*  <FormControl disabled={completed} component='fieldset'>
        <FormLabel component='legend'>{description}</FormLabel>
        <RadioGroup
          aria-label='qustion'
          name='qustion'
          value={answer ? answer : ''}
          onChange={handleChange}
        >
          {answers.map((item, index) => {
            classNameForAnswer = '';
            if (completed & (answer === item.id) & item.correct) {
              classNameForAnswer = 'correctAnswer';
            } else if (completed & (answer === item.id) & !item.correct) {
              classNameForAnswer = 'wrongAnswer';
            }
            return (
              <div key={item.id} className={classNameForAnswer}>
                <FormControlLabel
                  value={item.id}
                  color={
                    completed && answer === item.id && item.correct
                      ? 'primary'
                      : 'secondary'
                  }
                  control={<Radio />}
                  label={item.answer}
                />
              </div>
            );
          })}
        </RadioGroup>
      </FormControl> */}
    </div>
  );
}

export default Question;
