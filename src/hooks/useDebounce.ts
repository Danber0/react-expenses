import { useEffect, useState } from "react";

export const useDebounce = (value: string, sec: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, sec);

    return () => {
      clearTimeout(handler);
    };
  }, [value, sec]);

  return debouncedValue;
};
