import React, {memo} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {SearchInputProps} from './searchInput.interface';
import style from './searchInput.style';
import SvgIndex from '@svgIndex';
import color from '@theme/color';

const SearchInput: React.FC<SearchInputProps> = props => {
  return (
    <View style={[style.container, props.containerStyle]}>
      <View style={style.searchView}>
        <SvgIndex.search fill={props?.fill ?? color.white} />
      </View>
      <TextInput
        value={props.value}
        onChangeText={props.setValue}
        allowFontScaling={false}
        style={style.input}
        placeholderTextColor={props?.placeholderTextColor ?? color.white}
        {...props}
      />
      {props?.closeIcon && (
        <TouchableOpacity
          style={[style.closeIcon, {}]}
          activeOpacity={0.7}
          onPress={props?.onPress}>
          <SvgIndex.close fill={props?.closeFill ?? color.black} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(SearchInput);
