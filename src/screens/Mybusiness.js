import React from 'react';
import { Image, StatusBar,Text,ImageBackground, View, ScrollView, Dimensions,StyleSheet,TouchableOpacity,Linking,RefreshControl } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import { Thumbnail,Button,Header,Item,Input ,Left,Right,Body,Title,Icon} from 'native-base';
import { firebaseApp } from '../../firebase'
var voucher_codes = require('voucher-code-generator');
import Spinner from 'react-native-loading-spinner-overlay';
import { Form,   } from 'native-base';
import Card from '../components/Card';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { device} from '../constants';
import {  Picker } from "react-native";
import * as firebase from 'firebase';
import Swiper from 'react-native-swiper'
import ShowScroller from './showscards'
const headerImage = __DEV__ ? 'rabbitDev' : 'rabbitProd';
import { Modalize } from 'react-native-modalize';
import { Ionicons } from '@expo/vector-icons';

import Carousel from '../components/carousel';
import Avatar from '../components/avatar/Avatar';
import Team from '../components/teamimage';
import Feature from '../components/feature';
import Membership from '../components/Membership';
import Gallery from '../components/Gallery';
import Door from '../components/Door';
import FeaturedTile from '../components/tile/FeaturedTile';
import ClassCarousel from '../components/ClassCarousel';

import { LinearGradient } from 'expo-linear-gradient';

import { ThemeContext } from 'react-navigation';
import { observer,inject } from 'mobx-react'
@inject("appStore") @observer

class Mybusiness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,secret:'',
      status:'',
      isDatePickerVisible: false,
      code:'',
      dataArray: [],
      setDatePickerVisibility: false,
      myuid:'',
       refreshing: false,
      myusername:'',
      posts:[],
jobsarray:[],
offerarr:[],
businessarray:[],
mybusiness:  props.navigation.getParam('business',[firebaseApp.auth().currentUser.uid]),

      Duration:'popular',
      disabled:false,
      check:false,
      serref:false,

      Additional: '-------------',
      spinner:false,
    };
    this.currentUserId=''
    this.arrayholder=[]
    this.filt=[]

    this.currentusername=''


  }
  onValueChange2(value: string) {
    this.setState({
      Additional: value
    });
  }
  _onRefresh = () => {
 }
  onValueChange1(value: string) {
    this.setState({
      Duration: value,
      refreshing:true,
      firsts:true
    });
    this.DisplayPosts(value)
  }
  showDatePicker = () => {
    this.setState({ setDatePickerVisibility: true });
  };
  displayCategories = (d) => {
    this.setState({refreshing:true})

    console.log("------------uid home ------ "+firebaseApp.auth().currentUser.uid);
    let uid =firebaseApp.auth().currentUser.uid
    console.log("------------uid uid ------ "+uid);
const refs =`Doors/${uid}`
    var ref = firebaseApp.database().ref(refs);//Here assuming 'Users' as main table of contents

    firebaseApp.database().ref(`Doors/${uid}`).once('value').then(snapshot => {
        // console.log(snapshot.val());
console.log('lalallaal-----'+snapshot.val());
         // get children as an array
         var items = [];
         snapshot.forEach((child) => {
           items.push(child.val());
        });

    let sort =items

if (this.state.Duration=='date') {
   sort = items.sort(function(a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.createdAt) - new Date(a.createdAt);

  });

} else if(this.state.Duration=='open'){
  sort = items.sort(function(a, b) {
   // Turn your strings into dates, and then subtract them
   // to get a value that is either negative, positive, or zero.
   return new Date(b.createdAt) - new Date(a.createdAt);

 });
   sort = items.filter(word => word.firstLock==false||word.secondlock ==false);

}else if(this.state.Duration=='close'){
  sort = items.sort(function(a, b) {
   // Turn your strings into dates, and then subtract them
   // to get a value that is either negative, positive, or zero.
   return new Date(b.createdAt) - new Date(a.createdAt);

 });
   sort = items.filter(word => word.firstLock==true&word.secondlock ==true);

}else {
 sort =items
}


this.setState({ dataArray: Object.values(sort),spinner:false,refreshing:false},function(){this.arrayholder=Object.values(sort)});

    });
