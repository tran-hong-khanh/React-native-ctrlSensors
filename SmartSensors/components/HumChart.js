import React from 'react';
import {Text, View, TouchableOpacity, YellowBox} from 'react-native';
import * as shape from 'd3-shape';
import {AreaChart, YAxis, Grid} from 'react-native-svg-charts';
import _ from 'lodash';
var count = 0;
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};
export default class HumChart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      Hum: '',
      lishHumA: [null],
    };
  }

  addHumA = async () => {
    count = count + 1;
    let text = 'http://vn-api.companywe.co.kr/datas/humidity/' + this.props.id;
    if ((count = 1)) {
      //var timer = setInterval(() => {
      fetch(text, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(responseData => {
          //set your data here
          this.setState({
            lishHumA: responseData.data,
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
    //console.log(this.state.lishHumA);

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            //height: 180,
            flex: 1,
            flexDirection: 'row',
            marginTop: 20,
            marginLeft: 10,
            marginRight: 10,
          }}>
          <YAxis
            data={this.state.lishHumA}
            contentInset={contentInset}
            svg={{
              fill: 'blue',
              fontSize: 10,
            }}
            min={0}
            max={100}
            numberOfTicks={10}
            formatLabel={value => `${value}%`}
          />

          <AreaChart
            style={{flex: 1, marginLeft: 10}}
            data={this.state.lishHumA}
            contentInset={{top: 0, bottom: 0}}
            //contentInset={contentInset}
            curve={shape.curveNatural}
            svg={{fill: '#60b574', opacity: 0.7}}
            yMin={0}
            yMax={100}>
            <Grid />
          </AreaChart>
        </View>
        <View style={{height: 20, flex: 0.15}}>
          <TouchableOpacity
            onPress={() => {
              this.addHumA();
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
