import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
import React from 'react';
import color from '@theme/color';
import SvgIndex from '@svgIndex';
import useDashboardController from './useDashboard';
import {
  AssetCard,
  Button,
  CustomStatusBar,
  EmptyComponent,
  Loader,
  PendingModal,
} from '@components';
import styles from './dashboard.style';
import Spinner from 'react-native-loading-spinner-overlay';
import imageIndex from '@imageIndex';
import {staticXLM} from './dashboard.const';

const Dashboard = () => {
  const {
    onOpenDrawer,
    onGenerateQR,
    onGeneratePayment,
    onNotification,
    onScan,
    dashboardData,
    onAddAsset,
    onSeeMore,
    refreshCall,
    onClickAsset,
    onClickWithdraw,
    walletPrivateData,
    onCopy,
    onSell,
    setDashboardData,
    onRefreshCall,
    onHistory,
  } = useDashboardController();
  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={color.blueShade}
        barStyle={'light-content'}
      />
      {/* {!dashboardData?.refreshing && (
        <Spinner visible={dashboardData?.loading} />
      )} */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.menu}
          activeOpacity={0.7}
          onPress={onOpenDrawer}>
          <SvgIndex.menu />
        </TouchableOpacity>
        <View style={styles.headerDivider}>
          <TouchableOpacity
            style={styles.scan}
            activeOpacity={0.7}
            onPress={onScan}>
            <SvgIndex.scan fill="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.notification}
            activeOpacity={0.7}
            onPress={onNotification}>
            <SvgIndex.notification />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.flexContainer}>
        {/* <Text allowFontScaling={false} style={styles.currentBalance}>
          Available Balance
        </Text> */}
        <View style={styles.main}>
          <Text allowFontScaling={false} style={styles.balanceText}>
            Available balance
          </Text>
          <Text allowFontScaling={false} style={styles.priceText}>
            $
            {parseFloat(dashboardData?.balance).toFixed(2)?.toString() == 'NaN'
              ? '0.0'
              : parseFloat(dashboardData?.balance).toFixed(2)}
          </Text>
        </View>

        <View style={styles.divider}>
          <TouchableOpacity
            style={styles.parent}
            activeOpacity={0.7}
            // onPress={onScan}
            onPress={onGenerateQR}>
            <View style={styles.logoContainer}>
              <Image source={imageIndex.scan} style={styles.logo} />
            </View>
            <Text style={styles.buttonLabel}>QR Code</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.parent, {marginHorizontal: 20}]}
            activeOpacity={0.7}
            onPress={onGeneratePayment}>
            {/* <SvgIndex.receiveIcon /> */}
            <View style={styles.logoContainer}>
              <Image source={imageIndex.link} style={styles.logo} />
            </View>
            <Text style={styles.buttonLabel}>Pay Link</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.parent, {marginRight: 20}]}
            activeOpacity={0.7}
            onPress={onSell}>
            <View style={styles.logoContainer}>
              <Image source={imageIndex.moneyWithdraw} style={styles.logo} />
            </View>
            <Text style={styles.buttonLabel}>Withdraw</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.parent}
            activeOpacity={0.7}
            onPress={onHistory}>
            <View style={styles.logoContainer}>
              <Image source={imageIndex.history} style={styles.logo} />
            </View>
            <Text style={styles.buttonLabel}>History</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.borderStyle} />

      {dashboardData?.assetData?.length > 0 && (
        <View style={styles.assetDivider}>
          <Text allowFontScaling={false} style={styles.assetText}>
            Assets
          </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={onAddAsset}>
            <SvgIndex.addRound />
          </TouchableOpacity>
        </View>
      )}
      <>
        {dashboardData?.loading ? (
          <Loader />
        ) : dashboardData?.assetData.length != 0 ? (
          <FlatList
            //@ts-ignore
            data={dashboardData?.assetData}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <AssetCard
                item={item}
                index={index}
                onClick={() => onClickAsset(item)}
              />
            )}
            keyExtractor={(_, index) => `${index}`}
            ListEmptyComponent={() => (
              <EmptyComponent title="No Data Available" />
            )}
            contentContainerStyle={styles.flatlistContainer}
            refreshControl={
              <RefreshControl
                refreshing={dashboardData?.refreshing}
                onRefresh={refreshCall}
              />
            }
          />
        ) : (
          <FlatList
            //@ts-ignore
            data={staticXLM}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <AssetCard
                //@ts-ignore
                item={item}
                index={index}
                onClick={() => onClickAsset(item)}
              />
            )}
            keyExtractor={(_, index) => `${index}`}
            ListEmptyComponent={() => (
              <EmptyComponent title="No Data Available" />
            )}
            contentContainerStyle={styles.flatlistContainer}
            refreshControl={
              <RefreshControl
                refreshing={dashboardData?.refreshing}
                onRefresh={refreshCall}
              />
            }
          />
        )}
      </>
      {dashboardData?.kycKybStatus?.kycStatus == 'Pending' &&
        dashboardData?.kycKybStatus?.kybStatus == 'Pending' && (
          <PendingModal
            visible={dashboardData?.kycModal}
            message="Your KYC Verification is in-progress !!"
            status="kyc"
            onPress={() => setDashboardData('kycModal', false)}
            refreshing={dashboardData?.modalRefreshing}
            onRefresh={onRefreshCall}
          />
        )}
    </View>
  );
};

export default Dashboard;
