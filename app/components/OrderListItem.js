'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

type Props = {};
export default class OrderListItem extends React.PureComponent {
  
  lastTap = null;

  _handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
      console.log('double tap');
    } else {
      this.lastTap = now;
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this._handleDoubleTap}>
        <View style={styles.cellContainer}>
          <Text style={{color: 'black', width: '40%'}} numberOfLines={2}>{this.props.title}</Text>
          <View style={styles.sharedByContainer}>
            {this.props.buyers.map((buyer, index) => (
              <View style={styles.bubble} key={index}>
                <Text style={{color: 'white'}}>{buyer.firstName[0]}{buyer.lastName[0]}</Text>
              </View>
            ))}
          </View>
          <Text style={{color: 'black'}}>${this.props.price/100}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  cellContainer : {
    flex: 1,
    marginTop: 5,
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  sharedByContainer: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  bubble: {
    backgroundColor: '#F3A545',
    marginHorizontal: 2,
    paddingHorizontal: 3,
    paddingVertical: 3,
    borderRadius: 20,
  }
});