import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React from 'react';
import kybController from './useEditKyb';
import styles from './editKyb.style';
import {
  Button,
  CountryNameModal,
  CustomStatusBar,
  Header,
  Input,
} from '@components';
import SvgIndex from '@svgIndex';
import {space} from '@utility/validation/commonVariable';
import {TouchableOpacity} from 'react-native-gesture-handler';
import constant from '@config/constant';
import Log from '@utility/log';

const EditKyb: React.FC = () => {
  const {validation, kybDetail, setKybDetail, errorObject} = kybController();
  Log('kybDetail', kybDetail);
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header
        title="Connect KYB"
        detailText="This step requires you to complete the KYB (Know Your Business) process for verifying the business details and identity"
      />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
        {kybDetail?.kycKybStatus?.kycStatus == 'Pending' && (
          <Text style={styles.status}>
            {'Your KYB Verification is in-progress !!'}
          </Text>
        )}
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <Input
            value={kybDetail?.companyName}
            leftIcon={() => <SvgIndex.hotel />}
            onChangeText={text =>
              setKybDetail('companyName', text?.trimStart().replace(space, ' '))
            }
            placeholder="Company Name"
            inputProps={{
              maxLength: 50,
              editable: false,
            }}
            error={errorObject?.companyNameError}
          />

          <Input
            value={kybDetail?.businessId}
            leftIcon={() => <SvgIndex.suitcase />}
            onChangeText={text => setKybDetail('businessId', text?.trim())}
            placeholder="Business ID"
            inputProps={{
              maxLength: 25,
              editable: false,
            }}
            error={errorObject?.businessIdError}
          />
          <TouchableOpacity
            style={styles.photoParent}
            activeOpacity={0.7}
            disabled>
            {
              <Image
                style={styles.imageStyle}
                source={{uri: `${constant.imageURL}${kybDetail.businessPhoto}`}}
              />
            }
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditKyb;
