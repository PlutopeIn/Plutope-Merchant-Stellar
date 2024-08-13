import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {PropType} from './assetCardProps';
import styles from './assetCard.style';
import imageIndex from '@imageIndex';
import color from '@theme/color';

const AssetCard: React.FC<PropType> = ({
  item,
  index,
  onClick,
  screen,
  onAddAssets,
  isLoading,
}) => {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setLoad(false);
    }
  }, [isLoading]);

  return (
    <TouchableOpacity
      style={styles.container}
      disabled={screen == 'addAsset'}
      activeOpacity={0.7}
      onPress={onClick}>
      {!item?.image && item?.code != 'XLM' ? (
        <View style={styles.imageContent}>
          <Image style={styles.noImage} source={imageIndex.noImage} />
        </View>
      ) : item?.code == 'XLM' ? (
        <View style={styles.imageContent}>
          <Image style={styles.xlmImage} source={imageIndex.asset} />
        </View>
      ) : (
        //@ts-ignore
        <Image style={styles.image} source={{uri: item?.image}} />
      )}
      <View style={styles.infoContainer}>
        <Text allowFontScaling={false} style={styles.labelText}>
          {item?.name}
        </Text>
        <Text allowFontScaling={false} style={styles.symbolText}>
          {`${item?.code?.toUpperCase()} ${
            item?.domain ? `(${item?.domain})` : ''
          }`}
        </Text>
      </View>
      {screen == 'addAsset' ? (
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={load}
          style={styles.buttonStyle}
          onPress={() => {
            setLoad(true);
            onAddAssets?.();
          }}>
          {load ? (
            <ActivityIndicator color={color.black} size={'small'} />
          ) : (
            <Text allowFontScaling={false} style={styles.buttonText}>
              Add
            </Text>
          )}
        </TouchableOpacity>
      ) : (
        <Text allowFontScaling={false} style={styles.labelText}>
          {parseFloat(item?.balance)?.toFixed(2) ?? '0.00'}{' '}
          {item?.code?.toUpperCase()}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default memo(AssetCard);
