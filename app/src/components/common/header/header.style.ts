import {StyleSheet} from 'react-native';
import {color, font} from '@theme/index';

const style = StyleSheet.create({
  header: {
    paddingTop: 8,
  },
  headerText: {
    fontSize: 32,
    color: color.black,
    fontFamily: font.violetSansRegular,
    marginTop: 30,
    marginHorizontal: 12,
  },
  detailsText: {
    fontSize: 14,
    color: color.black,
    fontFamily: font.interRegular,
    lineHeight: 24,
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: 12,
  },
  mainContainer: {
    backgroundColor: color.white,
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRightColor: color.red,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageBackground: {
    resizeMode: 'cover',
    height: 120,
    zIndex: 1,
  },
  backIcon: {
    paddingVertical: 15,
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    color: color.black,
    fontFamily: font.violetSansRegular,
  },
  rightIconTouch: {
    height: 35,
    width: 30,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightTextTouch: {
    padding: 5,
    marginRight: 15,
  },
  rightText: {
    fontSize: 14,
    color: color.greyTransparent,
    fontFamily: font.interRegular,
  },
  logo: {
    height: 50,
    width: 100,
    marginLeft: 7,
    marginBottom: 7,
  },
  gifTouchable: {
    alignSelf: 'flex-start',
  },
});

export default style;
