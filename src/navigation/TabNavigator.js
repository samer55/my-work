import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { colors } from '../constants';
import { createStackNavigator} from 'react-navigation-stack';

import {  createSwitchNavigator } from 'react-navigation';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import Loadingnew from '../screens/loadingnew';
import FindSecret from '../screens/FindSecret';
import AddFriend from '../screens/AddFriend';
import Guide from '../screens/guide';
import Forget from '../screens/forget';
import Startnew from '../screens/Startnew';
import OfferService from '../screens/OfferService';
import Hire from '../screens/Hire';
import OpenStore from '../screens/OpenStore';
import Specialoffer from '../screens/Specialoffer';
import Mappickers from '../screens/Mappickers';
import Logins from '../screens/logins';
import Dashboard from '../screens/Dashboard';
import Nearby from '../screens/Nearby';
import Complete from '../screens/Complete';
import Currentlocation from '../screens/Currentlocation';
import Navload from '../screens/Navload';

// navigation stacks
import HomeStack from './HomeStack';
import MultiStack from './MultiStack';
import StatsStack from './StatsStack';
import SettingsStack from './SettingsStack';
import Challenge from './Challenge';
import Search from './Search';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

const TabNavigator = createBottomTabNavigator(
  {

    HomeStack:HomeStack,
      Search:Search,
      Ch:Challenge,
    StatsStack,

    Profile:SettingsStack
  },
  {
    initialRouteName: 'Search',
   tabBarOptions: { showLabel: false }
  }
);
const HomeStacks = createStackNavigator(
  {
    Stats: FindSecret,
    Startnew:Startnew,



  },

);
const Guides = createStackNavigator(
  {

    Guide: Guide,
    Startnew:Startnew,
    OfferService:OfferService,
    Hire:Hire,
    OpenStore:OpenStore,
    Specialoffer:Specialoffer
  },

  {
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
);
const Switch = createSwitchNavigator({

  loading: {
    screen: Loadingnew,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  navload: {
    screen: Navload,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },

  Signup: {
    screen: Signup,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  Add: {
    screen: AddFriend,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  Forget: {
    screen: Forget,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  map: {
    screen: Currentlocation,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },

  Home: {
    screen: TabNavigator
  },
New:{
  screen: Startnew
},
Complete:{
  screen: Complete
},
  Write: {
    screen: HomeStacks
  },
});

const App = createAppContainer(Switch);

export default App;
