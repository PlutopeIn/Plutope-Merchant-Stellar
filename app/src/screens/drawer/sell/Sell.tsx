import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import color from '@theme/color';
import {
  CustomStatusBar,
  Header,
  SuccessTransaction,
  WaitingTransaction,
} from '@components';
import WebView from 'react-native-webview';
import constant from '@config/constant';
import useSell from './useSell';

const Sell = () => {
  const {sellState, setSellState, ref, moonPayApi, onClose} = useSell();

  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header title="Sell" />
      <WaitingTransaction visible={sellState.loading} />
      <SuccessTransaction
        visible={sellState.successTransaction}
        onClose={onClose}
      />
      <WebView
        source={{uri: constant.moonpaySellWebView}}
        onLoad={() => setSellState('load', false)}
        style={styles.webview}
        ref={ref}
        onNavigationStateChange={res => {
          moonPayApi(res);
        }}
      />
      {sellState.load && (
        <ActivityIndicator
          size={'large'}
          color={color.black}
          style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0}}
        />
      )}
    </View>
  );
};

export default Sell;

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
});
