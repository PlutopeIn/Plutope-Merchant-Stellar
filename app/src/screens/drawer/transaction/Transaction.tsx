import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Modal,
} from 'react-native';
import React from 'react';
import {
  CustomStatusBar,
  Dropdown,
  EmptyComponent,
  Header,
  Loader,
  TransactionCard,
} from '@components';
import styles from './transaction.style';
import color from '@theme/color';
import useTransactionController from './useTransaction';
import SvgIndex from '@svgIndex';
import Spinner from 'react-native-loading-spinner-overlay';
import {filter} from './transaction.const';
import font from '@theme/font';

const Transaction = () => {
  const {
    activeTab,
    setActiveTab,
    detail,
    refreshCall,
    openDropdown,
    closeDropdown,
  } = useTransactionController();

  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header title="All Transaction" />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setActiveTab(1)}
          style={[
            styles.tabView,
            {backgroundColor: activeTab == 1 ? color.black : color.borderGray},
          ]}>
          <Text
            allowFontScaling={false}
            style={[
              styles.tabText,
              {color: activeTab == 1 ? color.white : color.black},
            ]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setActiveTab(2)}
          style={[
            styles.tab1View,
            {backgroundColor: activeTab == 2 ? color.black : color.borderGray},
          ]}>
          <Text
            allowFontScaling={false}
            style={[
              styles.tabText,
              {color: activeTab == 2 ? color.white : color.black},
            ]}>
            Sent
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setActiveTab(3)}
          style={[
            styles.tab1View,
            {backgroundColor: activeTab == 3 ? color.black : color.borderGray},
          ]}>
          <Text
            allowFontScaling={false}
            style={[
              styles.tabText,
              {color: activeTab == 3 ? color.white : color.black},
            ]}>
            Received
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.dropdownContainer}
          onPress={openDropdown}>
          <View style={styles.dropdownContent}>
            <Text allowFontScaling={false} style={styles.dropDownText}>
              {detail.dropdownValue ? detail.dropdownValue : 'Select'}
            </Text>
            <SvgIndex.nextArrow style={styles.arrow} />
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setActiveTab(2)}
          style={[
            styles.tab1View,
            {backgroundColor: activeTab == 2 ? color.black : color.borderGray},
          ]}>
          <Text
            allowFontScaling={false}
            style={[
              styles.tabText,
              {color: activeTab == 2 ? color.white : color.black},
            ]}>
            Deposit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setActiveTab(3)}
          style={[
            styles.tabView,
            {backgroundColor: activeTab == 3 ? color.black : color.borderGray},
          ]}>
          <Text
            allowFontScaling={false}
            style={[
              styles.tabText,
              {color: activeTab == 3 ? color.white : color.black},
            ]}>
            Withdrawal
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.dropdownContainer}>
          <View style={styles.dropdownContent}>
            <Text allowFontScaling={false} style={styles.dropDownText}>
              Latest
            </Text>
            <SvgIndex.nextArrow style={styles.arrow} />
          </View>
        </TouchableOpacity> */}
      </View>
      {/* <Text allowFontScaling={false} style={styles.labelText}>
        4 Total Transactions
      </Text> */}
      {detail?.loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <FlatList
            data={detail?.transactionData}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              //@ts-ignore
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
        </View>
      )}

      <Modal visible={detail.showDropdown} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {filter.map((item, index) => (
              <TouchableOpacity
                style={styles.filterContent}
                onPress={() => closeDropdown(item.title)}>
                <Text style={styles.titleStyle} allowFontScaling={false}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Transaction;
