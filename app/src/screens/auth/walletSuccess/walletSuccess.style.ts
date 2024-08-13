import {StyleSheet} from 'react-native';
import {color, font} from '@theme/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  subContainer: {
    marginHorizontal: 16,
    flex: 1,
    justifyContent: 'center',
  },
  addressContainer: {
    borderWidth: 1,
    borderColor: color.inputBorder,
    borderRadius: 15,
    padding: 8,
    marginTop: 15,
    alignSelf: 'center',
  },
  addressText: {
    fontSize: 16,
    color: color.primary,
    lineHeight: 22,
    fontFamily: font.interRegular,
    textAlign: 'center',
  },
});

export default styles;
