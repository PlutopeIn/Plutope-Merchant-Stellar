import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import kycController from './useEditKyc';
import styles from './editKyc.style';
import {
  Button,
  CountryNameModal,
  CustomStatusBar,
  Dropdown,
  Header,
  Input,
} from '@components';
import SvgIndex from '@svgIndex';
import {documentType} from './editKyc.const';
import {space} from '@utility/validation/commonVariable';
import font from '@theme/font';
import color from '@theme/color';

const EditKyc: React.FC = () => {
  const {validation, kycDetail, setKycDetail, errorObject, uploadPhoto} =
    kycController();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header
        title="KYC"
        detailText="This step requires you to complete the KYC (Know Your Customer) process for verifying the merchant identity"
      />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
        {kycDetail?.kycKybStatus?.kycStatus == 'Pending' && (
          <Text style={styles.status}>
            {'Your KYC Verification is in-progress !!'}
          </Text>
        )}
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <Input
            value={kycDetail?.firstName}
            onChangeText={text =>
              setKycDetail('firstName', text?.trimStart().replace(space, ' '))
            }
            placeholder="First Name"
            leftIcon={() => <SvgIndex.user />}
            error={errorObject?.firstNameError}
            inputProps={{
              maxLength: 50,
              editable: false,
            }}
          />
          <Input
            value={kycDetail?.lastName}
            onChangeText={text =>
              setKycDetail('lastName', text?.trimStart().replace(space, ' '))
            }
            placeholder="Last Name"
            leftIcon={() => <SvgIndex.user />}
            error={errorObject?.lastNameError}
            inputProps={{
              maxLength: 50,
              editable: false,
            }}
          />
          <Input
            value={kycDetail?.birthDate}
            onChangeText={text => setKycDetail('birthDate', text?.trim())}
            placeholder="Date of Birth (dd/mm/yyyy)"
            leftIcon={() => <SvgIndex.hotel />}
            error={errorObject?.birthDateError}
            inputProps={{
              maxLength: 50,
              editable: false,
            }}
          />
          {/* <Input
            value={kycDetail?.name}
            onChangeText={text =>
              setKycDetail('name', text?.trimStart().replace(space, ' '))
            }
            placeholder="Name"
            leftIcon={() => <SvgIndex.user />}
            error={errorObject?.nameError}
            inputProps={{
              maxLength: 50,
            }}
          /> */}
          {/* <Dropdown
            placeholder="Type of Document"
            value={kycDetail?.documentType}
            onPress={value => setKycDetail('documentType', value)}
            data={documentType}
            leftIcon={() => <SvgIndex.hotel />}
            error={errorObject?.documentError}
          />
          <Input
            value={kycDetail?.uniqueId}
            onChangeText={text => setKycDetail('uniqueId', text?.trim())}
            placeholder="Unique ID"
            leftIcon={() => <SvgIndex.governmentFlag />}
            error={errorObject?.uniqueIdError}
            inputProps={{
              maxLength: 25,
            }}
          /> */}
          <CountryNameModal
            placeholder="Country"
            value={kycDetail?.country}
            setCountryName={(item: string) => setKycDetail('country', item)}
            data={kycDetail?.countryData}
            error={errorObject?.countryError}
            disabled={true}
          />
          <Input
            placeholder="Address"
            value={kycDetail?.address}
            onChangeText={text =>
              setKycDetail('address', text?.trimStart().replace(space, ' '))
            }
            leftIcon={() => <SvgIndex.location />}
            inputProps={{maxLength: 255, editable: false}}
            error={errorObject?.addressError}
          />
          {/* <View style={styles.photoDivider}>
            <TouchableOpacity
              style={styles.photoParent}
              activeOpacity={0.7}
              onPress={() => uploadPhoto('front')}>
              {!kycDetail?.frontImage ? (
                <>
                  <SvgIndex.add />
                  <Text allowFontScaling={false} style={styles.uploadCoverText}>
                    Upload Front Photo
                  </Text>
                </>
              ) : (
                <Image
                  style={styles.imageStyle}
                  source={{uri: kycDetail?.frontImage?.uri}}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.photo1Parent}
              activeOpacity={0.7}
              onPress={() => uploadPhoto('back')}>
              {!kycDetail?.backImage ? (
                <>
                  <SvgIndex.add />
                  <Text allowFontScaling={false} style={styles.uploadCoverText}>
                    Upload Back Photo
                  </Text>
                </>
              ) : (
                <Image
                  style={styles.imageStyle}
                  source={{uri: kycDetail?.backImage?.uri}}
                />
              )}
            </TouchableOpacity>
          </View>
          {errorObject?.imageError && (
            <Text allowFontScaling={false} style={styles.error}>
              {errorObject?.imageError}
            </Text>
          )} */}
          {/* <View style={styles.subContainer}>
            <Button
              loading={kycDetail?.loading}
              title="Update"
              containerStyle={styles.buttonContainer}
              onPress={validation}
            />
          </View> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditKyc;
