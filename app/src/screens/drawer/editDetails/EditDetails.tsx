import {View, FlatList} from 'react-native';
import React from 'react';
import styles from './editDetails.style';
import {CustomStatusBar, Header, SettingCard} from '@components';
import {data} from './editDetails.const';
import useEditDetailsController from './useEditDetails';

const EditDetails = () => {
  const {onClick} = useEditDetailsController();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header title="Edit Details" />
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <SettingCard
            item={item}
            index={index}
            onClick={() => onClick(item?.screen)}
          />
        )}
        keyExtractor={(_, index) => `${index}`}
        contentContainerStyle={styles.content}
      />
    </View>
  );
};

export default EditDetails;
