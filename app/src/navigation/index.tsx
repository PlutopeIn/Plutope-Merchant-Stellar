import React from 'react';
import AuthStack from './authStack/authStack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '@utility/navigationService';
import SplashScreen from 'react-native-splash-screen';

const Route = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => SplashScreen.hide()}>
      <AuthStack />
    </NavigationContainer>
  );
};

export default Route;
