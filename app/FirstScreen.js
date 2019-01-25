/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, Button} from 'react-native';

type Props = {};
export default class FirstScreen extends Component<Props> {

  static navigationOptions = ({navigation}) => { 
    return {  headerTransparent: true};
  }
  render() {
    return (
      <View style={styles.container} resizeMode='contain'>
        <Image style={styles.coverImage} source={require('./img/orange.png')}/>
        <TouchableOpacity style={styles.signupBtn} onPress={()=> this.props.navigation.navigate('Signup')} color='#000000'>
            <Text style={styles.btnText}>SIGN UP</Text>
        </TouchableOpacity>
        <Text style={{color: 'gray'}}> or </Text>
        <TouchableOpacity style={[styles.signupBtn, {backgroundColor:'#3B5598'}]} onPress={()=> {}} color='#000000'>
            <Text style={styles.btnText}>JOIN US WITH FACEBOOK</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B4D8ED',
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  welcome: {
    textAlign: 'center',
    color: 'white',
    margin: 10,
  },
  instructions: {
    flex: 1,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
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
  },
  coverImage: {
    flex: 8,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
    resizeMode: 'contain'
  }
});
