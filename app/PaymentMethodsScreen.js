
'use strict';

import React, {Component} from 'react';
import {Platform, Text, View, TouchableOpacity, Image, ScrollView, StyleSheet} from 'react-native';
import {baseURL} from './Constants';
import stripe from 'tipsi-stripe';
import axios from 'axios';

type Props = {};


export default class PaymentMethodsScreen extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = { 
      cards: [],
      selectedCardId: 0,
      errorMessage: ''
    };
  }

  async componentDidMount() {
    stripe.setOptions({
      publishableKey: 'pk_test_x9efkreYwQ5wlmqXXc2paByL',
    });

    try {
      const response = await axios.get(baseURL + '/user/listCards');
      this.setState({cards: response.data.data, selectedCardId: response.data.data[0].id});
    } catch (err) {
      this.setState({errorMessage: err.response.data.error});
    }
  }

  static navigationOptions = ({navigation}) => {
    return{
      headerLeft:( 
        <TouchableOpacity onPress={() => navigation.goBack()}>
           <Image style={{height: 30, width: 30, marginLeft: 20}} source={require('./img/backbtn.png')} />
        </TouchableOpacity>
      ),
      title: 'Payment Method'
      //headerTransparent: true
    };
  }

  _getCardImage = (brandName, tintColor) => {
    const brandLower = brandName.toLowerCase();
    if (brandLower === 'visa') {
      return (<Image style={{tintColor: tintColor, marginHorizontal: 15}} source={require('./img/stripe/card_visa.png')} />);
    } else if (brandLower === 'mastercard') {
      return (<Image style={{tintColor: tintColor, marginHorizontal: 15}} source={require('./img/stripe/card_mastercard.png')} />);
    } else if (brandLower === 'american express') {
      return (<Image style={{tintColor: tintColor, marginHorizontal: 15}} source={require('./img/stripe/card_amex.png')} />);
    } else if (brandLower === 'apple pay') {
      return (<Image style={{tintColor: tintColor, marginHorizontal: 15}} source={require('./img/stripe/card_applepay.png')} />);
    } else if (brandLower === 'discover') {
      return (<Image style={{tintColor: tintColor, marginHorizontal: 15}} source={require('./img/stripe/card_discover.png')} />);
    }
    return (<View />);
  }

  _onPressItem = async (id) => {

    this.setState({selectedCardId: id});
    try{
        await axios.post(baseURL + '/user/changeDefaultPayment', {cardId: id});
     } catch (err) {
        this.setState({errorMessage: err.response.data.error});
     }
  }

  _requestPaymentMethod = async () => {
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
      .then( async response => {
        // Get the token from the response, and send to your server
         try{
            await axios.post(baseURL + '/user/addPayment', {tokenId: response.tokenId});
            const responseListCards = await axios.get(baseURL + '/user/listCards');
            this.setState({cards: responseListCards.data.data, selectedCardId: responseListCards.data.data[0].id});
         } catch (err) {
            this.setState({errorMessage: err.response.data.error});
         }
      })
      .catch(error => {
        // Handle error
        console.warn('Payment failed', { error });

      });
  }

  render() {
    return (
      <View>
        <Text style={styles.message}> Please select your payment method</Text>
        <ScrollView styles={{flexDirection: 'column'}}
          contentContainerStyle={{paddingVertical: 20}}>
          {this.state.cards.map((card, index) => (
            card.id == this.state.selectedCardId ? 
              <TouchableOpacity style={styles.cardContainer} key={index}>
                {this._getCardImage(card.brand, '#F3A545')}
                <Text>{`${card.brand} Ending in ${card.last4}`}</Text>
                <Image style={{tintColor: '#F3A545', marginLeft: 20}} source={require('./img/stripe/icon_checkmark.png')} />
              </TouchableOpacity>
            : 
              <TouchableOpacity style={styles.cardContainer} key={index}
                onPress={()=>{this._onPressItem(card.id);}}>
                {this._getCardImage(card.brand, '#8E8E8E')}
                <Text>{`${card.brand} Ending in ${card.last4}`}</Text>
              </TouchableOpacity>   
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.cardContainer} onPress={() => {this._requestPaymentMethod();}}>
            <Image style={{marginHorizontal: 15}} source={require('./img/stripe/icon_add.png')} />
            <Text> Add New Card... </Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    alignItems: 'center'
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderColor: '#D3D3D3',
    borderWidth: 0.5
  },
  message: {
    marginVertical: 30,
    textAlign: 'center',
    fontSize: 15,
    color: 'black'
  },
});

