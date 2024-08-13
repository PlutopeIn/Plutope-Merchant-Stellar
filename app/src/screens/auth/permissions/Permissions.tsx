import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import useLogin from './usePermissions';
import style from './permissions.style';
import {Button, CustomStatusBar, Header} from '@components';
import imageIndex from '@imageIndex';

const Permissions: React.FC = () => {
  const {continueButton, checked, setChecked, onPrivacy} = useLogin();
  return (
    <View style={style.container}>
      <CustomStatusBar />
      <Header title="Legal" />
      <View style={style.detailsContainer}>
        <View style={style.subContainer}>
          <Text allowFontScaling={false} style={style.welcome}>
            Please review the privacy policy and terms and services of stellar
          </Text>
          <Text allowFontScaling={false} style={style.details}>
            {`Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es ${'\n'}Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur ma ${'\n'}Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore`}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={style.fontsContainer}
            onPress={onPrivacy}>
            <Text allowFontScaling={false} style={style.fontsText}>
              Privacy Policy
            </Text>
            <Image source={imageIndex.upArrow} style={style.arrowImage} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={style.fontsContainer}
            onPress={onPrivacy}>
            <Text allowFontScaling={false} style={style.fontsText}>
              Terms and Services
            </Text>
            <Image source={imageIndex.upArrow} style={style.arrowImage} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={style.checkedContainer}
          onPress={() => setChecked(!checked)}
          activeOpacity={0.7}>
          <Image
            source={!checked ? imageIndex.unchecked : imageIndex.checked}
            style={style.checkedIcon}
          />
          <Text allowFontScaling={false} style={style.accept}>
            I've read and accept the Terms and Services and Privacy Policy
          </Text>
        </TouchableOpacity>
        <Button
          title="Continue"
          containerStyle={style.button}
          onPress={continueButton}
        />
      </View>
    </View>
  );
};

export default Permissions;
