/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from '@react-native-community/async-storage';
import {baseURL} from './Constants.js';
import axios from 'axios';

type Props = {};
export default class LoginScreen extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = { 
      email: 'ethan3@gmail.com',
      pwd: 'haha12345',
      errorMessage: ''
     };
  }

  static navigationOptions = ({navigation}) => {
    return{
      headerTransparent: true,
    };
  }

  _login = async () => {
    axios.post(baseURL + '/login/', 
      {email: this.state.email, password: this.state.pwd})
    .then(async (response) => {
      if(response.status == 200){
        try {
          await AsyncStorage.setItem('email',response.data.email);
          await AsyncStorage.setItem('userId',response.data.id);
          await AsyncStorage.setItem('firstName',response.data.firstName);
          await AsyncStorage.setItem('lastName',response.data.lastName);
          await AsyncStorage.setItem('loyaltyPoints', JSON.stringify(response.data.loyaltyPoints));
        } catch (err) {
          console.log(err);
        }
          this.props.navigation.navigate('Main');
      } 
    }).catch((err) => {
      this.setState({errorMessage: err.response.data.error});
    });
  } 

  render() {
    return (
      <SafeAreaView style={styles.container} resizeMode='contain'>
        <KeyboardAvoidingView style={styles.stack} behavior='padding' keyboardVerticalOffset={64}>
          <Image style={styles.logo} source={require('./img/login_logo.png')}/>
          <TextInput style={styles.textInput} multiline={false} value={this.state.email}
          onChangeText={(email) => this.setState({email})}/>
          <View style={styles.passwordContainer}>
            <TextInput style={styles.textInputPw} multiline={false} secureTextEntry={true} value={this.state.pwd}
            onChangeText={(pwd) => this.setState({pwd})}/>
          <TouchableOpacity>
            <Text style={styles.forgot}> Forgot? </Text>
          </TouchableOpacity>
          </View>
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
          <TouchableOpacity style={styles.signUpContainer} onPress={()=> {}} color='#000000' onPress={()=> this.props.navigation.navigate('Signup')}>
            <Text style={[styles.btnText, {fontSize: 14, color:'#ffa91f'}]}> Create a New Account </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <View style={styles.stack} resizeMode='contain'>
          <Text style={{color: 'gray'}}> connect with </Text>
          <TouchableOpacity onPress={() => {}}>
             <Image style={{height: 50, width: 50}} source={require('./img/facebook.png')} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signupBtn} onPress={()=> {this._login();}} color='#000000'>
           <Text style={styles.btnText}>Log In</Text>
          </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  stack: {
    width: '100%',
   // marginTop: 200,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  errorMessage: {
    textAlign: 'center',
    fontSize: 13,
    color: 'red',
  },
  textInput: {
    height: 50, 
    width: '83%',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    color: 'gray',
    fontSize: 15,
  },
  textInputPw: {
    width: '83%',
    height: 50, 
    color: 'gray',
    fontSize: 15,
  },
  signupBtn: {
    marginTop: 10,
    marginBottom: 0 ,
    width: '100%',
    height: 40,
    backgroundColor: '#ffa91f',
    alignItems: 'center',
  },
  btnText: {
    color:'white',
    textAlign:'center',
    paddingTop: 9,
    fontSize: 15,
  },
  logo: {
    alignSelf: 'center',
    width: '58%',
    height: 100,
    resizeMode: 'contain',
    marginTop: 150,
    paddingLeft: 30,
    marginBottom: 40,
  },
  passwordContainer: {
    justifyContent:'space-between',
    marginBottom: 0,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    width: '83%',
  },
  forgot: {
    fontSize: 14,
    color: '#ffa91f',
    paddingTop: 15,
  }
});