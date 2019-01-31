/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import OrderListItem from './components/OrderListItem';
import axios from 'axios';

type Props = {};

export default class CheckSplitScreen extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      restaurantName: '',
      orderTotal: 0,
      error: null,
      refreshing: false,
      selectedIndex: 0,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios.get('https://www.shareatpay.com/party/5b346f48d585fb0e7d3ed3fc/6')
    .then(response => {
      this.setState({data: response.data.orders, 
        restaurantName: response.data.restaurantName,
        orderTotal: response.data.orderTotal,
        loading: false});
    }).catch(err => {
      this.setState({ err, loading: false });
    });
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
      price={item.price}
      buyers={item.buyers}
    />
  );

  _renderHeader = () => {
    return  <View style={styles.headerContainer}>
              <Text style={{color: 'gray'}}>Item</Text>
              <Text style={{color: 'gray'}}>Price</Text>
            </View>;
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
          data={this.state.data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ListHeaderComponent={this._renderHeader}
        />
        <View style={styles.orderTotalContainer}>
          <Text style={{color: 'gray'}}>Your Total: </Text>
          <Text> ${this.state.orderTotal/100} </Text>
        </View>
        <Text style={{color: 'gray'}}>Double Tap the Dishes You've Shared!</Text>
        <TouchableOpacity style={styles.signupBtn} onPress={()=> {}} color='#000000'>
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
    marginVertical: 10,
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