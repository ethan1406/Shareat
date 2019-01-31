/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {Platform, StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';

import {baseURL} from './Constants';

type Props = {};

const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = 0.0421;
export default class MapScreen extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude:  0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
      errorMessage: null,
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

    axios.get(baseURL + '/map/allRestaurants/')
      .then((response) => {
      if(response.status == 200){
        try {
          var markers = [];
          response.data.forEach((merchant) => {
            var marker = {};
            marker['coordinate'] = {};   
            marker['coordinate']['latitude'] = merchant.location.latitude;
            marker['coordinate']['longitude'] = merchant.location.longitude;
            marker['title'] = merchant.name;
            markers.push(marker);
          });
          this.setState({markers: markers});
          
        } catch (err) {
          console.log(err);
        }
      } 
    }).catch((err) => {
      this.setState({errorMessage: err.response.data.error});
    });

  }


// {this.state.markers.map((marker, index) => {
//           if(typeof marker.location !== 'undefined') {
//             console.log(marker.location.latitude);
//             const latlng = {latitude: marker.location.latitude, longitude: marker.location.longitude};
//             return (
//               <Marker
//                 coordinate={latlng}
//                 title={marker.name}
//                 key={index}
//               />
//             );
//           }})}

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          provider={PROVIDER_GOOGLE}
          >
          {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              title={marker.title}
              description={'test description'}
              coordinate={marker.coordinate}
              pinColor={'#F3A545'}
            />
          ))}
        </MapView>
        <View style={styles.buttonContainer}>
          <TextInput
            style={styles.bubble}
            placeholder='search for restaurants'
          />
        </View>
        
      </View>
    );
  }
}



const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    marginVertical: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 600,
    backgroundColor: 'white',
    width: '80%'
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
});