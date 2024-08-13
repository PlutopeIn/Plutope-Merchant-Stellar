import {color, font} from '@theme/index';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  labelText: {
    flex: 1,
    fontSize: 14,
    color: color.black,
    fontFamily: font.violetSansRegular,
    marginLeft: 15,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});

export default styles;
