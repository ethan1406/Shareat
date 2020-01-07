'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, ScrollView, View,
  TouchableOpacity, Text, Image} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {baseURL} from './Constants';
import { Auth } from 'aws-amplify';
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

  render() {
    return (
      <ScrollView resizeMode='contain' contentContainerStyle={styles.container}>
        <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 25, marginBottom: 10}}> {this.state.firstName} </Text>
        <View style={[styles.optionContainer, {justifyContent: 'center', borderColor: 'white'}]} color='#000000'>
          <Image style={styles.optionImage} source={require('./img/email.png')} />
          <Text> {this.state.email} </Text>
        </View>
        <TouchableOpacity style={styles.signupBtn} onPress={()=> {this.props.navigation.navigate('EditProfile');}} color='#000000'>
            <Text style={styles.btnText}> Edit Profile </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupBtn} onPress={this._signoutRequest} color='#000000'>
            <Text style={styles.btnText}> Sign Out </Text>
        </TouchableOpacity>
        <View style={{marginVertical: 50}}></View>
        <TouchableOpacity style={styles.optionContainer} onPress={()=> {this.props.navigation.navigate('RecentOrder');}} color='#000000'>
          <Image style={styles.optionImage} source={require('./img/receipt.png')} />
          <Text> Receipts </Text>
          <Text style={styles.rightText}> > </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer} onPress={()=> {this.props.navigation.navigate('PaymentMethods');}} color='#000000'>
          <Image style={[styles.optionImage, {height: 20}]} source={require('./img/stripe/card_expiry.png')} />
          <Text> Payment Methods</Text>
          <Text style={styles.rightText}> > </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer} onPress={()=> {this.props.navigation.navigate('Rewards');}} color='#000000'>
          <Image style={[styles.optionImage, {height: 25}]} source={require('./img/about.png')} />
          <Text> About </Text>
          <Text style={styles.rightText}> > </Text>
        </TouchableOpacity>
         <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Are you sure you want to sign out?</Dialog.Title>
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
    height: 40,
    borderColor: '#D3D3D3',
    borderWidth: 0.5
  },
  optionImage: {
    tintColor: 'black', 
    marginHorizontal: 15, 
    height: 25, 
    width: 25
  },
  btnText: {
    color:'white',
    textAlign:'center',
    paddingTop: 3
  }
});