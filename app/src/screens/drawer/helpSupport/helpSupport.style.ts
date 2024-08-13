import {StyleSheet} from 'react-native';
import {color, font} from '@theme/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  subContainer: {
    flex: 1,
    marginTop: 25,
    marginHorizontal: 16,
  },
  mainContainer: {
    flex: 1,
  },
  searchContainer: {
    borderColor: color.transparent,
  },
  flatlistStyle: {
    marginTop: 21,
    flex: 1,
  },
  flatlistContentContainer: {
    flexGrow: 1,
  },
  howHelpText: {
    fontSize: 20,
    color: color.black,
    fontFamily: font.violetSansRegular,
    textAlign: 'center',
    marginTop: 50,
  },
  detailText: {
    fontSize: 16,
    color: color.black,
    fontFamily: font.interRegular,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    marginTop: 24,
  },
  globalStyle: {
    backgroundColor: color.blueShade,
    padding: 8,
    borderRadius: 50,
  },
  smsStyle: {
    backgroundColor: color.blueShade,
    padding: 8,
    borderRadius: 50,
    marginHorizontal: 15,
  },
  callStyle: {
    backgroundColor: color.blueShade,
    padding: 8,
    borderRadius: 50,
  },
});

export default styles;
