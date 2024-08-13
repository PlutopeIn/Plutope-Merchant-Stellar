import {
  FlatList,
  Linking,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import useHelpSupport from './useHelpSupport';
import styles from './helpSupport.style';
import {CustomStatusBar, Header, SearchInput} from '@components';
import {HelpSupportCard} from '@card';
import SvgIndex from '@svgIndex';
import Spinner from 'react-native-loading-spinner-overlay';
import color from '@theme/color';

const HelpSupport: React.FC = () => {
  const {faq, onPress, refreshCall, handleSearch} = useHelpSupport();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header title="Help & Support" />
      {!faq?.refreshing && <Spinner visible={faq?.loading} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        style={styles.subContainer}
        refreshControl={
          <RefreshControl
            refreshing={faq?.refreshing}
            onRefresh={refreshCall}
          />
        }>
        <View style={styles.mainContainer}>
          {faq?.faqData?.length > 0 && (
            <SearchInput
              placeholder="Search"
              value={faq?.search}
              setValue={handleSearch}
              placeholderTextColor={color.black}
              fill={color.black}
              containerStyle={styles.searchContainer}
            />
          )}
          <FlatList
            data={faq?.faqData}
            style={styles.flatlistStyle}
            contentContainerStyle={styles.flatlistContentContainer}
            renderItem={({item, index}) => {
              const isSelected = index === faq?.selectedItemIndex;
              return (
                <HelpSupportCard
                  item={item}
                  index={index}
                  onPress={() => onPress(index)}
                  showDetail={isSelected}
                />
              );
            }}
            keyExtractor={(_, index) => `${index}`}
          />
        </View>
        {/* <Text style={styles.howHelpText}>How can we help?</Text>
        <Text style={styles.detailText}>
          Didn’t find the answer you were looking for? Contact our support
          center!
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.globalStyle}
            onPress={() => Linking.openURL(faq?.linkData?.website)}>
            <SvgIndex.global />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.smsStyle}
            onPress={() => Linking.openURL(`mailto:${faq?.linkData?.email}`)}>
            <SvgIndex.sms />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.callStyle}
            onPress={() =>
              Linking.openURL(`tel:${faq?.linkData?.phoneNumber}`)
            }>
            <SvgIndex.call />
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </View>
  );
};

export default HelpSupport;
