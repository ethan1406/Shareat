'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

type Props = {};
export default class OrderListItem extends Component<Props> {
  
  lastTap = null;

  _handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
      this._splitOrder();
    } else {
      this.lastTap = now;
    }
  }

  _splitOrder = () => {
      axios.post('https://www.shareatpay.com/order/split', {partyId: this.props.partyId, orderId: this.props.id});
  }

  _lookupBuyers = () => {
    this.props.navigation.navigate('OrderBuyer', {
      name: this.props.title, 
      buyers: this.props.buyers,
      colorMap: this.props.colorMap
    });
  }

  _renderContent = () => (
    <View style={styles.cellContainer}>
          <Text style={{color: 'black', width: '40%'}} numberOfLines={3}>{this.props.title}</Text>
          <View style={styles.sharedByContainer}>
             {this.props.buyers.map((buyer, index) => {             
              if(index <= 2 || this.props.buyers.length <= 4) {
                return (
                <View style={{height: 30}} key={index}> 
                  <View style={[styles.bubble, {backgroundColor: this.props.colorMap[buyer.userId]}]}>
                    <Text style={{color: 'white'}}>{buyer.firstName[0]}{buyer.lastName[0]}</Text>
                  </View>
                  {buyer.finished ? 
                    ( <FontAwesome
                        name={'check-circle'}
                        size={15}
                        style={{color: 'green', position: 'absolute', left: 17, top: 12}}
                      />) : null}
                </View>
                );
              } else if(index == 3) {
                return (
                  <View style={{height: 30}} key={index}> 
                    <TouchableOpacity style={[styles.bubble, {paddingHorizontal: 5, backgroundColor: '#ededed'}]}
                      onPress={() => this._lookupBuyers()} >
                      <Text style={{color: 'black'}}>...</Text>
                    </TouchableOpacity>
                  </View>
                );
              } else {
                return null;
              }
             })}
          </View>
          <Text style={{color: 'black'}}>${(this.props.price/100).toFixed(2)}</Text>
        </View>
  )

  render() {
    return (
      this.props.confirmation ?
      (<View>
        {this._renderContent()}
      </View>)
      :
    (<TouchableOpacity onPress={()=> this._handleDoubleTap(this.props)}>
        {this._renderContent()}
      </TouchableOpacity>)

    );
  }
}

const styles = StyleSheet.create({
  cellContainer : {
    flex: 1,
    marginTop: 5,
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  sharedByContainer: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden'
  },
  bubble: {
    backgroundColor: '#F3A545',
    marginHorizontal: 2,
    paddingHorizontal: 3,
    paddingVertical: 3,
    borderRadius: 20,
  }
});