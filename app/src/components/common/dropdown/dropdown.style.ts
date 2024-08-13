import {StyleSheet} from 'react-native';
import {color, font} from '@theme/index';

const style = StyleSheet.create({
  mainContainer: {
    marginBottom: 16,
    zIndex: 1,
  },
  container: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 27,
    borderColor: color.inputBorder,
    borderWidth: 1,
    paddingHorizontal: 20,
    backgroundColor: color.white,
  },
  title: {
    fontSize: 16,
    fontFamily: font.interRegular,
    flex: 1,
  },
  dropdown: {
    transform: [{rotate: '180deg'}],
  },
  error: {
    fontSize: 12,
    color: color.red,
    fontFamily: font.interRegular,
    marginLeft: 10,
    marginTop: 5,
  },
  leftStyle: {
    marginRight: 20,
  },
  arrowStyle: {
    height: 15,
    width: 15,
  },
  dropdownContainer: {
    backgroundColor: color.white,
    borderRadius: 10,
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: color.borderGray,
    maxHeight: 150,
  },
  valueContainer: {
    paddingVertical: 13,
    paddingHorizontal: 13,
    borderBottomColor: color.inputBorder,
  },
  values: {
    fontSize: 12,
    color: color.black,
    fontFamily: font.interRegular,
  },
  emptyView: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default style;