console.log(this.state.dataArray);
  }



  DisplayPosts = (d) => {
    this.setState({refreshing:true})

    let uid =firebaseApp.auth().currentUser.uid

    firebaseApp.database().ref(`Posts`).on('value', (snapshot) => {
         var items = [];
         snapshot.forEach((child) => {
           items.push(child.val());
        });

      if(d==="latest"){
          sort = items.sort(function(a, b) {
           // Turn your strings into dates, and then subtract them
           // to get a value that is either negative, positive, or zero.
           return new Date(b.createdAt) - new Date(a.createdAt);

         });
        }
      else   if (d==="popular") { sort = items.sort((a, b) => {
         likeda = a.likedby ? Object.values(a.likedby).map((project)=>{
           return project.likedby;
         }) : [];
         likedb = b.likedby ? Object.values(b.likedby).map((project)=>{
           return project.likedby;
         }) : [];
         laugheda = a.laughedby ? Object.values(a.laughedby).map((project)=>{
           return project.likedby;
         }) : [];
         sadeda = a.sadedby ? Object.values(a.sadedby).map((project)=>{
           return project.likedby;
         }) : [];
         dislikeda = a.dislikedby ? Object.values(a.dislikedby).map((project)=>{
           return project.likedby;
         }) : [];
         laughedb = b.laughedby ? Object.values(b.laughedby).map((project)=>{
           return project.likedby;
         }) : [];
         sadedb= b.sadedby ? Object.values(b.sadedby).map((project)=>{
           return project.likedby;
         }) : [];
         dislikedb = b.dislikedby ? Object.values(b.dislikedby).map((project)=>{
           return project.likedby;
         }) : [];
         let as=likeda +laugheda+sadeda+dislikeda
         let bs =likedb+laughedb+sadedb+dislikedb
         if (as < bs) {
           return 1;
         }
         if (as > bs) {
           return -1;
         }
         return 0;
       })}
console.log(sort +'--------------------------------posts');
this.setState({ check:false,disabled:false,posts: Object.values(sort),spinner:false,refreshing:false,firsts:false},function(){
  this.filt=Object.values(sort)
});

    });
  }



  componentDidMount() {

    var ref = firebaseApp.firestore().collection('Business').where('writerId','in', this.state.mybusiness).onSnapshot(this.Businessupdate)
    var ref1 = firebaseApp.firestore().collection('Services').where('writerId','in', this.state.mybusiness).onSnapshot(this.Servicesupdate)
  var ref2 = firebaseApp.firestore().collection('Offers').where('writerId','in', this.state.mybusiness).onSnapshot(this.Offerupdate)
    var ref3 = firebaseApp.firestore().collection('Jobs').where('writerId','in', this.state.mybusiness).onSnapshot(this.Jobsupdate)

}
Businessupdate = (querySnapshot) => {
  const boards = [];
  querySnapshot.forEach((doc) => {
    boards.push(doc.data());
  });
console.log("loadddinngggg1");
  this.setState({businessarray: Object.values(boards)})

}

Servicesupdate = (querySnapshot) => {
  const boards = [];
  querySnapshot.forEach((doc) => {
    boards.push(doc.data());
  });
  console.log("loadddinngggg2");

  this.setState({dataArray:Object.values(boards)})

}
Offerupdate = (querySnapshot) => {
  const boards = [];
  querySnapshot.forEach((doc) => {
    boards.push(doc.data());
  });

  this.setState({offerarr:boards})

}
Jobsupdate = (querySnapshot) => {
  const boards = [];
  querySnapshot.forEach((doc) => {
    boards.push(doc.data());
  });
  console.log("loadddinngggg3");

  this.setState({jobsarray: Object.values(boards)})

}


  componentWillUnmount() {

 }
