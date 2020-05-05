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
  FlatList,
  StatusBar,
  Switch,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import TempChart from './components/TempChart';
import HumChart from './components/HumChart';
import LightChart from './components/LightChart';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Awesome5sign from 'react-native-vector-icons/dist/FontAwesome5';

const window = Dimensions.get('window');
const chart = ['Temperature', 'Humidity', 'Light intensity'];
var deviceids = [];

class FlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: null,
      hum: null,
      light: null,
      relay1: false,
      relay2: false,
      mode: false,
      check: false,
    };
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
  }
  componentDidMount() {
    try {
      let text = 'http://vn-api.companywe.co.kr/data/new/' + this.props.id.item;
      let text2 =
        'http://vn-api.companywe.co.kr/device/control/' + this.props.id.item;
      setInterval(() => {
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
      }, 20000);
      setInterval(() => {
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
      }, 5000);
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
    } catch (error) {
      //console.log(error);
    }
  }
  render() {
    return (
      <View style={styles.contenerFlatlist}>
        <View style={[styles.header]}>
          <Text allowFontScaling={false} style={{color: 'white', fontSize: 18}}>
            ID: {this.props.id.item}
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Awesome5sign name="temperature-high" size={30} color="#e64e7e" />
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: 'white', fontSize: 18, marginLeft: 10}}>
              {this.state.temp} ºC
            </Text>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <MaterialCommunityIcons name="water" size={30} color="blue" />
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: 'white', fontSize: 18, marginLeft: 10}}>
              {this.state.hum} %
            </Text>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <MaterialCommunityIcons
              name="car-parking-lights"
              size={30}
              color="yellow"
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: 'white', fontSize: 18, marginLeft: 10}}>
              {this.state.light} lux
            </Text>
          </View>
        </View>

        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 2}}>
            <Text
              allowFontScaling={false}
              style={{color: 'white', fontSize: 18, marginLeft: 10}}>
              Auto mode:
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Switch value={this.state.mode} disabled={true} />
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 2}}>
            <Text
              allowFontScaling={false}
              style={{color: 'white', fontSize: 18, marginLeft: 10}}>
              Relay1:
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Switch value={this.state.relay1} disabled={true} />
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 2}}>
            <Text
              allowFontScaling={false}
              style={{color: 'white', fontSize: 18, marginLeft: 10}}>
              Relay2:
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Switch value={this.state.relay2} disabled={true} />
          </View>
        </View>
      </View>
    );
  }
}

export default class Home extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Sensor data',
      marginTop: StatusBar.currentHeight,
      headerLeft: (
        <Image
          source={require('./icon.png')}
          style={{width: 40, height: 40, marginLeft: 10, marginTop: 5}}
        />
      ),
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      temp: 30,
      hum: 40,
      light: 1000,
      deviceid: '',
      deviceidselect: '',
      deviceidselected: '',
      chartState: '',
      check: false,
      update: false,
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
  updateData2 = async () => {
    this.setState({update: true});
  };
  render() {
    return (
      <View style={[styles.contener]}>
        <View style={[styles.body]}>
          <View
            style={{
              flex: 0.225,
              flexDirection: 'row',
              margin: 2,
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flex: 8,
                flexDirection: 'row',
                marginLeft: 10,
                alignItems: 'center',
              }}>
              <TextInput
                style={{
                  height: 40,
                  backgroundColor: '#d0dbd3',
                  color: 'black',
                  paddingHorizontal: 10,
                  width: (window.width * 5) / 10,
                  borderWidth: 0.5,
                  borderColor: 'white',
                  borderRadius: 40,
                }}
                onChangeText={text => this.setState({deviceid: text})}
                placeholder="Add a device id"
                placeholderTextColor="#7f8581"
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
                alignItems: 'center',
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
                  <Icon name="add-box" size={40} color="#AA9797" />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 2,
                flexDirection: 'row',
                alignItems: 'center',
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
                  <MaterialCommunityIcons
                    name="arrow-expand"
                    size={40}
                    color="#AA9797"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.contenerData]}>
            <View style={{flex: 1, marginBottom: 5}}>
              <FlatList
                style={{backgroundColor: 'white'}}
                horizontal={true}
                data={deviceids}
                keyExtractor={(item, index) => item}
                renderItem={item => <FlatListItem id={item} />}
              />
            </View>
          </View>

          {/* /* ******************************* */}
          <View
            style={{
              flex: 0.225,
              marginBottom: 2,
              flexDirection: 'column',
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                margin: 3,
              }}>
              <View
                style={{
                  flex: 8,
                  margin: 3,
                }}>
                <ModalDropdown
                  options={deviceids}
                  textStyle={{
                    marginVertical: 5,
                    fontSize: 18,
                    color: '#7f8581',
                  }}
                  defaultIndex={-1}
                  defaultValue={'Select a device.....'}
                  style={{marginLeft: 10}}
                  dropdownTextStyle={{
                    color: 'black',
                    fontSize: 18,
                    backgroundColor: '#cfd4d1',
                  }}
                  onSelect={value => {
                    this.setState({
                      chartState: '',
                    });
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
                    <Icon name="file-download" size={40} color="#AA9797" />
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
                    <Icon name="delete-forever" size={40} color="#AA9797" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* /* ******************************* */}

          <View
            style={{
              flex: 1.4,
              // borderColor: 'white',
              // borderWidth: 2,
              // borderRadius: 10,
              marginBottom: 1,
              flexDirection: 'column',
              backgroundColor: 'white',
            }}>
            <ModalDropdown
              options={chart}
              textStyle={{
                marginVertical: 5,
                fontSize: 18,
                color: '#7f8581',
              }}
              defaultIndex={-1}
              defaultValue={'Select a chart.....'}
              style={{marginLeft: 15}}
              dropdownTextStyle={{
                color: 'black',
                fontSize: 18,
                backgroundColor: '#cfd4d1',
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
        </View>
        <View
          style={{
            height: 25,
            width: window.width,
            backgroundColor: '#d0dbd3',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <View
            style={{
              height: 25,
              width: 10,
              backgroundColor: '#d0dbd3',
            }}
          />
          <AntDesign name="tago" size={20} color="#AA9797" />
          <Text style={{color: '#AA9797', marginLeft: 10}}>
            Design by CompanyWE and DNCI
          </Text>
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
  contenerFlatlist: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: 180,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 10,
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: '#51c26f',
  },
  body: {
    flex: 16,
    //backgroundColor: '#5b9fa8',
    backgroundColor: '#cfd4d1',
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
  header: {
    flex: 1,
  },
});
