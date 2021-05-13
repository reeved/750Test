import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import axios from 'axios';
import routes from '../index';
import { Button } from '../../database/schema';

let mongod, app, server;

const dummyButton2 = {
  buttonName: 'Button2',
  state: true,
  clickCount: 4,
};

const dummyButton3 = {
  buttonName: 'Button3',
  state: false,
  clickCount: 10,
};

beforeAll(async (done) => {
  mongod = new MongoMemoryServer();

  await mongod
    .getUri()
    .then((cs) => mongoose.connect(cs, { useNewUrlParser: true, poolSize: 1 }));

  app = express();
  // I had to put the two .use methods in this order for my tests to run??
  app.use('/', routes);
  app.use(express.json());

  server = app.listen(3001, () => done());
});

beforeEach(async () => {
  await Button.insertMany([dummyButton2, dummyButton3]);
  // console.log('RESPONSE FROM INSERTMANY:', resp);
});

afterEach(async () => {
  await Button.deleteMany({});
});

afterAll((done) => {
  server.close(async () => {
    await mongoose.disconnect();
    await mongod.stop();
    done();
  });
});

it('Retrieves a single Button successfully', async () => {
  const response = await axios.get('http://localhost:3001/Button2');

  expect(response.status).toBe(200);
  const responseButton = response.data;
  expect(responseButton.buttonName).toEqual(dummyButton2.buttonName);
  expect(responseButton.state).toEqual(dummyButton2.state);
  expect(responseButton.clickCount).toEqual(dummyButton2.clickCount);
});

it('Fail to retrieve a nonexistant button', async () => {
  try {
    await axios.get('http://localhost:3001/Button1');
    fail('Should have thrown an exception.');
  } catch (err) {
    const { response } = err;
    expect(response).toBeDefined();
    expect(response.status).toBe(404);
  }
});

it('Create a new Button', async () => {
  const response = await axios
    .post('http://localhost:3001/Button5')
    .catch((err) => {
      console.log(err);
      fail('ERROR POSTING');
    });

  const responseButton = response.data;
  expect(responseButton._id).toBeDefined();
  expect(responseButton.buttonName).toEqual('Button5');
  expect(responseButton.state).toEqual(false);
  expect(responseButton.clickCount).toEqual(0);
});
