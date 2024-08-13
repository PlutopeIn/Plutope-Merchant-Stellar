import {
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {memo} from 'react';
import color from '@theme/color';
import imageIndex from '@imageIndex';
import font from '@theme/font';
import Button from '../button/Button';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProps} from '@navigation/authStack/authStack';
import SvgIndex from '@svgIndex';
const {height} = Dimensions.get('window');
const PendingModal: React.FC<PendingModalProps> = ({
  visible,
  message,
  status,
  onPress,
  onRefresh,
  refreshing,
}) => {
  const navigation = useNavigation<AuthNavigationProps>();
  const handleNavigation = (status: 'kyc' | 'kyb') => {
    if (status == 'kyc') {
      navigation.navigate('editKyc');
      onPress();
    } else {
      navigation.navigate('editKyb');
      onPress();
    }
  };
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={{flex: 1}}>
            <Text allowFontScaling={false} style={styles.detailsText}>
              {`PlutoPe follows the regulatory compliances to ensure that the users’ funds are safe and secure with every transaction. To ensure the legitimacy of your business account, you are required to complete the following 2 processes: ${'\n'}${'\n'}Completion of both the processes is essential for verifying the merchant account and identity. ${'\n'}${'\n'}`}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.fontsContainer}
              onPress={() => handleNavigation('kyc')}>
              <View style={styles.main}>
                <Text allowFontScaling={false} style={styles.fontsText}>
                  KYC - Know Your Customer
                </Text>
                <Text allowFontScaling={false} style={[styles.statusText]}>
                  {'Your verification is under progress'}
                </Text>
              </View>
              <SvgIndex.arrowRightBlack />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.fontsContainer}
              onPress={() => handleNavigation('kyb')}>
              <View style={styles.main}>
                <Text allowFontScaling={false} style={styles.fontsText}>
                  KYB - Know Your Business
                </Text>
                <Text allowFontScaling={false} style={[styles.statusText]}>
                  {'Your verification is under progress'}
                </Text>
              </View>
              {<SvgIndex.arrowRightBlack />}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default memo(PendingModal);

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  statusText: {
    fontSize: 12,
    color: color.yellowText,
    fontFamily: font.interRegular,
    marginTop: 2,
  },
  fontsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: color.inputBorder,
    marginTop: 15,
    paddingBottom: 15,
  },
  fontsText: {
    fontSize: 16,
    color: color.black,
    fontFamily: font.interRegular,
  },
  detailsText: {
    fontSize: 14,
    color: color.black,
    marginTop: 15,
  },
  viewText: {
    fontFamily: font.interRegular,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    color: color.blueShade,
  },
  message: {
    fontFamily: font.interRegular,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    color: color.black,
  },
  imageStyle: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  modalContent: {
    minHeight: height / 2,
    backgroundColor: color.white,
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: color.blackTransparent,
  },
});
