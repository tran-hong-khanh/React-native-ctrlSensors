import React, {Component} from 'react';
import {Image} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
//import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './home';
import Splash from './Splash';
import sensors from './sensors';

const HomeTab = createStackNavigator(
  {
    //Main: Main,
    Home: Home,
    sensors: sensors,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#5b9fa8',
      },
      headerTitleStyle: {
        fontSize: 23,
      },
      headerTintColor: '#fff',
      title: 'Return',
    },
  },
);
const MainApp = createSwitchNavigator({
  Splash: {
    screen: Splash,
  },
  HomeTab: {
    screen: HomeTab, //where this would be your current createBottomTabNavigator
  },
});

export default createAppContainer(MainApp);
