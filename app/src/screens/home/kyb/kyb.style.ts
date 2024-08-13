import {StyleSheet} from 'react-native';
import {color, font} from '@theme/index';

const styles = StyleSheet.create({
  error: {
    fontSize: 12,
    color: color.red,
    fontFamily: font.interRegular,
    marginLeft: 10,
    marginTop: 5,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 14,
    resizeMode: 'cover',
    overflow: 'hidden',
  },
  uploadCoverText: {
    fontSize: 14,
    color: color.black,
    fontFamily: font.violetSansRegular,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 3,
    paddingHorizontal: 10,
  },
  photoParent: {
    flex: 1,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: color.inputBorder,
  },
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    marginHorizontal: 16,
    marginTop: 10,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  countryTextStyle: {
    color: color.black,
  },
  buttonContainer: {
    marginTop: 15,
    marginBottom: 40,
  },
});

export default styles;
