import React, {memo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native';
import styles from './countryCodeInputDropdown.style';
import SvgIndex from '@svgIndex';
import color from '@theme/color';
import SearchInput from '../searchInput/SearchInput';
import useCountryCodeModal from './useCountryCodeInputDropdown';

const CountryCodeModal = (props: any) => {
  const {handleSearch, userState, updateUserStateValue} = useCountryCodeModal();

  return (
    <View style={props.containerStyle}>
      <View style={[styles.inputViewContainer, props?.inputViewContainer]}>
        <View style={[styles.rowView, props.rowView]}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              updateUserStateValue('openCodeModal', !userState?.openCodeModal)
            }
            style={styles.selectInput}>
            <Text allowFontScaling={false} style={styles.dropText}>
              {props?.selectedCountry}
            </Text>
            <SvgIndex.downArrow />
          </TouchableOpacity>
          <TextInput
            style={[styles.textInput, props.inputStyle]}
            keyboardType={props.keyboardType}
            value={props.inputValue}
            onChangeText={props.setValue}
            selectionColor={props.selectionColor}
            placeholderTextColor={color.inputText}
            allowFontScaling={false}
            placeholder={props.placeholder}
            multiline={props.multiLine}
            maxLength={props.maxLength}
            defaultValue={props.defaultValue}
            autoCapitalize={props.autoCapitalize}
            {...props?.inputProps}
          />
        </View>
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
        <SafeAreaView style={styles.safeAreaView}>
          <TouchableOpacity
            style={styles.modelCloseButton}
            activeOpacity={0.7}
            onPress={() =>
              updateUserStateValue('openCodeModal', !userState?.openCodeModal)
            }>
            <SvgIndex.close />
          </TouchableOpacity>
          <View style={styles.searchInputView}>
            <SearchInput
              placeholder="Select Country"
              value={userState?.search}
              setValue={handleSearch}
              placeholderTextColor={color.black}
              fill={color.black}
              style={styles.textInputStyle}
            />
          </View>
          <FlatList
            data={userState?.filterData}
            keyExtractor={(_, index) => `${index}`}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.dropDownRow}
                onPress={() => {
                  props.setSelectedCountry(item);
                  updateUserStateValue(
                    'openCodeModal',
                    !userState?.openCodeModal,
                  );
                  updateUserStateValue('search', '');
                }}>
                <Text allowFontScaling={false} style={styles.textStyle}>
                  ({item.dialling_code}) {item.country_name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default memo(CountryCodeModal);
