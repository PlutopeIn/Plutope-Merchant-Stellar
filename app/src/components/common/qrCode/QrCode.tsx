import React, {useEffect, useRef} from 'react';
import QRCodeLibrary from 'react-native-qrcode-svg';
import {color} from '../../../theme';
import {QRCodeProps} from './qrCodeProps';

const QRCode = ({
  url,
  logo,
  size = 120,
  QRcolor = color.black,
  backgroundColor = color.transparent,
  logoBackgroundColor = color.white,
  getRef,
}: QRCodeProps) => {
  const qrCode = useRef<QRCodeLibrary | null>(null);

  useEffect(() => {
    if (qrCode.current) {
      //@ts-ignore
      qrCode.current?.update({
        value: url,
      });
    }
  }, []);

  return (
    <QRCodeLibrary
      ref={qrCode}
      value={url}
      size={size}
      logo={logo}
      logoBackgroundColor={logoBackgroundColor}
      logoSize={size / 3.5}
      logoBorderRadius={size / 3.5}
      backgroundColor={backgroundColor}
      color={QRcolor}
      logoMargin={5}
    />
  );
};

QRCode.displayName = 'QRCode';

export default QRCode;
