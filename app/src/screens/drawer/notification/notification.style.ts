import {color, font} from '@theme/index';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  rightIcon: {
    paddingHorizontal: 10,
  },
  content: {
    flexGrow: 1,
    marginHorizontal: 20,
  },
  tabText: {
    fontSize: 14,
    fontFamily: font.interRegular,
  },
  tabView: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
  },
  tab1View: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    marginHorizontal: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 4,
    marginHorizontal: 20,
  },
  errorInfo: {
    fontSize: 16,
    fontFamily: font.interRegular,
    color: color.black,
    marginTop: 12,
    marginHorizontal: 20,
    lineHeight: 22,
  },
  errorText: {
    fontSize: 24,
    fontFamily: font.violetSansRegular,
    color: color.black,
    marginTop: 15,
  },
  emptyImage: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
