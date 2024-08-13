import {
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Text,
} from 'react-native';
import React from 'react';
import styles from './acceptPayment.style';
import {
  AcceptPaymentCard,
  CustomStatusBar,
  EmptyComponent,
  Header,
  Loader,
} from '@components';
import useAcceptPaymentController from './useAcceptPayment';
import color from '@theme/color';
import Spinner from 'react-native-loading-spinner-overlay';
import SvgIndex from '@svgIndex';

const AcceptPayment = () => {
  const {
    acceptPayment,
    refreshCall,
    onClickAdd,
    confirmCancel,
    changeTab,
    refreshAfterCancel,
  } = useAcceptPaymentController();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header
        title="Accept Payments"
        rightIcon={SvgIndex.add}
        rightIconStyle={styles.rightIcon}
        onRightIcon={onClickAdd}
      />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => changeTab(1)}
          style={[
            styles.tabView,
            {
              backgroundColor:
                acceptPayment.activeTab == 1 ? color.black : color.borderGray,
            },
          ]}>
          <Text
            allowFontScaling={false}
            style={[
              styles.tabText,
              {color: acceptPayment.activeTab == 1 ? color.white : color.black},
            ]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => changeTab(2)}
          style={[
            styles.tab1View,
            {
              backgroundColor:
                acceptPayment.activeTab == 2 ? color.black : color.borderGray,
            },
          ]}>
          <Text
            allowFontScaling={false}
            style={[
              styles.tabText,
              {color: acceptPayment.activeTab == 2 ? color.white : color.black},
            ]}>
            Paid
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => changeTab(3)}
          style={[
            styles.tab1View,
            {
              backgroundColor:
                acceptPayment.activeTab == 3 ? color.black : color.borderGray,
            },
          ]}>
          <Text
            allowFontScaling={false}
            style={[
              styles.tabText,
              {color: acceptPayment.activeTab == 3 ? color.white : color.black},
            ]}>
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => changeTab(4)}
          style={[
            styles.tab1View,
            {
              backgroundColor:
                acceptPayment.activeTab == 4 ? color.black : color.borderGray,
            },
          ]}>
          <Text
            allowFontScaling={false}
            style={[
              styles.tabText,
              {color: acceptPayment.activeTab == 4 ? color.white : color.black},
            ]}>
            Cancelled
          </Text>
        </TouchableOpacity>
      </View>
      {acceptPayment?.loading ? (
        <Loader />
      ) : (
        <FlatList
          data={acceptPayment?.data}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <AcceptPaymentCard
              item={item}
              index={index}
              onClick={() => null}
              onCancelClick={() => refreshAfterCancel()}
            />
          )}
          keyExtractor={(_, index) => `${index}`}
          contentContainerStyle={styles.content}
          ListEmptyComponent={<EmptyComponent title="No data available" />}
          refreshControl={
            <RefreshControl
              refreshing={acceptPayment?.refreshing}
              onRefresh={refreshCall}
            />
          }
        />
      )}
    </View>
  );
};

export default AcceptPayment;
