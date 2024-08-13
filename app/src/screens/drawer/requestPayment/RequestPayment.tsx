import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import {
  Button,
  CountryNameModal,
  CustomStatusBar,
  Header,
  Input,
} from '@components';
import styles from './requestPayment.style';
import useRequestPayment from './useRequestPayment';
import {space} from '@utility/validation/commonVariable';

const RequestPayment = () => {
  const {
    requestPaymentData,
    setRequestPaymentData,
    errorObject,
    validation,
    formatPrice,
  } = useRequestPayment();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header title="Request Payment" />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.labelStyle}>Account to request from</Text>
          <Input
            placeholder="Enter recipient email"
            value={requestPaymentData?.email}
            onChangeText={text =>
              setRequestPaymentData('email', text?.toLowerCase()?.trim())
            }
            mainContainerStyle={styles.inputMainContainer}
            containerStyle={styles.containerStyle}
            inputProps={{
              keyboardType: 'email-address',
              maxLength: 255,
            }}
            error={errorObject?.emailError}
          />
          <Text style={styles.labelStyle}>Amount</Text>
          <Input
            placeholder="Enter amount"
            value={requestPaymentData?.amount}
            onChangeText={text => formatPrice(text?.trim())}
            mainContainerStyle={styles.inputMainContainer}
            containerStyle={styles.containerStyle}
            inputProps={{maxLength: 25, keyboardType: 'number-pad'}}
            error={errorObject?.amountError}
          />
          <Text style={[styles.labelStyle, {marginBottom: 8}]}>Currency</Text>
          <CountryNameModal
            placeholder="Select currency"
            leftIcon
            searchLabel="Select currency"
            value={requestPaymentData?.currency}
            isWholeItem
            setCountryName={(item: any) =>
              setRequestPaymentData('currency', item)
            }
            isSelectedItem={(item: any) =>
              setRequestPaymentData('issuer', item)
            }
            data={requestPaymentData?.assetList}
            error={errorObject?.currencyError}
          />
          <Text style={styles.labelStyle}>Message</Text>
          <Input
            placeholder="Describe the request (optional)"
            value={requestPaymentData?.message}
            onChangeText={text =>
              setRequestPaymentData(
                'message',
                text?.trimStart().replace(space, ' '),
              )
            }
            mainContainerStyle={styles.inputMainContainer}
            containerStyle={styles.containerStyle}
            inputProps={{maxLength: 255}}
          />
          <Button
            loading={requestPaymentData?.load}
            title="Request Payment"
            containerStyle={styles.buttonStyle}
            onPress={validation}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RequestPayment;
