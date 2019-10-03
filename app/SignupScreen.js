
'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity,
  TextInput, Button, KeyboardAvoidingView, Span} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import {baseURL} from './Constants';

type Props = {};
export default class SignupScreen extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = { 
      firstName: '',
      lastName: '',
      email: '',
      pwd: '',
      confirmPwd: '',
      errorMessage: ''
     };
  }

  _signup = async () => {
    if(this.state.pwd !== this.state.confirmPwd) {
      this.setState({errorMessage: 'Passwords do not match'});
      return;
    }
 
    axios.post(baseURL + '/signup/', 
      {email: this.state.email, password: this.state.pwd,
       firstName: this.state.firstName, lastName: this.state.lastName}
      )
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
          this.props.navigation.navigate('Map');
      } 
    }).catch((err) => {
      this.setState({errorMessage: err.response.data.error});
    });
  }

        // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        //         </TouchableWithoutFeedback>


  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding' resizeMode='contain'>
          <Image style={styles.logo} source={require('./img/splash_logo.png')} />
          <View style={styles.stack} resizeMode='contain'>
            <TextInput style={styles.textInput} multiline={false} 
            value={this.state.lastName} placeholder='Username' onChangeText={(lastName) => this.setState({lastName})}/>
            <TextInput style={styles.textInput} multiline={false} 
            value={this.state.email} placeholder='Email' onChangeText={(email) => this.setState({email})}/>
            <TextInput style={styles.textInput} multiline={false} secureTextEntry={true}
            value={this.state.pwd} placeholder='Password' onChangeText={(pwd) => this.setState({pwd})}/>
            <TouchableOpacity style={styles.signupBtn} onPress={()=> {this._signup();}} color='#000000'>
                <Text style={styles.btnText}>Continue</Text>
            </TouchableOpacity>
            <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
          </View>
          <View style={styles.divider}>
          <Text style={styles.span}>   Or   </Text>
          </View>
          <TouchableOpacity >
          <Image style={styles.facebook} source={require('./img/continue_fb.png')} />
          </TouchableOpacity>
          <TouchableOpacity >
          <Image style={styles.google} source={require('./img/signin_google.png')} />
          </TouchableOpacity>
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
    alignItems: 'center',
    marginTop: -30,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  loginMessage: {
    textAlign: 'center',
    fontSize: 15,
    color: 'grey',
    marginBottom: 20,
  },
  errorMessage: {
    textAlign: 'center',
    fontSize: 14,
    color: 'red',
  },
  textInput: {
    height: 45, 
    width: '80%',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  signupBtn: {
    marginTop: 35,
    marginBottom: 10,
    width: '80%',
    height: 37,
    backgroundColor: '#ffa91f',
    borderRadius: 2,
    alignItems: 'center',
    marginRight:20,
    marginLeft:20,
  },
  btnText: {
    color:'white',
    textAlign:'center',
    paddingTop: 9,
    fontSize: 15.5,
  },
  logo: {
    height: 80,
    width: 75,
    marginTop: 15,
  },
  facebook: {
    alignItems: 'center', 
    resizeMode: 'contain',
    width: 220,
  },
  google: {
    alignItems: 'center', 
    resizeMode: 'contain',
    width: 220,
  },
  divider: {
    flexDirection:'column',
    borderColor: 'grey',
    borderBottomWidth: 0.7,
    width: '100%',
    alignItems:'center',
    height: 14,
  },
  span: {
    paddingTop: -17,
    alignSelf: 'center',
    fontSize: 16,
    backgroundColor: 'white',
  },
});