import React from 'react';
import { StatusBar, View ,AsyncStorage,StyleSheet,Dimensions,Text,Image} from 'react-native';
import { AppLoading, ScreenOrientation } from 'expo';
import { Appearance } from 'react-native-appearance';
import { device, func, gStyle } from './src/constants';
import { Ionicons } from '@expo/vector-icons';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { Provider } from 'mobx-react';
import appStore from './store/AppStore'
import * as Permissions from 'expo-permissions';
import {decode, encode} from 'base-64';
const ReactNative = require('react-native');

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

// tab navigator
import TabNavigator from './src/navigation/TabNavigator';
import AppIntroSlider from 'react-native-app-intro-slider';
const ThemeContext = React.createContext(null);
import OneSignal from 'react-native-onesignal'; // Import package from node modules

import { observer,inject } from 'mobx-react'
@observer
class App extends React.Component {
  constructor(props) {
    super(props);
    OneSignal.init("4ab98c66-d9e7-4978-ac18-466ec800dbc3");
    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("ids", this.onIds);
    OneSignal.configure();
    OneSignal.registerForPushNotifications();
    OneSignal.getPermissionSubscriptionState((status) => {
        console.log(status);
    });

    this.state = {
      isLoading: true,
      theme: 'light',
      isLoadingComplete: false,
      fontLoaded: false,
      showRealApp: false,
firstLaunch: null,
      show_Main_App: false
    };

    // is iPad?
    if (device.isPad) {
      ScreenOrientation.allowAsync(
        ScreenOrientation.Orientation.ALL_BUT_UPSIDE_DOWN
      );
    }

    this.updateTheme = this.updateTheme.bind(this);
  }

   onReceived = notification => {
      console.log("Notification received: ", notification);
    };



    onIds = device => {
      console.log("Device info: ", device);
      this.setState({ device });
    };
  componentDidMount() {
    // get system preference
    const colorScheme = Appearance.getColorScheme();
Permissions.askAsync(Permissions.NOTIFICATIONS);
    // if light or dark
    if (colorScheme !== 'no-preference') {
      this.setState({
        theme: 'dark'
      });
    }
    AsyncStorage.getItem('first_timesss').then((value) => {
         this.setState({ show_Main_App: !!value, loading: false });
       });
  }
  on_Done_all_slides = () => {
    AsyncStorage.setItem('first_timesss', 'true').then(() => {
      this.setState({ show_Main_App: true });

    });

};
componentWillMount (){
  try {
  ReactNative.I18nManager.allowRTL(false);
} catch (e) {
  console.log(e);
}

}
toggleTheme = () => {
    this.setState(({ theme }) => ({
      theme: theme === 'light' ? 'dark' : 'light',
    }));
  };
  _renderItem = ({ item }) => {
   return (
     <View style={{alignItems: 'center',justifyContent: 'space-around',flex: 1,width:Dimensions.get('window').width,height: Dimensions.get('window').height}}>
       <Text style={{fontFamily: 'ralewaysemi',fontSize: 21,color: '#000000'}}>{item.title}</Text>
       <Image source={{uri:item.image}}  style={{resizeMode: 'contain',height: 300,width: 300,alignSelf: 'center'}}/>
       <Text style={{fontFamily: 'ralewaymedium',fontSize: 15,color: '#000000',textAlign: 'center',marginBottom: 20}}>{item.text}</Text>
     </View>
   );
 }
 _renderNextButton = () => {
   return (
     <View style={{ width: 60,
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',}}>
     <Text>Next</Text>
     </View>
   );
 };
 _renderDoneButton = () => {
   return (
     <View style={{ width: 60,
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',}}>
     <Text>Done</Text>

     </View>
   );
 };
  updateTheme(themeType) {
    this.setState({
      theme: themeType
    });
  }

  render() {
    const { isLoading, theme } = this.state;
    const iOSStatusType = theme === 'light' ? 'dark-content' : 'light-content';

    if (isLoading) {
      return (
        <AppLoading
          onFinish={() => this.setState({ isLoading: false })}
          startAsync={func.loadAssetsAsync}
        />
      );
    }
    console.disableYellowBox = true;
const lets = this.state.show_Main_App?    <ThemeContext.Provider
           value={{ theme: 'light', toggleTheme: this.toggleTheme }}>

<StatusBar hidden={true} />
<Provider appStore={appStore}>
        <TabNavigator
        arabic={appStore.arabic}
          screenProps={{
            updateTheme: this.updateTheme
          }}
          theme={'light'}
        />
        </Provider>
     </ThemeContext.Provider>:<AppIntroSlider
           data={slidess}
           renderItem={this._renderItem}
           renderDoneButton={this._renderDoneButton}
           onDone={this.on_Done_all_slides}
           renderNextButton={this._renderNextButton}
         />
    return (
  <View style={{flex:1}}>
  {lets}
  </View>
    );
  }
}
const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 5
  },
  text1: {
    color: '#fff',
    fontSize: 20,
    textAlign:'center',
    alignItems:'center'
  },
  image: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const slidess = [
  {
    key: 'one',
    title: 'Offer your Service',
    text: 'Online & Local Service \nIf you have special skills offer them to people around you',
    image: 'https://i.ibb.co/5MM700F/Office-employees-receiving-package-from-courier-Workers-using-cellphones-and-laptop-flat-vector-illu.jpg',
    backgroundColor: '#59b2ab',
  },
  {
    key: 'two',
    title: 'Find a job',
    text: 'Find a job or Hire Professional people',
    image: 'https://i.ibb.co/z4TQMhc/3372240.jpg',
    backgroundColor: '#febe29',
  },
  {
    key: 'three',
    title: 'Start new business',
    text: 'Start your own business and add new offers & services',
    image: 'https://i.ibb.co/bKF89sK/3255469.jpg',
    backgroundColor: '#22bcb5',
  }
];

export default App;
