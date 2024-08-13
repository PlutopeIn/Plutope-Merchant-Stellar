import {
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import React from 'react';
import styles from './editStore.style';
import editStoreController from './useEditStore';
import {
  Button,
  CountryCodeModal,
  CountryNameModal,
  CustomStatusBar,
  Dropdown,
  Header,
  Input,
} from '@components';
import SvgIndex from '@svgIndex';
import {space} from '@utility/validation/commonVariable';

const EditStore: React.FC = () => {
  const {
    validation,
    setStoreDetail,
    setSetStoreDetail,
    onSelectCountryCode,
    errorObject,
    refreshCall,
  } = editStoreController();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header
        title="Edit your store"
        detailText="Setup your store to start getting payments via the PlutoPe Merchant App"
      />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          bounces={false}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl
              refreshing={setStoreDetail?.refreshing}
              onRefresh={refreshCall}
            />
          }>
          <View style={styles.subContainer}>
            <Dropdown
              placeholder="Type of Business"
              value={setStoreDetail?.type?.title}
              onPress={value => setSetStoreDetail('type', value)}
              data={setStoreDetail?.businessTypeData}
              leftIcon={() => <SvgIndex.hotel />}
              error={errorObject?.typeError}
              containerStyle={styles.dropdown}
            />
            <Dropdown
              placeholder="Category"
              value={setStoreDetail?.category?.title}
              onPress={value => setSetStoreDetail('category', value)}
              data={setStoreDetail?.categoryTypeData}
              leftIcon={() => <SvgIndex.hotel />}
              error={errorObject?.categoryError}
            />
            <Input
              placeholder="Business Name"
              value={setStoreDetail?.businessName}
              onChangeText={text =>
                setSetStoreDetail('businessName', text?.replace(space, ' '))
              }
              leftIcon={() => <SvgIndex.hotel />}
              error={errorObject?.businessError}
              inputProps={{maxLength: 50}}
            />
            <CountryCodeModal
              selectedCountry={setStoreDetail?.selectCountryCode}
              setSelectedCountry={onSelectCountryCode}
              placeholder="Contact No."
              inputValue={setStoreDetail?.contact}
              setValue={(text: string) =>
                setSetStoreDetail(
                  'contact',
                  text?.trim()?.replace(/[^0-9]/g, ''),
                )
              }
              maxLength={setStoreDetail?.mobileLength}
              keyboardType={'numeric'}
              error={errorObject?.contactError}
            />
            <CountryNameModal
              placeholder="Country"
              value={setStoreDetail?.country}
              setCountryName={(item: any) => setSetStoreDetail('country', item)}
              data={setStoreDetail?.countryData}
              error={errorObject?.countryError}
            />
            <Input
              placeholder="City"
              value={setStoreDetail?.city}
              onChangeText={text =>
                setSetStoreDetail('city', text?.trimStart().replace(space, ' '))
              }
              leftIcon={() => <SvgIndex.location />}
              error={errorObject?.cityError}
              mainContainerStyle={styles.keyboardContainer}
              inputProps={{maxLength: 50}}
            />
            <Input
              placeholder="Pincode"
              value={setStoreDetail?.pincode}
              onChangeText={text => setSetStoreDetail('pincode', text?.trim())}
              leftIcon={() => <SvgIndex.location />}
              error={errorObject?.pincodeError}
            />
            <Input
              placeholder="Address"
              value={setStoreDetail?.address}
              onChangeText={text =>
                setSetStoreDetail(
                  'address',
                  text?.trimStart().replace(space, ' '),
                )
              }
              leftIcon={() => <SvgIndex.location />}
              inputProps={{maxLength: 255}}
              error={errorObject?.addressError}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Button
        loading={setStoreDetail?.loading}
        title="Update"
        onPress={validation}
        containerStyle={styles.buttonContainer}
      />
    </View>
  );
};

export default EditStore;
