/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableHighlight, 
  FlatList, Image, KeyboardAvoidingView} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import axios from 'axios';
import Dialog from 'react-native-dialog';
import stripe from 'tipsi-stripe';

import OrderListItem from './components/OrderListItem';


type Props = {};

const taxRate = 0.095;

export default class ConfirmationScreen extends Component<Props> {

  constructor(props) {
    super(props);

    var params = this.props.navigation.state.params;
    var myOrders = params.data.filter(order => order.buyers.map(buyer => buyer.userId).includes(params.userId));

    var individualPrice = myOrders.reduce((total, order) => ( total + order.price/order.buyers.length), 0);
    var tax = individualPrice * taxRate;
    var tip = (tax + individualPrice) * 0.12;
    var individualTotal = individualPrice + tax + tip;

    this.state = {
      data: myOrders,
      restaurantName: params.restaurantName,
      individualPrice: individualPrice,
      individualTotal: individualTotal,
      tax: tax,
      tip: tip,
      customTip: '',
      tipRate: 0,
      selectedIndex: 0,
      refresh: false,
      dialogVisible: false
    };
  }

  componentDidMount() {  
    stripe.setOptions({
      publishableKey: 'pk_test_x9efkreYwQ5wlmqXXc2paByL',
    });

  }

  _requestPaymentMethod = () => {
    const theme = {
      primaryBackgroundColor: 'white',
      secondaryBackgroundColor: 'white',
      primaryForegroundColor: 'gray',
      secondaryForegroundColor: '#F3A545',
      accentColor: '#F3A545',
      errorColor: 'red'
    };
    const options = {
      smsAutofillDisabled: true,
      requiredBillingAddressFields: 'full', // or 'full'
      theme
    };

    stripe.paymentRequestWithCardForm(options)
      .then(response => {
        // Get the token from the response, and send to your server
        
        //axios.post(baseURL + '/user/payment', {tokenId: response.tokenId});

        //this.props.navigation.navigate('OptionsScreen');
      })
      .catch(error => {
        // Handle error
        console.log('Payment failed', { error });

      });
  }
  
  static navigationOptions = ({navigation}) => {
    return{
      headerLeft:( 
        <TouchableOpacity onPress={() => navigation.navigate('Check')}>
           <Image style={{height: 40, width: 40, marginLeft: 20}} source={require('./img/backbtn.png')} />
        </TouchableOpacity>
      ),
      title: 'Confirmation',
      headerTransparent: true
    };
  }

  _renderItem = ({item}) => (
    <OrderListItem
      id={item._id}
      title={item.name}
      price={item.price/item.buyers.length}
      buyers={item.buyers}
      partyId={this.state.partyId}
      confirmation={true}
    />
  )

  _keyExtractor = (item) => item._id

  _handleIndexChange = (index) => {
    var tipRate = 0.12;
    if (index == 0){
      tipRate = 0.12;
    } else if (index == 1) {
      tipRate = 0.15;
    } else if (index == 2) {
      tipRate = 0.18;
    } else if (index == 3) {
      this.setState({...this.state,
        selectedIndex: index, 
        dialogVisible: true});
      return;
    }
    var tip = (this.state.individualPrice + this.state.tax) * tipRate;
    var individualTotal = tip + this.state.individualPrice + this.state.tax;
    
    this.setState({
      ...this.state,
      selectedIndex: index,
      individualTotal,
      tip
    });
  }

  _handleCustomTip = () => {
    var individualTotal = this.state.customTip + this.state.individualPrice + this.state.tax;

    this.setState({
      ...this.state,
      individualTotal,
      tip: this.state.customTip,
      dialogVisible: false
    });
  }


  render() {
    return (
      <View behavior='behavior' style={styles.container} resizeMode='contain'>
        <Text style={styles.restaurantText}>{this.state.restaurantName}</Text>
        <TouchableOpacity style={styles.signupBtn} onPress={()=> {this._requestPaymentMethod();}} color='#000000'>
            <Text style={styles.btnText}>Payment Method</Text>
        </TouchableOpacity>

        <View style={[styles.signupBtn, {backgroundColor: 'white'}]} onPress={()=> {this._requestPaymentMethod();}} color='#000000'>
            <Text style={[styles.btnText, {color: 'black'}]}>MasterCard</Text>
        </View>
        <View style={[styles.signupBtn]} color='#000000'>
            <Text style={[styles.btnText]}>Orders</Text>
        </View>
        <View style={styles.flastListContainer}>
          <FlatList
            data={this.state.data}
            extraData={this.state.refresh}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            ListHeaderComponent={this._renderHeader}
          />
        </View>
        <View style={styles.tipContainer}>
            <View style={[styles.totalContainer]} color='#000000'>
                <Text style={[styles.btnText]}>Total</Text>
                <Text style={[styles.rightText]}> {`$${(this.state.individualTotal/100).toFixed(2)}`}</Text>
            </View>
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
            <View style={styles.feeContainer}>
              <SegmentedControlTab
                values={['12%', '15%', '18%', 'Custom']}
                tabsContainerStyle={styles.tabsContainerStyle}
                tabStyle={styles.tabStyle}
                activeTabStyle={styles.activeTabStyle}
                tabTextStyle={styles.tabTextStyle}
                selectedIndex={this.state.selectedIndex}
                onTabPress={this._handleIndexChange}
              />
            </View>
        </View>
        <TouchableOpacity style={[styles.signupBtn, {alignItems: 'center'}]} onPress={()=> {this.showDialog();}} color='#000000'>
            <Text style={[styles.btnText, {marginLeft: 0}]}>Confirm & Pay</Text>
        </TouchableOpacity>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Custom Tip</Dialog.Title>
          <Dialog.Description>
            Please enter the amount of tip you want to give.
          </Dialog.Description>
          <Dialog.Input multiline={false} keyboardType='numeric'
           placeholder='Custom Tip' onChangeText={(customTip) => this.setState({customTip: customTip*100})} />
          <Dialog.Button label="Cancel" onPress={()=> { this.setState({ dialogVisible: false });}} />
          <Dialog.Button label="Enter" onPress={()=> {this._handleCustomTip();}} />
        </Dialog.Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
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
  },
  totalContainer: {
    width: '100%',
    height: 30,
    backgroundColor: '#F3A545',
    borderRadius: 2,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  flastListContainer: {
    height: 200,
    marginBottom: -40
  },
  restaurantText: {
    alignSelf: 'flex-start',
    fontSize: 18,
    marginTop: 20,
    marginLeft: 15,
    marginBottom: 15,
    color: 'black'
  },
  signupBtn: {
    marginBottom: 0,
    width: '100%',
    height: 30,
    backgroundColor: '#F3A545',
    borderRadius: 2,
    alignItems: 'flex-start',
    marginRight:20,
    marginLeft:20
  },
  btnText: {
    color:'white',
    textAlign:'left',
    marginLeft: 15,
    paddingTop: 7
  },
  rightText: {
    color:'white',
    textAlign:'right',
    marginRight: 15,
    paddingTop: 7
  },
  tabsContainerStyle:{
    marginLeft: 15,
    width: '60%'
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
  textInput: {
    height: 40, 
    width: '60%',
    textAlign: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  }
});