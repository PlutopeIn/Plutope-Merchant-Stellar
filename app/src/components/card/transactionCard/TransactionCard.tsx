import {View, Text, TouchableOpacity, Image, Modal} from 'react-native';
import React, {memo} from 'react';
import {PropType} from './transactionCardProps';
import styles from './transactionCard.style';
import imageIndex from '@imageIndex';
import moment from 'moment';
import SvgIndex from '@svgIndex';
import useTransactionCard from './useTransactionCard';
import {Button, CustomStatusBar, Header} from '@components';
import color from '@theme/color';

const TransactionCard: React.FC<PropType> = ({item, index}) => {
  const {onClick, isVisible, setIsVisible, walletPrivateData} =
    useTransactionCard();

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7}
        onPress={() => setIsVisible(true)}>
        <View style={styles.imageContent}>
          <Image
            style={styles.image}
            source={item?.type == 'Sent' ? imageIndex.receive : imageIndex.sent}
          />
          <View style={{position: 'absolute', right: -4, bottom: 2}}>
            {item?.type == 'Sent' ? (
              <SvgIndex.upArrow />
            ) : (
              <SvgIndex.downIcon />
            )}
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.infoContainer}>
            <Text
              allowFontScaling={false}
              style={styles.labelText}
              numberOfLines={1}>
              {item?.transactionHash?.substring(0, 8)?.toUpperCase() +
                '.....' +
                item?.transactionHash?.slice(-4)?.toUpperCase()}
            </Text>
            <Text allowFontScaling={false} style={styles.amountText}>
              {item?.type == 'Sent' ? '-' : '+'}
              {parseFloat(item?.amount)?.toFixed(2) ?? '0.00'}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text allowFontScaling={false} style={styles.symbolText}>
              {item?.type}
            </Text>
            <Text allowFontScaling={false} style={styles.dateText}>
              {moment(item?.created_at).format('D MMM YYYY')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={isVisible}
        transparent
        onRequestClose={() => setIsVisible(false)}>
        <View style={styles.modalContainer}>
          <CustomStatusBar />
          <Header
            title={'Transaction Detail'}
            onBack={() => setIsVisible(false)}
          />
          {item?.assetCode != 'XLM' ? (
            <View style={styles.defaultImage}>
              <Image style={styles.image} source={imageIndex.noImage} />
            </View>
          ) : (
            <View style={styles.defaultImage}>
              <Image style={styles.image} source={imageIndex.asset} />
            </View>
          )}
          <Text allowFontScaling={false} style={styles.codeStyle}>
            {item?.type == 'Sent' ? '-' : '+'}
            {parseFloat(item?.amount)?.toFixed(2) ?? '0.00'} {item?.assetCode}
          </Text>
          <Text
            allowFontScaling={false}
            style={[
              styles.typeText,
              {color: item?.type == 'Sent' ? color.red : color.green},
            ]}>
            {item?.type}
          </Text>
          <View style={styles.divider}>
            <View style={styles.imageContent}>
              <Image
                style={styles.image}
                source={
                  item?.type == 'Sent' ? imageIndex.receive : imageIndex.sent
                }
              />
              <View style={{position: 'absolute', right: -4, bottom: 2}}>
                {item?.type == 'Sent' ? (
                  <SvgIndex.upArrow />
                ) : (
                  <SvgIndex.downIcon />
                )}
              </View>
            </View>
            <View style={{flex: 1, marginLeft: 10}}>
              <Text allowFontScaling={false} style={styles.labelStyle}>
                Sender
              </Text>
              <Text allowFontScaling={false} style={styles.timeText}>
                {item?.type != 'Sent'
                  ? item?.counterparty
                  : walletPrivateData?.publicKey}
              </Text>
            </View>
          </View>
          <View style={styles.divider}>
            <View style={styles.imageContent}>
              <Image
                style={styles.image}
                source={
                  item?.type != 'Sent' ? imageIndex.receive : imageIndex.sent
                }
              />
              <View style={{position: 'absolute', right: -4, bottom: 2}}>
                {item?.type != 'Sent' ? (
                  <SvgIndex.upArrow />
                ) : (
                  <SvgIndex.downIcon />
                )}
              </View>
            </View>
            <View style={{flex: 1, marginLeft: 10}}>
              <Text allowFontScaling={false} style={styles.labelStyle}>
                Receiver
              </Text>
              <Text allowFontScaling={false} style={styles.timeText}>
                {item?.type == 'Sent'
                  ? item?.counterparty
                  : walletPrivateData?.publicKey}
              </Text>
            </View>
          </View>

          {/* <View style={styles.divider}>
            <Text allowFontScaling={false} style={styles.labelStyle}>
              Transaction Id :
            </Text>
            <Text allowFontScaling={false} style={styles.timeText}>
              {item?.operationId}
            </Text>
          </View> */}
          <View style={styles.dateView}>
            <Text allowFontScaling={false} style={styles.labelStyle}>
              Date
            </Text>
            <Text allowFontScaling={false} style={styles.timeText}>
              {moment(item?.created_at).format('D MMM YYYY hh:mm A')}
              {/* {moment(item?.created_at).format('HH:mm')} */}
            </Text>
          </View>

          {/* <Text allowFontScaling={false} style={styles.timeText}>
            Transaction Id : {item?.operationId}
          </Text>
          <Text allowFontScaling={false} style={styles.timeText}>
            Date : {moment(item?.created_at).format('D MMM YYYY')},
            {moment(item?.created_at).format('HH:mm')}
          </Text> */}
          <View
            style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 30}}>
            <Button
              title="View on Network Explorer"
              containerStyle={styles.buttonStyle}
              onPress={() => onClick(item)}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default memo(TransactionCard);
