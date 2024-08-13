import {useState} from 'react';
import {Keyboard} from 'react-native';

const useDropDown = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleDropdown = (): void => {
    setOpen(!open);
    Keyboard.dismiss();
  };

  return {handleDropdown, open, setOpen};
};

export default useDropDown;
