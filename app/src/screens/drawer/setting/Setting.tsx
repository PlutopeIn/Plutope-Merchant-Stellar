import {View, FlatList} from 'react-native';
import React from 'react';
import styles from './setting.style';
import {CustomStatusBar, Header, SettingCard} from '@components';
import {data} from './setting.const';
import useSettingController from './useSetting';

const Setting = () => {
  const {onClick} = useSettingController();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header title="Settings" />
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <SettingCard
            item={item}
            index={index}
            onClick={() => onClick(item?.screen,item?.label)}
          />
        )}
        keyExtractor={(_, index) => `${index}`}
        contentContainerStyle={styles.content}
      />
    </View>
  );
};

export default Setting;
