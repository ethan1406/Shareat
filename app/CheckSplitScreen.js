
'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions,
  AsyncStorage, Image, ScrollView, StatusBar} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Pusher from 'pusher-js/react-native';
import OrderListItem from './components/OrderListItem';


type Props = {};
const colors = ['#F3A545', '#f85457','pink', '#8c62ca','#009cff', '#f85457'];
const screenWidth= Dimensions.get('window').width; 

var colorIndex = 0;
export default class CheckSplitScreen extends Component<Props> {

  constructor(props) {
    super(props);

    this.pusher = null;
    this.splittingChannel = null;

    var params = this.props.navigation.state.params;

    var colorMap = {};
    params.members.forEach((member) => {
        colorMap[member.userId] = colors[colorIndex % 6];
        colorIndex ++; 
    });

    //5bf14f828a45424e801f938b
    this.state = {
      loading: false,
      data: params.data,
      restaurantName: params.restaurantName,
      restaurantId: params.restaurantId,
      orderTotal: params.orderTotal,
      error: null,
      refreshing: false,
      selectedIndex: 0,
      partyId: params.partyId,
      colorMap: colorMap,
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
        updatedOrders[index].buyers.push({firstName: data.firstName, 
            lastName: data.lastName, userId: data.userId});
        var updatedColorMap = JSON.parse(JSON.stringify(this.state.colorMap));

        if(!data.isMember) {
          updatedColorMap[data.userId] = colors[colorIndex % 5];
          colorIndex++;
        }
        //var joined = this.state.members.concat(data.userId);
        
        this.setState({data: updatedOrders,
          colorMap: updatedColorMap, refresh: !this.state.refresh});
      } else {
        const updatedOrders = this.state.data.slice();
        const index = updatedOrders.findIndex(order=> order._id == data.orderId);
        updatedOrders[index].buyers = updatedOrders[index].buyers.filter(buyer => buyer.userId != data.userId);

        // const indexToRemove = this.state.members.indexOf(data.userId);
        // const updatedMembers = this.state.members.slice(indexToRemove, 1);

        this.setState({data: updatedOrders, refresh: !this.state.refresh});
      }
    });
  }

  async componentDidMount() {    
    try {
      const userId = await AsyncStorage.getItem('userId');
      this.setState({userId});
    } catch (err) {
      console.log(err);
    }
    
  }

  willFocus = this.props.navigation.addListener(
    'willBlur',
    payload => {
      colorIndex = 0;
    }
  );

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
      colorMap={this.state.colorMap}
      confirmation={false}
      navigation={this.props.navigation}
    />
  )

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


  _getindividualTotal = () => {
    const individualOrders = this.state.data.filter(order => order.buyers.map(buyer => buyer.userId).includes(this.state.userId));
    const individualPrice = individualOrders.reduce((total, order) => ( total + order.price/order.buyers.length), 0);
    return (individualPrice/100).toFixed(2);
  }

  render() {
    return (
      <View style={[styles.container]} resizeMode='contain'>
        <StatusBar
          barStyle='dark-content'
          backgroundColor='white'
          translucent={false}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image style={styles.logo} source={require('./img/shareat_logo.png')}/>
          <Text style={styles.restaurantText}>{this.state.restaurantName}</Text>
          <View style={styles.divider}/>
          <Text style={styles.orderdetail}> Order Detail </Text>
          <SegmentedControlTab
            values={['Group Orders', 'My Orders']}
            tabStyle={styles.tabStyle}
            tabsContainerStyle={{width: screenWidth}}
            activeTabStyle={styles.activeTabStyle}
            tabTextStyle={styles.tabTextStyle}
            selectedIndex={this.state.selectedIndex}
            onTabPress={this._handleIndexChange}
          />
          <View style={{marginTop: 20, backgroundColor: 'white'}}>
            <FlatList
              style={{marginHorizontal: 20, backgroundColor: 'white'}}
              data={this.state.selectedIndex ? 
                this.state.data.filter(order => order.buyers.map(buyer => buyer.userId).includes(this.state.userId)) : 
                this.state.data}
              extraData={this.state.refresh}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              ListHeaderComponent={this._renderHeader}
            />
          </View>
          <View style={styles.orderTotalContainer}>
            <Text style={{color: 'gray'}}>{this.state.selectedIndex ? 'Your Total: ' : 'Group Total: '} </Text>
            <Text> {this.state.selectedIndex ? `$${this._getindividualTotal()}`: `$${(this.state.orderTotal/100).toFixed(2)}`} </Text>
          </View>
        </ScrollView>
        <Text style={{color: 'gray'}}>Double Tap the Dishes You've Shared!</Text>
        <TouchableOpacity style={styles.confirmBtn} onPress={()=> this.props.navigation.navigate('Confirmation', {
              data: this.state.data, 
              restaurantName: this.state.restaurantName,
              restaurantId: this.state.restaurantId,
              userId: this.state.userId,
              partyId: this.state.partyId,
              colorMap: this.state.colorMap
            })} color='#000000'>
            <Text style={styles.btnText}>Check out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  orderTotalContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 20,
    padding: 5,
    marginBottom: 50,
    backgroundColor: 'white'
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
    height: 35,
    borderWidth: 0
  },
  tabTextStyle: {
    color: '#F3A545'
  },
  restaurantText: {
    alignSelf: 'flex-start',
    fontSize: 24,
    marginBottom: 15,
    marginLeft: 20,
    color: 'grey'
  },
  confirmBtn: {
    width: '100%',
    height: 35,
    backgroundColor: '#F3A545',
    borderRadius: 0,
    alignItems: 'center',
    marginRight:20,
    marginLeft:20,
    marginTop: 15,
    marginBottom: 0
  },
  btnText: {
    color:'white',
    textAlign:'center',
    paddingTop: 9
  },
  logo: {
    width: '58%',
    height: 65,
    resizeMode: 'contain',
    paddingTop: 35,
    marginLeft: -10,
  },
  divider: {
    flexDirection:'column',
    borderColor: 'grey',
    borderBottomWidth: 0.7,
    width: '100%',
    alignItems:'center',
  },
  orderdetail: {
    fontSize: 24,
    color: '#F3A545',
    marginLeft: 15,
  }
});