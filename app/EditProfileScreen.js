'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

type props = {};

export default class EditProfileScreen extends Component<props> {
	constructor(props) {
		super(props);
		this.state = {
			firstName: 'Anthony',
			lastName: 'Gao',
			username: 'anthonygsj',
			email: 'anthonygsj123@gmail.com',
		};
	}

	static navigationOptions = ({navigation}) => {
    return{
      title: 'Edit Profile',
    	};
  	}

	render() {
		return(
			<View style={styles.container}>
			<Image style={styles.userIcon} source={require('./img/splash_logo.png')}/>
			<View style={styles.textInputContainer}>
			<Text> First Name </Text>
			<TextInput style={styles.textInput} multiline={false} value={this.state.firstName}
            onChangeText={(firstName) => this.setState({firstName})}/>
            <Text> Last Name </Text>
            <TextInput style={styles.textInput} multiline={false} value={this.state.lastName}
            onChangeText={(lastName) => this.setState({lastName})}/>
            <Text> Username </Text>
            <TextInput style={styles.textInput} multiline={false} value={this.state.username}
            onChangeText={(username) => this.setState({username})}/>
            <Text> Email </Text>
            <TextInput style={styles.textInput} multiline={false} value={this.state.email}
            onChangeText={(email) => this.setState({email})}/>
            </View>
			</View>
			);
	}
}

const styles = StyleSheet.create({
	container: {
    	flexDirection: 'column',
    	backgroundColor: 'white', 
    	justifyContent: 'flex-start', 
    	alignItems: 'center'
    },
    userIcon: {
    	marginTop: 40,
    	width: 100,
    	height: 100,
    },
    textInput: {
    	height: 40, 
    	width: '100%',
    	borderBottomColor: 'gray',
    	borderBottomWidth: 0.5,
    	color: 'black',
    	fontSize: 15,
    	marginBottom: 25,
    },
    text: {
    	color: 'gray',
    	fontSize: 12,
    },
    textInputContainer: {
    	width: '88%',
    	marginTop: 30,
    	flexDirection: 'column',
    	flex:1, 
    	justifyContent: 'flex-start', 
    }
});