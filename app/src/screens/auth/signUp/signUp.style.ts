import {StyleSheet} from 'react-native';
import {color, font} from '@theme/index';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  keyboardContainer: {
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 15,
  },
  stellar: {
    fontSize: 32,
    color: color.primary,
    fontFamily: font.violetSansRegular,
    lineHeight: 44,
    marginTop: 10,
  },
  detailsText: {
    fontSize: 16,
    color: color.pencilGray,
    fontFamily: font.interRegular,
    lineHeight: 24,
    marginTop: 24,
  },
  inputMainContainer: {
    marginTop: 42,
  },
  button: {
    marginTop: 40,
  },
  infoText: {
    fontSize: 12,
    fontFamily: font.violetSansRegular,
    color: color.black,
    paddingHorizontal: 8,
    lineHeight: 22,
  },
  highlightText: {
    fontSize: 14,
    color: color.blueShade,
    textDecorationLine: 'underline',
  },
});

export default style;
