import {font, color} from '@theme/index';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  addressText: {
    fontSize: 12,
    fontFamily: font.interLight,
    color: color.white,
    marginTop: 4,
  },
  secretText: {
    fontSize: 12,
    fontFamily: font.interLight,
    color: color.white,
    marginTop: 4,
    marginRight: 8,
  },
  nameText: {
    fontSize: 20,
    fontFamily: font.violetSansRegular,
    color: color.white,
  },
  nameContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  userImage: {
    height: 80,
    width: 80,
    resizeMode: 'cover',
    borderRadius: 14,
    backgroundColor: color.borderGray,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  backImage: {
    height: 183,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.gray58,
  },
  container: {
    flex: 1,
    backgroundColor: color.white,
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
