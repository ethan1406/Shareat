/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, 
  Image, ScrollView, AsyncStorage, FlatList} from 'react-native';
import axios from 'axios';

import {baseURL} from './Constants';
import OrderListItem from './components/OrderListItem';


type Props = {};
const colors = ['#F3A545', '#f85457','pink', '#8c62ca','#009cff'];
var colorIndex = 0;
export default class ReceiptScreen extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
      errMessage: '',
      refreshing: false,
      colorMap: {},
      myOrders: []

    };
  }

  async componentDidMount() {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await axios.get(`${baseURL}/party/${this.props.navigation.state.params.partyId}`);

      const myOrders = 
        response.data.orders.filter(order => order.buyers.map(buyer => buyer.userId).includes(userId));

      var colorMap = {};
      response.data.members.forEach((member) => {
          colorMap[member.userId] = colors[colorIndex % 5];
          colorIndex ++; 
      });
      
      this.setState({myOrders, colorMap});
    } catch (err) {
      this.setState({errMessage: err.message});
    }
  }

  componentWillUnmount() {
    this.setState({colorMap: {}});
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerLeft:( 
        <TouchableOpacity onPress={() => navigation.goBack()}>
           <Image style={{height: 30, width: 30, marginLeft: 20}} source={require('./img/backbtn.png')} />
        </TouchableOpacity>
      ),
      title: 'Order Receipt',
    };
  }

  _keyExtractor = (item) => item._id

  _renderItem = ({item}) => (
    <View>
      <View style={styles.cellContainer}>
        <Text style={{color: 'black', width: '40%'}} numberOfLines={3}>{item.name}</Text>
        <Text style={{color: 'black'}}>${(item.price/100).toFixed(2)}</Text>
      </View>
    </View>
  )

  _renderHeader = () => {
    if(this.state.myOrders.length == 0) {
      return null;
    }
    return  <View style={styles.headerContainer}>
              <Text style={{color: 'gray'}}>Item</Text>
              <Text style={{color: 'gray'}}>Price for you</Text>
            </View>;
  }


  render() {
    return (
      <ScrollView contentContainerStyle={styles.container} resizeMode='contain'>
        <View style={{marginTop: 20, backgroundColor: 'white'}}>
            <FlatList
              style={{marginHorizontal: 15, backgroundColor: 'white'}}
              data={this.state.myOrders}
              extraData={this.state.refresh}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              ListHeaderComponent={this._renderHeader}
            />
        </View>
        <View style={styles.tipContainer}>         
              <View style={[styles.feeContainer]}>
                <Text style={{marginLeft: 15}}>Subtotal </Text>
                <Text style={{marginRight: 15}}>{`$${(this.state.individualPrice/100).toFixed(2)}`}</Text>
              </View>
              <View style={styles.feeContainer}>
                <Text style={{marginLeft: 15}}>Tax & Fees </Text>
                <Text style={{marginRight: 15}}>{`$${(this.state.tax/100).toFixed(2)}`}</Text>
              </View>
              <View style={styles.feeContainer}>
                <Text style={{marginLeft: 15}}>Tip </Text>
                <Text style={{marginRight: 15}}>{`$${(this.state.tip/100).toFixed(2)}`}</Text>
              </View>

          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start', 
    flexDirection: 'column'
  },
  cellContainer : {
    flex: 1,
    marginTop: 5,
    height: 50,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerContainer: {
    flexDirection:'row',
    justifyContent: 'space-between'
  },
   tipContainer: {
    flex: 1,
    marginTop: 0,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  feeContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});