/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button} from 'react-native';

type Props = {};
export default class SignupScreen extends Component<Props> {

  // static navigationOptions = {
  //   headerLeft:(
  //       <TouchableOpacity onPress={() => this.props.navigation.navigate('First')} title='sup'>
  //         <Image source={require('./img/backbtn.png')} />
  //       </TouchableOpacity>
  //     )

  // };


  constructor(props) {
    super(props);
    this.state = { 
      firstName: '',
      lastName: '',
      email: '',
      pwd: '',
      confirmPwd: '',
      errorMessage: 'error message sign up'
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

  render() {
    return (
      <View style={styles.container} resizeMode='contain'>
        <Text style={styles.loginMessage}>SIGN UP WITH EMAIL</Text>
        <View style={[styles.stack, {marginTop: 60}]} resizeMode='contain'>
          <TextInput style={styles.textInput} multiline={false}
          value={this.state.firstName} placeholder='First Name' onChangeText={(firstName) => this.setState({firstName})}/>
          <TextInput style={styles.textInput} multiline={false} 
          value={this.state.lastName} placeholder='Last Name' onChangeText={(lastName) => this.setState({lastName})}/>
          <TextInput style={styles.textInput} multiline={false} 
          value={this.state.email} placeholder='Email' onChangeText={(email) => this.setState({email})}/>
          <TextInput style={styles.textInput} multiline={false} secureTextEntry={true}
          value={this.state.pwd} placeholder='Password' onChangeText={(pwd) => this.setState({pwd})}/>
          <TextInput style={styles.textInput} multiline={false} secureTextEntry={true}
          value={this.state.confirmPwd} placeholder='Confirm Password' onChangeText={(confirmPwd) => this.setState({confirmPwd})}/>
          <TouchableOpacity style={styles.signupBtn} onPress={()=> this.props.navigation.navigate('Map')} color='#000000'>
              <Text style={styles.btnText}>SIGN UP</Text>
          </TouchableOpacity>
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        </View>
        <View style={styles.loginContainer}>
            <Text style={styles.welcome}>Already have an account? </Text>
            <Button onPress={()=> this.props.navigation.navigate('Login')} color='#F3A545' title='LOGIN'/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#B4D8ED',
  },
  stack: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  welcome: {
    textAlign: 'center',
    color: 'white',
    margin: 10,
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