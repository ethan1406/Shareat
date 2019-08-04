import React, {Component} from 'react';
import {StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class SplashScreen extends Component<props> {

  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => {resolve('result')},
        1000
        )
      )
  }

  async componentDidMount() {
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.navigate('App');
    }
  }

  render() {
    return(
      <View style = {styles.container} >
      <Image style = {styles.logo} source={require('./img/splash_logo.png')} />
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center'
  },
  logo: {
    width: 95,
    height: 100,
  }
});