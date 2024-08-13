import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {LogBox} from 'react-native';
import Store from './src/services/redux/store';
import Route from '@navigation/index';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'new NativeEventEmitter()',
]);
LogBox.ignoreAllLogs();

const persistStore = Store();

const App = () => {
  return (
    <Provider store={persistStore.store}>
      <PersistGate loading={null} persistor={persistStore.persistor}>
        <Route />
      </PersistGate>
    </Provider>
  );
};

export default App;
