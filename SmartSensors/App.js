import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './home';
import Splash from './Splash';
import sensors from './sensors';

const HomeTab = createStackNavigator(
  {
    //Main: Main,
    Home: Home,
    sensors: sensors,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        //backgroundColor: '#5b9fa8',
      },
      headerTitleStyle: {
        fontSize: 23,
        marginTop: 5,
      },
      headerTintColor: '#5b9fa8',
      title: 'Return',
      style: {
        marginTop: 50,
      },
    },
  },
);
const MainApp = createSwitchNavigator({
  Splash: {
    screen: Splash,
  },
  HomeTab: {
    screen: HomeTab, //where this would be your current createBottomTabNavigator
  },
});

export default createAppContainer(MainApp);
