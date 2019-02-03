
'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, Linking} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {baseURL} from './Constants';
import axios from 'axios';

type Props = {};
export default class QrCodeScreen extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = { 

     };
  }

  componentDidMount() {
    axios.get('https://www.shareatpay.com/party/5b346f48d585fb0e7d3ed3fc/6').then((response) => {
      this.props.navigation.navigate('Check', {
        data: response.data.orders, 
        restaurantName: response.data.restaurantName,
        orderTotal: response.data.orderTotal,
        partyId: response.data._id,
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  onSuccess(e) {
    //e.data
  }


  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        topContent={
          <Text style={styles.centerText}>
            Scan the QR code on your table
          </Text>
        }
        showMarker={true}
        cameraProps={{captureAudio: false}}
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  }
});