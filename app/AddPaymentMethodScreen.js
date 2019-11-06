
'use strict';

import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {spreedlyAddCardURL, environment_key} from './Constants';
import axios from 'axios';
import SafeAreaView from 'react-native-safe-area-view';
import { CreditCardInput } from 'react-native-credit-card-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

type Props = {};


export default class AddPaymentMethodScreen extends Component<Props> {

  state = {
    form: {}
  }

  _onChange = form => {
    this.setState({form});
  }

  _addCard = async () => {
    if(this.state.form.valid) {
      const names = this.state.form.values.name.split(' ');
      const number = this.state.form.values.number;
      const date = this.state.form.values.expiry.split('/');

      var creditCardInfo = 
      {payment_method: {
          credit_card: {
            first_name: names[0],
            last_name: names[1],
            number: number.replace(/\s/g, ''),
            verification_value: this.state.form.values.cvc,
            month: date[0],
            year: `20${date[1]}`,
          },
          data: {
            my_payment_method_identifier: number.slice(number.length - 4)
          }
      }};
      console.log(creditCardInfo);
      try {
        const {data} = await axios.post(`${spreedlyAddCardURL}?environment_key=${environment_key}`, creditCardInfo);
      } catch(err) {
        console.log(err);
        return;
      }
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView  bounces={false} resizeMode='contain' bounces={false}>
        <SafeAreaView contentContainerStyle={styles.container} resizeMode='contain'>
            <View style={styles.topBar}>
              <TouchableOpacity  onPress={() => this.props.navigation.goBack()}>
                  <Image style={{height: 30, width: 30, marginLeft: 10}} source={require('./img/cancelbtn.png')}/>
              </TouchableOpacity>
              <Text> Add Card </Text>
              <TouchableOpacity  onPress={() => this._addCard()}>
                  <Text> Done </Text>
              </TouchableOpacity>
            </View>
            <CreditCardInput style={{marginTop: 100}} onChange={this._onChange} requiresName={true} />
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'flex-start', 
      flexDirection: 'column',
    },
    topBar: {
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginTop: 15, 
      marginBottom: 20,
      marginRight: 10
    }
});

