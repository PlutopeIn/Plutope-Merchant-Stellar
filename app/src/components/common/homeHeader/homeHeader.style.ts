import {StyleSheet} from 'react-native';
import {color} from '../../../theme';

const style = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: color.black,
  },
  menu: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 8,
  },
  notification: {
    height: 55,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 8,
    flex: 1,
    alignSelf: 'flex-end',
  },
  rightIcon: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 17.5,
    backgroundColor: color.yellow,
  },
  profile: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 15,
  },
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default style;
