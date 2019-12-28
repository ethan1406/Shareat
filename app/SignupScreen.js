
'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity,
  TextInput, Button} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import SafeAreaView from 'react-native-safe-area-view';

import { Auth } from 'aws-amplify';
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
 
    // axios.post(baseURL + '/user/signup/', 
    //   {email: this.state.email, password: this.state.pwd,
    //    firstName: this.state.firstName, lastName: this.state.lastName}
    //   )
    // .then(async (response) => {
    //   if(response.status == 200){
    //     try {
    //       await AsyncStorage.setItem('email',response.data.email);
    //       await AsyncStorage.setItem('userId',response.data.id);
    //       await AsyncStorage.setItem('firstName',response.data.firstName);
    //       await AsyncStorage.setItem('lastName',response.data.lastName);
    //       await AsyncStorage.setItem('loyaltyPoints', JSON.stringify(response.data.loyaltyPoints));
    //     } catch (err) {
    //       console.log(err);
    //     }
    //       this.props.navigation.navigate('Map');
    //   } 
    // }).catch((err) => {
    //   this.setState({errorMessage: err.response.data.error});
    // });

    Auth.signUp({
      username: this.state.email,
      password: this.state.pwd,
      attributes: {
          'firstName' : this.state.firstName, 
          'lastName' : this.state.lastName,  
        }
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));

  }

        // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        //         </TouchableWithoutFeedback>


  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container} bounces={false}
         behavior='padding' resizeMode='contain' innerRef={ref => {this.scroll = ref;}}>
         <SafeAreaView style={styles.stack} resizeMode='contain' >
            <TouchableOpacity style={{alignSelf: 'flex-start', 'marginTop': 20}} onPress={() => this.props.navigation.navigate('First')}>
               <Image style={{height: 30, width: 30, marginLeft: 20}} source={require('./img/backbtn.png')} />
            </TouchableOpacity>
            <Image style={styles.logo} source={require('./img/shareat_logo_with_name.png')} />
            <TextInput style={styles.textInput} multiline={false} 
              value={this.state.email} placeholder='Email' placeholderTextColor='gray'
              onChangeText={(email) => this.setState({email})}/>
            <TextInput style={styles.textInput} multiline={false} 
              value={this.state.firstName} placeholder='First Name' placeholderTextColor='gray'
              onChangeText={(firstName) => this.setState({firstName})}/>
            <TextInput style={styles.textInput} multiline={false} 
              value={this.state.lastName} placeholder='Last Name' placeholderTextColor='gray'
              onChangeText={(lastName) => this.setState({lastName})}/>
            <TextInput style={styles.textInput} multiline={false} secureTextEntry={true}
              value={this.state.pwd} placeholder='Password' placeholderTextColor='gray'
              onChangeText={(pwd) => this.setState({pwd})}/>
            <TextInput style={styles.textInput} multiline={false} secureTextEntry={true}
              value={this.state.confirmPwd} placeholder='Confirm Password' placeholderTextColor='gray'
              onChangeText={(confirmPwd) => this.setState({confirmPwd})}/>
            <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
            <TouchableOpacity style={styles.signupBtn} onPress={()=> {this._signup();}} color='#000000'>
                <Text style={styles.btnText}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity >
              <Image style={styles.facebook} source={require('./img/continue_fb.png')} />
            </TouchableOpacity>
        </SafeAreaView>
     </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  stack: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
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
  welcome: {
    textAlign: 'center',
    color: 'gray',
    margin: 10,
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
    height: 45,
    backgroundColor: '#ffa91f',
    borderRadius: 40,
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
    height: 120,
    width: 150,
    marginTop: 20,
    marginBottom: 20
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