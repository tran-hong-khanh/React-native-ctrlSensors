import React from 'react';
import {Text, View, TouchableOpacity, YellowBox} from 'react-native';
import {firebaseApp} from './FirebaseConfig';
import {LineChart, YAxis, Grid} from 'react-native-svg-charts';
import _ from 'lodash';
var count = 0;
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default class LightChart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database();
    this.state = {
      light: '',
      lishLight: [null],
    };
  }
  // addDB() {
  //   this.setState({lishLight: [null]});
  //   try {
  //     this.itemRef
  //       .ref(this.props.id)
  //       .child('lux')
  //       .on('value', snap => {
  //         this.setState({
  //           light: snap.val(),
  //         });
  //       });
  //     this.itemRef
  //       .ref(this.props.id)
  //       .child('lux')
  //       .on('value', snap => {
  //         this.setState(state => {
  //           var lishLight = state.lishLight.push(snap.val());
  //         });
  //       });
  //   } catch (error) {
  //     console.log('error');
  //   }
  // }
  addDB = async () => {
    count = count + 1;
    let text = 'http://vn-api.companywe.co.kr/datas/light/' + this.props.id;
    if ((count = 1)) {
      //var timer = setInterval(() => {
      fetch(text, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(responseData => {
          //set your data here
          //console.log(responseData);
          this.setState({
            lishLight: responseData.data,
          });
        })
        .catch(error => {
          //console.log(error);
        });
      //}, 1000);
    }
  };

  render() {
    const contentInset = {top: 1, bottom: 1};
    console.log(this.state.lishLight);

    return (
      <View style={{flex: 1, backgroundColor: '#5b9fa8'}}>
        <View
          style={{
            //height: 200,
            flexDirection: 'row',
            marginTop: 20,
            marginLeft: 10,
            marginRight: 10,
            flex: 1,
          }}>
          <YAxis
            data={this.state.lishLight}
            contentInset={contentInset}
            svg={{
              fill: 'white',
              fontSize: 10,
            }}
            min={0}
            max={55000}
            numberOfTicks={10}
            formatLabel={value => `${value} lux`}
          />
          <LineChart
            style={{flex: 1, marginLeft: 10}}
            data={this.state.lishLight}
            svg={{stroke: 'yellow'}}
            contentInset={contentInset}>
            <Grid />
          </LineChart>
        </View>
        <View style={{height: 20, flex: 0.15}}>
          <TouchableOpacity
            onPress={() => {
              this.addDB();
            }}>
            <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                color: 'white',
                marginTop: 3,
              }}>
              get data
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
