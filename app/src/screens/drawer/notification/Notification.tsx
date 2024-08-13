import {View, FlatList, TouchableOpacity, Text, Image} from 'react-native';
import React from 'react';
import {NotificationCard, CustomStatusBar, Header, Loader} from '@components';
import styles from './notification.style';
import {data} from './notification.const';
import color from '@theme/color';
import useNotificationController from './useNotification';
import imageIndex from '@imageIndex';
import svgIndex from '@svgIndex';

const Notification = () => {
  const {
    activeTab,
    setActiveTab,
    onSetting,
    notificationData,
    navigaterToTransaction,
  } = useNotificationController();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header
        title="Notifications"
        // rightIcon={svgIndex.setting}
        rightIconStyle={styles.rightIcon}
        onRightIcon={onSetting}
      />
      {notificationData?.loading ? (
        <Loader />
      ) : (
        <FlatList
          data={notificationData?.notificationList?.reverse()}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <NotificationCard
              item={item}
              index={index}
              onClick={() => navigaterToTransaction(item)}
            />
          )}
          keyExtractor={(_, index) => `${index}`}
          contentContainerStyle={styles.content}
          ListEmptyComponent={
            <View style={styles.errorContainer}>
              <Image style={styles.emptyImage} source={imageIndex.emptyImage} />
              <Text allowFontScaling={false} style={styles.errorText}>
                Empty
              </Text>
              <Text allowFontScaling={false} style={styles.errorInfo}>
                You currently have no notifications
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default Notification;
