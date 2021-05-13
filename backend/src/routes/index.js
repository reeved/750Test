import express from 'express';
import * as buttonDao from '../database/buttonDao';
const router = express.Router();

const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

router.post('/', async (req, res) => {
  const { buttonName } = req.body;
  const button = await buttonDao.createButton(buttonName);
  res.json(button);
});

router.get('/:btnName', async (req, res) => {
  const { btnName } = req.params;

  const button = await buttonDao.retrieveButton(btnName);

  if (button) {
    // // Artificially increase send time to show loading indicators on frontend
    setTimeout(() => {
      res.json(button);
    }, 1000);
  } else {
    // No buttons were found with the supplied name

    res.sendStatus(HTTP_NOT_FOUND);
  }
});

router.put('/:btnName', async (req, res) => {
  const { btnName } = req.params;
  const body = req.body;
  const success = await buttonDao.updateButton(btnName, body);
  res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
});

export default router;
