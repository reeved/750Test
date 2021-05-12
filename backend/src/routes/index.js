import express from 'express';
import { Button } from '../database/schema';

const router = express.Router();

// TODO Add some routes here. Remember that if you like, you can import them from other Routers in other files
// for better code organization.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

async function retrieveButton(name) {
  // Retrieves a button from the DB based on its {buttonName} property
  return await Button.findOne({ buttonName: name });
}

async function updateButton(name) {
  // Retrieves a button from the DB based on its {buttonName} property
  const button = await Button.findOne({ buttonName: name });

  if (button) {
    console.log('Button State:', button.state);
  }
}

router.get('/:btnName', async (req, res) => {
  const { btnName } = req.params;

  const button = await retrieveButton(btnName);
  console.log('Button: ', button);

  if (button) {
    res.json(button);
  } else {
    // No buttons were found with the supplied name
    res.sendStatus(HTTP_NOT_FOUND);
  }
  // res.json({ message: 'NICE:!' });
  console.log('GET REQUEST MADE');
});

router.put('/:btnName', async (req, res) => {
  const { btnName } = req.params;
  const button = req.body;
  article._id = id;
  constsuccess = awaitupdateArticle(article);
  res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
});

export default router;
