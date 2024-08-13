import {View, Text, ScrollView, RefreshControl, Dimensions} from 'react-native';
import React from 'react';
import useCmsDetail from './useCmsDetail';
import {CustomStatusBar, Header} from '@components';
import style from './cmsDetail.style';
import RenderHtml from 'react-native-render-html';
import Spinner from 'react-native-loading-spinner-overlay';

const {width} = Dimensions.get('window');

const CmsDetail = () => {
  const {cmsData, onRefreshCall, route} = useCmsDetail();
  return (
    <View style={style.container}>
      <CustomStatusBar />
      <Header title={route?.params?.title} />
      {!cmsData?.refreshing && <Spinner visible={cmsData?.loading} />}
      <ScrollView
        contentContainerStyle={style.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={cmsData?.refreshing}
            onRefresh={onRefreshCall}
          />
        }>
        <RenderHtml
          contentWidth={width}
          tagsStyles={{
            p: style.infoText,
          }}
          source={{
            html:
              route?.params?.screen == 'Terms'
                ? cmsData?.data?.termsAndCondition?.description
                : cmsData?.data?.privacyPolicy?.description,
          }}
        />
      </ScrollView>
    </View>
  );
};

export default CmsDetail;
