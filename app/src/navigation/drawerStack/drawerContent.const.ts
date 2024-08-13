import screenName from '@navigation/screenName';
import svgIndex from '@svgIndex';

export const data = [
  {
    id: 1,
    image: svgIndex.dashboard,
    label: 'Dashboard',
    navigation: screenName.dashboard,
  },
  {
    id: 2,
    image: svgIndex.assets,
    label: 'Assets',
    navigation: screenName.assets,
  },
  // {
  //   id: 3,
  //   image: svgIndex.swapAssets,
  //   label: 'Swap Assets',
  //   navigation: screenName.dashboard,
  // },
  {
    id: 4,
    image: svgIndex.transaction,
    label: 'Transactions',
    navigation: screenName.transaction,
  },
  {
    id: 5,
    image: svgIndex.store,
    label: 'Store Details',
    navigation: screenName.editDetails,
  },
  {
    id: 6,
    image: svgIndex.qrSymbol,
    label: 'My QR Code',
    navigation: screenName.myQrPayment,
  },
  {
    id: 7,
    image: svgIndex.setting,
    label: 'Settings',
    navigation: screenName.setting,
  },
  {
    id: 8,
    image: svgIndex.help,
    label: 'Help',
    navigation: screenName.helpSupport,
  },
  {
    id: 9,
    image: svgIndex.logout,
    label: 'Logout',
    navigation: screenName.login,
  },
  
];
