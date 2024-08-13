import React, {memo} from 'react';
import {View, Text, TouchableOpacity, Modal, FlatList} from 'react-native';
import styles from './countryNameDropdown.style';
import countryNameModalController from './useCountryNameDropdown';
import SvgIndex from '@svgIndex';
import color from '@theme/color';
import SearchInput from '../searchInput/SearchInput';
import {DropdownProps} from './countryNameDropdownProps';
import EmptyComponent from '../emptyComponent/EmptyComponent';
import CustomStatusBar from '../customStatusBar/CustomStatusBar';

const CountryNameModal = (props: DropdownProps) => {
  const {handleSearch, userState, updateUserStateValue} =
    countryNameModalController(props.data);

  return (
    <View style={props.containerStyle}>
      <View style={[styles.inputViewContainer, props?.inputViewContainer]}>
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={props.disabled}
          style={[styles.touchableContainer, props?.container]}
          onPress={() =>
            updateUserStateValue('openCodeModal', !userState?.openCodeModal)
          }>
          {!props?.leftIcon && (
            <View style={styles.leftStyle}>
              <SvgIndex.hotel />
            </View>
          )}
          <Text
            allowFontScaling={false}
            style={[
              styles.titleTextStyle,
              {
                color: props?.value ? color.black : color.inputText,
              },
            ]}>
            {props?.value ? props?.value : props?.placeholder}
          </Text>
          <SvgIndex.downArrow />
        </TouchableOpacity>
        {props?.error && (
          <Text allowFontScaling={false} style={styles.errorText}>
            {props?.error}
          </Text>
        )}
      </View>
      <Modal
        animationType="slide"
        visible={userState?.openCodeModal}
        onRequestClose={() =>
          updateUserStateValue('openCodeModal', !userState?.openCodeModal)
        }>
        <View style={styles.safeAreaView}>
          <CustomStatusBar />
          <TouchableOpacity
            style={styles.modelCloseButton}
            activeOpacity={0.7}
            onPress={() => {
              updateUserStateValue('openCodeModal', !userState?.openCodeModal);
              updateUserStateValue('search', '');
            }}>
            <SvgIndex.close />
          </TouchableOpacity>
          <View style={styles.searchInputView}>
            <SearchInput
              placeholder={
                props?.searchLabel ? props?.searchLabel : 'Select Country'
              }
              value={userState?.search}
              setValue={handleSearch}
              placeholderTextColor={color.black}
              fill={color.black}
              style={styles.textInputStyle}
            />
          </View>
          <FlatList
            data={userState.dropdownData}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => `${index}`}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.dropDownRow}
                onPress={() => {
                  props.setCountryName(item?.name);
                  if (props.isWholeItem) {
                    //@ts-ignore
                    props.isSelectedItem(item?.issuer);
                  }
                  updateUserStateValue(
                    'openCodeModal',
                    !userState?.openCodeModal,
                  );
                  updateUserStateValue('search', '');
                }}>
                <Text allowFontScaling={false} style={styles.textStyle}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.scrollStyle}
            ListEmptyComponent={<EmptyComponent title="No data available" />}
          />
        </View>
      </Modal>
    </View>
  );
};

export default memo(CountryNameModal);
