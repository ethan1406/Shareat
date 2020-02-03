'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from '@react-native-community/async-storage';

import { Auth } from 'aws-amplify';

type Props = {};
export default class FirstScreen extends Component<Props> {

  static navigationOptions = ({navigation}) => { 
    return {  headerTransparent: true};
  }

  async componentDidMount() {
      try {
        const user = await Auth.currentAuthenticatedUser();

        this.props.navigation.navigate('QR');

        await AsyncStorage.setItem('email', user.attributes.email);
        await AsyncStorage.setItem('amazonUserSub', user.attributes.sub);
        await AsyncStorage.setItem('firstName', user.attributes.given_name);
        await AsyncStorage.setItem('lastName', user.attributes.family_name);
      }catch(err) {
        console.log(err);
      }
  }
  
  render() {
    return (
       <ImageBackground source={require('./img/background_image.jpg')} resizeMode='contain' 
          style={[styles.container, {width: '100%', height: '100%'}]}>
          <Image style={styles.coverImage} source={require('./img/splash_logo.png')}/>
          <View style={{marginTop: 'auto', width: '100%', marginBottom: 60}} >
              <TouchableOpacity style={styles.signupBtn} onPress={()=> this.props.navigation.navigate('Signup')} color='#000000'>
                  <Text style={styles.btnText}>Create an Account</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.signupBtn, {backgroundColor:'#FBFBFB'}]} 
                 color='#000000' onPress={()=> this.props.navigation.navigate('Login')}>
                  <Text style={[styles.btnText, {color: 'black'}]}>Log in</Text>
              </TouchableOpacity>
          </View>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    textAlign: 'center',
    color: 'gray',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  signupBtn: {
    marginTop: 10,
    marginBottom: 10,
    width: '80%',
    height: 45,
    backgroundColor: '#F3A545',
    borderRadius: 40,
    alignSelf: 'center',
    alignItems: 'center',
    marginRight:20,
    marginLeft:20,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2 // Android
  },
  btnText: {
    color:'white',
    textAlign:'center',
    paddingTop: 11
  },
  coverImage: {
    marginTop: 90,
    width: 80,
    height: 80,
    alignSelf: 'center',
    resizeMode: 'contain',
    display: 'none'
  }
});
