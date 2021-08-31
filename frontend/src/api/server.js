import axios from 'axios';

let server = axios.create({
  baseURL: 'http://localhost:5000/api',
});

const testFile = [
  {
    description: 'simple test',
    steps: [
      {
        description: 'step 1',
        questions: [
          {
            id: 1,
            description: 'test',
            type: 1,
            answers: ['answers 1', 'answers 2', 'answers 3'],
            correctAnswer: [1],
          },
          {
            id: 2,
            description: 'test',
            type: 2,
            answers: [
              'answers 1',
              'answers 2',
              'answers 3',
              'answers 4',
              'answers 5',
            ],
            correctAnswer: [1, 3],
          },
        ],
      },
      {
        description: 'step 2',
        questions: [
          {
            id: 1,
            description: 'test 3',
            type: 1,
            answers: ['answers 1', 'answers 2', 'answers 3'],
            correctAnswer: [1],
          },
          {
            id: 2,
            description: 'test 4',
            type: 1,
            answers: [
              'answers 1',
              'answers 2',
              'answers 3',
              'answers 4',
              'answers 5',
            ],
            correctAnswer: [1, 3],
          },
        ],
      },
    ],
  },

  {
    description: 'test 2',
    steps: [
      {
        description: 'step 1',
        questions: [
          {
            id: 1,
            description: 'test',
            type: 1,
            answers: ['answers 1', 'answers 2', 'answers 3'],
            correctAnswer: [1],
          },
          {
            id: 2,
            description: 'test',
            type: 2,
            answers: [
              'answers 1',
              'answers 2',
              'answers 3',
              'answers 4',
              'answers 5',
            ],
            correctAnswer: [1, 3],
          },
        ],
      },
      {
        description: 'step 2',
        questions: [
          {
            id: 1,
            description: 'test 3',
            type: 1,
            answers: ['answers 1', 'answers 2', 'answers 3'],
            correctAnswer: [1],
          },
          {
            id: 2,
            description: 'test 4',
            type: 1,
            answers: [
              'answers 1',
              'answers 2',
              'answers 3',
              'answers 4',
              'answers 5',
            ],
            correctAnswer: [1, 3],
          },
        ],
      },
    ],
  },
];

(function convertData() {
  //const stepData = testFile;
  //console.log(stepData);
  testFile.forEach((testData) => {
    testData.steps.forEach((stepData) => {
      stepData.questions.forEach((question) => {
        question.answers = question.answers.map((item) => {
          return { title: item, correct: false };
        });
        question.correctAnswer.forEach(
          (item) => (question.answers[item].correct = true)
        );
      });
    });
  });
})();

export function getTestByID(id) {
  if (!(testFile.length < id)) {
    return testFile[id];
  }
  return null;
}

export function getStepByID(test, idStep) {
  if (!(test.steps.length < idStep)) {
    return test.steps[idStep];
  }
  return null;
}

export function getStepData(idTest, idStep) {
  const test = getTestByID(idTest);
  if (!test) {
    return null;
  }
  if (!(test.steps.length < idStep)) {
    const stepData = test.steps[idStep];

    return stepData;
  }
  return null;
}

export function getQuestion(idTest, idStep, idQuestion) {
  const test = getTestByID(idTest);
  if (test) {
    const step = getStepByID(test, idStep);
    if (step) {
      if (!(step.questions.length < idQuestion)) {
        return step.questions[idQuestion];
      }
    }
  }
  return null;
}

export function getTestDescription(idTest) {
  console.log(`id from server ${idTest}`);
  const test = getTestByID(idTest);
  console.log(test);
  if (!test) {
    return null;
  }
  const testDescription = {
    description: test.description,
    stepsCount: test.steps.length,
  };
  return testDescription;
}
export function getTestID() {
  const countOfTest = testFile.length - 1;
  return Math.floor(Math.random() * countOfTest);
}

class TestServise {
  async getNewTestData() {
    let data = await server.get('/tests/getRandomTest');
    if (data.status === 200) {
      return data.data;
    } else {
      return [];
    }
  }
  async startTest(idTest) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let data = await server.post('/tests/startTest', { id: idTest }, config);
    if (data.status === 200) {
      return data.data;
    } else {
      return [];
    }
  }

  async getNextTestStage(id) {
    let data = await server.get(`/tests/getNextTestStage/${id}`);
    if (data.status === 200) {
      return data.data;
    } else {
      return [];
    }
  }
  async getTestResult(id) {
    let data = await server.get(`/tests/getTestResult/${id}`);
    if (data.status === 200) {
      return data.data;
    } else {
      return [];
    }
  }

  async completeStage(data) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let res = await server.post('/tests/completCurrentStage', data, config);
    if (res.status === 200) {
      return res.data;
    } else {
      return [];
    }
  }
  async getQuestionWhithAnswers(id) {
    let res = await server.get(`/tests/getStageWhithAnswers/${id}`);
    if (res.status === 200) {
      return res.data;
    } else {
      return [];
    }
  }
}

export const testService = new TestServise();
