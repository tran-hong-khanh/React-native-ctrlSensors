import React, {Component} from 'react';
import {View, Text, StyleSheet, Switch, TextInput, Alert} from 'react-native';
import {firebaseApp} from './FirebaseConfig';
import Button from 'react-native-button';

export default class SensorData extends Component {
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database();
    this.state = {
      temp: null,
      hum: null,
      light: null,
      relay1: false,
      relay2: false,
      mode: false,
      upperTemp: '',
      lowerTemp: '',
      upperHoder: null,
      lowerHoder: null,
      upperHum: '',
      lowerHum: '',
      upperHoder1: null,
      lowerHoder1: null,
      check: false,
    };
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
  }
  // componentDidMount() {
  //   try {
  //     this.itemRef
  //       .ref(this.props.id.item)
  //       .child('tempS')
  //       .on('value', snap => {
  //         this.setState({
  //           temp: snap.val(),
  //         });
  //       });
  //     this.itemRef
  //       .ref(this.props.id.item)
  //       .child('humA')
  //       .on('value', snap => {
  //         this.setState({
  //           hum: snap.val(),
  //         });
  //       });
  //     this.itemRef
  //       .ref(this.props.id.item)
  //       .child('lux')
  //       .on('value', snap => {
  //         this.setState({
  //           light: snap.val(),
  //         });
  //       });
  //     this.itemRef
  //       .ref(this.props.id.item)
  //       .child('relay1')
  //       .on('value', snap => {
  //         this.setState({
  //           relay1: snap.val(),
  //         });
  //       });
  //     this.itemRef
  //       .ref(this.props.id.item)
  //       .child('relay2')
  //       .on('value', snap => {
  //         this.setState({
  //           relay2: snap.val(),
  //         });
  //       });
  //     this.itemRef
  //       .ref(this.props.id.item)
  //       .child('mode')
  //       .on('value', snap => {
  //         this.setState({
  //           mode: snap.val(),
  //         });
  //       });
  //     this.itemRef
  //       .ref(this.props.id.item)
  //       .child('upperTemp')
  //       .on('value', snap => {
  //         this.setState({
  //           upperTemp: snap.val(),
  //         });
  //       });
  //     this.itemRef
  //       .ref(this.props.id.item)
  //       .child('lowerTemp')
  //       .on('value', snap => {
  //         this.setState({
  //           lowerTemp: snap.val(),
  //         });
  //       });
  //     this.itemRef
  //       .ref(this.props.id.item)
  //       .child('upperHum')
  //       .on('value', snap => {
  //         this.setState({
  //           upperHum: snap.val(),
  //         });
  //       });
  //     this.itemRef
  //       .ref(this.props.id.item)
  //       .child('lowerHum')
  //       .on('value', snap => {
  //         this.setState({
  //           lowerHum: snap.val(),
  //         });
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   console.log('lowerHoder ' + this.state.lowerHoder);
  // }
  componentDidMount() {
    try {
      //const text = 'https://10.0.3.2/data/' + this.state.deviceidselect;
      let text = 'http://vn-api.companywe.co.kr/data/new/' + this.props.id.item;
      let text2 =
        'http://vn-api.companywe.co.kr/device/control/' + this.props.id.item;
      var timer = setInterval(() => {
        fetch(text, {
          method: 'GET',
        })
          .then(response => response.json())
          .then(responseData => {
            //set your data here
            this.setState({
              temp: responseData.data[0].temp,
              hum: responseData.data[0].humi,
              light: responseData.data[0].light,
            });
          })
          .catch(error => {
            //console.log(error);
          });
        fetch(text2, {
          method: 'GET',
        })
          .then(response => response.json())
          .then(responseData => {
            //set your data here
            this.setState({
              mode: responseData.data.mode,
              relay1: responseData.data.relay1,
              relay2: responseData.data.relay2,
            });
          })
          .catch(error => {
            //console.log(error);
          });
      }, 1000);
      fetch(text2, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(responseData => {
          //set your data here
          this.setState({
            mode: responseData.data.mode,
            relay1: responseData.data.relay1,
            relay2: responseData.data.relay2,
            lowerTemp: responseData.data.lowertemp,
            upperTemp: responseData.data.uppertemp,
            lowerHum: responseData.data.lowerhumi,
            upperHum: responseData.data.upperhumi,
          });
        })
        .catch(error => {
          //console.log(error);
        });
    } catch (error) {
      //console.log(error);
    }
  }

  setAutoTemp = () => {
    try {
      var upperTemp = parseFloat(this.state.upperTemp);
      var lowerTemp = parseFloat(this.state.lowerTemp);
      //console.log('uppertemp: ' + upperTemp + 'lowertemp: ' + lowerTemp);
      if (upperTemp <= lowerTemp) {
        Alert.alert('Warning.....!', 'upper must be bigger lower');
      } else {
        // if (upperTemp) {
        //   this.itemRef.ref(this.props.id.item).update({upperTemp});
        // }
        // if (lowerTemp) {
        //   this.itemRef.ref(this.props.id.item).update({lowerTemp});
        // }
        fetch(
          'http://vn-api.companywe.co.kr/device/control/' + this.props.id.item,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              mode: this.state.mode,
              relay1: this.state.relay1,
              relay2: this.state.relay2,
              lowertemp: lowerTemp,
              uppertemp: upperTemp,
              lowerhumi: this.state.lowerHum,
              upperhumi: this.state.lowerHum,
            }),
          },
        );
      }
    } catch (error) {
      //console.log(error);
    }
  };
  setAutoHum = () => {
    try {
      var upperHum = parseFloat(this.state.upperHum);
      var lowerHum = parseFloat(this.state.lowerHum);
      if (upperHum <= lowerHum) {
        Alert.alert('Warning.....!', 'upper must be bigger lower');
      } else {
        // if (upperHum) {
        //   this.itemRef.ref(this.props.id.item).update({upperHum});
        // }
        // if (lowerHum) {
        //   this.itemRef.ref(this.props.id.item).update({lowerHum});
        // }
        fetch(
          'http://vn-api.companywe.co.kr/device/control/' + this.props.id.item,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              mode: this.state.mode,
              relay1: this.state.relay1,
              relay2: this.state.relay2,
              lowertemp: this.state.lowerTemp,
              uppertemp: this.state.upperTemp,
              lowerhumi: lowerHum,
              upperhumi: upperHum,
            }),
          },
        );
      }
    } catch (error) {
      //console.log(error);
    }
  };
  render() {
    return (
      <View style={[styles.contener]}>
        <View style={[styles.header]}>
          <Text allowFontScaling={false} style={[styles.text]}>
            ID: {this.props.id.item}
          </Text>
        </View>
        <View
          style={{
            flex: 9,
          }}>
          <View
            style={{
              flex: 5,
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
              }}>
              <View style={[styles.textbox]}>
                <View style={{flex: 1.8}}>
                  <Text allowFontScaling={false} style={[styles.textTemp]}>
                    Temperature:
                  </Text>
                </View>
                <View style={[styles.viewtext2]}>
                  <Text allowFontScaling={false} style={[styles.textTemp]}>
                    {this.state.temp}
                  </Text>
                </View>
              </View>

              <View style={{flex: 0.8, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text allowFontScaling={false} style={[styles.textTemp]}>
                    Upper:
                  </Text>
                </View>
                <View style={[styles.viewtext2]}>
                  <Text allowFontScaling={false} style={[styles.textTemp]}>
                    Lower:
                  </Text>
                </View>
              </View>

              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={[styles.viewtext2]}>
                  <TextInput
                    style={[styles.textinputTemp]}
                    onChangeText={text => this.setState({upperTemp: text})}
                    placeholderTextColor="rgba(255,255,255,0.8)"
                    defaultValue={String(this.state.upperTemp)}
                    keyboardType="number-pad"
                    returnKeyType="next"
                    autoCorrect={false}
                    maxLength={4}
                  />
                </View>
                <View style={[styles.viewtext2]}>
                  <TextInput
                    style={[styles.textinputTemp]}
                    onChangeText={text => this.setState({lowerTemp: text})}
                    placeholderTextColor="rgba(255,255,255,0.8)"
                    defaultValue={String(this.state.lowerTemp)}
                    keyboardType="number-pad"
                    returnKeyType="next"
                    autoCorrect={false}
                    maxLength={4}
                  />
                </View>
              </View>
              <View style={[styles.textbox]}>
                <Button
                  style={{fontSize: 18, color: 'white'}}
                  containerStyle={[styles.buttonstyle]}
                  onPress={this.setAutoTemp}>
                  SET
                </Button>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
              }}>
              <View style={[styles.textbox]}>
                <View style={[styles.viewtext]}>
                  <Text allowFontScaling={false} style={[styles.textHum]}>
                    Humidity:
                  </Text>
                </View>
                <View style={[styles.viewtext2]}>
                  <Text allowFontScaling={false} style={[styles.textHum]}>
                    {this.state.hum}
                  </Text>
                </View>
              </View>

              <View style={{flex: 0.8, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text allowFontScaling={false} style={[styles.textHum]}>
                    Upper:
                  </Text>
                </View>
                <View style={[styles.viewtext2]}>
                  <Text allowFontScaling={false} style={[styles.textHum]}>
                    Lower:
                  </Text>
                </View>
              </View>

              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={[styles.viewtext2]}>
                  <TextInput
                    style={[styles.textinputHum]}
                    onChangeText={text => this.setState({upperHum: text})}
                    placeholderTextColor="rgba(255,255,255,0.8)"
                    defaultValue={String(this.state.upperHum)}
                    keyboardType="number-pad"
                    returnKeyType="next"
                    autoCorrect={false}
                    maxLength={4}
                  />
                </View>
                <View style={[styles.viewtext2]}>
                  <TextInput
                    style={[styles.textinputHum]}
                    onChangeText={text => this.setState({lowerHum: text})}
                    placeholderTextColor="rgba(255,255,255,0.8)"
                    defaultValue={String(this.state.lowerHum)}
                    keyboardType="number-pad"
                    returnKeyType="next"
                    autoCorrect={false}
                    maxLength={4}
                  />
                </View>
              </View>
              <View style={[styles.textbox]}>
                <Button
                  style={{fontSize: 18, color: 'white'}}
                  containerStyle={[styles.buttonstyle]}
                  onPress={this.setAutoHum}>
                  SET
                </Button>
              </View>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={[styles.textbox1]}>
              <View style={[styles.viewtext]}>
                <Text allowFontScaling={false} style={[styles.textLight]}>
                  Light:
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignContent: 'center',
                  alignItems: 'center',
                  marginTop: 1,
                }}>
                <Text allowFontScaling={false} style={[styles.textLight]}>
                  {this.state.light}
                </Text>
              </View>
            </View>
            <View style={[styles.textbox1]}>
              <View style={[styles.viewtext]}>
                <Text allowFontScaling={false} style={[styles.text]}>
                  Auto mode:
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignContent: 'center',
                  alignItems: 'center',
                  marginTop: 2,
                }}>
                <Switch
                  onValueChange={mode => {
                    this.setState({mode});
                    //console.log('Auto mode: ' + mode);
                    //this.itemRef.ref(this.props.id.item).update({mode});
                    fetch(
                      'http://vn-api.companywe.co.kr/device/control/' +
                        this.props.id.item,
                      {
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          mode: mode,
                          relay1: this.state.relay1,
                          relay2: this.state.relay2,
                          lowertemp: this.state.lowerTemp,
                          uppertemp: this.state.upperTemp,
                          lowerhumi: this.state.lowerHum,
                          upperhumi: this.state.lowerHum,
                        }),
                      },
                    );
                  }}
                  value={this.state.mode}
                />
              </View>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row', marginBottom: 15}}>
            <View style={[styles.textbox1]}>
              <View style={[styles.viewtext]}>
                <Text allowFontScaling={false} style={[styles.text]}>
                  Relay 1:
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignContent: 'center',
                  alignItems: 'center',
                  marginTop: 2,
                }}>
                <Switch
                  onValueChange={relay1 => {
                    this.setState({relay1});
                    //console.log('relay 1: ' + relay1);
                    //this.itemRef.ref(this.props.id.item).update({relay1});
                    fetch(
                      'http://vn-api.companywe.co.kr/device/control/' +
                        this.props.id.item,
                      {
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          mode: this.state.mode,
                          relay1: relay1,
                          relay2: this.state.relay2,
                          lowertemp: this.state.lowerTemp,
                          uppertemp: this.state.upperTemp,
                          lowerhumi: this.state.lowerHum,
                          upperhumi: this.state.lowerHum,
                        }),
                      },
                    );
                  }}
                  value={this.state.relay1}
                  disabled={this.state.mode}
                />
              </View>
            </View>

            <View style={[styles.textbox1]}>
              <View style={[styles.viewtext]}>
                <Text allowFontScaling={false} style={[styles.text]}>
                  Relay 2:
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignContent: 'center',
                  alignItems: 'center',
                  marginTop: 2,
                }}>
                <Switch
                  onValueChange={relay2 => {
                    this.setState({relay2});
                    //console.log('relay 2: ' + relay2);
                    //this.itemRef.ref(this.props.id.item).update({relay2});
                    fetch(
                      'http://vn-api.companywe.co.kr/device/control/' +
                        this.props.id.item,
                      {
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          mode: this.state.mode,
                          relay1: this.state.relay1,
                          relay2: relay2,
                          lowertemp: this.state.lowerTemp,
                          uppertemp: this.state.upperTemp,
                          lowerhumi: this.state.lowerHum,
                          upperhumi: this.state.lowerHum,
                        }),
                      },
                    );
                  }}
                  value={this.state.relay2}
                  disabled={this.state.mode}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  contener: {
    flex: 1,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    margin: 1,
    height: 300,
    marginBottom: 15,
    //backgroundColor: '#8e9294',
    backgroundColor: '#5b9fa8',
  },
  header: {
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 5,
    flex: 0.8,
    backgroundColor: '#44a0cf',
  },
  textbox: {
    flex: 0.9,
    flexDirection: 'row',
    marginTop: 15,
  },
  textbox1: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  viewtext: {flex: 1.6},
  viewtext2: {flex: 1, alignContent: 'center', alignItems: 'center'},
  textTemp: {color: 'white', fontSize: 19, textAlign: 'center'},
  textHum: {color: 'white', fontSize: 19, textAlign: 'center'},
  textLight: {color: 'white', fontSize: 19, textAlign: 'center'},
  textLoad: {color: 'white', fontSize: 19, textAlign: 'center'},
  text: {
    //marginTop: 5,
    color: 'white',
    fontSize: 19,
    textAlign: 'center',
    alignContent: 'center',
  },
  textinputHum: {
    height: 40,
    width: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'blue',
    paddingHorizontal: 1,
    position: 'absolute',
    borderColor: 'blue',
    borderBottomWidth: 2,
    borderBottomRightRadius: 2,
    fontSize: 18,
    textAlign: 'center',
  },
  textinputTemp: {
    height: 40,
    width: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'red',
    paddingHorizontal: 1,
    position: 'absolute',
    borderColor: 'red',
    borderBottomWidth: 2,
    borderBottomRightRadius: 2,
    fontSize: 18,
    textAlign: 'center',
  },
  buttonstyle: {
    flex: 1,
    padding: 4,
    marginLeft: 60,
    marginRight: 60,
    height: 30,
    width: 60,
    borderRadius: 6,
    backgroundColor: 'mediumseagreen',
    marginBottom: 5,
    marginTop: 5,
  },
});
