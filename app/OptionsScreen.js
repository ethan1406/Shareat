'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, ScrollView, View,
  TouchableOpacity, Text, Image, StatusBar} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {baseURL} from './Constants';
import { Auth, Analytics } from 'aws-amplify';
import axios from 'axios';
import Dialog from 'react-native-dialog';

type Props = {};
export default class OptionsScreen extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      errorMessage: '',
      dialogVisible: false
    };

    this._signout = this._signout.bind(this);
    this._signoutRequest = this._signoutRequest.bind(this);
  }

  async componentDidMount() {
    try {
      const firstName = await AsyncStorage.getItem('firstName');
      const lastName = await AsyncStorage.getItem('lastName');
      const email = await AsyncStorage.getItem('email');
      this.setState({firstName, lastName, email});
    } catch (err) {
      this.setState({errorMessage: err.message});
    }
  }

  _scrollToInput (reactNode: any) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.props.scrollToFocusedInput(reactNode);
  }

  _signoutRequest() {
    this.setState({dialogVisible: true});
  }

  async _signout() {
    try {
      await Auth.signOut();
      this.props.navigation.navigate('First');
    }catch(err) {
      console.log(err);
    }
  }

  willFocus = this.props.navigation.addListener(
    'willFocus',
    async payload => {
      const firstName = await AsyncStorage.getItem('firstName');
      const lastName = await AsyncStorage.getItem('lastName');
      const email = await AsyncStorage.getItem('email');
      this.setState({firstName, lastName, email});
    }
  );

  async _testAnalytics() {
    Analytics.record({ name: 'albumVisit' });
  }

  render() {
    return (
      <ScrollView resizeMode='contain' contentContainerStyle={styles.container}>
            <StatusBar
    backgroundColor='#ffa91f'
    barStyle="light-content"
  />
        <TouchableOpacity style={{paddingTop: 20}} onPress={()=> {this.props.navigation.navigate('EditProfile');}}>
        <Image style={styles.profile} source={require('./img/defaultUserFemale.png')} />
        </TouchableOpacity>
        <Text style={styles.name}> {this.state.firstName} </Text>
        <Text style={styles.email}> {this.state.email} </Text>
        <TouchableOpacity style={styles.optionContainer} onPress={()=> {this.props.navigation.navigate('RecentOrder');}} color='#000000'>
          <Image style={[styles.optionImage, {height: 30}]} source={require('./img/receipt.png')} />
          <Text style={styles.optionText}> Receipts </Text>
          <Text style={styles.rightText}> > </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer} onPress={()=> {this.props.navigation.navigate('PaymentMethods');}} color='#000000'>
          <Image style={[styles.optionImage, {height: 20}]} source={require('./img/stripe/card_expiry.png')} />
          <Text style={styles.optionText}> Payment Methods</Text>
          <Text style={styles.rightText}> > </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer} onPress={()=> {this._testAnalytics();}} color='#000000'>
          <Image style={[styles.optionImage, {height: 28}]} source={require('./img/about.png')} />
          <Text style={styles.optionText}> About </Text>
          <Text style={styles.rightText}> > </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer} onPress={this._signoutRequest} color='#000000'>
          <Image style={[styles.optionImage, {height: 28}]} source={require('./img/about.png')} />
          <Text style={styles.optionText}> Sign Out </Text>
          <Text style={styles.rightText}> > </Text>
        </TouchableOpacity>
         <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Description>Are you sure you want to sign out?</Dialog.Description>
          <Dialog.Button label="Cancel" onPress={()=> { this.setState({ dialogVisible: false });}} />
          <Dialog.Button label="Sign Out" onPress={()=> {this._signout();}} />
        </Dialog.Container>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    flex:1, 
    justifyContent: 'flex-start', 
    alignItems: 'center'
  },
  rightText: {
    color:'black',
    textAlign:'right',
    marginLeft: 'auto',
    marginRight: 20
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 60,
    borderColor: '#D3D3D3',
    borderWidth: 0.5,
  },
  optionImage: {
    tintColor: 'black', 
    marginHorizontal: 30, 
    height: 25, 
    width: 30
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 0,
    borderWidth: 0,
    overflow: 'hidden',
  },
  optionText: {
    fontSize: 15,
    color: '#888888',
  },
  name: {
    fontSize: 16,
    color: 'grey',
    marginTop: 7,
  },
  email: {
    fontSize: 13,
    color: '#888888',
    marginTop: 3,
    marginBottom: 25,
  },
});