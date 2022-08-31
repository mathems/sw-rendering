import { useState, useEffect } from "react";

// custom hook for debouncing
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    }
  } , [value, delay]);

  return [debouncedValue];
}