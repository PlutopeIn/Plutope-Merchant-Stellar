import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {
  Button,
  CustomStatusBar,
  Dropdown,
  HomeHeader,
  Input,
} from '@components';
import styles from './settlementPayment.style';
import useSettlementPayment from './useSettlementPayment';
import imageIndex from '@imageIndex';
import {bankData} from './settlementPayment.const';

const SettlementPayment: React.FC = () => {
  const {
    withdraw,
    onWithdraw,
    onAutomatePayment,
    onProceed,
    onProceedBankDetails,
    bankDetails,
    updateBankDetailsInputValue,
  } = useSettlementPayment();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <HomeHeader />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        bounces={false}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}>
        <Text style={styles.labelText}>Settlement Payments</Text>
        {!withdraw ? (
          <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
              <View style={styles.availableContainer}>
                <Image source={imageIndex.checked} style={styles.bookImage} />
                <View>
                  <Text allowFontScaling={false} style={styles.availableText}>
                    Available balance
                  </Text>
                  <Text allowFontScaling={false} style={styles.priceText}>
                    1000$
                  </Text>
                  <Button
                    title="Withdraw"
                    onPress={onWithdraw}
                    containerStyle={styles.withdrawButtonContainer}
                    titleStyle={styles.withdrawButtonText}
                  />
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.fontsContainer}
                onPress={onAutomatePayment}>
                <Text allowFontScaling={false} style={styles.fontsText}>
                  Automate Payments
                </Text>
                <Image source={imageIndex.upArrow} style={styles.arrowImage} />
              </TouchableOpacity>
            </View>
            <Button title="Proceed" onPress={onProceed} />
          </View>
        ) : (
          <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
              <Text allowFontScaling={false} style={styles.bankDetails}>
                Bank Details
              </Text>
              <Dropdown
                data={bankData}
                placeholder="Bank Name"
                value={bankDetails?.bankName}
                onPress={value =>
                  updateBankDetailsInputValue('bankName', value)
                }
                textStyle={styles.bankNameText}
                containerStyle={styles.bankNameContainer}
              />
              <Input
                placeholder="Account Number"
                value={bankDetails?.accountNumber}
                onChangeText={text =>
                  updateBankDetailsInputValue('accountNumber', text)
                }
              />
              <Input
                placeholder="Swift Code"
                value={bankDetails?.swiftCode}
                onChangeText={text =>
                  updateBankDetailsInputValue('swiftCode', text)
                }
              />
            </View>
            <Button title="Proceed" onPress={onProceedBankDetails} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SettlementPayment;
