import {View, ActivityIndicator} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import styles from './webViewScreen.style';
import {CustomStatusBar, Header} from '@components';
import useWebViewScreen from './useWebViewScreen';

const WebViewScreen = () => {
  const {route, isLoading, setIsLoading} = useWebViewScreen();

  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header title={route?.params?.title ?? ''} />
      <WebView
        //@ts-ignore
        source={{uri: route?.params?.link}}
        style={styles.container}
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
      />
      {isLoading && (
        <ActivityIndicator size={'small'} style={styles.indicatorStyle} />
      )}
    </View>
  );
};

export default WebViewScreen;
