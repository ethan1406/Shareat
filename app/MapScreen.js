/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from 'react-native';

type Props = {};

const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = 0.0421;
export default class MapScreen extends Component<Props> {

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
      region: {
        latitude: 0 ,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      error: null,
    };
    
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }


  render() {
    return (
        <MapView
          style={styles.map} 
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%'
  }
});