/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import { createStackNavigator, createAppContainer, navigation } from 'react-navigation';
import FirstScreen from './FirstScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import MapScreen from './MapScreen';
import {TouchableOpacity, View, Image} from 'react-native';




const AppNavigator = createStackNavigator(
  {
    Registration: createStackNavigator({
      First: {
        screen: FirstScreen,
      },
      Login: {
        screen: LoginScreen
      },
      Signup: {
        screen: SignupScreen
      }
    }),
    Map: {
      screen: MapScreen
    }
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
    mode: 'modal',
  }
);


export default createAppContainer(AppNavigator);





