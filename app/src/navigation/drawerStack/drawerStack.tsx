import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from '@screens/drawer/dashboard/Dashboard';
import DrawerContent from './DrawerContent';
import screenName from '@navigation/screenName';

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
      }}
      drawerContent={(props: any) => <DrawerContent {...props} />}>
      <Drawer.Screen name={screenName.dashboard} component={Dashboard} />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
