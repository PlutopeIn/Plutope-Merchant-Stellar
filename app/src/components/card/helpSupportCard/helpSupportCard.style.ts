import {color, font} from '@theme/index';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  borderContainer: {
    height: 1,
    backgroundColor: color.borderGray,
    marginVertical: 19,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    flex: 1,
    fontSize: 16,
    fontFamily: font.violetSansRegular,
    color: color.black,
  },
  detailsText: {
    flex: 1,
    fontSize: 14,
    fontFamily: font.interRegular,
    color: color.black,
    marginTop: 12,
  },
});

export default styles;
