import {color, font} from '@theme/index';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  titleStyle: {
    fontFamily: font.interRegular,
    fontSize: 15,
    color: color.black,
  },
  filterContent: {
    height: 35,
    borderBottomWidth: 0.7,
    justifyContent: 'center',
    borderColor: color.borderGray,
  },
  modalContent: {
    backgroundColor: color.white,
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: color.blackTransparent,
  },
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  content: {
    flexGrow: 1,
    marginHorizontal: 20,
  },
  tabText: {
    fontSize: 13,
    fontFamily: font.interRegular,
  },
  arrow: {
    transform: [{rotate: '90deg'}],
  },
  dropdownContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  dropdownContent: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    backgroundColor: color.borderGray,
    flexDirection: 'row',
  },
  dropDownText: {
    fontSize: 13,
    fontFamily: font.interRegular,
    color: color.black,
  },
  flatlistContainer: {
    flexGrow: 1,
  },
  labelText: {
    fontSize: 13,
    fontFamily: font.interRegular,
    color: color.pencilGray,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 5,
  },
  tabView: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
  },
  tab1View: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    marginHorizontal: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 4,
    marginHorizontal: 20,
  },
  errorInfo: {
    fontSize: 16,
    fontFamily: font.interRegular,
    color: color.black,
    marginTop: 12,
    marginHorizontal: 20,
    lineHeight: 22,
  },
  errorText: {
    fontSize: 24,
    fontFamily: font.violetSansRegular,
    color: color.black,
    marginTop: 15,
  },
  emptyImage: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
