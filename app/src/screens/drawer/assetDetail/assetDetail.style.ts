import {color, font} from '@theme/index';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 15,
  },
  flatlistContainer: {
    flexGrow: 1,
  },
  priceText: {
    fontSize: 30,
    fontFamily: font.violetSansRegular,
    color: color.white,
    marginTop: 8,
  },
  currentBalance: {
    fontSize: 12,
    fontFamily: font.violetSansRegular,
    color: color.white,
    marginTop: 6,
  },
  currentText: {
    fontSize: 12,
    fontFamily: font.violetSansRegular,
    color: color.black,
    marginTop: 6,
  },
  transactionText: {
    fontSize: 16,
    fontFamily: font.violetSansRegular,
    color: color.black,
    marginTop: 25,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  divider: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
  },
  flexContainer: {
    minHeight: 250,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.blueShade,
    marginBottom: 20,
  },
  parent: {
    // flex: 0,
    // flexDirection: 'row',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.logoGreen,
    borderRadius: 25,
  },
  parentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  content: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    borderWidth: 1,
  },
  loader: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.borderGray,
  },
  graphContainer: {
    // height: 240,
    marginTop: 10,
  },
  graphStyle: {
    backgroundColor: color.borderGray,
    bottom: 20,
  },
  price: {
    backgroundColor: color.borderGray,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  graphDivider: {
    flexDirection: 'row',
    marginHorizontal: 17,
  },
  graphTextParent: {
    flex: 1,
    backgroundColor: color.blackTransparent,
    height: 30,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  graphText: {
    fontSize: 12,
    fontFamily: font.violetSansRegular,
    color: color.white,
  },
  timeText: {
    fontSize: 8,
    fontFamily: font.violetSansRegular,
    color: color.white,
  },
  rotateImage: {
    transform: [{rotate: '180deg'}],
  },
  timeDivider: {
    flexDirection: 'row',
    backgroundColor: color.green,
    bottom: 20,
  },
  timeContainer: {
    flex: 1,
    height: 30,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: 14,
    color: color.white,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default styles;
