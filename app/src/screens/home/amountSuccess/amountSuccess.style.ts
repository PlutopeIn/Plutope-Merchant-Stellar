import color from '@theme/color';
import font from '@theme/font';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookImage: {
    height: 250,
    width: 250,
    resizeMode: 'contain',
  },
  availableText: {
    fontSize: 28,
    lineHeight: 32,
    color: color.granite,
    fontFamily: font.violetSansRegular,
    marginVertical: 20,
  },
  withdrawButtonContainer: {
    marginTop: 20,
    width: '70%',
  },
});

export default styles;
