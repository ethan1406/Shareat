/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {Platform, Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import {baseURL} from './Constants';
import stripe from 'tipsi-stripe';
import axios from 'axios';

type Props = {};


export default class PaymentMethodsScreen extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = { 

    };
  }

  componentDidMount() {
    stripe.setOptions({
      publishableKey: 'pk_test_x9efkreYwQ5wlmqXXc2paByL',
    });

    const theme = {
      primaryBackgroundColor: 'white',
      secondaryBackgroundColor: 'white',
      primaryForegroundColor: 'gray',
      secondaryForegroundColor: '#F3A545',
      accentColor: '#F3A545',
      errorColor: 'red'
    };
    const options = {
      smsAutofillDisabled: true,
      requiredBillingAddressFields: 'full', // or 'full'
      theme
    };
    stripe.paymentRequestWithCardForm(options)
      .then(response => {
        // Get the token from the response, and send to your server
        
        //axios.post(baseURL + '/user/payment', {tokenId: response.tokenId});

        //this.props.navigation.navigate('OptionsScreen');
      })
      .catch(error => {
        // Handle error
        console.warn('Payment failed', { error });

      });
  }

  // static navigationOptions = ({navigation}) => {
  //   return{
  //     headerLeft:( 
  //       <TouchableOpacity onPress={() => navigation.navigate('First')}>
  //          <Image style={{height: 40, width: 40, marginLeft: 20}} source={require('./img/backbtn.png')} />
  //       </TouchableOpacity>
  //     ),
  //     headerTransparent: true
  //   };
  // }


  render() {
    return (
      <View />
    );
  }
}

