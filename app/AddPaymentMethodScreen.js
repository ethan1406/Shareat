
'use strict';

import React, {Component} from 'react';
import {Text, ScrollView, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {baseURL} from './Constants';
import axios from 'axios';
import SafeAreaView from 'react-native-safe-area-view';
import { CreditCardInput } from 'react-native-credit-card-input';

type Props = {};


export default class AddPaymentMethodScreen extends Component<Props> {

  render() {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column' }}>
        <ScrollView>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, alignItems: 'center'}}>
            <TouchableOpacity style={{marginBottom: 45}} onPress={() => this.props.navigation.goBack()}>
                <Image style={{height: 30, width: 30, marginLeft: 20}} source={require('./img/backbtn.png')}/>
            </TouchableOpacity>
            <Text> Add Payment Method </Text>
            <Text> Test </Text>
          </View>
          <CreditCardInput style={{marginTop: 100}} onChange={this._onChange} requiresPostalCode={true} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

});

