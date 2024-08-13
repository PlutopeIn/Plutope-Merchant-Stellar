module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
          '.style.ts',
        ],
        alias: {
          '@imageIndex': './src/assets/imageIndex.ts',
          '@svgIndex': './src/assets/svgIndex.ts',
          '@components': './src/components/componentsIndex.ts',
          '@card': './src/components/cardIndex.ts',
          '@navigation': './src/navigation',
          '@screenName': './src/navigation/screenName.ts',
          '@screens': './src/screens',
          '@theme': './src/theme',
          '@redux': './src/services/redux',
          '@utility': './src/utility',
          '@api': './src/services/api',
          '@config': './src/services/config',
          '@hooks': './src/hooks',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
