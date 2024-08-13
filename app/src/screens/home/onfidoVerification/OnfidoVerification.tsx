import {View} from 'react-native';
import React from 'react';
import onfidoController from './useOnfidoVerification';
import styles from './onfidoVerification.style';
import {CustomStatusBar, Header} from '@components';
import WebView from 'react-native-webview';
import constant from '@config/constant';

const Kyc: React.FC = () => {
  const {onStateChange, userId} = onfidoController();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header title="Identity Verification" />
      <WebView
        source={{
          uri: `${constant.webviewURL}${userId}`,
        }}
        style={styles.container}
        onNavigationStateChange={data => {
          onStateChange(data.url);
        }}
        mediaCapturePermissionGrantType="grant"
        javaScriptEnabled
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        cacheEnabled={false}
      />
    </View>
  );
};

export default Kyc;
