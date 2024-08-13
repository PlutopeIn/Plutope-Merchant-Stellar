import {Image, Modal, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import color from '@theme/color';
import imageIndex from '@imageIndex';
import font from '@theme/font';

const WaitingTransaction: React.FC<WaitingTransactionprops> = ({visible}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <Image source={imageIndex.digital} style={styles.image} />
          <Text style={styles.transaction}>Transaction in-progress</Text>
          <Text style={styles.message}>Please don't close this window</Text>
        </View>
      </View>
    </Modal>
  );
};

export default memo(WaitingTransaction);

const styles = StyleSheet.create({
  message: {
    fontFamily: font.violetSansRegular,
    fontSize: 15,
    color: color.darkGray,
  },
  transaction: {
    fontFamily: font.violetSansRegular,
    fontSize: 17,
    color: color.black,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  modalContent: {
    height: 180,
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
