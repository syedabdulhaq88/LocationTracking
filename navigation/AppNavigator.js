import React from 'react';
import { createAppContainer, createSwitchNavigator ,createStackNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Auth: LoginScreen,
  },
  {
    initialRouteName: 'Auth',
  }
  )
);

 
 
//  const AppStack = createStackNavigator({ Home: MainTabNavigator ,headerMode: 'none', });
 
//  const AuthStack = createStackNavigator({ SignIn: LoginScreen ,headerMode: 'none', });
 
 
//  export default createSwitchNavigator({
//     App: MainTabNavigator,
//     Auth: AuthStack,
//    },
//    {
//      initialRouteName: 'Auth',
//    }
//  );
 
 