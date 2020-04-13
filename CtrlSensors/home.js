import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  AsyncStorage,
  Dimensions,
  Alert,
} from 'react-native';
import {firebaseApp} from './components/FirebaseConfig';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import ModalDropdown from 'react-native-modal-dropdown';
import TempChart from './components/TempChart';
import HumChart from './components/HumChart';
import LightChart from './components/LightChart';
var messageRef = false; //fetch dữ liệu của một cảm biến khi thay đổi thiết bị được chọn.
const window = Dimensions.get('window');
const chart = ['Temperature', 'Humidity', 'Light intensity'];
var deviceids = [];
var count = 0;
export default class Home extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Sensor data',
    };
  };
  constructor(props) {
    super(props);
    //this.messageRef = false;
    this.itemRef = firebaseApp.database();
    this.state = {
      temp: 30,
      hum: 40,
      light: 1000,
      deviceid: '',
      deviceidselect: '',
      deviceidselected: '',
      chartState: '',
      check: false,
    };
    this._storeData = this._storeData.bind(this);
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
  }

  componentDidMount() {
    //console.log('componentDidMount' + deviceids);
    try {
      AsyncStorage.getItem('idlist', (err, result) => {
        if (result !== null) {
          deviceids = JSON.parse(result);
          //console.log('_retrieveData ' + deviceids);
          this.setState({check: true});
        }
      });
    } catch (error) {
      //console.log('error');
    }
    // AsyncStorage.removeItem('idlist');
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('idlist', JSON.stringify(deviceids));
      //console.log('_storeData' + JSON.stringify(deviceids));
    } catch (error) {
      //console.log('error');
    }
  };

  addDevice = () => {
    if (this.state.deviceid.length == 9) {
      var newLength = deviceids.push(this.state.deviceid);
    }
    //var newLength = deviceids.push(this.state.deviceid);
    //console.log(this.state.deviceid.length);
    if (this.state.deviceid.length < 9) {
      Alert.alert('Warning.....!', 'ID is 9 digits!');
    }
    if (this.state.deviceid.length > 9) {
      Alert.alert('Warning.....!', 'ID is 9 digits!');
    }
    deviceids = deduplicate(deviceids);
    function deduplicate(arr) {
      let isExist = (arr, x) => {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === x) {
            return true;
          }
        }
        return false;
      };

      let ans = [];
      arr.forEach(element => {
        if (!isExist(ans, element)) {
          ans.push(element);
        }
      });
      for (let i = 0; i < ans.length; i++) {
        if (ans[i].length < 9) {
          ans.splice(i, 1);
        }
      }
      return ans;
    }
    this._storeData();
  };
  // updateData = () => {
  //   //console.log('update' + this.state.deviceidselect);
  //   //console.log('list device' + deviceids);
  //   if (messageRef) {
  //     try {
  //       this.itemRef
  //         .ref(this.state.deviceidselected)
  //         .child('tempS')
  //         .off();
  //       this.itemRef
  //         .ref(this.state.deviceidselected)
  //         .child('humA')
  //         .off();
  //       this.itemRef
  //         .ref(this.state.deviceidselected)
  //         .child('lux')
  //         .off();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   if (this.state.deviceidselect == '') {
  //     console.log('chọn device');
  //   } else {
  //     this.itemRef
  //       .ref(this.state.deviceidselect)
  //       .child('tempS')
  //       .on('value', snap => {
  //         this.setState({
  //           temp: snap.val(),
  //         });
  //       });
  //     this.itemRef
  //       .ref(this.state.deviceidselect)
  //       .child('humA')
  //       .on('value', snap => {
  //         this.setState({
  //           hum: snap.val(),
  //         });
  //       });
  //     this.itemRef
  //       .ref(this.state.deviceidselect)
  //       .child('lux')
  //       .on('value', snap => {
  //         this.setState({
  //           light: snap.val(),
  //         });
  //       });
  //   }
  //   this.messageRef = true;
  //   this.updateData2();
  // };
  updateData2 = async () => {
    count = count + 1;
    if (this.state.deviceidselect) {
      try {
        // let text =
        //   'https://ctrlsensors-api.herokuapp.com/data/new/' +
        //   this.state.deviceidselect;
        let text =
          'http://vn-api.companywe.co.kr/data/new/' + this.state.deviceidselect;
        //console.log(text);
        if (count === 1) {
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
                //console.log('get data' + this.state.deviceidselect);
              })
              .catch(error => {
                //console.log(error);
              });
            if (messageRef) {
              clearInterval(timer);
              //console.log('clearn interval' + this.state.deviceidselect);
            }
          }, 1000);
        }
      } catch (error) {
        //console.log(error);
      }
      messageRef = false;
    }
  };
  render() {
    return (
      <View style={[styles.contener]}>
        <View style={[styles.body]}>
          <View style={[styles.contenerData]}>
            <View style={[styles.contenerHumi]}>
              <View style={{flex: 7}}>
                <AnimatedCircularProgress
                  style={[styles.humi]}
                  //size={170}
                  size={(window.width * 4) / 10}
                  rotation={0}
                  backgroundWidth={30}
                  width={15}
                  lineCap="round"
                  fill={this.state.hum}
                  tintColor="#60b574"
                  backgroundColor="yellow">
                  {fill => (
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: 'yellow',
                        fontSize: 30,
                      }}>
                      {this.state.hum} %
                    </Text>
                  )}
                </AnimatedCircularProgress>
              </View>
              <View style={{flex: 1.5, marginBottom: 5}}>
                <Text
                  allowFontScaling={false}
                  style={{
                    color: 'white',
                    fontSize: 26,
                    textAlign: 'center',
                  }}>
                  Humidity
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
              }}>
              <View style={[styles.contenerTemp]}>
                <View style={{flex: 0.3, marginTop: 10}}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: 25,
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    Temperature
                  </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: 1.2, flexDirection: 'row'}}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontSize: 65,
                        alignContent: 'center',
                        color: 'white',
                      }}>
                      ⛅️
                    </Text>
                  </View>
                  <View style={{flex: 1.5, flexDirection: 'row'}}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontSize: 30,
                        textAlign: 'center',
                        color: 'white',
                        marginTop: 30,
                        marginLeft: 5,
                      }}>
                      {this.state.temp}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontSize: 30,
                        textAlign: 'center',
                        color: 'white',
                        marginTop: 30,
                      }}>
                      ºC
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.contenerLight]}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <View style={{flex: 1}}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        marginTop: 10,
                        fontSize: 25,
                        textAlign: 'center',
                        color: 'white',
                      }}>
                      Light intensity
                    </Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 2}}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontSize: 35,
                          textAlign: 'center',
                          color: 'white',
                        }}>
                        {this.state.light}
                      </Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text
                        allowFontScaling={false}
                        style={{fontSize: 15, color: 'white'}}>
                        {' '}
                        Lux{' '}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 1.4,
              borderColor: 'white',
              borderWidth: 2,
              borderRadius: 10,
              margin: 1,
              flexDirection: 'column',
            }}>
            <ModalDropdown
              options={chart}
              textStyle={{
                marginVertical: 5,
                //marginHorizontal: 6,
                fontSize: 18,
                color: 'white',
                //textAlign: 'center',
                //textAlignVertical: 'center',
              }}
              defaultIndex={-1}
              defaultValue={'Select a chart.....'}
              style={{marginLeft: 10}}
              dropdownTextStyle={{
                color: 'white',
                fontSize: 18,
                backgroundColor: '#5b9fa8',
              }}
              onSelect={value => {
                this.setState({chartState: String(chart[value])});
                console.log(String(chart[value]));
              }}
            />
            {this.state.chartState == 'Temperature' ? (
              <TempChart id={this.state.deviceidselect} />
            ) : null}
            {this.state.chartState == 'Humidity' ? (
              <HumChart id={this.state.deviceidselect} />
            ) : null}
            {this.state.chartState == 'Light intensity' ? (
              <LightChart id={this.state.deviceidselect} />
            ) : null}
          </View>

          <View
            style={{
              flex: 0.45,
              borderColor: 'white',
              borderWidth: 2,
              borderRadius: 10,
              margin: 1,
              flexDirection: 'column',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <View
                style={{
                  flex: 9,
                  flexDirection: 'row',
                  marginLeft: 10,
                }}>
                <TextInput
                  style={{
                    height: 40,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    //color: '#FFF',
                    color: 'white',
                    paddingHorizontal: 10,
                    marginBottom: 20,
                    width: (window.width * 7) / 10,
                    position: 'absolute',
                  }}
                  onChangeText={text => this.setState({deviceid: text})}
                  placeholder="Add a device id"
                  placeholderTextColor="rgba(255,255,255,0.8)"
                  keyboardType="number-pad"
                  returnKeyType="next"
                  autoCorrect={false}
                  maxLength={9}
                />
              </View>
              <View
                style={{
                  flex: 2,
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={this.addDevice}
                  activeOpacity={0.6}
                  style={[
                    {
                      alignContent: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                    },
                  ]}>
                  <View style={{}}>
                    <Image
                      source={require('./images/add.png')}
                      style={{width: 35, height: 35, marginLeft: 5}}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                margin: 3,
              }}>
              <View
                style={{
                  flex: 5,
                  margin: 3,
                }}>
                <ModalDropdown
                  options={deviceids}
                  textStyle={{
                    marginVertical: 5,
                    fontSize: 18,
                    color: 'white',
                  }}
                  defaultIndex={-1}
                  defaultValue={'Select a device.....'}
                  style={{marginLeft: 10}}
                  dropdownTextStyle={{
                    color: 'white',
                    fontSize: 18,
                    backgroundColor: '#5b9fa8',
                  }}
                  onSelect={value => {
                    messageRef = true;
                    this.setState({
                      chartState: '',
                    });
                    count = 0;
                    this.setState({
                      deviceidselected: this.state.deviceidselect,
                    });
                    this.setState({
                      deviceidselect: String(deviceids[value]),
                    });
                  }}
                />
              </View>
              <View
                style={{
                  flex: 2,
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={this.updateData2}
                  activeOpacity={0.6}
                  style={[
                    {
                      flexDirection: 'row',
                      alignContent: 'flex-end',
                      justifyContent: 'flex-end',
                      marginLeft: 3,
                    },
                  ]}>
                  <View style={{}}>
                    <Image
                      source={require('./images/update.png')}
                      style={{width: 30, height: 30, marginLeft: 5}}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flex: 2,
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    for (var i = 0; i < deviceids.length - 1; i++) {
                      if (deviceids[i] === this.state.deviceidselect) {
                        deviceids.splice(i, 1);
                      }
                    }
                    this._storeData();
                  }}
                  activeOpacity={0.6}
                  style={[
                    {
                      flexDirection: 'row',
                      alignContent: 'flex-end',
                      justifyContent: 'flex-end',
                      marginLeft: 3,
                    },
                  ]}
                  //disabled={this.state.startDisablePee}
                >
                  <View style={{}}>
                    <Image
                      source={require('./images/delete1.png')}
                      style={{width: 30, height: 30, marginLeft: 5}}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flex: 2,
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    try {
                      this.props.navigation.navigate('sensors', {
                        devices: deviceids,
                      });
                    } catch {
                      console.log('chua co thiet bi');
                    }
                  }}
                  activeOpacity={0.6}
                  style={[
                    {
                      flexDirection: 'row',
                      alignContent: 'flex-end',
                      justifyContent: 'flex-end',
                      marginLeft: 3,
                    },
                  ]}>
                  <View style={{}}>
                    <Image
                      source={require('./images/request.png')}
                      style={{width: 30, height: 30, marginLeft: 5}}
                    />
                  </View>
                </TouchableOpacity>
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
    backgroundColor: 'gray',
    flexDirection: 'column',
    //marginTop: Platform.OS === 'ios' ? 34 : 0,
  },
  body: {
    flex: 16,
    backgroundColor: '#5b9fa8',
    flexDirection: 'column',
    marginTop: 1,
  },
  contenerData: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 3,
  },
  contenerHumi: {
    flexDirection: 'column',
    flex: 1,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    margin: 1,
  },
  humi: {margin: 20, flex: 9, alignItems: 'center', alignContent: 'center'},
  contenerTemp: {
    flex: 1,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    margin: 1,
    flexDirection: 'column',
  },
  contenerLight: {
    flex: 1,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    margin: 1,
    flexDirection: 'column',
  },
});
//export default App;
