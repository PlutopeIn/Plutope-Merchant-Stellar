import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import useSecurity from './useSecurity';
import styles from './security.style';
import {CustomStatusBar, CustomSwitch, Header} from '@components';
import SvgIndex from '@svgIndex';

const Security: React.FC = () => {
  const {security, updatesecurityValue} = useSecurity();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header title="Security" />
      <View style={styles.subContainer}>
        <TouchableOpacity style={styles.appLockContainer}>
          <Text allowFontScaling={false} style={styles.appLockText}>
            App Lock
          </Text>
          <CustomSwitch
            value={security?.appLock}
            onPress={() => updatesecurityValue('appLock', !security?.appLock)}
          />
        </TouchableOpacity>
        <View style={styles.borderContainer} />
        <TouchableOpacity style={styles.appLockContainer}>
          <Text allowFontScaling={false} style={styles.appLockText}>
            Auto-Lock
          </Text>
          <SvgIndex.arrowRightBlack />
        </TouchableOpacity>
        <View style={styles.borderContainer} />
        <TouchableOpacity style={styles.appLockContainer}>
          <Text allowFontScaling={false} style={styles.appLockText}>
            Lock Method
          </Text>
          <SvgIndex.arrowRightBlack />
        </TouchableOpacity>
        <View style={styles.borderContainer} />
        <TouchableOpacity style={styles.appLockContainer}>
          <Text allowFontScaling={false} style={styles.appLockText}>
            Transaction Signing
          </Text>
          <CustomSwitch
            value={security?.transactionSigning}
            onPress={() =>
              updatesecurityValue(
                'transactionSigning',
                !security?.transactionSigning,
              )
            }
          />
        </TouchableOpacity>
        <View style={styles.borderContainer} />
        <TouchableOpacity style={styles.appLockContainer}>
          <Text allowFontScaling={false} style={styles.appLockText}>
            Security Scanner
          </Text>
          <CustomSwitch
            value={security?.securityScanner}
            onPress={() =>
              updatesecurityValue('securityScanner', !security?.securityScanner)
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Security;
