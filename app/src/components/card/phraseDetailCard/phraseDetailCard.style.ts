import {StyleSheet} from 'react-native';
import {color, font} from '@theme/index';

const styles = StyleSheet.create({
  labelTextView: {
    width: '22%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
    paddingVertical: 7,
    backgroundColor: color.inputBorder,
    marginRight: 8,
    borderRadius: 9,
  },
  labelTextStyle: {
    fontSize: 12,
    color: color.black,
    fontFamily: font.interRegular,
  },
});

export default styles;
