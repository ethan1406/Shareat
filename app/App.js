'use strict';

import React, {Component} from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer, createBottomTabNavigator, navigation } from 'react-navigation';
import FirstScreen from './FirstScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import AddPaymentMethodScreen from './AddPaymentMethodScreen';
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
import EditProfileScreen from './EditProfileScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
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
    Receipt: ReceiptScreen,
    EditProfile: EditProfileScreen,
    ForgotPassword: {
      screen: ForgotPasswordScreen,
      navigationOptions: {
        header: null,
      }
    }
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

const AppNavigator = createSwitchNavigator(
  {
    Registration: createSwitchNavigator({
      First: {
        screen: FirstScreen,
      },
      LoginFlow: createStackNavigator({
        Login: {
          screen: LoginScreen,
          navigationOptions: {
            header: null,
          },
        },
        ForgotPassword: {
          screen: ForgotPasswordScreen,
          navigationOptions: {
            header: null,
          }
        }
      }),
      Signup: {
        screen: SignupScreen,
        navigationOptions: {
          header: null,
        },
      }
    }),
    Root: createStackNavigator(
      {
        Main: {
          screen: main,
          path: 'main'
        },
        AddPaymentMethod: AddPaymentMethodScreen,
      },
      {
        mode: 'modal',
        headerMode: 'none',
      }
    )
  }
);


const AppContainer = createAppContainer(AppNavigator);

const prefix = 'shareat://';

const app = () => <AppContainer uriPrefix={prefix} />;


export default app;
