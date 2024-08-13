import {color, font} from '@theme/index';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  labelText: {
    fontSize: 16,
    color: color.black,
    fontFamily: font.interRegular,
    flex: 1,
  },
  container: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: color.borderGray,
  },
});

export default styles;
