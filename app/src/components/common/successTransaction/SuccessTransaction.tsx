import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo} from 'react';
import color from '@theme/color';
import imageIndex from '@imageIndex';
import font from '@theme/font';

const SuccessTransaction: React.FC<SuccessTransactionprops> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <Image source={imageIndex.success} style={styles.image} />
          <Text style={styles.transaction}>Transaction Success</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.message}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default memo(SuccessTransaction);

const styles = StyleSheet.create({
  message: {
    fontFamily: font.violetSansRegular,
    fontSize: 20,
    color: color.green,
    marginTop: 25,
  },
  transaction: {
    fontFamily: font.violetSansRegular,
    fontSize: 22,
    color: color.black,
    marginTop: 25,
    fontWeight: 'bold',
  },
  image: {
    width: 85,
    height: 85,
    resizeMode: 'contain',
  },
  modalContent: {
    height: 250,
    marginHorizontal: 20,
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  container: {
    flex: 1,
    backgroundColor: color.blackTransparent,
    justifyContent: 'center',
  },
});
