import { Button } from '../database/schema';

export async function retrieveButton(name) {
  // Retrieves a button from the DB based on its {buttonName} property
  return await Button.findOne({ buttonName: name });
}

export async function updateButton(name, body) {
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

export async function createButton(name) {
  try {
    const dbButton = new Button({ buttonName: name });

    await dbButton.save();
    return dbButton;
  } catch (err) {
    console.log(err);
  }
}
