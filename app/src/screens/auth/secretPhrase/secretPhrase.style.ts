import color from '@theme/color';
import font from '@theme/font';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  subContainer: {
    marginHorizontal: 16,
    marginVertical: 20,
    flex: 1,
  },
  secretText: {
    fontSize: 24,
    lineHeight: 28,
    color: color.black,
    fontFamily: font.interRegular,
  },
  detailsText: {
    fontSize: 16,
    lineHeight: 20,
    color: color.black,
    fontFamily: font.interRegular,
    marginTop: 30,
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginBottom: 30,
  },
});

export default styles;
