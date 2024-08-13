import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import kybController from './useKyb';
import styles from './kyb.style';
import {
  Button,
  CountryNameModal,
  CustomStatusBar,
  Header,
  Input,
} from '@components';
import SvgIndex from '@svgIndex';
import {space} from '@utility/validation/commonVariable';

const Kyb: React.FC = () => {
  const {validation, kybDetail, setKybDetail, errorObject, uploadPhoto} =
    kybController();
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
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          {/* <CountryNameModal
            placeholder="Country"
            data={kybDetail?.countryData}
            value={kybDetail?.country}
            setCountryName={(item: any) => setKybDetail('country', item)}
            error={errorObject?.countryError}
          /> */}
          <Input
            value={kybDetail?.companyName}
            leftIcon={() => <SvgIndex.hotel />}
            onChangeText={text =>
              setKybDetail('companyName', text?.trimStart().replace(space, ' '))
            }
            placeholder="Company Name"
            inputProps={{
              maxLength: 50,
            }}
            error={errorObject?.companyNameError}
          />
          {/* <Input
            value={kybDetail?.taxId}
            leftIcon={() => <SvgIndex.tax />}
            onChangeText={text => setKybDetail('taxId', text?.trim())}
            placeholder="Tax ID"
            inputProps={{
              maxLength: 25,
            }}
            error={errorObject?.taxIdError}
          /> */}
          <Input
            value={kybDetail?.businessId}
            leftIcon={() => <SvgIndex.suitcase />}
            onChangeText={text => setKybDetail('businessId', text?.trim())}
            placeholder="Business ID"
            inputProps={{
              maxLength: 25,
            }}
            error={errorObject?.businessIdError}
          />
          <TouchableOpacity
            style={styles.photoParent}
            activeOpacity={0.7}
            onPress={uploadPhoto}>
            {!kybDetail?.businessPhoto ? (
              <>
                <SvgIndex.add />
                <Text allowFontScaling={false} style={styles.uploadCoverText}>
                  Upload Business ID
                </Text>
              </>
            ) : (
              <Image
                style={styles.imageStyle}
                source={{uri: kybDetail?.businessPhoto}}
              />
            )}
          </TouchableOpacity>
          {errorObject?.businessPhotoError && (
            <Text allowFontScaling={false} style={styles.error}>
              {errorObject?.businessPhotoError}
            </Text>
          )}
          <View style={styles.subContainer}>
            <Button
              loading={kybDetail?.loading}
              title="Submit"
              containerStyle={styles.buttonContainer}
              onPress={validation}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Kyb;
