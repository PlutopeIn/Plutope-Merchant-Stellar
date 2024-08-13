import {StyleSheet} from 'react-native';
import {color, font} from '@theme/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  main: {
    flex: 1,
  },
  scrollStyle: {
    flexGrow: 1,
  },
  subContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 10,
  },
  detailsText: {
    fontSize: 14,
    color: color.black,
    marginTop: 15,
    marginBottom: 30,
    lineHeight: 24,
  },
  buttonStyle: {
    marginHorizontal: 20,
    marginBottom: 40,
  },
  fontsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: color.inputBorder,
    marginTop: 15,
    paddingBottom: 15,
  },
  fontsText: {
    fontSize: 16,
    color: color.black,
    fontFamily: font.interRegular,
  },
  statusText: {
    fontSize: 12,
    color: color.darkGreen,
    fontFamily: font.interRegular,
    marginTop: 2,
  },
  arrowImage: {
    height: 15,
    width: 15,
    transform: [{rotate: '90deg'}],
  },
});

export default styles;
