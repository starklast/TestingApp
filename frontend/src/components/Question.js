import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { sendAnswer } from '../actions/answerActions';
import './question.css';

function Question({ data: { id, description, answers, completed } }) {
  const dispatch = useDispatch();
  const answer = useSelector((state) => state.answers[id]);
  //const [answer, setAnswer] = React.useState('');
  console.log(`{ component Question } completed=${completed} answer=${answer}`);

  const handleChange = (event) => {
    chancgeAnswer(event.target.value);
  };

  const chancgeAnswer = (data) => {
    // setAnswer(data);
    dispatch(sendAnswer({ id, data }));
  };

  useEffect(() => {
    if (!completed) {
      //setAnswer('');
      dispatch(sendAnswer({ id, data: '' }));
    }
  }, [id, completed, dispatch]);
  let classNameForAnswer = '';
  return (
    <div>
      <FormControl disabled={completed} component='fieldset'>
        {/* <FormControl component='fieldset'> */}
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
      </FormControl>
    </div>
  );
}

export default Question;
