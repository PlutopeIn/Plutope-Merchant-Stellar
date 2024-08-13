import React, {memo} from 'react';
import {View, Text} from 'react-native';
import {DropdownProps} from './dropdownProps';
import style from './dropdown.style';
import useDropDown from './useDropDown';
import color from '@theme/color';
import SvgIndex from '@svgIndex';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';

const Dropdown: React.FC<DropdownProps> = props => {
  const {handleDropdown, open, setOpen} = useDropDown();

  return (
    <View style={[style.mainContainer, props?.containerStyle]}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[style.container, props?.touchableContainer]}
        onPress={handleDropdown}>
        {props?.leftIcon && (
          <View style={style.leftStyle}>
            <props.leftIcon />
          </View>
        )}
        <Text
          allowFontScaling={false}
          style={[
            style.title,
            props?.textStyle,
            {color: props?.value ? color.black : color.inputText},
          ]}>
          {props?.value ? props?.value : props?.placeholder}
        </Text>
        <SvgIndex.downArrow />
      </TouchableOpacity>
      {open && (
        <View style={[style.dropdownContainer, props?.dropdownContainer]}>
          {props?.data?.length > 0 ? (
            <FlatList
              data={props?.data}
              keyExtractor={(_, index) => `${index}`}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    style.valueContainer,
                    {
                      borderBottomWidth:
                        props?.data?.length - 1 !== index ? 0.5 : 0,
                    },
                  ]}
                  onPress={() => {
                    props?.onPress(item);
                    setOpen(false);
                  }}
                  key={index}>
                  <Text
                    allowFontScaling={false}
                    style={[style.values, props?.dropDownText]}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={style.emptyView}>
              <Text style={style.values} allowFontScaling={false}>
                No Data Available
              </Text>
            </View>
          )}
        </View>
      )}
      {props?.error && (
        <Text allowFontScaling={false} style={style.error}>
          {props?.error}
        </Text>
      )}
    </View>
  );
};

export default memo(Dropdown);
