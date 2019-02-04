/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, FlatList, AsyncStorage} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import axios from 'axios';
import Pusher from 'pusher-js/react-native';

import OrderListItem from './components/OrderListItem';


type Props = {};

export default class CheckSplitScreen extends Component<Props> {

  constructor(props) {
    super(props);

    this.pusher = null;
    this.splittingChannel = null;

    var params = this.props.navigation.state.params;

    this.state = {
      loading: false,
      data: params.data,
      restaurantName: params.restaurantName,
      orderTotal: params.orderTotal,
      error: null,
      refreshing: false,
      selectedIndex: 0,
      partyId: params.partyId,
      userId: ''
    };

    //set up pusher to asynchronously update who are splitting the dishes
    this.pusher = new Pusher('96771d53b6966f07b9f3', {
        //authEndpoint: 'YOUR PUSHER AUTH SERVER ENDPOINT',
        cluster: 'us2',
        encrypted: true
    });

    this.splittingChannel = this.pusher.subscribe(params.partyId); // subscribe to the party channel

    this.splittingChannel.bind('splitting', (data) => {
      if(data.add) {
        const updatedOrders = this.state.data.slice();
        const index = updatedOrders.findIndex(order=> order._id == data.orderId);
        updatedOrders[index].buyers.push({firstName: data.firstName, lastName: data.lastName, userId: data.userId});
        
        this.setState({data: updatedOrders, refresh: !this.state.refresh});
      } else {
        const updatedOrders = this.state.data.slice();
        const index = updatedOrders.findIndex(order=> order._id == data.orderId);
        updatedOrders[index].buyers = updatedOrders[index].buyers.filter(buyer => buyer.userId != data.userId);

        this.setState({data: updatedOrders, refresh: !this.state.refresh});
      }
    });
  }

  async componentDidMount() {  
    // this.setState({ loading: true });
    // axios.get('https://www.shareatpay.com/party/5b346f48d585fb0e7d3ed3fc/6')
    // .then(response => {
    //   this.setState({data: response.data.orders, 
    //     restaurantName: response.data.restaurantName,
    //     orderTotal: response.data.orderTotal,
    //     partyId: response.data.partyId,
    //     loading: false});
    // }).catch(err => {
    //   this.setState({ err, loading: false });
    // });

    try {
      const userId = await AsyncStorage.getItem('userId');
      this.setState({userId});
    } catch (err) {
      console.log(err);
    }
    
  }


  _keyExtractor = (item) => item._id;

  _handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  }

  _renderItem = ({item}) => (
    <OrderListItem
      id={item._id}
      title={item.name}
      price={this.state.selectedIndex? item.price/item.buyers.length : item.price}
      buyers={item.buyers}
      partyId={this.state.partyId}
    />
  );

  _renderHeader = () => {

    var priceTag = 'Price';
    if(this.state.selectedIndex == 1) {
      if(this.state.data.filter(order => order.buyers.map(buyer => buyer.userId).includes(this.state.userId)).length == 0) {
        return null;
      } else {
        priceTag = 'Price for You';
      }
    }
    return  <View style={styles.headerContainer}>
              <Text style={{color: 'gray'}}>Item</Text>
              <Text style={{color: 'gray'}}>{priceTag}</Text>
            </View>;
  }

  _splitOrder = () => {
    axios.post('https://www.shareatpay.com/order/split', {partyId: this.state.partyId, orderId: '5b7485ea3cb45c9524de9064'});
  }

  _getindividualTotal = () => {
    const individualOrders = this.state.data.filter(order => order.buyers.map(buyer => buyer.userId).includes(this.state.userId));
    const individualPrice = individualOrders.reduce((total, order) => ( total + order.price/order.buyers.length), 0);
    return (individualPrice/100).toFixed(2);
  }

  render() {
    return (
      <View style={styles.container} resizeMode='contain'>
        <Text style={styles.restaurantText}>{this.state.restaurantName}</Text>
        <SegmentedControlTab
          values={['Group Orders', 'My Orders']}
          tabStyle={styles.tabStyle}
          activeTabStyle={styles.activeTabStyle}
          tabTextStyle={styles.tabTextStyle}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this._handleIndexChange}
        />
        <FlatList
          style={{marginTop: 15}}
          data={this.state.selectedIndex ? 
            this.state.data.filter(order => order.buyers.map(buyer => buyer.userId).includes(this.state.userId)) : 
            this.state.data}
          extraData={this.state.refresh}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ListHeaderComponent={this._renderHeader}
        />
        <View style={styles.orderTotalContainer}>
          <Text style={{color: 'gray'}}>{this.state.selectedIndex ? 'Your Total: ' : 'Group Total: '} </Text>
          <Text> {this.state.selectedIndex ? `$${this._getindividualTotal()}`: `$${(this.state.orderTotal/100).toFixed(2)}`} </Text>
        </View>
        <Text style={{color: 'gray'}}>Double Tap the Dishes You've Shared!</Text>
        <TouchableOpacity style={styles.signupBtn} onPress={()=> this._splitOrder()} color='#000000'>
            <Text style={styles.btnText}>Check out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'center',
  },
  orderTotalContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 60
  },
  headerContainer: {
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  activeTabStyle: {
    backgroundColor: '#F3A545'
  },
  tabStyle: {
    borderColor:'#F3A545',
    borderWidth: 0
  },
  tabTextStyle: {
    color: '#F3A545'
  },
  restaurantText: {
    alignSelf: 'flex-start',
    fontSize: 18,
    marginVertical: 15,
    color: 'black'
  },
  signupBtn: {
    marginTop: 10,
    marginBottom: 0,
    width: '100%',
    height: 30,
    backgroundColor: '#F3A545',
    borderRadius: 2,
    alignItems: 'center',
    marginRight:20,
    marginLeft:20
  },
  btnText: {
    color:'white',
    textAlign:'center',
    paddingTop: 7
  }
});