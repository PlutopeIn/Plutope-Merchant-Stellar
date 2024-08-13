import {Ref} from 'react';
import {ImageSourcePropType} from 'react-native';

export type QRCodeProps = {
  /** The QR code URL */
  url: string;
  logo?: ImageSourcePropType;
  size?: number;
  QRcolor?: string;
  backgroundColor?: string;
  logoBackgroundColor?: string;
  getRef?: (ref: Ref<SVGElement>) => Ref<SVGElement>;
};
