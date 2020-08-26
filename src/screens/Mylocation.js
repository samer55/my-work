import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,FlatList,RefreshControl} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text} from 'native-base';
import _ from 'lodash';
import geohash from "ngeohash";

const { width } = Dimensions.get("screen");
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import Spinner from 'react-native-loading-spinner-overlay';
import Trainer from '../components/Trainer';
import moment from 'moment';
import 'moment/src/locale/ar'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import LocationView from "react-native-location-view";
import Geolocation from '@react-native-community/geolocation';

const headerImage = __DEV__ ? 'rabbitDev' : 'rabbitProd';
import Carousel from '../components/carousel';
import Avatar from '../components/avatar/Avatar';
import Team from '../components/teamimage';
import Feature from '../components/feature';
import Membership from '../components/Membership';
import Gallery from '../components/Gallery';
import Door from '../components/Door';
import FeaturedTile from '../components/tile/FeaturedTile';
import ClassCarousel from '../components/ClassCarousel';
import * as firebase from 'firebase';

import { Button,Header,Item,Icon,Input } from 'native-base';
import NavigationBack from '../components/NavigationBack';

import MapView from "react-native-maps";

import { firebaseApp } from '../../firebase'
import { ThemeContext } from 'react-navigation';

export default class extends React.Component {
  static navigationOptions = ({ navigation,theme= useTheme() }) => ({
    header:null
  });

  constructor(props) {
    super(props);
    this.state = {
        swipeablePanelActive: false,
        first:'ss',
address:'',
        text:'',
        dataArray: [],
        friends:[],
        name:'dfsdf',
        mydata:[],
        spinner:false,
        commentsRef:'',
        search:'',
        fetch:'false',
        loading: true,
             region: {
               latitude:32,
               longitude: 35,
               latitudeDelta: 0.001,
               longitudeDelta: 0.001
             },
             isMapReady: false,
             marginTop: 1,
             userLocation: "",
             regionChangeProgress: false,

        dataSources: [],
        searched:[],
myuid:  props.navigation.getParam('id',''),
btype:  props.navigation.getParam('type',''),
chang:false,
        commentsRefs:'',
    };
    this.arrayholder=[]
    this.datas=[]
this.users=[ {
  title: 'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
first:'red',
second:'steelblue',
  username:'sameranas',
firstdoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
seconddoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوddfdfdfdfب',
firstLock:true,
secondlock:true,

},


]
this.currentUserId=''
this.currentusername=''
this.arrayholder=[]


  }


componentDidMount(){
  Geolocation.getCurrentPosition(
      (position) => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        };
        this.setState({
          region: region,
          loading: false,
          positiona:region,
          fetch:'still',
          error: null,
        });
      },
      (error) => {
        alert(error);
        this.setState({
          error: error.message,
          loading: false
        })
      },
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 },

    );


}
componentWillMount(){
  navigator.geolocation.getCurrentPosition(
      (position) => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        };
        this.setState({
          region: region,
          loading: false,
          chang:true,
          fetch:'still',
          error: null,
        });
      },
      (error) => {
        alert(error);
        this.setState({
          error: error.message,
          loading: false
        })
      },
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 },

    );
} getlo = (add,reg) => {
   this.setState({
     ploading:true,
     postStatus: 'Starting..',
     shows:true,pcolor:'warning'
   })
   const hash = geohash.encode(reg.latitude, reg.longitude);

         const username = firebaseApp.auth().currentUser.displayName
 if (true) {
   if (true) {

if (true) {

         const postData = {
region:{
  latitude:reg.latitude,
  longitude: reg.longitude,
  latitudeDelta: 0.001,
  longitudeDelta: 0.001
},
hash,
Address:add,

         }
         let updates = {}
         let updatess = {}


   //       firebaseApp.database().ref('tags').set(this.state.tags.tagsArray)
   firebaseApp.firestore().collection(this.state.btype).doc(this.state.myuid).update(postData)

         .then(() => {

           this.setState({
                           postStatus: 'تم شكرا لك.',
                           title:'',
                           lovemsg:'',
                           hatemsg:'',

                         })
 this.setState({shows:false})
this.props.navigation.navigate('NewChallenge')

         })
         .catch(() => {
           this.setState({ postStatus: 'Something went wrong!!!',pcolor:'red' })
         })

       .catch(error => {
         console.log(error)
       })


     } else {

         this.setState({ploading:false,  postStatus: 'Please enter about',shows:true ,pcolor:'red'})
         setTimeout(() => {
         this.setState({shows:false})
       }, 3000)
     }
   } else {

       this.setState({ploading:false,  postStatus: 'Please Select business you want to start & select category',shows:true ,pcolor:'red'})
       setTimeout(() => {
       this.setState({shows:false})
     }, 3000)
   }
 } else {

   this.setState({ploading:false,  postStatus: "Please enter your business name",shows:true ,pcolor:'red'})
     setTimeout(() => {
     this.setState({shows:false})
   }, 3000)
 }


 }
onMapReady = () => {
  this.setState({ isMapReady: true, marginTop: 0 });
}

