import {StyleSheet} from 'react-native';
import {color, font} from '@theme/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  subContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 40,
  },
  appLockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  appLockText: {
    flex: 1,
    fontSize: 16,
    color: color.black,
    fontFamily: font.interRegular,
  },
  borderContainer: {
    height: 1,
    backgroundColor: color.borderGray,
    marginVertical: 20,
  },
});

export default styles;
