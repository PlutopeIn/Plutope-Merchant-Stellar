import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React from 'react';
import kybProcessController from './useKybProcess';
import styles from './kybProcess.style';
import {Button, CustomStatusBar, Header} from '@components';
import SvgIndex from '@svgIndex';
import color from '@theme/color';

const KybProcess: React.FC = () => {
  const {
    onKyb,
    onKyc,
    onUpdate,
    disabled,
    kybStatus,
    kycStatus,
    refreshing,
    onRefreshCall,
  } = kybProcessController();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header title="Start KYB Registration" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollStyle}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefreshCall} />
        }>
        <View style={styles.subContainer}>
          <Text allowFontScaling={false} style={styles.detailsText}>
            {`PlutoPe follows the regulatory compliances to ensure that the users’ funds are safe and secure with every transaction. To ensure the legitimacy of your business account, you are required to complete the following 2 processes: ${'\n'}${'\n'}Completion of both the processes is essential for verifying the merchant account and identity. ${'\n'}${'\n'}Start here:`}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={kycStatus ? true : false}
            style={styles.fontsContainer}
            onPress={onKyc}>
            <View style={styles.main}>
              <Text allowFontScaling={false} style={styles.fontsText}>
                KYC - Know Your Customer
              </Text>
              {kycStatus && (
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.statusText,
                    {
                      color:
                        kycStatus == 'Pending'
                          ? color.yellowText
                          : kycStatus == 'Approved'
                          ? color.darkGreen
                          : color.red,
                    },
                  ]}>
                  {kycStatus == 'Pending'
                    ? 'Your verification is under progress'
                    : kycStatus == 'Approved'
                    ? 'Approved'
                    : 'Rejected'}
                </Text>
              )}
            </View>
            {!kycStatus ? <SvgIndex.arrowRightBlack /> : <SvgIndex.right />}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={kybStatus ? true : false}
            style={styles.fontsContainer}
            onPress={onKyb}>
            <View style={styles.main}>
              <Text allowFontScaling={false} style={styles.fontsText}>
                KYB - Know Your Business
              </Text>
              {kybStatus && (
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.statusText,
                    {
                      color:
                        kybStatus == 'Pending'
                          ? color.yellowText
                          : kybStatus == 'Approved'
                          ? color.darkGreen
                          : color.red,
                    },
                  ]}>
                  {kybStatus == 'Pending'
                    ? 'Your verification is under progress'
                    : kybStatus == 'Approved'
                    ? 'Approved'
                    : 'Rejected'}
                </Text>
              )}
            </View>
            {!kybStatus ? <SvgIndex.arrowRightBlack /> : <SvgIndex.right />}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Button
        disabled={disabled}
        title="Submit"
        onPress={onUpdate}
        containerStyle={styles.buttonStyle}
      />
    </View>
  );
};

export default KybProcess;
