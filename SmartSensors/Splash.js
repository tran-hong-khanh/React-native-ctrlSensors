/*
Mr Tran Hong Khanh
Email: khanhcd97@gmail.com
Splash screen
*/
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import Home from './home';
const window = Dimensions.get('window');
export default class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      //console.log('Done some tasks for about 3 seconds');
      this.setState({currentScreen: 'Home'});
      this.props.navigation.navigate('Home');
    }, 2000);
    //this.props.navigation.navigate('Home');
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('./images/logo1.png')}
          style={styles.backgroundImage}
        />
        <View style={styles.container2}>
          <View style={styles.background}></View>
          <View style={styles.footer}>
            <View style={{flex: 1}}>
              <Text style={[styles.text, {fontSize: 26, marginTop: 5}]}>
                Company WE
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={[styles.text, {fontSize: 18}]}>
                We always go together
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#626d7a',
  },

  backgroundImage: {
    //flex: 1,
    resizeMode: 'cover',
    width: 200,
    height: 170,
    top: (window.height - window.height / 5) / 2,
    left: window.width / 2 - 100,
    // alignContent: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  container2: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  background: {
    flex: 9,
  },
  footer: {
    flex: 1,
    backgroundColor: '#5b9fa8',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
    //fontFamily: 'Ruluko',
  },
});
