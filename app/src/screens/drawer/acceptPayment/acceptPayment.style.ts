import {color, font} from '@theme/index';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  tabText: {
    fontSize: 13,
    fontFamily: font.interRegular,
  },
  tab1View: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    marginHorizontal: 8,
  },
  tabView: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 4,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  content: {
    flexGrow: 1,
    marginTop: 30,
    paddingBottom: 30,
  },
  rightIcon: {
    paddingRight: 10,
  },
});

export default styles;
