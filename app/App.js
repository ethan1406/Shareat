/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, navigation } from 'react-navigation';
import FirstScreen from './FirstScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import MapScreen from './MapScreen';
import OptionsScreen from './OptionsScreen';
import QrCodeScreen from './QrCodeScreen';
import {TouchableOpacity, View, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';


const CheckNavigator = createStackNavigator(
  {
    Check: LoginScreen,
    QR: QrCodeScreen,
  },
  {
    defaultNavigationOptions: {
      header: null,
    }
  }
);


const main = createBottomTabNavigator({
      Map: {
        screen: MapScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor, focused }) => (
            <Ionicons
              name={focused ? 'ios-map' : 'ios-map'}
              size={26}
              style={{ color: focused? '#F3A545' : tintColor }}
            />
          ),
        },
      },
      QR: {
        screen: CheckNavigator,
        navigationOptions: {
          tabBarIcon: ({ tintColor, focused }) => (
            <AntDesign
              name={focused ? 'qrcode' : 'qrcode'}
              size={26}
              style={{ color: focused? '#F3A545' : tintColor }}
            />
          )
        },
      },
      Options: {
        screen: OptionsScreen,
        navigationOptions: {
          tabBarLabel: '',
          tabBarIcon: ({ tintColor, focused }) => (
            <AntDesign
              name={focused ? 'user' : 'user'}
              size={26}
              style={{ color: focused? '#F3A545' : tintColor }}
            />
          ),
        },
      }
    },
    {
      tabBarOptions: { showLabel: false }
    });

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
    Main: main
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
    mode: 'modal',
  }
);


export default createAppContainer(AppNavigator);





