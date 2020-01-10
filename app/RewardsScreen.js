
'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, 
  Image, ScrollView} from 'react-native';
import axios from 'axios';
import {baseURL} from './Constants';
import { Storage } from 'aws-amplify';
import AsyncStorage from '@react-native-community/async-storage';
import Restaurant from './models/Restaurant';


  type Props = {};
  export default class RewardsScreen extends Component<Props> {

    constructor(props) {
      super(props);

      this.state = {
        imageUrl: '',
        restaurants: [Restaurant],
        loyaltyPoints: [],
      };
    }

    async componentDidMount() {
      try {
        const amazonUserSub = await AsyncStorage.getItem('amazonUserSub');
        const response = await axios.get(baseURL + `/user/${amazonUserSub}/loyaltyPoints`);

        let promises = await response.data.map( async (reward) => {
            var restaurant = new Restaurant(reward.restaurantId, reward.restaurantName, 
              reward.address, reward.description);
            try{
              const imageUrl = await Storage.get(`restaurants/${reward.restaurantName}/cover.jpg`);
              restaurant.setImageUrl(imageUrl);
            } catch(err) {
              console.err(err);
            }
            return restaurant;
        });

        this.setState({loyaltyPoints: response.data});

        Promise.all(promises).then((restaurants) =>{
          this.setState({restaurants});
        });

        
      } catch (err) {
        console.log(err);
      }
    }

    static navigationOptions = ({navigation}) => { 
      return {  headerStyle: {
        borderBottomWidth: 0,
        shadowColor: 'transparent',
        backgroundColor: '#fff', elevation:0 
      }};
    }

    _lookupRestaurant = (restaurantId, restaurantName) => {
      this.props.navigation.navigate('Restaurant', {
        restaurantName, restaurantId
      });
    }
    render() {
      return (
        <View style={styles.container}>
          <Image style={styles.logo} source={require('./img/shareat_logo.png')}/>
          <Text style={styles.header}> Rewards </Text>
          <View style={styles.divider}/>
          <ScrollView  contentContainerStyle={styles.bodyContainer}>
            <Text style={styles.wallet}> Wallet </Text>
            {this.state.restaurants.map((restaurant, index) => (
                <TouchableOpacity style={styles.rewardContainer} key={index} 
                  onPress={()=>{this._lookupRestaurant(restaurant.restaurantId, restaurant.name);}}>
                  <Image style={styles.restaurantIcon}
                        source={{uri: restaurant.imageUrl}}/>
                  <View style={{flexDirection: 'column', flex: 1}}>
                    <View style={styles.restaurantInfo}>
                    <Text style={{color: '#A9A9A9', fontSize: 15, marginTop: 15, marginBottom: 3}}>{restaurant.name} </Text>
                    <Text numberOfLines={2} style={{color: '#A9A9A9', fontSize: 12,  marginBottom: 3}}>{restaurant.address} </Text>
                    <Text style={{color: 'grey', fontSize: 16, marginBottom: 10}}>{restaurant.description} </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                ))}
            <View style={styles.checkIn}>
              <Text style={styles.wallet}> Check-In </Text>
            </View>
            {this.state.restaurants.map((restaurant, index) => (
              <TouchableOpacity style={styles.rewardContainer} key={index} 
                onPress={()=>{this._lookupRestaurant(restaurant.restaurantId, restaurant.name);}}>
                <Image style={styles.restaurantIcon}
                      source={{uri: restaurant.imageUrl}}/>
                  <View style={{flexDirection: 'column', flex: 1}}>
                  <View style={styles.restaurantInfo}>
                  <Text style={{color: '#A9A9A9', fontSize: 15, marginTop: 15, marginBottom: 3}}>{restaurant.name} </Text>
                  <Text numberOfLines={2} style={{color: '#A9A9A9', fontSize: 12, marginBottom: 3}}>{restaurant.address} </Text>
                  <Text style={{color: 'grey', fontSize: 16, marginBottom: 10}}>{restaurant.description} </Text>
                  </View>
                </View>
              </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
        );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      flex: 1
    },
    bodyContainer: {
      backgroundColor: 'white',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    rewardContainer: {
      marginLeft: 15,
      marginRight: 15,
      flexDirection: 'row',
    },
    logo: {
      width: '58%',
      height: 65,
      resizeMode: 'contain',
      marginLeft: 10,
      marginTop: -15,
      marginBottom: -5
    },
    divider: {
      flexDirection:'column',
      borderColor: '#A9A9A9',
      borderBottomWidth: 0.7,
      width: '90%',
      alignSelf:'center',
    },
    header: {
      alignSelf: 'flex-start',
      fontSize: 20,
      marginBottom: 10,
      marginLeft: 15,
      color: '#A9A9A9'
    },
    wallet: {
      alignSelf: 'flex-start',
      fontSize: 20,
      marginBottom: 15,
      marginLeft: 15,
      marginTop: 20,
      color: '#ffa91f',
    },
    restaurantIcon: {
      height: 50,
      width: 50,
      marginRight: 10,
      borderRadius: 10,
      alignSelf: 'center',
    },
    restaurantInfo: {
      flexDirection:'column',
    },
    checkIn: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    distance: {
      backgroundColor: '#DCDCDC',
      marginRight: 30,
      height: 25,
      width: 65,
      alignSelf: 'center',
      alignItems: 'center',
    },
    distanceText: {
      fontSize: 15,
      color: 'grey',
    }
  });