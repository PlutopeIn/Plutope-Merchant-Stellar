import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  Dimensions,
  StatusBar,
} from 'react-native';
import React from 'react';
import {
  CustomStatusBar,
  EmptyComponent,
  Header,
  TransactionCard,
} from '@components';
import styles from './assetDetail.style';
import SvgIndex from '@svgIndex';
import useAssetDetail from './useAssetDetail';
import color from '@theme/color';

const {height, width} = Dimensions.get('window');

const AssetDetail = () => {
  const {
    onSend,
    onReceive,
    route,
    onSell,
    detail,
    refreshCall,
    onBuy,
    data,
    graphLoader,
    onDayChange,
    activeIndex,
    timeData,
    finalBalance,
    mainBalance,
    reserveBalance,
  } = useAssetDetail();
  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={color.blueShade}
        barStyle={'light-content'}
      />
      <Header
        style={{paddingTop: 0}}
        leftIconColor
        headerStyle={{backgroundColor: color.blueShade}}
        titleStyle={{color: color.white}}
        title={`${
          route?.params?.data?.name
        } (${route?.params?.data?.code?.toUpperCase()})`}
      />
      <View style={styles.flexContainer}>
        <Text allowFontScaling={false} style={styles.currentBalance}>
          Available Balance
        </Text>
        {mainBalance?.toFixed(2) ? (
          <>
            <Text allowFontScaling={false} style={styles.priceText}>
              {`${mainBalance?.toFixed(2)}`}
            </Text>
            {finalBalance?.toFixed(2)?.toString() != 'NaN' && (
              <Text allowFontScaling={false} style={styles.currentBalance}>
                {`=$${finalBalance?.toFixed(2)}`}
              </Text>
            )}
          </>
        ) : (
          <Text allowFontScaling={false} style={styles.priceText}>
            {`0.0`}
          </Text>
        )}

        <View style={styles.divider}>
          <View style={styles.parentContainer}>
            <TouchableOpacity
              style={styles.parent}
              activeOpacity={0.7}
              onPress={onSend}>
              <SvgIndex.send />
            </TouchableOpacity>
            <Text style={styles.buttonLabel}>Send</Text>
          </View>
          <View style={styles.parentContainer}>
            <TouchableOpacity
              style={[styles.parent, {marginHorizontal: 20}]}
              activeOpacity={0.7}
              onPress={onReceive}>
              <SvgIndex.send style={styles.rotateImage} />
            </TouchableOpacity>
            <Text style={styles.buttonLabel}>Recieve</Text>
          </View>
          <View style={styles.parentContainer}>
            <TouchableOpacity
              style={[styles.parent, {marginRight: 20}]}
              activeOpacity={0.7}
              onPress={onBuy}>
              <SvgIndex.buy />
            </TouchableOpacity>
            <Text style={[styles.buttonLabel, {marginRight: 20}]}>Buy</Text>
          </View>
          <View style={styles.parentContainer}>
            <TouchableOpacity
              style={styles.parent}
              activeOpacity={0.7}
              onPress={onSell}>
              <SvgIndex.buy style={styles.rotateImage} />
            </TouchableOpacity>
            <Text style={styles.buttonLabel}>Sell</Text>
          </View>
        </View>
      </View>

      <View style={styles.rowContainer}>
        <Text allowFontScaling={false} style={styles.transactionText}>
          Transactions
        </Text>
        {detail?.transactionData?.length != 0 &&
          route?.params?.data?.code?.toUpperCase() == 'XLM' && (
            <Text allowFontScaling={false} style={styles.transactionText}>
              {`Reserve Balance : ${reserveBalance} XLM`}
            </Text>
          )}
      </View>
      {!detail?.refreshing &&
      detail?.loading &&
      detail?.transactionData?.length == 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'small'} />
        </View>
      ) : (
        <FlatList
          data={detail?.transactionData}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TransactionCard item={item} index={index} />
          )}
          keyExtractor={(_, index) => `${index}`}
          contentContainerStyle={styles.flatlistContainer}
          ListEmptyComponent={<EmptyComponent title="No transaction found" />}
          refreshControl={
            <RefreshControl
              refreshing={detail?.refreshing}
              onRefresh={refreshCall}
            />
          }
        />
      )}
    </View>
  );
};

export default AssetDetail;
