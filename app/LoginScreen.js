/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, AsyncStorage} from 'react-native';
import {baseURL} from './Constants';
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
      headerLeft:( 
        <TouchableOpacity onPress={() => navigation.navigate('First')}>
           <Image style={{height: 40, width: 40, marginLeft: 20}} source={require('./img/backbtn.png')} />
        </TouchableOpacity>
      ),
      headerTransparent: true
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
        } catch (err) {
          console.log(err);
        }
          this.props.navigation.navigate('Map');
      } 
    }).catch((err) => {
      this.setState({errorMessage: err.response.data.error});
    });
  } 

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding' resizeMode='contain'>
        <Text style={styles.loginMessage}>LOG IN WITH EMAIL</Text>
        <View style={[styles.stack, {marginTop: 60}]} resizeMode='contain'>
          <TextInput style={styles.textInput} multiline={false}
          value={this.state.email} onChangeText={(email) => this.setState({email})}/>
          <TextInput style={styles.textInput} multiline={false} secureTextEntry={true}
          value={this.state.pwd} onChangeText={(pwd) => this.setState({pwd})}/>
          <TouchableOpacity style={styles.signupBtn} onPress={()=> {this._login();}} color='#000000'>
              <Text style={styles.btnText}>SIGN IN</Text>
          </TouchableOpacity>
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        </View>
        <View style={[styles.stack, {marginTop: -60}]} resizeMode='contain'>
          <Text style={{color: 'gray'}}> connect with </Text>
          <TouchableOpacity onPress={() => {}}>
             <Image style={{height: 50, width: 50}} source={require('./img/facebook.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {}} color='#000000' onPress={()=> this.props.navigation.navigate('Signup')}>
              <Text style={[styles.btnText, {fontSize: 15, color:'#F3A545'}]}> Sign up for Shareat </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  stack: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  loginMessage: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white'
  },
  errorMessage: {
    textAlign: 'center',
    fontSize: 14,
    color: 'red',
  },
  textInput: {
    height: 40, 
    width: '80%',
    textAlign: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
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