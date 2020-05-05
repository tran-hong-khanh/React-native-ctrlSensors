import React from 'react';
import {Text, View, TouchableOpacity, YellowBox} from 'react-native';
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

export default class TempChart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      temp: '',
      lishTemp: [null],
    };
  }
  // addDB() {
  //   this.setState({lishTemp: [null]});
  //   try {
  //     this.itemRef
  //       .ref(this.props.id)
  //       .child('temp')
  //       .on('value', snap => {
  //         this.setState({
  //           temp: snap.val(),
  //         });
  //       });
  //     this.itemRef
  //       .ref(this.props.id)
  //       .child('temp')
  //       .on('value', snap => {
  //         this.setState(state => {
  //           var lishTemp = state.lishTemp.push(snap.val());
  //         });
  //       });
  //   } catch (error) {
  //     console.log('error');
  //   }
  // }
  addDB = async () => {
    count = count + 1;
    let text =
      'http://vn-api.companywe.co.kr/datas/temperature/' + this.props.id;
    if ((count = 1)) {
      //var timer = setInterval(() => {
      fetch(text, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(responseData => {
          //set your data here
          this.setState({
            lishTemp: responseData.data,
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
    //console.log(this.state.lishTemp);

    return (
      <View style={{flex: 1, backgroundColor: 'while'}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 20,
            marginLeft: 10,
            marginRight: 10,
          }}>
          <YAxis
            data={this.state.lishTemp}
            contentInset={contentInset}
            svg={{
              fill: 'red',
              fontSize: 10,
            }}
            min={-10}
            max={50}
            numberOfTicks={10}
            formatLabel={value => `${value}ºC`}
          />
          <LineChart
            style={{flex: 1, marginLeft: 10}}
            data={this.state.lishTemp}
            svg={{stroke: 'red'}}
            contentInset={contentInset}
            yMin={-10}
            yMax={50}>
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
                color: 'red',
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
