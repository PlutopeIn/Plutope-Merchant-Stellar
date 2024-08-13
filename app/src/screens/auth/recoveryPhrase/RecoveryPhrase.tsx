import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import RecoveryPhraseController from './useRecoveryPhrase';
import styles from './recoveryPhrase.style';
import {Button, CustomStatusBar, Header} from '@components';
import {PhraseCard} from '@card';
import imageIndex from '@imageIndex';
import color from '@theme/color';
import SvgIndex from '@svgIndex';

const RecoveryPhrase: React.FC = () => {
  const {onContinue, phraseData, onClickCopy} = RecoveryPhraseController();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header title="Phrase" />
      <View style={styles.secretContainer}>
        <Image
          source={imageIndex.alert}
          style={styles.alertImage}
          tintColor={color.pencilGray}
        />
        <Text allowFontScaling={false} style={styles.secretText}>
          Never share your secret phrase with anyone
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View>
          <FlatList
            data={phraseData?.minemonic?.split(' ')}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return <PhraseCard item={item} index={index} disabled={true} />;
            }}
            contentContainerStyle={styles.content}
            numColumns={2}
            keyExtractor={(_, index) => `${index}`}
          />
        </View>
        <TouchableOpacity
          style={styles.copyImage}
          activeOpacity={0.7}
          onPress={onClickCopy}>
          <SvgIndex.copyIcon />
          <Text style={styles.copyText}>Copy</Text>
        </TouchableOpacity>
      </ScrollView>
      <Button
        loading={phraseData?.loading}
        title="Continue"
        onPress={onContinue}
        containerStyle={styles.buttonContainer}
      />
    </View>
  );
};

export default RecoveryPhrase;
