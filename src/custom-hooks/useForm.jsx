import { useState } from 'react';

export default function useForm(form) {
  const [formState, setFormState] = useState(form);

  function onInputChange(e) {
    let newState = { ...formState };
    let item = newState.formControls.find((c) => c.name === e.target.name);

    if (item) item.value = e.target.value;

    newState = validateState(newState);

    setFormState({ ...newState, formReset: false });
  }
  function validateState(state) {
    let newstate = ValidateRequired(state);

    newstate = ValidateOthers(newstate);
    return newstate;
  }
  function resetForm() {
    formState.formControls.forEach((c) => (c.value = ''));

    setFormState({ ...formState, formReset: true, isValidForm: false });
  }
  function ValidateOthers(newState) {
    for (let item of newState.formControls) {
      if (item && item?.validations && item.validations.length > 0) {
        for (let validator of item.validations) {
          switch (validator.type) {
            case 'Regex':
              if (!validator.value.test(item.value) && item.value.trim()) {
                validator.show = true;
                newState.isValidForm = false;
              } else {
                validator.show = false;
              }
              break;
            case 'Confirm':
              if (
                item.value !== newState.formControls.find((c) => c.name === validator.value)?.value
              ) {
                validator.show = true;
                newState.isValidForm = false;
              } else {
                validator.show = false;
              }
          }
        }
      }
    }
    return newState;
  }
  function ValidateRequired(newState) {
    if (newState.formControls.find((c) => (c.value === 'false' || !c.value.trim()) && c.required)) {
      newState.isValidForm = false;
    } else {
      newState.isValidForm = true;
    }
    return newState;
  }
  function getformValue() {
    const formValue = {};
    formState.formControls.forEach((c) => {
      const y = c.name;
      formValue[y] = c.value;
    });
    return formValue;
  }
  return [formState, onInputChange, resetForm, getformValue, setFormState, validateState];
}
