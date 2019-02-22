/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ScrollView, AsyncStorage} from 'react-native';
import * as Progress from 'react-native-progress';


type Props = {};
export default class RewardsScreen extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
      loyaltyPoints: []
    };
  }

  async componentDidMount() {
    try {
      const loyaltyPointsString = await AsyncStorage.getItem('loyaltyPoints');
      const loyaltyPoints = JSON.parse(loyaltyPointsString);
      this.setState({loyaltyPoints});
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

  render() {
    return (
      <ScrollView style={styles.container} 
        contentContainerStyle={{flex:1, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column'}}
        resizeMode='contain'>
        <Text style={styles.placeholderText}> </Text>
        <View style={[styles.headerContainer]} color='#000000'>
            <Text style={[styles.btnText]}>Saved Loyalty Points</Text>
        </View>
        {this.state.loyaltyPoints.map((reward, index) => (
          <TouchableOpacity style={styles.rewardContainer} key={index} 
                onPress={()=>{this._lookupRestaurant(reward.restaurantId, reward.restaurantName);}}>
            <Text style={{fontSize: 16, marginTop: 15, marginBottom: 3, fontWeight: 'bold'}}>{reward.restaurantName} </Text>
            <Text style={{color: 'gray', marginBottom: 3}}>{reward.description} </Text>
            <Text style={{color: 'gray', marginBottom: 10}}>{reward.address} </Text>
            <Text style={{}}>{`You have accumulated ${reward.points} points`} </Text>
          </TouchableOpacity>
        ))}

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  headerContainer: {
    width: '100%',
    height: 35,
    backgroundColor: '#F3A545',
    borderRadius: 2,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  rewardContainer: {
    marginTop: 15,
    marginLeft: 15
  },
  btnText: {
    color:'white',
    textAlign:'left',
    marginLeft: 15,
    paddingTop: 10
  }
});