import React from 'react';
import { Image, StatusBar,Text, View, ScrollView,ImageBackground, Dimensions,AsyncStorage,StyleSheet,TouchableOpacity,Linking,RefreshControl,Alert } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle, images,colors } from '../constants';
import { Thumbnail,Button,Header,Item,Input ,Left,Right,Body,Title,Icon,Badge} from 'native-base';
import { firebaseApp } from '../../firebase'
var voucher_codes = require('voucher-code-generator');
import Spinner from 'react-native-loading-spinner-overlay';
import { Form,   } from 'native-base';
import Card from '../components/Card';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { device} from '../constants';
import {  Picker } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import { Divider } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import * as firebase from 'firebase';
const { width } = Dimensions.get("screen");
import Swiper from 'react-native-swiper'
import equal from 'fast-deep-equal'
import Modal from 'react-native-modal';
import Globalmap from '../screens/Globalmap';

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

import { ThemeContext } from 'react-navigation';
import { observer,inject } from 'mobx-react'
@inject("appStore") @observer

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    OneSignal.addEventListener("opened", this.onOpened);

    this.state = {
      balance: 0,secret:'',
      status:'',
      isDatePickerVisible: false,
      code:'',
      dataArray: [],
      setDatePickerVisibility: false,
      myuid:'',
       refreshing: false,
       friendarray:[],
       mapvis:false,
      myusername:'',
      ar:false,
      posts:[],
      friends:[],
      Duration:'date',
      disabled:false,
      userpromo:'',
      reqdata:[],
      load:true,
  not:[],
      check:false,
      Additional: '-------------',
      spinner:false,
    };
    this.currentUserId=''
    this.arrayholder=[]
    this.not=[]
    this.friendsdata=[]
    this.currentusername=''

  }
  onValueChange2(value: string) {
    this.setState({
      Additional: value
    });
  }
  _onRefresh = () => {
   this.setState({refreshing: true});

   this.componentDidMount()

 }
 req=()=>{
   var ref = firebaseApp.database().ref("friendsreq/"+firebaseApp.auth().currentUser.uid); //Here assuming 'Users' as main table of contents

   ref.once('value').then(snapshot => {
       // console.log(snapshot.val());

        // get children as an array
        var items = [];
        friend =[]
        snapshot.forEach((child) => {

if(child.val().accept==false){
 items.push(child.val());
}

       });

       this.setState({ reqdata:Object.values(items),spinner:false});

   });
 }
 onOpened = openResult => {
   console.log("Message: ", openResult.notification.payload.body);
   console.log("Data: ", openResult.notification.payload.additionalData);
   console.log("isActive: ", openResult.notification.isAppInFocus);
   console.log("openResult: ", openResult);
   console.log("title: ", openResult.notification.payload.title);

{openResult.notification.payload.title=="طلب صداقة"?this.props.navigation.navigate('Friends'):openResult.notification.payload.title=="هناك من ارسل لك باب سري"?this._onRefresh(): this.props.navigation.navigate('Notification')}
 };
  onValueChange1(value: string) {
    this.setState({
      Duration: value,
      refreshing:true
    });
    this._onRefresh()
  }
  showDatePicker = () => {
    this.setState({ setDatePickerVisibility: true });
  };
  displayCategories = (d) => {
    this.setState({refreshing:true})

    //console.log("------------uid home ------ "+firebaseApp.auth().currentUser.uid);
    let uid =firebaseApp.auth().currentUser.uid
    //console.log("------------uid uid ------ "+uid);
const refs =`Doors/${uid}`
    var ref = firebaseApp.database().ref(refs);//Here assuming 'Users' as main table of contents

    firebaseApp.database().ref(`Doors/${uid}`).once('value').then(snapshot => {
        // console.log(snapshot.val());
//console.log('lalallaal-----'+snapshot.val());
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



this.setState({ dataArray: Object.values(sort)},function(){this.arrayholder=Object.values(sort)});

    });
//console.log(this.state.dataArray);
  }

