import {View, Text} from 'react-native';
import React from 'react';
import useSecretPhrase from './useSecretPhrase';
import styles from './secretPhrase.style';
import {Button, CustomStatusBar, Header} from '@components';

const SecretPhrase: React.FC = () => {
  const {onBackupManually} = useSecretPhrase();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header title="Secret Phrase" />
      <View style={styles.subContainer}>
        <Text allowFontScaling={false} style={styles.secretText}>
          Secret Phrase Backup
        </Text>
        <Text allowFontScaling={false} style={styles.detailsText}>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id es{' '}
        </Text>
      </View>
      <Button
        title="Backup Manually"
        onPress={onBackupManually}
        containerStyle={styles.buttonContainer}
      />
    </View>
  );
};

export default SecretPhrase;
