/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button, KeyboardAvoidingView, AsyncStorage} from 'react-native';


type Props = {};
export default class RewardsScreen extends Component<Props> {

  constructor(props) {
    super(props);
  }

  static navigationOptions = ({navigation}) => {
    return{
      headerLeft:( 
        <TouchableOpacity onPress={() => navigation.navigate('Options')}>
           <Image style={{height: 40, width: 40, marginLeft: 20}} source={require('./img/backbtn.png')} />
        </TouchableOpacity>
      ),
      title: 'Rewards',
      headerTransparent: true
    };
  }

  

  render() {
    return (
      <View style={styles.container} resizeMode='contain'>
        <View style={[styles.totalContainer]} color='#000000'>
            <Text style={[styles.btnText]}>Total</Text>
            <Text style={[styles.rightText]}>ha</Text>
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
    backgroundColor: 'white',
  },
  totalContainer: {
    width: '100%',
    height: 30,
    backgroundColor: '#F3A545',
    borderRadius: 2,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  btnText: {
    color:'white',
    textAlign:'left',
    marginLeft: 15,
    paddingTop: 7
  },
  rightText: {
    color:'white',
    textAlign:'right',
    marginRight: 15,
    paddingTop: 7
  }
});