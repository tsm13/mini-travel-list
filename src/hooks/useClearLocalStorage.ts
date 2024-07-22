import { useEffect, useState } from "react";

export function useClearLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    const storedValue = JSON.parse(localStorage.getItem(key)) || initialState;
    return storedValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  const removeValue = (item) => {
    console.log(item);
  };

  return [removeValue];
}