deletess=(data,name)=>{
  var updates = {};
updates[`Posts/${data.postuid}/${name}/${firebaseApp.auth().currentUser.uid.toLowerCase()}`] = null;
return firebaseApp
.database()
.ref()
.update(updates)
}
 incs=(data)=>{

if (this.state.check!=true) {
   this.setState({check:true})
  firebaseApp.database().ref(`Posts/${data.postuid}/likesuser`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).once('value')
          .then((snapshot) => {
            if (snapshot.val()) {
              console.log('existsssss');
              firebaseApp.database().ref(`Posts/${data.postuid}/love`).transaction(function(currentClicks) {
              // If node/clicks has never been set, currentRank will be `null`.
              return (currentClicks || 0) - 1;
              })
this.deletess(data,'likesuser')



            }
            else{
              firebaseApp.database().ref(`Posts/${data.postuid}/love`).transaction(function(currentClicks) {
              // If node/clicks has never been set, currentRank will be `null`.
              return (currentClicks || 0) + 1;
              })
              let updates = {}
              firebaseApp.database().ref(`Posts/${data.postuid}/likesuser`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)

            }
          })
}




 }
 laugh=(data)=>{
   if (this.state.check!=true) {
      this.setState({check:true})
   firebaseApp.database().ref(`Posts/${data.postuid}/laughusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).once('value')
           .then((snapshot) => {
             if (snapshot.val()) {
               console.log('existsssss');
               firebaseApp.database().ref(`Posts/${data.postuid}/laugh`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) - 1;
               })
this.deletess(data,'laughusers')



             }
             else{
               firebaseApp.database().ref(`Posts/${data.postuid}/laugh`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) + 1;
               })
               let updates = {}
               firebaseApp.database().ref(`Posts/${data.postuid}/laughusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)

             }
           })
}
 }
 sad=(data)=>{
   if (this.state.check!=true) {
      this.setState({check:true})
   firebaseApp.database().ref(`Posts/${data.postuid}/sadusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).once('value')
           .then((snapshot) => {
             if (snapshot.val()) {
               console.log('existsssss');
               firebaseApp.database().ref(`Posts/${data.postuid}/sad`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) - 1;
               })
this.deletess(data,'sadusers')



             }
             else{
               firebaseApp.database().ref(`Posts/${data.postuid}/sad`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) + 1;
               })
               let updates = {}
               firebaseApp.database().ref(`Posts/${data.postuid}/sadusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)

             }
           })
}
 }
 dis=(data)=>{
   if (this.state.check!=true) {
      this.setState({check:true})
   firebaseApp.database().ref(`Posts/${data.postuid}/disusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).once('value')
           .then((snapshot) => {
             if (snapshot.val()) {
               console.log('existsssss');
               firebaseApp.database().ref(`Posts/${data.postuid}/dislike`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) - 1;
               })
 this.deletess(data,'disusers')



             }
             else{
               firebaseApp.database().ref(`Posts/${data.postuid}/dislike`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) + 1;
               })
               let updates = {}
               firebaseApp.database().ref(`Posts/${data.postuid}/disusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)

             }
           })
}
 }
 onBack() {
   this.setState({spinner:true})
   this.displayCategories(this.state.myuid)

     // Back from another screen
   }

  static navigationOptions = ({ navigation,theme= useTheme() }) => ({
header:null
  });
  hideDatePicker = () => {
    this.setState({ setDatePickerVisibility: false });
  };

  handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    this.setState({ date: Moment(date).format('MMM Do YY') });

    this.hideDatePicker();
  };
  searchFilterFunction = text => {
    const newData = this.filt.filter(item => {
      const itemData = `${item.user.toUpperCase()}
      ${item.title.toUpperCase()}   ${item.type.toUpperCase()} ${item.reply.toUpperCase()} ${item.des.toUpperCase()}`;

       const textData = text.toUpperCase();

       return itemData.indexOf(textData) > -1;
    });

    this.setState({ posts: newData });
  };
  onLike = (data,d) => {
    const newPostKey = firebaseApp.database().ref('posts').push().key

  firebaseApp.database().ref().child('Posts').child(data.postuid).child(d).push({
    likedby: firebaseApp.auth().currentUser.email
  })
  fetch('https://onesignal.com/api/v1/notifications',
   {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': "Basic NmIxNTQ4OWEtMzgzZi00YjI5LWFjM2EtYzdmNjYyYTUxNmZl",
     },
     body: JSON.stringify(
     {
       app_id: "092f9c3e-c1c4-4952-abdc-4dcd497ceddb",
       included_segments: ["All"],
       headings: {"en": "شخص ما قام بفتح بالتفاعل على منشورك"},
       android_sound: "fishing",
       data: {"puid": newPostKey, "new_message":true},
       ios_sound: "fishing.caf",
       contents: {"en": `شخص ما تفاعل ب ${d=='likedby'?'اعجبني':d=='sadedby'?'احزنني':d=='laughedby'?'اضحكني':d=='dislikedby'?'لم يعجبني':'لاشئ'}` },
filters: [{"field":"tag","key":"uid","relation":"=","value":data.writerId}],
     })
   })

   .then((responseData) => {
       console.log("Push POST:" + JSON.stringify(responseData));
       responseData.json()
   })
  this.notification(data.writerId,data.postuid)
};
notification=(d,notkey)=>{
  const newPostKey = firebaseApp.database().ref('like').push().key

  firebaseApp.database().ref(`notification/${d}/${newPostKey}`).update({
      username:firebaseApp.auth().currentUser.displayName,
      noti:`شخص ما قام بالتفاعل على منشورك`,
      postuid:notkey,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
     updatedAt: new Date().getTime()+(60*60*48*1000),
      notuid:newPostKey
  });

}
 onUnlike = (data,d) => {
  let ref = firebaseApp.database().ref('Posts').child(data.postuid).child(d);
    ref.orderByChild('likedby').equalTo(firebaseApp.auth().currentUser.email).once('value', snapshot => {
      let updates = {};
      snapshot.forEach(child => updates[child.key] = null);
      ref.update(updates);
  });
};

