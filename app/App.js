'use strict';

import React, {Component} from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer, createBottomTabNavigator, navigation } from 'react-navigation';
import FirstScreen from './FirstScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import MapScreen from './MapScreen';
import QrCodeScreen from './QrCodeScreen';
import OptionsScreen from './OptionsScreen';
import RewardsScreen from './RewardsScreen';
import RestaurantScreen from './RestaurantScreen';
import RecentOrderScreen from './RecentOrderScreen';
import ReceiptScreen from './ReceiptScreen';
import CheckSplitScreen from './CheckSplitScreen';
import ConfirmationScreen from './ConfirmationScreen';
import RewardAccumulationScreen from './RewardAccumulationScreen';
import OrderBuyerScreen from './OrderBuyerScreen';
import PaymentMethodsScreen from './PaymentMethodsScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';


const CheckNavigator = createStackNavigator(
  {
    QR: QrCodeScreen,
    Check: {
      screen: CheckSplitScreen,
      navigationOptions: {
          header:null,
        },
      },
    Confirmation: ConfirmationScreen,
    PaymentMethods: PaymentMethodsScreen,
    RewardAccumulation:  RewardAccumulationScreen
  }
);

const CheckModalNavigator = createStackNavigator(
  {
    CheckNavigator: {
      screen: CheckNavigator,
      navigationOptions: {
        header: null
      }
    },
    OrderBuyer: OrderBuyerScreen
  }, 
  {
    mode: 'modal'
  }
);

/**
const mapNavigator = createStackNavigator(
  {
    Map: MapScreen,
    Restaurant: RestaurantScreen
  }
);
**/

const OptionNavigator = createStackNavigator(
  {
    Options: {
      screen: OptionsScreen,
      navigationOptions: {
        title: 'Profile'
      }
    },
    PaymentMethods: PaymentMethodsScreen,
    Restaurant: RestaurantScreen,
    RecentOrder: RecentOrderScreen,
    Receipt: ReceiptScreen
  }
);

const RewardNavigator = createStackNavigator(
  {
    Rewards: RewardsScreen,
    Restaurant: RestaurantScreen
  }
);


const main = createBottomTabNavigator({
      Reward: {
        screen: RewardNavigator,
        navigationOptions: {
          tabBarIcon: ({ tintColor, focused }) => (
            <AntDesign
              name={focused ? 'gift' : 'gift'}
              size={26}
              style={{ color: focused? '#F3A545' : tintColor }}
            />
          ),
        },
      },
      QR: {
        screen: CheckModalNavigator,
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
        screen: OptionNavigator,
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
    Registration: createSwitchNavigator({
      First: {
        screen: FirstScreen,
      },
      Login: {
        screen: LoginScreen,
        navigationOptions: {
          header:null,
        },
      },
      Signup: {
        screen: SignupScreen,
        navigationOptions: {
          header:null,
        },
      }
    }),
    Main: main
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false,
      header: null
    },
    mode: 'modal',
  }
);


export default createAppContainer(AppNavigator);
