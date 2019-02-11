/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, AsyncStorage} from 'react-native';
import {baseURL} from './Constants';
import axios from 'axios';

type Props = {};
export default class RestaurantScreen extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = { 

     };
  }


  render() {
    return (
      <View style={styles.container} resizeMode='contain'>

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
  }
});