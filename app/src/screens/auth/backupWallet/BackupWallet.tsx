import {View, Text} from 'react-native';
import React from 'react';
import styles from './backupWallet.style';
import {Button, CustomStatusBar, Header} from '@components';
import useBackupWallet from './useBackupWallet';

const BackupWallet: React.FC = () => {
  const {onUnderStand} = useBackupWallet();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header
        headerTitle="Backup your Wallet"
        detailText={`Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es ${'\n'}Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur ma ${'\n'}Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore`}
      />
      <View style={styles.subContainer}></View>
      <Button
        title="I Understand"
        onPress={onUnderStand}
        containerStyle={styles.buttonContainer}
      />
    </View>
  );
};

export default BackupWallet;