_displayfriend =()=>{

  //console.log('ddddddd =====');

  var ref = firebaseApp.database().ref("friends/"+firebaseApp.auth().currentUser.uid); //Here assuming 'Users' as main table of contents

  ref.once('value').then(snapshot => {
      // console.log(snapshot.val());

       // get children as an array
       var items = [];
       friend =[]
       snapshot.forEach((snap) => {
         var item = snap.val();
item.key = snap.key;

items.push(item);

      });
//console.log('friedndsdfsdf ====='+items);
      this.setState({ friendarray: Object.values(items)},function(){this.friendsdata=Object.values(items)});

  });
}
modifyData=(data)=> {
  const  numColumns = 3;
  const addBannerIndex = 6;
  const arr = [];
  var tmp = [];
  data.forEach((val, index) => {
    if (index % numColumns == 0 && index != 0){
      arr.push(tmp);
      tmp = [];
    }
    if (index % addBannerIndex == 0 && index != 0){
      arr.push([{type: 'banner'}]);
      tmp = [];
    }
    tmp.push(val);

  });
  arr.push(tmp);
  return arr;
}

  DisplayPosts = (d) => {
    this.setState({refreshing:true})


    firebaseApp.database().ref(`Posts`).on('value', (snapshot) => {
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

}else {
 sort =items
}
//console.log(sort +'--------------------------------posts');
this.setState({ check:false,disabled:false,posts: Object.values(sort),spinner:false,refreshing:false});

    });
  }



  componentDidMount ()  {
    this.setState({load:true})
    var ref = firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid).collection('follows').onSnapshot(this.follows)

    var ref = firebaseApp.firestore().collection("Posts").orderBy('createdAt','desc')
