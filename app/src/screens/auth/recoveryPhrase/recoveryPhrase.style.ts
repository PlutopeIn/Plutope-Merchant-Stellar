import {StyleSheet} from 'react-native';
import {color, font} from '@theme/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 14,
  },
  holdContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 17,
    height: 330,
    marginTop: 22,
    marginHorizontal: 17,
  },
  holdText: {
    fontSize: 20,
    color: color.black,
    fontFamily: font.interRegular,
    textAlign: 'center',
  },
  secretContainer: {
    backgroundColor: color.slateGray,
    marginHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyText: {
    fontSize: 14,
    color: color.pencilGray,
    marginLeft: 8,
    fontFamily: font.violetSansRegular,
  },
  copyImage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    backgroundColor: color.slateGray,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
  },
  alertImage: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  secretText: {
    fontSize: 12,
    color: color.pencilGray,
    fontFamily: font.interRegular,
    textAlign: 'center',
    marginLeft: 10,
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginTop: 15,
    marginBottom: 40,
  },
  content: {
    // flexGrow: 1,
    marginTop: 22,
  },
});

export default styles;
