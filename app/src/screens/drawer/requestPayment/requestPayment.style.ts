import {color, font} from '@theme/index';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    marginHorizontal: 16,
    marginTop: 20,
  },
  containerStyle: {
    paddingHorizontal: 20,
  },
  labelStyle: {
    fontSize: 13,
    color: color.black,
    fontFamily: font.violetSansRegular,
  },
  buttonStyle: {
    marginTop: 10,
  },
  inputMainContainer: {
    marginTop: 8,
  },
});

export default styles;
