import {View, FlatList, RefreshControl} from 'react-native';
import React from 'react';
import {
  AssetCard,
  CustomStatusBar,
  EmptyComponent,
  Header,
  SearchInput,
} from '@components';
import styles from './assets.style';
import color from '@theme/color';
import useAssetsController from './useAssets';
import Spinner from 'react-native-loading-spinner-overlay';

const Assets = () => {
  const {
    route,
    assetData,
    onClickAddAssets,
    onSearchCall,
    refreshCall,
    onClickAsset,
    onBackCall,
  } = useAssetsController();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header
        onBack={onBackCall}
        title={route?.params?.screen == 'addAsset' ? 'Add Assets' : 'Assets'}
      />
      {!assetData?.refreshing && <Spinner visible={assetData?.loading} />}
      <SearchInput
        placeholder="Search..."
        value={assetData?.search}
        setValue={(text: string) => onSearchCall(text)}
        placeholderTextColor={color.black}
        fill={color.black}
        style={styles.textInputStyle}
        containerStyle={styles.searchStyle}
      />
      <FlatList
        data={assetData?.assetList}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <AssetCard
            item={item}
            index={index}
            isLoading={assetData?.load}
            screen={route?.params?.screen}
            onClick={() => onClickAsset(item)}
            onAddAssets={() => onClickAddAssets(item)}
          />
        )}
        keyExtractor={(_, index) => `${index}`}
        contentContainerStyle={styles.flatlistContainer}
        ListEmptyComponent={<EmptyComponent title="No asset found" />}
        refreshControl={
          <RefreshControl
            refreshing={assetData?.refreshing}
            onRefresh={refreshCall}
          />
        }
      />
    </View>
  );
};

export default Assets;
