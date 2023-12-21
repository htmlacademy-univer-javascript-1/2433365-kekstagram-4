import './scale.js';
import { sendData, setDataFromServer } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { setOnFormSubmit, onFormClose } from './validateForm.js';
import './filters.js';

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    onFormClose();
    showSuccessMessage();
  } catch (err) {
    showErrorMessage(err.message);
  }
});

setDataFromServer();
