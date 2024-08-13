import {Keyboard} from 'react-native';
import SnackbarPackage from 'react-native-snackbar';

const Snackbar = (error: string): void => {
  setTimeout(() => Keyboard.dismiss(), 100);
  SnackbarPackage.show({text: error});
};

export default Snackbar;