fetchAddress = () => {
  fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.region.latitude + "," + this.state.region.longitude + "&key=" + "AIzaSyBgUqmdbJVF8uUENYrgOVlfm9Kaz5NI5uI")
    .then((response) => response.json())
    .then((responseJson) => {
      const userLocation = responseJson.results[0].formatted_address;
      this.setState({
        userLocation: userLocation,
        regionChangeProgress: false,
        fetch:'true'
      });
    });
}

onRegionChange = region => {
  this.setState({
    region,
    regionChangeProgress: true
  })
}
onLocationSelect = () => alert(this.state.userLocation);

  displayCategories = () => {
    this.setState({spinner:true})
    var ref = firebaseApp.database().ref("notification/"+firebaseApp.auth().currentUser.uid); //Here assuming 'Users' as main table of contents

    ref.once('value').then(snapshot => {
        // console.log(snapshot.val());

         // get children as an array
         var items = [];
         friend =[]
         snapshot.forEach((child) => {


  items.push(child.val());


        });
        sort = items.sort(function(a, b) {
         // Turn your strings into dates, and then subtract them
         // to get a value that is either negative, positive, or zero.
         return new Date(b.createdAt) - new Date(a.createdAt);

       });

        this.setState({ dataSources:Object.values(sort),searched:Object.values(items),spinner:false},function(){
          this.arrayholder=items
        });
        console.log('itemss----------------'+items);
        console.log('dataArray----------------'+this.state.dataArray);

    });
console.log(this.state.dataArray);
  }

    create = (d) => {
         firebaseApp.database().ref(`friends/${d.userId}`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)

    }
    deletereq=(d)=>{
      firebaseApp.database().ref(`friendsreq/${d.userId}/${firebaseApp.auth().currentUser.uid}`).on('value', function(snapshot) {
    snapshot.ref.remove();
    })
    firebaseApp.database().ref(`friendsreq/${firebaseApp.auth().currentUser.uid}/${d.userId}`).on('value', function(snapshot) {
  snapshot.ref.remove();
  })
    }
   accepts=(d)=>{



             firebaseApp.database().ref(`friends/${firebaseApp.auth().currentUser.uid}`).child(d.userId.toLowerCase()).set(d.username)

             firebaseApp.database().ref(`friends/${d.userId}`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)
          this.deletereq(d)
this.displayCategories()


    }
    deletes=(d)=>{

console.log(d);
            firebaseApp.database().ref(`friends`).equalTo(d).on('value', function(snapshot) {
          snapshot.ref.remove();
          })
          firebaseApp.database().ref(`friends/${firebaseApp.auth().currentUser.uid}`).on('value', function(snapshot) {
        snapshot.ref.remove();
        })
 this.displayCategories()


     }

on=(d)=>{
this.getlo()
}
  render() {
    const dataArray = Object.values(this.arrayholder)
    const {navigation}=this.props
    let trLocale = require('moment/locale/ar');
    let ArrayOfPeopleObject = Object.values(this.state.dataArray)

    return (
      <ThemeContext.Consumer>
        {theme => (
          <View style={{flex: 1}}>
  {  this.state.chang?  <LocationView
        apiKey={"AIzaSyBiJcc3i7ffHp2qfcAhS6qB3zPtDbJmIRQ"}
        initialLocation={{
          latitude: this.state.region.latitude,
          longitude: this.state.region.longitude,
        }}
        actionText="Pick this Location"
        onLocationSelect={(d)=>{

  this.getlo(d.address,d)
        }}
      />:null}
    </View>

    )}

  </ThemeContext.Consumer>

    );
  }


_renderRow = (data) => {

  this.users.map((data, index) => {
    return(
      <ListItem thumbnail>
        <Left>
          <Thumbnail square source={require('../assets/account.png')} />
        </Left>
        <Body>
          <Text style={gStyle.text[theme]}>@{data.user}</Text>
          <Text style={gStyle.text[theme]} note numberOfLines={1}>{data.username}</Text>
        </Body>
        <Right>
          <Button transparent onPress={()=>navigation.navigate('Write',{data,myuid:this.currentUserId,username:this.currentusername})}>
            <Text style={gStyle.text[theme]}>اكتب</Text>
          </Button>
          <Button transparent onPress={()=>navigation.navigate('Write',{data,myuid:this.currentUserId,username:this.currentusername})}>
            <Text style={[gStyle.text[theme],{color:'red'}]}>اضف كصديق</Text>
          </Button>
        </Right>
      </ListItem>)})


}

}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width
  },
  map: {
    flex: 1
  },
  mapMarkerContainer: {
    left: '47%',
    position: 'absolute',
    top: '42%'
  },
  mapMarker: {
    fontSize: 40,
    color: "red"
  },
  deatilSection: {
    flex:2,
    backgroundColor: "#fff",
    padding: 10,
    display: "flex",
    justifyContent: "flex-start"
  },
  spinnerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btnContainer: {
    width: Dimensions.get("window").width - 20,
    position: "absolute",
    bottom: 100,
    left: 10
  }
});