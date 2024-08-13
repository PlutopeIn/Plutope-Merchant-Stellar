import {color, font} from '@theme/index';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  flatlistContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    marginTop: 15,
    paddingBottom: 15,
  },
  textInputStyle: {
    flex: 1,
    color: color.black,
    fontSize: 14,
    fontFamily: font.interRegular,
    height: 54,
    borderRadius: 30,
    alignSelf: 'center',
  },
  searchStyle: {
    marginHorizontal: 20,
  },
});

export default styles;
