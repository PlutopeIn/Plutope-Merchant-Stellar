import {useState} from 'react';

export const useResettableState = <T extends object>(defaultValue: T) => {
  const [state, setState] = useState<T>(defaultValue);
  const resetState = () => setState(defaultValue);
  const updateState = <K extends keyof T>(key: K, value: T[K]) => {
    setState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  return [state, updateState, resetState, setState] as const;
};
