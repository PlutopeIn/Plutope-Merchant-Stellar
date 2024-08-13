export interface image {
  name: string;
  uri: string;
  type: string;
}

export interface ErrorObject {
  logoError: string | undefined;
  coverImageError: string | undefined;
  fontsError: string | undefined;
  colorsError: string | undefined;
}

export interface storeDetailProps {
  logo: image | null;
  coverImage: iimage | null;
  // fonts: string | undefined;
  colors: string | undefined;
  loading: boolean;
  refreshing: boolean;
  // fontData: any;
  colorData: any;
}
