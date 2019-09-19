
'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, 
  Image, ScrollView, Modal} from 'react-native';
  import axios from 'axios';
  //import Slider from '@react-native-community/slider';
  import {baseURL} from './Constants';


  type Props = {};
  export default class RewardsScreen extends Component<Props> {

    constructor(props) {
      super(props);

      this.state = {
        loyaltyPoints: [],
        refresh: false,
        distance: 1,
        modalVisible: false,
      };
    }

    async componentDidMount() {
      try {
        const response = await axios.get(baseURL + '/user/loyaltyPoints');
        this.setState({loyaltyPoints: response.data});
      } catch (err) {
        console.log(err);
      }
    }

    static navigationOptions = ({navigation}) => {
      return {
        headerLeft:( 
          <TouchableOpacity onPress={() => navigation.navigate('Options')}>
          <Image style={{height: 30, width: 30, marginLeft: 20}} source={require('./img/backbtn.png')} />
          </TouchableOpacity>
          ),
        title: 'Rewards',
      };
    }

    _lookupRestaurant = (restaurantId, restaurantName) => {
      this.props.navigation.navigate('Restaurant', {
        restaurantName, restaurantId
      });
    }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

    render() {
      return (
        <View style={styles.container}>
        <Image style={styles.logo} source={require('./img/shareat_logo.png')}/>
        <Text style={styles.header}> Rewards </Text>
        <View style={styles.divider}/>
        <View style={{marginTop: 22}}>
        <Modal
        animationType="fade"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible(!this.state.modalVisible);
        }}>
        <View style={{marginTop: 22}}>
        <View>
        <TouchableOpacity
        onPress={() => {
          this.setModalVisible(!this.state.modalVisible);
        }}>
        <Text>Close</Text>
        </TouchableOpacity>
        </View>
        </View>
        </Modal>

        </View>
        <ScrollView style={styles.bodyContainer}>
        <Text style={styles.wallet}> Wallet </Text>
        {this.state.loyaltyPoints.map((reward, index) => (
          <TouchableOpacity style={styles.rewardContainer} key={index} 
          onPress={()=>{this._lookupRestaurant(reward.restaurantId, reward.restaurantName);}}>
          <Image style={styles.restaurantIcon} source={require('./img/icons8-noodles-64.png')}/>
          <View style={styles.restaurantInfo}>
          <Text style={{color: '#A9A9A9', fontSize: 15, marginTop: 15, marginBottom: 3}}>{reward.restaurantName} </Text>
          <Text style={{color: '#A9A9A9', fontSize: 12,  marginBottom: 3}}>{reward.address} </Text>
          <Text style={{color: 'grey', fontSize: 16, marginBottom: 10}}>{reward.description} </Text>
          </View>
          </TouchableOpacity>
          ))}
        <View style={styles.checkIn}>
        <Text style={styles.wallet}> Check-In </Text>
        <TouchableOpacity style={styles.distance}
        onPress={() => {
          this.setModalVisible(true);
        }}
        >
        <Text style={styles.distanceText}> {this.state.distance} mile </Text>
        </TouchableOpacity>
        </View>
        {this.state.loyaltyPoints.map((reward, index) => (
          <TouchableOpacity style={styles.rewardContainer} key={index} 
          onPress={()=>{this._lookupRestaurant(reward.restaurantId, reward.restaurantName);}}>
          <Image style={styles.restaurantIcon} source={require('./img/icons8-noodles-64.png')}/>
          <View style={styles.restaurantInfo}>
          <Text style={{color: '#A9A9A9', fontSize: 15, marginTop: 15, marginBottom: 3}}>{reward.restaurantName} </Text>
          <Text style={{color: '#A9A9A9', fontSize: 12, marginBottom: 3}}>{reward.address} </Text>
          <Text style={{color: 'grey', fontSize: 16, marginBottom: 10}}>{reward.description} </Text>
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
    },
    bodyContainer: {
      backgroundColor: 'white',
    },
    rewardContainer: {
      marginLeft: 15,
      flexDirection: 'row',
    },
    logo: {
      width: '58%',
      height: 65,
      resizeMode: 'contain',
      paddingTop: 50,
      marginLeft: -10,
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
      marginBottom: 15,
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
      height: 60,
      width: 60,
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