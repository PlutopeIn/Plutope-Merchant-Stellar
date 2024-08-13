import React, {memo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import style from './header.style';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProps} from '@navigation/authStack/authStack';
import {HeaderProps} from './headerProps';
import SvgIndex from '@svgIndex';
import color from '@theme/color';

const Header: React.FC<HeaderProps> = props => {
  const {goBack, canGoBack} = useNavigation<AuthNavigationProps>();
  return (
    <View style={[style.header, props?.style]}>
      <View style={[style.mainContainer, props.headerStyle]}>
        {/* {canGoBack() && ( */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={style.backIcon}
          onPress={() => (props.onBack ? props.onBack() : goBack())}>
          {props?.leftIconColor ? (
            <SvgIndex.backArrowWhite />
          ) : (
            <SvgIndex.backArrow />
          )}
        </TouchableOpacity>
        {/* )} */}
        <View
          style={[
            style.titleContainer,
            {
              flex: !props.rightIcon && !props.rightText ? 0.9 : 1,
            },
          ]}>
          <Text
            allowFontScaling={false}
            style={[style.title, props.titleStyle]}>
            {props.title}
          </Text>
        </View>
        {props.rightIcon && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={props.onRightIcon}
            style={[style.rightIconTouch, props.rightIconStyle]}>
            <props.rightIcon />
          </TouchableOpacity>
        )}
        {props.rightText && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={props.onRightText}
            style={style.rightTextTouch}>
            <Text
              allowFontScaling={false}
              style={[style.rightText, props.rightTextStyle]}>
              {props.rightText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {props?.headerTitle && (
        <Text allowFontScaling={false} style={style.headerText}>
          {props?.headerTitle}
        </Text>
      )}
      {props?.detailText && (
        <Text allowFontScaling={false} style={style.detailsText}>
          {props?.detailText}
        </Text>
      )}
    </View>
  );
};

export default memo(Header);
