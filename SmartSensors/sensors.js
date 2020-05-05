import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import SensorData from './components/FlatlistSensor';
import Button from 'react-native-button';
var deviceids = [];
export default class sensors extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerStyle: {
        backgroundColor: '#5b9fa8',
      },
      headerLeft: (
        <Button
          style={{fontSize: 22, color: 'white', marginLeft: 10}}
          containerStyle={{}}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          Back
        </Button>
      ),
    };
  };
  constructor(props) {
    //console.log(props.navigation.state.params.devices);
    super(props);
    this.state = {
      deviceids: [],
    };
    var params = props.navigation.state.params.devices;
    deviceids = params;
    //console.log('device sensors ' + params);
    this.setState({deviceids: params});
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'gray',
          flexDirection: 'column',
          //marginTop: Platform.OS === 'ios' ? 34 : 0,
        }}>
        <View
          style={{
            flex: 16,
            backgroundColor: '#5b9fa8',
            flexDirection: 'column',
            marginTop: 1,
          }}>
          <FlatList
            style={{margin: 5}}
            data={deviceids}
            //numColumns={2}
            numColumns={1}
            keyExtractor={(item, index) => item.id}
            renderItem={item => <SensorData id={item} />}
          />
        </View>
      </View>
    );
  }
}
