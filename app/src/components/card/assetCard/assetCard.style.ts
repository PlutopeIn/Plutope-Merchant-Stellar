import {color, font} from '@theme/index';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  imageContent: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: color.borderGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 40,
    width: 40,
    resizeMode: 'cover',
    borderRadius: 20,
    backgroundColor: color.borderGray,
  },
  noImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  xlmImage: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  labelText: {
    fontSize: 16,
    color: color.black,
    fontFamily: font.violetSansRegular,
    lineHeight: 21,
    fontWeight: '400',
  },
  symbolText: {
    fontSize: 14,
    color: color.pencilGray,
    fontFamily: font.interRegular,
    lineHeight: 18,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: color.borderGray,
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: color.slateGray,
    height: 40,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 15,
    color: color.pencilGray,
    fontFamily: font.violetSansRegular,
  },
});

export default styles;
