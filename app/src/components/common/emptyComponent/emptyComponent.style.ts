import {font, color} from '@theme/index';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  emptyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 12,
    fontFamily: font.interRegular,
    color: color.black,
  },
});

export default styles;
