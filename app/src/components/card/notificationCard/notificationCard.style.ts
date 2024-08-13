import {color, font} from '@theme/index';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  countText: {
    fontSize: 14,
    color: color.black,
    fontFamily: font.interRegular,
  },
  dayText: {
    fontSize: 16,
    color: color.black,
    fontFamily: font.violetSansRegular,
    flex: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 14,
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'cover',
    borderRadius: 25,
  },
  labelText: {
    fontSize: 16,
    color: color.black,
    fontFamily: font.violetSansRegular,
    lineHeight: 22,
  },
  timeText: {
    fontSize: 12,
    color: color.black,
    fontFamily: font.interRegular,
    marginTop: 4,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.3,
    borderColor: color.borderGray,
  },
});

export default styles;
