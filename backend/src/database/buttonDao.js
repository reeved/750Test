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

export async function createButton(name) {
  const dbButton = new Button({ buttonName: name });

  await dbButton.save();
  return dbButton;
}
