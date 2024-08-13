import React, {memo, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {InputProps} from './inputProps';
import style from './input.style';
import color from '@theme/color';
import SvgIndex from '@svgIndex';

const Input: React.FC<InputProps> = props => {
  const [passwordVisible, setPasswordVisible] = useState<boolean | undefined>(
    props?.secureText,
  );
  return (
    <View style={[style.mainContainer, props.mainContainerStyle]}>
      <View style={[style.container, props.containerStyle]}>
        {props?.leftIcon && (
          <View style={style.leftIconStyle}>
            <props.leftIcon />
          </View>
        )}
        <TextInput
          value={props.value}
          onChangeText={props.onChangeText}
          style={[style.input, props.inputStyle]}
          allowFontScaling={false}
          placeholder={props.placeholder}
          placeholderTextColor={color.inputText}
          secureTextEntry={passwordVisible}
          {...props.inputProps}
        />
        {props?.hideText && (
          <TouchableOpacity
            onPress={() => {
              setPasswordVisible(!passwordVisible);
            }}
            activeOpacity={0.7}
            style={style.imageButton}>
            {passwordVisible ? <SvgIndex.eyeSlash /> : <SvgIndex.eye />}
          </TouchableOpacity>
        )}
        {props.rightIcon && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={style.rightIcon}
            onPress={props.onRightClick}>
            {props.spinner ? (
              <ActivityIndicator color={color.black} />
            ) : (
              <props.rightIcon />
            )}
          </TouchableOpacity>
        )}
        {props.rightText && (
          <View style={style.rightIcon}>
            <Text allowFontScaling={false} style={style.rightText}>
              {props.rightText}
            </Text>
          </View>
        )}
      </View>
      {props.error && (
        <Text allowFontScaling={false} style={style.error}>
          {props.error}
        </Text>
      )}
    </View>
  );
};

export default memo(Input);
