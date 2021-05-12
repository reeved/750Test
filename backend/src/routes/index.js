import express from 'express';
import { Button } from '../database/schema';

const router = express.Router();

const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

async function retrieveButton(name) {
  // Retrieves a button from the DB based on its {buttonName} property
  return await Button.findOne({ buttonName: name });
}

async function updateButton(name, body) {
  // Retrieves a button from the DB based on its {buttonName} property
  const dbButton = await Button.findOne({ buttonName: name });

  if (dbButton) {
    // Updates the button's state
    dbButton.state = body.newState;
    dbButton.clickCount = body.clicks;

    // Saves the changes to the DB
    await dbButton.save();

    return true;
  }

  // Update fails if no button with the matching name was found
  return false;
}

router.get('/:btnName', async (req, res) => {
  const { btnName } = req.params;

  const button = await retrieveButton(btnName);

  if (button) {
    res.json(button);
  } else {
    // No buttons were found with the supplied name
    res.sendStatus(HTTP_NOT_FOUND);
  }
});

router.put('/:btnName', async (req, res) => {
  const { btnName } = req.params;
  const body = req.body;
  const success = await updateButton(btnName, body);
  res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
});

export default router;
