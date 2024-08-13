import {Alert, Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import styles from './acceptPaymentCard.style';
import {PropType} from './acceptPaymentCardProps';
import SvgIndex from '@svgIndex';
import color from '@theme/color';
import useAcceptPaymentCard from './useAcceptPaymentCard';
import moment from 'moment';
import ImageIndex from '@imageIndex';
import imageIndex from '@imageIndex';
import {Button, CustomStatusBar, Header, Loader} from '@components';

const AcceptPaymentCard: React.FC<PropType> = ({
  item,
  index,
  onClick,
  onCancelClick,
}) => {
  const {
    onClickCopy,
    onClickShare,
    isVisible,
    setIsVisible,
    onTransaction,
    sourceAccount,
    loader,
    transactionDate,
    viewStellar,
    confirmCancel,
    loading,
  } = useAcceptPaymentCard({onCancelClick: onCancelClick});
  let link = item?.shareLink ? item?.shareLink : '';

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7}
        onPress={() => onTransaction(item)}>
        <View style={styles.nameDivider}>
          <Text allowFontScaling={false} style={styles.labelText}>
            {item?.requestFrom}
          </Text>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 2,
              borderRadius: 20,
              backgroundColor:
                item?.status == 'Completed'
                  ? color.lightGreen
                  : color.slateGray,
            }}>
            <Text
              allowFontScaling={false}
              style={[
                styles.statusText,
                {
                  color:
                    item?.status == 'Completed' ? color.darkGreen : color.black,
                },
              ]}>
              {item?.status == 'Completed' ? 'Paid' : item?.status}
            </Text>
          </View>
        </View>
        <Text allowFontScaling={false} style={styles.priceText}>
          {item?.amount} {item?.currency}
        </Text>
        <Text allowFontScaling={false} style={styles.dateText}>
          Invoice No - {item?.memoId?.toUpperCase()}
        </Text>
        <Text allowFontScaling={false} style={styles.dateText}>
          {moment(item?.createdAt).format('lll')}
        </Text>
        <View style={styles.borderStyle} />
        {item?.status != 'Cancelled' && (
          <View style={styles.linkDivider}>
            <Text
              allowFontScaling={false}
              style={styles.linkText}
              numberOfLines={1}>
              {item?.shareLink}
            </Text>
            <TouchableOpacity
              style={styles.copy}
              activeOpacity={0.7}
              onPress={() => onClickCopy(link)}>
              <SvgIndex.copy />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.share}
              activeOpacity={0.7}
              onPress={() => onClickShare(link)}>
              <SvgIndex.share />
            </TouchableOpacity>
            {/* <TouchableOpacity activeOpacity={0.7} onPress={onCancelClick}>
            <Image source={imageIndex.cancel} style={styles.cancelImg} />
          </TouchableOpacity> */}
          </View>
        )}
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={isVisible}
        transparent
        onRequestClose={() => setIsVisible(false)}>
        <View style={styles.modalContainer}>
          <CustomStatusBar />
          <Header title={'Payment Detail'} onBack={() => setIsVisible(false)} />
          {item?.currency != 'XLM' ? (
            <View style={styles.defaultImage}>
              <Image style={styles.image} source={imageIndex.noImage} />
            </View>
          ) : (
            <View style={styles.defaultImage}>
              <Image style={styles.image} source={imageIndex.asset} />
            </View>
          )}
          <Text allowFontScaling={false} style={styles.codeStyle}>
            {item?.amount} {item?.currency}
          </Text>
          <Text allowFontScaling={false} style={[styles.typeText]}>
            {item?.status}
          </Text>
          {loader ? (
            <Loader />
          ) : (
            <>
              {item?.status == 'Completed' && (
                <View style={styles.divider}>
                  <View style={{flex: 1, marginLeft: 10}}>
                    <Text allowFontScaling={false} style={styles.labelStyle}>
                      Sender
                    </Text>
                    <Text allowFontScaling={false} style={styles.timeText}>
                      {sourceAccount}
                    </Text>
                  </View>
                </View>
              )}
              <View style={styles.divider}>
                <View style={{flex: 1, marginLeft: 10}}>
                  <Text allowFontScaling={false} style={styles.labelStyle}>
                    Receiver
                  </Text>
                  <Text allowFontScaling={false} style={styles.timeText}>
                    {item?.fromAddress}
                  </Text>
                </View>
              </View>
              <View style={styles.dateView}>
                <Text allowFontScaling={false} style={styles.labelStyle}>
                  Invoice No
                </Text>
                <Text allowFontScaling={false} style={styles.timeText}>
                  {item?.memoId}
                </Text>
              </View>
              <View style={styles.dateView}>
                <Text allowFontScaling={false} style={styles.labelStyle}>
                  Date
                </Text>
                <Text allowFontScaling={false} style={styles.timeText}>
                  {moment(item?.createdAt).format('D MMM YYYY hh:mm A')}
                </Text>
              </View>
              {transactionDate != '' && (
                <View style={styles.dateView}>
                  <Text allowFontScaling={false} style={styles.labelStyle}>
                    Transaction Date
                  </Text>
                  <Text allowFontScaling={false} style={styles.timeText}>
                    {moment(transactionDate).format('D MMM YYYY hh:mm A')}
                  </Text>
                </View>
              )}
              {item?.status == 'Completed' && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    paddingBottom: 30,
                  }}>
                  <Button
                    title="View on Stellar"
                    containerStyle={styles.buttonStyle}
                    onPress={() => {
                      viewStellar(item);
                    }}
                  />
                </View>
              )}
              {item?.status != 'Cancelled' && item?.status != 'Completed' && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    paddingBottom: 30,
                  }}>
                  <Button
                    title="Cancel"
                    loading={loading}
                    containerStyle={styles.buttonStyle}
                    onPress={() => {
                      confirmCancel(item?._id);
                    }}
                  />
                </View>
              )}
            </>
          )}
        </View>
      </Modal>
    </>
  );
};

export default memo(AcceptPaymentCard);
