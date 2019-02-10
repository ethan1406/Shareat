/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, TextInput, Image, AsyncStorage} from 'react-native';
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
      console.log(loyaltyPointsString);
      this.setState({loyaltyPoints});
    } catch (err) {
      console.log(err);
    }
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerLeft:( 
        <TouchableOpacity onPress={() => navigation.navigate('Options')}>
           <Image style={{height: 40, width: 40, marginLeft: 20}} source={require('./img/backbtn.png')} />
        </TouchableOpacity>
      ),
      title: 'Rewards',
      headerTransparent: true
    };
  }

  render() {
    return (
      <View style={styles.container} resizeMode='contain'>
        <Text style={styles.placeholderText}> </Text>
        <View style={[styles.headerContainer]} color='#000000'>
            <Text style={[styles.btnText]}>Saved Loyalty Points</Text>
        </View>
        {this.state.loyaltyPoints.map((reward, index) => (
          <TouchableOpacity style={styles.rewardContainer} key={index}>
            <Text>{reward.restaurantName} </Text>
            <Text>{reward.points} </Text>
            <Progress.Circle showsText={true} animated={true}
              progress={reward.points/100} size={90} color='#F3A545'/>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'flex-start',
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
  placeholderText: {
    fontSize: 18,
    marginTop: 30,
    marginLeft: 15,
    marginBottom: 15,
    color: 'black'
  },
  btnText: {
    color:'white',
    textAlign:'left',
    marginLeft: 15,
    paddingTop: 10
  }
});