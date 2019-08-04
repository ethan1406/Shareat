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
import NewLoginScreen from './NewLoginScreen';
import SplashScreen from './SplashScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';


const CheckNavigator = createStackNavigator(
  {
    QR: QrCodeScreen,
    Check: CheckSplitScreen, 
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

const mapNavigator = createStackNavigator(
  {
    Map: MapScreen,
    Restaurant: RestaurantScreen
  }
);


const OptionNavigator = createStackNavigator(
  {
    Options: {
      screen: OptionsScreen,
      navigationOptions: {
        title: 'Profile'
      }
    },
    PaymentMethods: PaymentMethodsScreen,
    Rewards: RewardsScreen,
    Restaurant: RestaurantScreen,
    RecentOrder: RecentOrderScreen,
    Receipt: ReceiptScreen
  }
);


const main = createBottomTabNavigator({
      Map: {
        screen: mapNavigator,
        navigationOptions: {
          tabBarIcon: ({ tintColor, focused }) => (
            <AntDesign
              name={focused ? 'enviromento' : 'enviromento'}
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
    Registration: createStackNavigator({
      Login: {
        screen: NewLoginScreen,
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

const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: AppNavigator
});

export default createAppContainer(InitialNavigator);