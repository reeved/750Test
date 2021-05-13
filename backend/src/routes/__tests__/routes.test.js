import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import axios from 'axios';
import routes from '../index';
import { Button } from '../../database/schema';

let mongod, app, server;

// DUMMY BUTTONS - used to populate DB for each test
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
  app.use(express.json());
  app.use('/', routes);

  server = app.listen(3001, () => done());
});

beforeEach(async () => {
  // Populates DB with Buttons for tests
  await Button.insertMany([dummyButton2, dummyButton3]);
});

afterEach(async () => {
  // Cleans up DB to remove any mess from each test
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
  // Should fail since Button1 shouldn't exist in DB
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
  const body = {
    buttonName: 'Button5',
  };

  const response = await axios
    .post('http://localhost:3001', body)
    .catch((err) => {
      console.log(err);
      fail('ERROR POSTING');
    });

  // Checks response received by request
  const responseButton = response.data;
  expect(responseButton._id).toBeDefined();
  expect(responseButton.buttonName).toEqual('Button5');
  expect(responseButton.state).toEqual(false);
  expect(responseButton.clickCount).toEqual(0);

  // Verifies that button was actually saved to DB
  const dbResponse = await axios.get('http://localhost:3001/Button5');

  const dbButton = dbResponse.data;
  expect(dbButton.buttonName).toEqual('Button5');
  expect(dbButton.state).toEqual(false);
  expect(dbButton.clickCount).toEqual(0);
});

it('Tries to update a button successfully', async () => {
  const body = {
    state: true,
    clickCount: 10,
  };

  const response = await axios
    .put('http://localhost:3001/Button2', body)
    .catch((err) => {
      console.log(err);
      fail('ERROR POSTING');
    });

  // Checks if update was successful
  expect(response.status).toEqual(204);

  // Verifies that button was actually updated to DB
  const dbResponse = await axios.get('http://localhost:3001/Button2');

  const dbButton = dbResponse.data;
  expect(dbButton.buttonName).toEqual('Button2');
  expect(dbButton.state).toEqual(true);
  expect(dbButton.clickCount).toEqual(10);
});
