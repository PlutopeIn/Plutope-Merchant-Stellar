import {
  View,
  Text,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import imageIndex from '@imageIndex';
import {CustomStatusBar, DrawerCard} from '@components';
import {data} from './drawerContent.const';
import styles from './drawerContent.style';
import useDrawerContentController from './useDrawerContent';
import color from '@theme/color';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/type';
import constant from '@config/constant';
import SvgIndex from '@svgIndex';

const DrawerContent = ({navigation}: any) => {
  const {userDetails, walletPrivateData} = useSelector(
    (state: RootState) => state.userReducer,
  );
  const {onPress, onViewSecret, isVisible, onCopy, link} =
    useDrawerContentController();

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={color.blueShade}
        barStyle={'light-content'}
      />
      <ImageBackground
        style={styles.backImage}
        resizeMode="cover"
        source={imageIndex.cover}>
        <View style={styles.infoContainer}>
          <Image
            style={styles.userImage}
            source={
              userDetails?.customizeStoreDetails?.logo
                ? {
                    uri:
                      constant.imageURL +
                      userDetails?.customizeStoreDetails?.logo,
                  }
                : imageIndex.userImage
            }
          />
          <View style={styles.nameContainer}>
            <Text
              allowFontScaling={false}
              style={styles.nameText}
              numberOfLines={2}>
              {userDetails?.storeDetails?.businessName}
            </Text>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                allowFontScaling={false}
                style={styles.addressText}
                numberOfLines={1}>
                {walletPrivateData?.publicKey?.substring(0, 8) +
                  '.....' +
                  walletPrivateData?.publicKey?.slice(-4)}
              </Text>
              {/* <Text
                allowFontScaling={false}
                style={styles.secretText}
                numberOfLines={1}>
                {isVisible
                  ? walletPrivateData?.secretKey?.substring(0, 8) +
                    '.....' +
                    walletPrivateData?.secretKey?.slice(-4)
                  : '**********'}
              </Text> */}
              {/* <TouchableOpacity activeOpacity={0.6} onPress={onViewSecret}>
                {isVisible ? (
                  <SvgIndex.eye height={15} width={15} />
                ) : (
                  <SvgIndex.eyeSlash height={15} width={15} />
                )}
              </TouchableOpacity> */}
              <TouchableOpacity
                style={{paddingHorizontal: 8}}
                activeOpacity={0.6}
                onPress={onCopy}>
                <SvgIndex.copyIcon height={13} width={13} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <DrawerCard
            item={item}
            index={index}
            onClick={() => {
              navigation.closeDrawer();
              onPress(item?.navigation, item?.label);
            }}
          />
        )}
        keyExtractor={(_, index) => `${index}`}
        contentContainerStyle={styles.content}
      />
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.globalStyle}
          onPress={() => Linking.openURL(link?.website)}>
          <SvgIndex.global />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.smsStyle}
          onPress={() => Linking.openURL(`mailto:${link?.email}`)}>
          <SvgIndex.sms />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.callStyle}
          onPress={() => Linking.openURL(`tel:${link?.phoneNumber}`)}>
          <SvgIndex.call />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default DrawerContent;
