import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React from 'react';
import customizeStoreController from './useCustomizeStore';
import styles from './customizeStore.style';
import {Button, CustomStatusBar, Dropdown, Header} from '@components';
import SvgIndex from '@svgIndex';

const CustomizeStore: React.FC = () => {
  const {
    storeDetail,
    uploadPhoto,
    validation,
    errorObject,
    refreshCall,
    setStoreDetail,
  } = customizeStoreController();

  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header
        title="Customize Store"
        detailText="We know you love to personally cater to all your clients! Customize your store here for that personal touch for your customers"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        bounces={false}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        refreshControl={
          <RefreshControl
            refreshing={storeDetail?.refreshing}
            onRefresh={refreshCall}
          />
        }>
        <View style={styles.subContainer}>
          <Text allowFontScaling={false} style={styles.uploadCoverText}>
            Upload Logo
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => uploadPhoto('logo')}
            style={[
              styles.uploadButton,
              {marginBottom: errorObject?.logoError ? 5 : 16},
            ]}>
            <Text allowFontScaling={false} style={styles.uploadText}>
              {!storeDetail?.logo ? `Upload Logo` : storeDetail?.logo?.name}
            </Text>
          </TouchableOpacity>
          {errorObject?.logoError && (
            <Text allowFontScaling={false} style={styles.error}>
              {errorObject?.logoError}
            </Text>
          )}
          <Text allowFontScaling={false} style={styles.uploadCoverText}>
            Upload Cover Photo
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => uploadPhoto('cover')}
            style={[
              styles.uploadButton,
              {marginBottom: errorObject?.coverImageError ? 5 : 16},
            ]}>
            <Text allowFontScaling={false} style={styles.uploadText}>
              {!storeDetail?.coverImage
                ? `Upload Cover Photo`
                : storeDetail?.coverImage?.name}
            </Text>
          </TouchableOpacity>
          {errorObject?.coverImageError && (
            <Text allowFontScaling={false} style={styles.error}>
              {errorObject?.coverImageError}
            </Text>
          )}
          {/* <Dropdown
            placeholder="Custom Fonts"
            data={storeDetail?.fontData}
            value={storeDetail?.fonts}
            onPress={value => setStoreDetail('fonts', value)}
            leftIcon={() => <SvgIndex.fontSize />}
            error={errorObject?.fontsError}
            containerStyle={styles.dropdown}
          /> */}
          {/* <Text style={styles.fontsText}>Choose colors</Text>
          <Dropdown
            placeholder="Choose colors"
            data={storeDetail?.colorData}
            value={storeDetail?.colors}
            onPress={value => setStoreDetail('colors', value)}
            leftIcon={() => <SvgIndex.art />}
            error={errorObject?.colorsError}
          /> */}
        </View>
        <Button
          loading={storeDetail?.loading}
          title="Continue"
          containerStyle={styles.buttonContainer}
          onPress={validation}
        />
      </ScrollView>
    </View>
  );
};

export default CustomizeStore;
