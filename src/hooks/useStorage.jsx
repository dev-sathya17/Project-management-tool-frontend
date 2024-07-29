import { useState } from "react";

const useStorage = () => {
  const [value, setValue] = useState("");

  const getValueFromStorage = (key) => {
    if (value) {
      return value;
    } else {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        setValue(storedValue);
        return storedValue;
      }
    }

    return undefined;
  };

  const setValueWithStorage = (key, Value) => {
    setValue(Value);
    localStorage.setItem(key, Value);
  };

  const removeValueFromStorage = (key) => {
    setValue("");
    localStorage.removeItem(key);
  };

  return {
    setValueWithStorage,
    removeValueFromStorage,
    getValueFromStorage,
  };
};

export default useStorage;
