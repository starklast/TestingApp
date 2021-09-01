import axios from 'axios';

let server = axios.create({
  baseURL: 'http://localhost:5000/api',
});

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
  async addTestFromJSON(data) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let res = await server.post('/admin/tests/add', data, config);
    if (res.status === 200) {
      return res.data;
    } else {
      return [];
    }
  }
}

export const testService = new TestServise();
