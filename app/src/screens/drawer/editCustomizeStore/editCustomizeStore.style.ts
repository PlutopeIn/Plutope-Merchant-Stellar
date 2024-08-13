import {StyleSheet} from 'react-native';
import {color, font} from '@theme/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  subContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    height: 150,
    width: '72.5%',
    borderRadius: 12,
    marginRight: 12,
  },
  uploadCoverText: {
    fontSize: 18,
    color: color.black,
    fontFamily: font.violetSansRegular,
  },
  logoText: {
    fontSize: 16,
    color: color.black,
    lineHeight: 20,
    fontFamily: font.interRegular,
    borderWidth: 0.5,
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 12,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  coverImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  coverImage: {
    height: 150,
    width: '72.5%',
    borderRadius: 12,
    marginRight: 12,
  },
  coverImageText: {
    fontSize: 16,
    color: color.black,
    lineHeight: 20,
    fontFamily: font.interRegular,
    borderWidth: 0.5,
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 12,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  uploadButton: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: color.blueButton,
    borderRadius: 25,
    marginBottom: 16,
  },
  uploadText: {
    fontSize: 16,
    color: color.blueShade,
    padding: 15,
  },
  error: {
    fontSize: 12,
    color: color.red,
    fontFamily: font.interRegular,
    marginLeft: 5,
    marginBottom: 11,
  },
  fontsText: {
    fontSize: 18,
    color: color.black,
    marginBottom: 15,
    fontFamily: font.violetSansRegular,
  },
  arrowImage: {
    height: 20,
    width: 20,
    transform: [{rotate: '180deg'}],
  },
  buttonContainer: {
    marginTop: 15,
    marginBottom: 40,
    marginHorizontal: 16,
  },
});

export default styles;
