import {axiosInstance} from '@api/api';
import constant from '@config/constant';
import {useResettableState} from '@hooks/useResettableState';
import {AuthNavigationProps} from '@navigation/authStack/authStack';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@utility/useReduxHooks';
import {useEffect, useState} from 'react';

const useNotificationController = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const [activeTab, setActiveTab] = useState<number>(1);
  const {token} = useAppSelector(state => state.userReducer);
  const [notificationData, setNotificationData] =
    useResettableState<NotificationProps>({
      notificationList: [],
      loading: false,
    });
  useEffect(() => {
    getNotification();
  }, []);
  const navigaterToTransaction = (item: NotificationListProps) => {
    navigation.navigate('transactionDetail', {details: item});
  };
  const getNotification = async () => {
    setNotificationData('loading', true);
    try {
      const {data} = await axiosInstance.get(constant.notificationList, {
        headers: {
          auth: token,
        },
      });
      setNotificationData('loading', false);
      setNotificationData('notificationList', data?.data);
    } catch (error) {
      setNotificationData('loading', false);
    }
  };
  const onSetting = () => {
    navigation.navigate('setting');
  };

  return {
    activeTab,
    setActiveTab,
    onSetting,
    notificationData,
    navigaterToTransaction,
  };
};

export default useNotificationController;
