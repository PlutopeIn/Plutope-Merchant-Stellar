import {AuthNavigationProps} from '@navigation/authStack/authStack';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {Dimensions, PermissionsAndroid, ScrollView} from 'react-native';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
const {width} = Dimensions.get('window');

const useGetStarted = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const scrollViewRef: any = useRef<ScrollView>();
  const [sliderState, setSliderState] = useState({currentPage: 0});
  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'Stellar Channel',
        channelName: 'Stellar Channel Name',
      },
      created => {},
    );
  }, []);
  useEffect(() => {
    requestUserPermission();
    requestNotificationPermission();
  }, []);
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
    }
  };

  const requestNotificationPermission = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    } catch (err) {}
  };
  const setSliderPage = (event: any) => {
    const {currentPage} = sliderState;
    const {x} = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.round(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };
  /** handle dot click function */
  const handleDotClick = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * width,
        animated: true,
      });
    }
  };
  /** navigate to login screen */
  const onPressSkip = () => {
    setSliderState({currentPage: 1});
  };
  /** navigate to login screen */
  const onPressNext = () => {
    navigation.navigate('login');
  };
  const onScroll = (event: any) => {
    setSliderPage(event);
  };
  const onSignupClick = () => {
    navigation.navigate('signUp');
  };
  return {
    sliderState,
    setSliderPage,
    scrollViewRef,
    handleDotClick,
    onPressNext,
    onPressSkip,
    onScroll,
    onSignupClick,
  };
};

export default useGetStarted;
