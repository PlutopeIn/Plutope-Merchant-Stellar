import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, CustomStatusBar, Header} from '@components';
import styles from './transactionDetail.style';
import useTransactionDetail from './useTransactionDetail';
import imageIndex from '@imageIndex';
import moment from 'moment';
const TransactionDetail = () => {
  const {detail, viewStellar} = useTransactionDetail();
  return (
    <View style={styles.modalContainer}>
      <CustomStatusBar />
      <Header title={'Transaction Detail'} />
      {detail?.assetType != 'XLM' ? (
        <View style={styles.defaultImage}>
          <Image style={styles.image} source={imageIndex.noImage} />
        </View>
      ) : (
        <View style={styles.defaultImage}>
          <Image style={styles.image} source={imageIndex.asset} />
        </View>
      )}
      <Text allowFontScaling={false} style={styles.codeStyle}>
        {detail?.amount} {detail?.assetType}
      </Text>
      <Text allowFontScaling={false} style={[styles.typeText]}>
        {detail?.type}
      </Text>
      <>
        <View style={styles.divider}>
          <View style={{flex: 1, marginLeft: 10}}>
            <Text allowFontScaling={false} style={styles.labelStyle}>
              Sender
            </Text>
            <Text allowFontScaling={false} style={styles.timeText}>
              {detail?.toAddress}
            </Text>
          </View>
        </View>

        <View style={styles.divider}>
          <View style={{flex: 1, marginLeft: 10}}>
            <Text allowFontScaling={false} style={styles.labelStyle}>
              Receiver
            </Text>
            <Text allowFontScaling={false} style={styles.timeText}>
              {detail?.fromAddress}
            </Text>
          </View>
        </View>

        <View style={styles.dateView}>
          <Text allowFontScaling={false} style={styles.labelStyle}>
            Date
          </Text>
          <Text allowFontScaling={false} style={styles.timeText}>
            {moment(detail?.createdAt).format('D MMM YYYY hh:mm A')}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            paddingBottom: 30,
          }}>
          <Button
            title="View on Stellar"
            containerStyle={styles.buttonStyle}
            onPress={() => {
              viewStellar(detail);
            }}
          />
        </View>
      </>
    </View>
  );
};

export default TransactionDetail;
