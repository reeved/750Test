import { Button } from '../database/schema';

export async function retrieveButton(name) {
  // Retrieves a button from the DB based on its {buttonName} property
  return await Button.findOne({ buttonName: name });
}

export async function updateButton(name, body) {
  // Updates a button from the DB based on its {buttonName} property and received update Data

  const result = await Button.findOneAndUpdate({ buttonName: name }, body, {
    new: true,
    useFindAndModify: false,
  });

  return result ? true : false;
}

export async function createButton(buttonName) {
  // Inserts a new Button based on its {buttonName} property to the DB
  const dbButton = new Button({ buttonName: buttonName });

  await dbButton.save();
  return dbButton;
}