.onSnapshot(this.onCollectionUpdate)


  };


  onCollectionUpdate = (querySnapshot) => {
    let arr =this.state.friends
    function userExists(username) {
  return arr.some(function(el) {
    return (el.uid === username)||(username===firebaseApp.auth().currentUser.uid);
  });
}
    const boards = [];
    querySnapshot.forEach((doc) => {
      if (userExists(doc.data().writerId)||firebaseApp.auth().currentUser.uid==doc.data().writerId) {
        boards.push(doc.data());

      }
    });
    this.setState({posts:Object.values(boards),load:false,refreshing:false})

  }
  follows = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      boards.push(doc.data());
    });
    this.setState({friends:Object.values(boards)})

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



 clickquiz=(data,lie)=>{

if (this.state.check!=true) {
   this.setState({check:true})
  firebaseApp.database().ref(`Posts/${data.postuid}/liesuser`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).once('value')
          .then((snapshot) => {
            if (snapshot.val()) {



            }
            else{
              firebaseApp.database().ref(`Posts/${data.postuid}/${lie}`).transaction(function(currentClicks) {
              // If node/clicks has never been set, currentRank will be `null`.
              return (currentClicks || 0) + 1;
              })
              let updates = {}
              firebaseApp.database().ref(`Posts/${data.postuid}/liesuser`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)


            }
          })
}

this.props.navigation.navigate('Challenge',{data,myuid:firebaseApp.auth().currentUser.uid })


 }

 onBack() {

   this.setState({refreshing: true});
   this.displayCategories()
   this._displayfriend()
   this.DisplayPosts()

   firebaseApp
     .database()
     .ref('users/'+firebaseApp.auth().currentUser.uid)

     .once("value")
     .then(snapshot => {

this.setState({balance:snapshot.val().balance,refreshing:false})
     });


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
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.user.toUpperCase()}
      ${item.title.toUpperCase()}   ${item.firstdoor.toUpperCase()} ${item.seconddoor.toUpperCase()}`;

       const textData = text.toUpperCase();

       return itemData.indexOf(textData) > -1;
    });

    this.setState({ dataArray: newData });
  };
  isInArray=(d, userEmail)=> {
  var idx= d.indexOf(userEmail);
  if (idx === -1) {
  return  false
  }else {
  return  true
  }
    }
  onLike = (data,d,liked) => {
    liked.push(firebaseApp.auth().currentUser.uid)
    firebaseApp.firestore().collection('Posts').doc(data.postuid).update({nooflike:liked})
const newPostKey = firebaseApp.database().ref('like').push().key
this.notification(data.writerId,data.postuid,data.post)

  fetch('https://onesignal.com/api/v1/notifications',
   {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': "Basic YWI3MThjYmUtOWU1Zi00MGEwLTkwMDItYzFjZTlkODQzNzk0",
     },
     body: JSON.stringify(
     {
       app_id: "4ab98c66-d9e7-4978-ac18-466ec800dbc3",
       included_segments: ["All"],
       headings: {"en": `${firebaseApp.auth().currentUser.displayName} Liked your post`,"ar":`${firebaseApp.auth().currentUser.displayName} اعجب بمنشورك`},
       android_sound: "fishing",
       data: {"puid": newPostKey, "new_message":true},
       ios_sound: "fishing.caf",
       contents: {"en": `${firebaseApp.auth().currentUser.displayName} Liked your post: ${data.post}`,"ar":`${firebaseApp.auth().currentUser.displayName} اعجب بمنشورك: ${data.post}` },
filters: [{"field":"tag","key":"uid","relation":"=","value":data.writerId}],
     })
   })

   .then((responseData) => {
       console.log("Push POST:" + JSON.stringify(responseData));
       responseData.json()
   })
};
notification=(d,notkey,post)=>{
  const newPostKey = firebaseApp.database().ref('like').push().key
  firebaseApp.firestore().collection('notification').doc(d).collection('List').doc().set({
      username:firebaseApp.auth().currentUser.displayName,
      noti:`${firebaseApp.auth().currentUser.displayName} Liked your post: ${post}`,
      notiar:`${firebaseApp.auth().currentUser.displayName} اعجب بمنشورك: ${post}`,

      postuid:notkey,
      type:'like',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
     updatedAt:firebase.firestore.FieldValue.serverTimestamp(),
  })


}


delnotification=(d,notkey,post)=>{
  const newPostKey = firebaseApp.database().ref('like').push().key
  firebaseApp.firestore().collection('notification').doc(d).collection('List').doc('MbkG5dpNIHFL7EatYWhU').delete()


}
 onUnlike = (data,d,liked) => {
   let idx =liked.indexOf(firebaseApp.auth().currentUser.uid)
   liked.splice(idx, 1)
   firebaseApp.firestore().collection('Posts').doc(data.postuid).update({nooflike:liked})

   //this.delnotification(data.writerId,data.postuid,data.post)


};

render(){



  const {navigation}=this.props
  return (
    <ThemeContext.Consumer>
      {theme => (
        <View style={{flex:1}}>
        <Spinner
               visible={this.state.spinner}
              textContent={'جاري التحميل...'}
               textStyle={{color:'#fff'}}
             />
<StatusBar hidden={true} />
        <Header searchBar rounded style={{width: width,backgroundColor: gStyle.container[theme].backgroundColor}}>
        <Left>
                   <Button transparent onPress={()=>navigation.navigate('Share',{arabic:this.props.appStore.arabic})}>
                   <FontAwesome name={'share-square-o'} size={25} color={'black'} />

                   </Button>
                 </Left>
                 <Body>
<TouchableOpacity onPress={()=>this.setState({mapvis:true})} style={{flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center'}}>

<Icon active type="MaterialCommunityIcons" name='map-marker-outline' color="#eb144c" style={{color: '#eb144c',marginRight: 15}}/>
<Text style={{fontFamily: 'ralewaysemi'}} numberOfLines={1}>{this.props.appStore.address}</Text>

</TouchableOpacity>
                 </Body>
                 <Right>


                   <Button transparent>
                   <MaterialCommunityIcons name={'map-search-outline'} onPress={()=>navigation.navigate('Nearby',{})} size={25} color={'black'} />
                   </Button>

                   <Button onPress={()=>navigation.navigate('Friends',{})} transparent style={{justifyContent: 'center',alignItems: 'center'}} >
                   {this.state.reqdata.length>0? <Badge style={{ backgroundColor: '#eb144c',position: 'relative',alignItems: 'center',justifyContent: 'center'}}>
            <Text style={{color: 'white'}}>{this.state.reqdata.length}</Text>
          </Badge>:<MaterialCommunityIcons name={'account-heart'} size={25} color={'black'} />}

                   </Button>
                 </Right>
    </Header>

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






<View style={{paddingHorizontal: 20,height:150,marginTop: 15}}>
    <Swiper  containerStyle={{alignSelf: 'center'}} bounces={true} scrollEnabled style={[styles.wrapper]} showsPagination={true} autoplay height={150}>
           <TouchableOpacity style={[styles.slide1]} onPress={()=>alert(this.props.appStore.arabic?'قريبا..':'Coming soon!')}>
           <ImageBackground style={{width: Dimensions.get('window').width-20,flex:1,resizeMode: 'cover'}} source={{uri:'https://i.ibb.co/N3khdDF/drew-graham-PVyhz0wm-Hdo-unsplash.jpg'}} >
    <LinearGradient
             colors={['rgba(74,144,226,43)','rgba(0,0,0,0.1)']}
             style={{  alignItems: 'center',   width: Dimensions.get('window').width-20,height: '100%',justifyContent: 'center'}}>

           <Text
             style={{
               backgroundColor: 'transparent',
               fontSize: 17,
               color: '#fff',

               fontWeight: '500',

               alignSelf: 'center',textAlign: 'center',
               fontFamily: 'ralewaysemi'
             }}>
            {this.props.appStore.arabic?'اكتشف مواهب جديدة':'Discover New Talented people'}
           </Text>
           <View style={{borderRadius: 5,padding: 15, marginVertical: 10,justifyContent: 'center',alignItems: 'center',borderWidth: 1,borderColor: 'white',borderRadius: 10}}>
           <Text
             style={{
               backgroundColor: 'transparent',
               fontSize: 15,
               color: '#fff',

               fontWeight: '500',

               alignSelf: 'center',textAlign: 'center',
               fontFamily: 'ralewaysemi'
             }}>
            {this.props.appStore.arabic?'اكتشف':'Discover'}
           </Text>
           </View>
           </LinearGradient>
    </ImageBackground>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>navigation.navigate('Listing',{dataname:'Jobs'})} style={[styles.slide2]}>
           <ImageBackground style={{width: Dimensions.get('window').width-20,flex:1,resizeMode: 'cover'}} source={{uri:'https://i.ibb.co/rZZCtm2/close-up-of-human-hand-327540.jpg'}} >
    <LinearGradient
             colors={['rgba(144,164,174,70)','rgba(0,0,0,0.1)']}
             style={{  alignItems: 'center', width: Dimensions.get('window').width-20,height: '100%',justifyContent: 'center'}}>

           <Text
             style={{
               backgroundColor: 'transparent',
               fontSize: 17,
               color: '#fff',

               fontWeight: '500',

               alignSelf: 'center',textAlign: 'center',
               fontFamily: 'ralewaysemi'
             }}>
            {this.props.appStore.arabic?'هل تبحث عن عمل؟':' Looking For a job?'}
           </Text>
           <View style={{borderRadius: 5,padding: 15, marginVertical: 10,justifyContent: 'center',alignItems: 'center',borderWidth: 1,borderColor: 'white'}}>
           <Text
             style={{
               backgroundColor: 'transparent',
               fontSize: 15,
               color: '#fff',

               fontWeight: '500',

               alignSelf: 'center',textAlign: 'center',
               fontFamily: 'ralewaysemi'
             }}>
            {this.props.appStore.arabic?'اكتشف وظيفتك المناسبة':'Discover your next Job'}
           </Text>
           </View>
           </LinearGradient>
    </ImageBackground>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>navigation.navigate('Share')} style={[styles.slide3]}>
           <ImageBackground style={{width: Dimensions.get('window').width-20,flex:1,resizeMode: 'cover'}} source={{uri:'https://i.ibb.co/XxSkYbK/kelly-sikkema-XX2-WTb-Lr3r8-unsplash.jpg'}} >
    <LinearGradient
             colors={['rgba(208,2,27,70)','rgba(0,0,0,0.1)']}
             style={{  alignItems: 'center',  width: Dimensions.get('window').width-20,height: '100%',justifyContent: 'center'}}>

           <Text
             style={{
               backgroundColor: 'transparent',
               fontSize: 17,
               color: '#fff',

               fontWeight: '500',

               alignSelf: 'center',textAlign: 'center',
               fontFamily: 'ralewaysemi'
             }}>
            {this.props.appStore.arabic?'شارك واكسب':'Share & Earn'}
           </Text>
           <View style={{borderRadius: 5,padding: 15, marginVertical: 10,justifyContent: 'center',alignItems: 'center',borderWidth: 1,borderColor: 'white'}}>
           <Text
             style={{
               backgroundColor: 'transparent',
               fontSize: 15,
               color: '#fff',

               fontWeight: '500',

               alignSelf: 'center',textAlign: 'center',
               fontFamily: 'ralewaysemi'
             }}>
            {this.props.appStore.arabic?'شارك التطبيق مع اصدقائك واكسب نقاط':'Share app with your friend & Earn'}
           </Text>
           </View>
           </LinearGradient>
    </ImageBackground>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>navigation.navigate('NewBusiness')} style={[styles.slide3]}>
           <ImageBackground style={{width: Dimensions.get('window').width-20,flex:1,resizeMode: 'cover'}} source={{uri:'https://i.ibb.co/8gBT3rG/hunters-race-MYbh-N8-Kaa-Ec-unsplash.jpg'}} >
          <LinearGradient
             colors={['rgba(74,74,74,70)','rgba(0,0,0,0.1)']}
             style={{  alignItems: 'center',  width: Dimensions.get('window').width-20,height: '100%',justifyContent: 'center'}}>

           <Text
             style={{
               backgroundColor: 'transparent',
               fontSize: 17,
               color: '#fff',

               fontWeight: '500',

               alignSelf: 'center',textAlign: 'center',
               fontFamily: 'ralewaysemi'
             }}>
            {this.props.appStore.arabic?'ابدأ مشروعك الخاص':'Start New Business'}
           </Text>
           <View style={{borderRadius: 5,padding: 15, marginVertical: 10,justifyContent: 'center',alignItems: 'center',borderWidth: 1,borderColor: 'white'}}>
           <Text
             style={{
               backgroundColor: 'transparent',
               fontSize: 15,
               color: '#fff',

               fontWeight: '500',

               alignSelf: 'center',textAlign: 'center',
               fontFamily: 'ralewaysemi'
             }}>
            {this.props.appStore.arabic?'اعرض خدماتك ومهاراتك الخاصة':'Offer your skills & Services'}
           </Text>
           </View>
           </LinearGradient>
          </ImageBackground>
           </TouchableOpacity>
         </Swiper>
</View>
<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginTop: 10}}>



</ScrollView>
<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
<View style={{flex:1,flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
{[{img:'https://i.ibb.co/9cmJgt2/business-and-trade.png',title:this.props.appStore.arabic?'شركات ومتاجر':'Business',val:'Business',color:['#eb144c','rgba(244, 115, 115, 58)']},{img:'https://i.ibb.co/9p9K9t9/businessman-1.png',title:this.props.appStore.arabic?'وظائف':'Jobs',val:'Jobs',color:['#4a90e2','rgba(44, 204, 228, 43)']},{img:'https://i.ibb.co/stKLhQp/support.png',title:this.props.appStore.arabic?'خدمات':'Services',val:'Services',color:['#9900ef','rgba(153, 0, 239, 54)']},{img:'https://i.ibb.co/j5PHYZ9/sale.png',title:this.props.appStore.arabic?'عروض':'Offers',val:'Offers',color:['#eb144c','rgba(233, 30, 99, 58)']},{img:'https://i.ibb.co/6P63j75/marker.png',title:this.props.appStore.arabic?'القريب مني':'Nearby',val:'Nearby',color:['#00d084','#009688']},{img:'https://i.ibb.co/yXZ5b22/shop.png',title:this.props.appStore.arabic?'متاجر':'Stores',color:['#fcb900','#ff8a65']}].map((data, index) => {




  return(
  <LinearGradient
           colors={data.color}
           style={{ marginVertical: 10, alignItems: 'center',marginHorizontal: 7, borderRadius: 5, paddingHorizontal: 10,height: 80,justifyContent: 'center',borderRadius: 10}}>
           <TouchableOpacity onPress={data.title=='Nearby'||data.title=='القريب مني'?()=>navigation.navigate('Nearby',{}):data.title=='Stores'||data.title=='متاجر'?()=>alert(this.props.appStore.arabic?'قريبا':'not implemented yet'):()=>navigation.navigate('Listing',{dataname:data.val})} style={{flexDirection: 'column'}}>
           <Image style={{height: 30,width: 30,resizeMode: 'contain',marginHorizontal: 5}} source={{uri:data.img}} />

           <Text
             style={{
               backgroundColor: 'transparent',
               fontSize: 15,
               color: '#fff',
               fontWeight: '500',
marginVertical: 5,
               alignSelf: 'center',textAlign: 'center',
               fontFamily: 'ralewaysemi'
             }}>
             {data.title}
           </Text>

           </TouchableOpacity>
         </LinearGradient>
  )
})}
</View>
</ScrollView>
<View
  style={{
    borderBottomColor: '#dddddd',
    borderBottomWidth: 0,marginVertical: 10,
    width:Dimensions.get('window').width
  }}
/>
<View style={{justifyContent: 'space-between',paddingHorizontal: 10,alignItems: 'center',flexDirection: 'row',width:Dimensions.get('window').width-10}}>
<View style={{justifyContent: 'flex-start',alignItems: 'center',flex:1}}>
      <Text style={[gStyle.text[theme], gStyle.Titleleft,{alignSelf: 'flex-start',marginHorizontal: 10}]}>{this.props.appStore.arabic?'المنشورات':'Posts'}</Text>
</View>

</View>
      <ScrollView
        showsHorizontalScrollIndicator={false}

        style={{ paddingVertical: 10 }}
      >
      <Button
iconLeft
        bordered
        danger
onPress={()=>navigation.navigate('New')}
        style={{width:Dimensions.get('window').width-20,alignSelf: 'center', justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5,borderColor: '#eb144c'}}
      >
        <MaterialCommunityIcons name='feather' size={35} color="#eb144c"/>
        <Text style={[gStyle.button,{color:'#eb144c'}]}>{this.props.appStore.arabic?'اضف منشور جديد':'Add new Post'}</Text>
      </Button>
{this.state.posts.map((d,index)=>{
  let userEmail = firebaseApp.auth().currentUser.uid;
  let  liked = d.nooflike ? Object.values(d.nooflike) : [];
      if (index==2) {
    return (   <View>
      <Card
  navigation={this.props.navigation}
        image={require('../assets/logo.png')}
        pimg={{uri:d.proimg}}
  data={d}
  arabic={this.props.appStore.arabic}
  onLike={this.isInArray(liked, userEmail)?()=>this.onUnlike(d,'likedby',liked):()=>this.onLike(d,'likedby',liked)}
  heartname={this.isInArray(liked, userEmail)?'heart':'heart-outline'}
        show={false}
        body={d.post}
  name={d.user}

      />
        <TouchableOpacity style={[styles.slide1],{height: 150,marginVertical: 10,alignSelf: 'center',borderRadius: 16}} onPress={()=>navigation.navigate('Ask')}>
         <ImageBackground style={{width: Dimensions.get('window').width-20,flex:1,resizeMode: 'cover',borderRadius: 12}} source={{uri:'https://i.ibb.co/ZzyP75f/explosion-fire-smoke-dance-50650.jpg'}} >
  <LinearGradient
           colors={['rgba(74,144,226,43)','rgba(0,0,0,0.1)']}
           style={{  alignItems: 'center',   width: Dimensions.get('window').width-20,height: '100%',justifyContent: 'center'}}>

         <Text
           style={{
             backgroundColor: 'transparent',
             fontSize: 17,
             color: '#fff',

             fontWeight: '500',

             alignSelf: 'center',textAlign: 'center',
             fontFamily: 'ralewaysemi'
           }}>
          Discover New Talented people
         </Text>
         <View style={{borderRadius: 5,padding: 15, marginVertical: 10,justifyContent: 'center',alignItems: 'center',borderWidth: 1,borderColor: 'white',borderRadius: 10}}>
         <Text
           style={{
             backgroundColor: 'transparent',
             fontSize: 15,
             color: '#fff',

             fontWeight: '500',

             alignSelf: 'center',textAlign: 'center',
             fontFamily: 'ralewaysemi'
           }}>
          Discover
         </Text>
         </View>
         </LinearGradient>
  </ImageBackground>
         </TouchableOpacity>
</View>
       )
  }
  return(
    <Card
navigation={this.props.navigation}
      image={require('../assets/logo.png')}
      pimg={{uri:d.proimg}}
data={d}
arabic={this.props.appStore.arabic}

onLike={this.isInArray(liked, userEmail)?()=>this.onUnlike(d,'likedby',liked):()=>this.onLike(d,'likedby',liked)}
heartname={this.isInArray(liked, userEmail)?'heart':'heart-outline'}
      show={false}
      body={d.post}
name={d.user}

    />
  )
})}

      </ScrollView>
  {/*    <View style={{justifyContent: 'flex-start',alignItems: 'center',flexDirection: 'row',width:Dimensions.get('window').width-20}}>
      <View style={{justifyContent: 'center',alignItems: 'center',flex:1}}>
            <Text style={[gStyle.text[theme], gStyle.Titleleft,{alignSelf: 'flex-start'}]}>Top Local</Text>
      </View>
      </View>*/}
    {/*  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginTop: 10}}>
      {offers.map((data, index) => {




        return(


            <Carousel

              imageSrc={{uri:data.img}}
              data={data}
              title={data.type}
              user={data.name}

            />

        )

      })}


      </ScrollView>*/}


{this.state.posts.length ===0&&this.state.load?   <View style={{justifyContent: 'center',alignItems: 'center',flex: 1}}>
    <Image source={{uri:'https://i.pinimg.com/originals/ec/d6/bc/ecd6bc09da634e4e2efa16b571618a22.gif'}} style={{height:100,width:100}} />


    </View>
    :this.state.posts.length ===0&&(!this.state.load)?
  <View
    style={{
      flex: 1,
      padding: 20,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',

    }}
  >
  <Text style={[gStyle.button,gStyle.text[theme]]}>No post yet</Text>


  </View>
:null}
      <Text
        style={[
          gStyle.text[theme],
          gStyle.textPacifico,
          { alignSelf: 'center' }
        ]}
      >
        Design By Opentiq
      </Text>
    </ScrollView>
    <Modal isVisible={this.state.mapvis}>
       <Globalmap close={()=>this.setState({mapvis:false})} navigation={navigation} arabic={this.props.appStore.arabic}/>
     </Modal>
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
  height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',

    width: '100%',

  },
  slide2: {
  height: '100%',
    justifyContent: 'center',
    width: '100%',

    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',

    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})
export default HomeScreen;
