/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, ScrollView, TouchableOpacity, Text} from 'react-native';
import {baseURL} from './Constants';
import axios from 'axios';

type Props = {};
export default class OptionsScreen extends Component<Props> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container} resizeMode='contain' 
      contentContainerStyle={{flex:1, justifyContent: 'space-around', alignItems: 'center'}}>
        <TouchableOpacity style={styles.signupBtn} onPress={()=> {}} color='#000000'>
            <Text style={styles.btnText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupBtn} onPress={()=> {}} color='#000000'>
            <Text style={styles.btnText}>Receipts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupBtn} onPress={()=> {this.props.navigation.navigate('PaymentMethods');}} color='#000000'>
            <Text style={styles.btnText}>Payment Methods</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  signupBtn: {
    marginTop: 10,
    marginBottom: 10,
    width: '80%',
    height: 25,
    backgroundColor: '#F3A545',
    borderRadius: 2,
    alignItems: 'center',
    marginRight:20,
    marginLeft:20
  },
  btnText: {
    color:'white',
    textAlign:'center',
    paddingTop: 3
  }
});