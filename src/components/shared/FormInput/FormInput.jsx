import React, { useState, useEffect, Fragment } from 'react';
import Form from 'react-bootstrap/Form';

export default function FormInput({ config, inputChange, rested }) {
  const [classesState, setClassesState] = useState('form-control py-4 pr-3');
  let input = (
    <input
      type={config.type}
      className={classesState}
      placeholder={config.placeHolder}
      tabIndex={config.tabIndex}
      required={config.required}
      onBlur={onInputBlur}
      value={config.value}
      onChange={inputChange}
      name={config.name}
    />
  );
  useEffect(() => {
    if (rested) setClassesState('form-control p-4');
  }, [rested]);
  function onInputBlur() {
    if ((config.required && !config.value.trim()) || config.validations?.find((c) => c.show)) {
      let newClasses = classesState.replace('is-valid', ' is-invalid');
      if (newClasses.indexOf('is-invalid') <= 0) {
        newClasses += ' is-invalid';
      }
      setClassesState(newClasses);
    } else {
      let newClasses = classesState.replace('is-invalid', ' is-valid');
      if (newClasses.indexOf('is-valid') <= 0) {
        newClasses += ' is-valid';
      }

      setClassesState(newClasses);
    }
  }
  let displayedInput =
    config.type == 'text' ? (
      <div className="form-group">
        <label>{config.label}</label>
        {input}
        {config.required && !config.value.trim() ? (
          <div className="invalid-feedback">{config.errorMessage || ''}</div>
        ) : null}
        {config.validations?.map((validator) => {
          return validator.show ? (
            <div className="invalid-feedback">{validator.message}</div>
          ) : null;
        })}
      </div>
    ) : (
      ''
    );
  return <Fragment>{displayedInput}</Fragment>;
}
