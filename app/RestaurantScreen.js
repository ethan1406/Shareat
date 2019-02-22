/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, ScrollView, Text, View, Image, TouchableOpacity, TextInput, AsyncStorage} from 'react-native';
import * as Progress from 'react-native-progress';
import {baseURL} from './Constants';
import axios from 'axios';

type Props = {};
export default class RestaurantScreen extends Component<Props> {

  constructor(props) {
    super(props);
    //var params = this.props.navigation.state.params;

    this.state = { 
      merchant: {rewards:[]},
      loyaltyPoints: [],
      pointAccumulated: 0,
      errorMessage: null
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerLeft:( 
        <TouchableOpacity onPress={() => navigation.goBack()}>
           <Image style={{height: 30, width: 30, marginLeft: 20}} source={require('./img/backbtn.png')} />
        </TouchableOpacity>
      ),
      title: navigation.state.params.restaurantName
    };
  }

  async componentDidMount() {
    try {
      const response = await axios.get(baseURL + 
        `getMerchantInfo?restaurantId=${this.props.navigation.state.params.restaurantId}`);

      const loyaltyPointsString = await AsyncStorage.getItem('loyaltyPoints');
      const loyaltyPoints = JSON.parse(loyaltyPointsString);
      var pointAccumulated = 0;
      loyaltyPoints.forEach(loyalty => {
        if(loyalty.restaurantId == this.props.navigation.state.params.restaurantId) {
          pointAccumulated = loyalty.points;
        }
      });

      this.setState({merchant : response.data, loyaltyPoints, pointAccumulated});

    } catch (err) {
      this.setState({errorMessage: err.response.data.error});
    }
  }


  render() {
    return (
      <ScrollView resizeMode='contain' contentContainerStyle={styles.container}>
        <View style={{marginHorizontal: 15}}>
          <Text style={{color: 'gray', marginTop: 5}}> {this.state.merchant.description} </Text>
          <Text style={{color: 'gray', marginVertical: 5}}> {this.state.merchant.address} </Text>
        </View>
        <View style={styles.lineSeparator} />
          <Text style={{fontWeight: 'bold', marginHorizontal: 15}}> Loyalty </Text>
          <Text style={{color: 'gray', marginVertical: 5, marginHorizontal: 15}}> Earn 1pt for every dollar spent </Text>
          <ScrollView contentContainerStyle={styles.pointsContainer} bounces={false}>
            {this.state.merchant.rewards.map((reward, index) => (
              <TouchableOpacity style={styles.rewardContainer} key={index}>
                <Text>{reward.reward} </Text>
                <Text style={{color:'gray', marginTop: 3, marginBottom: 10}}> 
                  {this.state.pointAccumulated} / {reward.pointsRequired} pts
                </Text>
                <Progress.Circle showsText={true} animated={true}
                  progress={this.state.pointAccumulated/reward.pointsRequired} size={90} color='#F3A545'/>
                <Text style={{color:'gray', marginTop: 10}}> 
                  {reward.pointsRequired - this.state.pointAccumulated} pts left
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        <View style={styles.lineSeparator} />
        <View style={{marginHorizontal: 15}}>
          <Text style={{fontWeight: 'bold'}}> Hours </Text>
          <Text style={{marginTop: 20}}> Monday - Friday: 7:00am - 11:00pm </Text>
          <Text> Sunday: 7:00am - 11:00pm </Text>
          <Text> Saturday: 7:00am - 11:00pm </Text>
        </View>
        <View style={styles.lineSeparator} />
        <View style={{marginHorizontal: 15}}>
          <Text style={{fontWeight: 'bold'}}> Description </Text>
          <Text style={{marginVertical: 20}}> {this.state.merchant.details} </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: 'white',
    justifyContent: 'flex-start', 
    alignItems: 'flex-start', 
    flexDirection: 'column'
  },
  lineSeparator: {
     width: '90%', 
     borderBottomColor: 'gray', 
     alignSelf: 'center',
     borderBottomWidth: 2, 
     paddingHorizontal: 15,
     marginVertical: 25
  },
  rewardContainer: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 25
  },
  pointsContainer: {
    justifyContent: 'flex-start', 
    marginHorizontal: 15,
    marginVertical: 20,
    alignItems: 'center', 
    flexDirection: 'row'
  }
});