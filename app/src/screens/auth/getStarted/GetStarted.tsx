import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import styles from './getStarted.style';
import useGetStarted from './useGetStarted';
import {Button, CustomStatusBar} from '@components';
import {getStartedData} from './getStarted.const';
import SvgIndex from '@svgIndex';
const {height} = Dimensions.get('window');
const GetStarted: React.FC = () => {
  const {
    sliderState,
    scrollViewRef,
    handleDotClick,
    onPressNext,
    onPressSkip,
    onScroll,
    onSignupClick,
  } = useGetStarted();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollViewStyle}
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        overScrollMode="never"
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}>
        {getStartedData.map((res, index) => {
          return (
            <View style={styles.introSlide} key={index}>
              <View style={styles.titleView}>
                <Image
                  source={res.introImage}
                  style={styles.imageStyle}
                  resizeMode="contain"
                />
                <Text allowFontScaling={false} style={styles.introTitle}>
                  {res?.title}
                </Text>
                <Text allowFontScaling={false} style={styles.introDescription}>
                  {res?.text}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
      {sliderState?.currentPage !== 1 && (
        <TouchableOpacity
          style={styles.skipTextContainer}
          activeOpacity={0.7}
          onPress={onPressSkip}>
          <View style={styles.skipContainer}>
            <Text allowFontScaling={false} style={styles.skipText}>
              Skip
            </Text>
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.introContainer}>
        {sliderState?.currentPage !== 1 ? (
          <TouchableOpacity
            style={styles.buttonContainer}
            activeOpacity={0.7}
            onPress={() => handleDotClick(sliderState?.currentPage + 1)}>
            <SvgIndex.arrowRight width={20} />
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonTextContainer}>
            <Button
              containerStyle={styles.getStartedButtonContainer}
              title={'Get Started'}
              onPress={() => onPressNext()}
            />
            {/* <Text allowFontScaling={false} style={styles.haveAccountText}>
              Don't have an account?{' '}
              <Text
                allowFontScaling={false}
                style={styles.signinText}
                onPress={onSignupClick}
                suppressHighlighting={true}>
                Sign up
              </Text>
            </Text> */}
          </View>
        )}
      </View>
    </View>
  );
};

export default GetStarted;
