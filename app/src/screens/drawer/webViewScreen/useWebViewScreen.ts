import {AuthParams} from '@navigation/authStack/authStack';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useState} from 'react';

const useWebViewScreen = () => {
  const route = useRoute<RouteProp<AuthParams, 'webViewScreen'>>();
  const [isLoading, setIsLoading] = useState(false);
  return {route, isLoading, setIsLoading};
};

export default useWebViewScreen;
