import {StyleSheet} from 'react-native';
import {color, font} from '@theme/index';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  details: {
    marginTop: 15,
    fontSize: 16,
    color: color.darkGray,
  },
  subContainer: {
    flex: 1,
  },
  fontsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    marginTop: 15,
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 45,
  },
  fontsText: {
    fontSize: 16,
    color: color.black,
    lineHeight: 20,
    fontFamily: font.interRegular,
    flex: 1,
    paddingVertical: 10,
  },
  arrowImage: {
    height: 20,
    width: 20,
    transform: [{rotate: '90deg'}],
  },
  checkedContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkedIcon: {
    height: 25,
    width: 25,
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 14,
  },
  welcome: {
    fontSize: 22,
    color: color.black,
    fontFamily: font.interRegular,
    lineHeight: 26,
    textAlign: 'center',
    marginTop: 40,
  },
  accept: {
    fontSize: 14,
    color: color.black,
    fontFamily: font.interRegular,
    lineHeight: 18,
    justifyContent: 'flex-end',
    marginLeft: 10,
    flex: 1,
  },
  button: {
    marginHorizontal: 16,
    marginVertical: 30,
  },
});

export default style;
