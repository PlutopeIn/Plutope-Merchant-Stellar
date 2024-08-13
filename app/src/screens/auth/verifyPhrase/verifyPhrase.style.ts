import {StyleSheet} from 'react-native';
import {color, font} from '@theme/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  detailsText: {
    marginTop: 8,
    fontSize: 14,
    color: color.blackTransparent,
    fontFamily: font.interRegular,
  },
  content: {
    flexGrow: 1,
  },
  doneButtonContainer: {
    marginHorizontal: 16,
    marginTop: 15,
    marginBottom: 40,
  },
  buttonContainer: {
    flexGrow: 1,
  },
  errorText: {
    fontSize: 12,
    color: color.red,
    fontFamily: font.interRegular,
    textAlign: 'center',
    marginTop: 12,
  },
  flatListParent: {
    marginTop: 15,
  },
});

export default styles;