render(){

  const {navigation}=this.props
  return (
    <ThemeContext.Consumer>
      {theme => (
        <View style={{flex:1}}>
<StatusBar hidden={true} />

    <ScrollView
      contentContainerStyle={gStyle.contentContainerss}
      style={gStyle.container[theme]}
      refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
            tintColor="#eb144c"
          />
        }
    >

    <Swiper style={styles.wrapper} showsPagination={false}  height={200}>
    <TouchableOpacity style={[styless.slide1]} onPress={()=>navigation.navigate('Ask')}>

<LinearGradient
      colors={['rgba(74,144,226,43)','rgba(0,0,0,0.1)']}
      style={{  alignItems: 'center',   width: Dimensions.get('window').width,height: '100%',justifyContent: 'center'}}>
      <View style={{position: 'absolute',top: 0,height: 50,flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',width:Dimensions.get('window').width,backgroundColor: 'rgba(0,0,0,0)',paddingHorizontal: 20}}>
      <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{justifyContent: 'center',alignItems: 'center',paddingHorizontal: 2,backgroundColor: 'rgba(0,0,0,0.2)',borderRadius: 100/2,paddingHorizontal: 10}}>
      <Ionicons name='ios-close' size={40} color="#fff"/>
      </TouchableOpacity>

      </View>
    <Text
      style={{
        backgroundColor: 'transparent',
        fontSize: 23,
        color: '#fff',

        fontWeight: '500',

        alignSelf: 'center',textAlign: 'center',
        fontFamily: 'ralewaysemi'
      }}>
     {this.props.appStore.arabic?'اعمالي':'My Business'}
    </Text>

    </LinearGradient>
    </TouchableOpacity>


         </Swiper>

    <View style={{paddingLeft: 10,paddingTop: 10,flex:1}}>
{/*cards start*/}

<View style={{marginVertical: 3,flexDirection: 'column',paddingVertical: 10,flex:1,width:Dimensions.get('window').width-10}}>
<View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingRight: 10}}>
      <Text style={[gStyle.text[theme], gStyle.Titleleft]}>{this.props.appStore.arabic?'خدماتي':'My Services'}</Text>


</View>
<ShowScroller arabic={this.props.appStore.arabic} navigation={this.props.navigation} dataset={this.state.dataArray} serref={this.state.serref} dash={true} type="service"/>
</View>


<View style={{marginVertical: 3,flexDirection: 'column',paddingVertical: 10,flex:1}}>
<View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingRight: 10}}>
      <Text style={[gStyle.text[theme], gStyle.Titleleft]}>{this.props.appStore.arabic?'وظائفي':'Jobs'}</Text>

</View>
<ShowScroller arabic={this.props.appStore.arabic} navigation={this.props.navigation} refresh={()=>this.setState({refresh:true})} dash={true}   dataset={this.state.jobsarray} type="Jobs"/>
</View>




     <View style={{marginVertical: 3,flexDirection: 'column',paddingVertical: 10,flex:1}}>
     <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingRight: 10}}>
           <Text style={[gStyle.text[theme], gStyle.Titleleft]}>{this.props.appStore.arabic?'شركاتي ومشاريعي الخاصة':'My Company'}</Text>


     </View>
     <ShowScroller arabic={this.props.appStore.arabic} navigation={this.props.navigation} busref={this.state.busref} dataset={this.state.businessarray} dash={true}  type="company"/>
     </View>

{/*cards end*/}

    </View>
    </ScrollView>
    </View>
  )}

</ThemeContext.Consumer>
  )
}

};


/*
// shoutout @notbrent: https://snack.expo.io/H105kxsG7
const shouldShowBackButton = stackRouteNavigation => {
  const parent = stackRouteNavigation.dangerouslyGetParent();
  return parent.state.routes.indexOf(stackRouteNavigation.state) > 0;
};

SettingsScreen.navigationOptions = ({ navigation }) => ({

headerLeft: !shouldShowBackButton(navigation) ? (
  <View style={{ flex: 1 }}>
    <Text>left</Text>
  </View>
) : null,
*/
const styles = StyleSheet.create({
  wrapper: {},
  slide1: {

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    flex:1,
    width: Dimensions.get('window').width-30,

  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    width: Dimensions.get('window').width-30,

    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width-30,

    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})
const styless = StyleSheet.create({
  wrapper: {},
  slide1: {

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    flex:1,

  },
  slide2: {
    flex: 1,
    justifyContent: 'center',

    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})
export default Mybusiness;
