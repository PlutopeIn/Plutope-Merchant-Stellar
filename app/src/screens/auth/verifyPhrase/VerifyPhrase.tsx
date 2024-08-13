import {View, Text, ScrollView, FlatList} from 'react-native';
import React from 'react';
import styles from './verifyPhrase.style';
import VerifyPhraseController from './useVerifyPhrase';
import {Button, CustomStatusBar, Header} from '@components';
import {PhraseCard, PhraseDetailCard} from '@card';
import color from '@theme/color';

const VerifyPhrase: React.FC = () => {
  const {
    shuffelData,
    onDone,
    minemonicData,
    onItemPress,
    onSelectedWord,
    error,
  } = VerifyPhraseController();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header title="Verify Secret Phrase" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        bounces={false}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}>
        <Text style={styles.detailsText}>
          Tap the words to put them next to each others in the correct order.
        </Text>
        <View
          style={[
            styles.flatListParent,
            {
              paddingBottom: error ? 12 : 21,
            },
          ]}>
          <FlatList
            data={minemonicData}
            renderItem={({item, index}) => {
              return (
                <PhraseCard
                  item={item}
                  index={index}
                  onClick={() => onSelectedWord(item, index)}
                />
              );
            }}
            contentContainerStyle={styles.content}
            numColumns={2}
            keyExtractor={(_, index) => `${index}`}
          />
          {error && (
            <Text
              allowFontScaling={false}
              style={[
                styles.errorText,
                {
                  color: error == 'Well Done' ? color.blue : color.red,
                },
              ]}>
              {error}
            </Text>
          )}
        </View>
        <FlatList
          data={shuffelData}
          renderItem={({item, index}) => {
            return (
              <PhraseDetailCard
                item={item}
                index={index}
                onClick={() => onItemPress(item, index)}
              />
            );
          }}
          contentContainerStyle={styles.buttonContainer}
          numColumns={4}
          keyExtractor={(_, index) => `${index}`}
        />
      </ScrollView>
      <Button
        title={'Continue'}
        onPress={onDone}
        // disabled={error !== 'Well Done'}
        containerStyle={[
          styles.doneButtonContainer,
          {opacity: error !== 'Well Done' ? 0.4 : 1},
        ]}
      />
    </View>
  );
};

export default VerifyPhrase;
