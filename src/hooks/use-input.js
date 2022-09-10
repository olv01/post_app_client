import { useReducer } from "react";


const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isValid: action.isValid,
      isTouched: state.isTouched,
    };
  }
  if (action.type === "BLUR") {
    return {
      isTouched: true,
      value: state.value,
      isValid: state.isValid,
    };
  }
  if (action.type === "VALIDATE") {
    return {
      isTouched: state.isTouched,
      value: state.value,
      isValid: true,
    };
  }
  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }

  return inputStateReducer;
};

const defaultValidator = (s) => s !== "";

export const useInput = (validateValue = defaultValidator , initValue = "") => {
  // input can have some init value
  const [inputState, dispatch] = useReducer(inputStateReducer, {
    value: initValue,
    isValid: initValue ? validateValue(initValue) : false,
    isTouched: false,
  });

  const valueChangeHandler = (event) => {
    dispatch({
      type: "INPUT",
      value: event.target.value,
      isValid: validateValue(event.target.value),
    });
  };

  const inputBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const validate = () => {
    dispatch({ type: "VALIDATE" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  // it has an error with false validity only if it's been touched
  const hasError = !validateValue(inputState.value) && inputState.isTouched;

  return {
    value: inputState.value,
    isValid: inputState.isValid,
    hasError: hasError,
    valueChangeHandler,
    inputBlurHandler,
    validate,
    reset,
  };
};
