import React from 'react';
import { Image, StatusBar,Text,ImageBackground, View, ScrollView, Dimensions,StyleSheet,TouchableOpacity,Linking,RefreshControl ,ActivityIndicator} from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import { Thumbnail,Button,Header,Item ,Left,Right,Body,Title,Icon,Footer, FooterTab,ScrollableTab,ListItem,List} from 'native-base';
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
import { Input } from 'react-native-elements';

import Swiper from 'react-native-swiper'
import ShowScroller from './showscards'
const headerImage = __DEV__ ? 'rabbitDev' : 'rabbitProd';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Rating, AirbnbRating } from 'react-native-elements';
import MapView from "react-native-maps";
import { Ionicons } from '@expo/vector-icons';
import {  Tab, Tabs } from 'native-base';
import Services from './Services'
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
import Moment from 'moment';

import { ThemeContext } from 'react-navigation';
import { observer,inject } from 'mobx-react'
@inject("appStore") @observer

class BusinessProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      About:'',
      Address:'',
      Available:'',
      Businessname:'',
      Categories:'',
      Do:'',
      business:'',
      daily:[],
      office:'',
      time:'',
      username:'',
      pimg:'',
      backimg:'',
      balance: 0,secret:'',
      status:'',
      isDatePickerVisible: false,
      code:'',
      dataArray: [],
      days:[],
      setDatePickerVisibility: false,
      myuid:'',
      loading: false,
           region: {
             latitude:32.5534246,
             longitude:35.8610753,
             latitudeDelta: 0.001,
             longitudeDelta: 0.001
           },
           reviewsarr:[],
           ratingnum:0,
           review:'',
revstat:'',
avg:0,
friend:false,
           isNavBarHidden: true,
           isMapReady: false,
           marginTop: 1,
           userLocation: "",
           regionChangeProgress: false,
       refreshing: false,
      myusername:'',
       offset: 0,
      posts:[],
    data:  props.navigation.getParam('data',[]),
      businessdata:[],
heart:false,
regions:[],
owner:false,
      Duration:'popular',
      disabled:false,
      check:false,
      card: props.navigation.getParam('card',false),

      carduids: props.navigation.getParam('carduid',''),
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
   this.setState({refreshing: true,firsts:true});
   this.DisplayPosts()

   firebaseApp
     .database()
     .ref('users/'+firebaseApp.auth().currentUser.uid)

     .once("value")
     .then(snapshot => {

this.setState({balance:snapshot.val().balance})
     });
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


this.setState({ dataArray: Object.values(sort),spinner:false,refreshing:false});

    });
console.log(this.state.dataArray);
  }




   handleScroll = (event) => {
     var currentOffset = event.nativeEvent.contentOffset.y;
          var direction = currentOffset > this.state.offset ? 'down' : 'up';
      this.state.offset = currentOffset;
     this.setState({ isNavBarHidden:this.state.offset===0?this.state.isNavBarHidden:!this.state.isNavBarHidden});
   };
   checkrev=(d, userEmail)=> {
     var check_orders = d.filter(order => (order.reviewerid === userEmail));
    if (check_orders.length>0) {
      return true
      console.log("trueeeeee");
    }else {
      console.log("fasdfse");

      return false
    }
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
    if (!this.state.card) {
      firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid).collection('follows').doc(this.state.data.postuid).get()
  .then((docSnapshot) => {
  if (docSnapshot.exists) {
  this.setState({friend:true})

  } else {
  this.setState({friend:false})
  }
  });
  firebaseApp.firestore().collection('Business').doc(this.state.data.postuid).collection('review').onSnapshot(this.Jobsupdate)
}else {

}
if (this.state.card) {
  var ref = firebaseApp.firestore().collection('Business').doc(this.state.carduids).onSnapshot(this.onCollectionUpdate)

}else {
  var ref = firebaseApp.firestore().collection('Business').doc(this.state.data.postuid).onSnapshot(this.onCollectionUpdate)

}
if (this.state.data.writerId===firebaseApp.auth().currentUser.uid) {
  this.setState({owner:true})
}
}
Jobsupdate = (querySnapshot) => {
  const boards = [];
  var total = 0;

  querySnapshot.forEach((doc) => {
    boards.push(doc.data());
    total += doc.data().ratingnum;

  });
  var avg = total / this.state.data.ratingno;
let sort = boards

this.setState({ reviewsarr: Object.values(sort),avg:avg});
}
onCollectionUpdate = (querySnapshot) => {
  const boards = [];

  this.setState({businessdata:querySnapshot.data(),
    data:querySnapshot.data(),
  days:querySnapshot.data().daily,
  regions:querySnapshot.data().region,
})

}


  accepts=async()=>{
this.setState({loading:true})
console.log("sdsdsd  "+this.state.data.postuid);
 firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid).collection('follows').doc(this.state.data.postuid).set({uid:this.state.data.postuid,name:this.state.data.Businessname,category:this.state.data.Categories,catar:this.state.data.catar,type:'business'})
console.log("ffff  "+this.state.data.postuid);

let cityRef = firebaseApp.firestore().collection('Business').doc(this.state.data.postuid)
              try {
      await firebaseApp.firestore().runTransaction(async (t) => {
        const doc = await t.get(cityRef);

        // Add one person to the city population.
        // Note: this could be done without a transaction
        //       by updating the population using FieldValue.increment()
        const newPopulation = doc.data().nofollowers + 1;
        t.update(cityRef, {nofollowers: newPopulation});
      });

      console.log('Transaction success!');
    } catch (e) {
      console.log('Transaction failure:', e);
    }

    await    firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid).collection('follows').doc(this.state.data.postuid).get()
    .then((docSnapshot) => {
    if (docSnapshot.exists) {
    this.setState({friend:true,loading:false})

    } else {
    this.setState({friend:false,loading:false})
    }
    });

                       fetch('https://onesignal.com/api/v1/notifications',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic NWZZmVkNGUtNjNmNC00NGFjLTkwOWUtYTc5NzZhMzg3ZTky",
          },
          body: JSON.stringify(
          {
            app_id: "45117f3a-d813-446a-b656-164bab41bf51",
            included_segments: ["All"],
            headings: {"en": firebaseApp.auth().currentUser.displayName +"Started to follow you","ar":firebaseApp.auth().currentUser.displayName +"قام بمتابعتك" },
            android_sound: "fishing",
            data: {"puid": newPostKey, "new_message":true},
            ios_sound: "fishing.caf",
            contents: {"en": firebaseApp.auth().currentUser.displayName +"Started to follow you","ar": firebaseApp.auth().currentUser.displayName +"قام بمتابعتك" },
         filters: [{"field":"tag","key":"uid","relation":"=","value":this.state.data.postuid}],
       })
     })

     .then((responseData) => {
         console.log("Push POST:" + JSON.stringify(responseData));
         responseData.json()
     })
          //this.notifications(this.state.data.postuid)

   }
   unfollow=async()=>{

     this.setState({loading:true})


     firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid).collection('follows').doc(this.state.data.postuid).delete()
     let cityRef = firebaseApp.firestore().collection('Business').doc(this.state.data.postuid)
                   try {
           await firebaseApp.firestore().runTransaction(async (t) => {
             const doc = await t.get(cityRef);

             // Add one person to the city population.
             // Note: this could be done without a transaction
             //       by updating the population using FieldValue.increment()
             const newPopulation = doc.data().nofollowers - 1;
             t.update(cityRef, {nofollowers: newPopulation});
           });

           console.log('Transaction success!');
         } catch (e) {
           console.log('Transaction failure:', e);
         }
         await    firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid).collection('follows').doc(this.state.data.postuid).get()
         .then((docSnapshot) => {
         if (docSnapshot.exists) {
         this.setState({friend:true,loading:false})

         } else {
         this.setState({friend:false,loading:false})
         }
         });

    }
   notifications=(d)=>{
     const newPostKey = firebaseApp.database().ref('notification').push().key

     firebaseApp.database().ref(`notification/${d}/${newPostKey}`).update({
         username:firebaseApp.auth().currentUser.displayName,
         noti:`${firebaseApp.auth().currentUser.displayName} Started Following you`,
         postuid:'',
         uuid:firebaseApp.auth().currentUser.uid,
           createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: new Date().getTime()+(60*60*48*1000),
         notuid:newPostKey
     });

   }
 ratingCompleted=(rating)=>{
   this.setState({ratingnum:rating})
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
Submitrating = () => {
  this.setState({
    revstat: this.props.appStore.arabic?'':'Rating..',
  })

  const refs = firebaseApp.firestore().collection('Business').doc(this.state.data.postuid).collection('review').doc()
  const newPostKey = refs.id
if (this.state.review.length >0) {
  if (this.state.ratingnum >0) {

        const postData = {
          reviewerid:firebaseApp.auth().currentUser.uid,
          reviewername:firebaseApp.auth().currentUser.displayName,
          orderid:this.state.businessdata.postuid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          postuid:newPostKey,
          comment:this.state.review,
          ratingnum:this.state.ratingnum
        }
        let updates = {}
        refs.set(postData)



        .then(() => {
          this.setState({
                          revstat: 'Thank you',
                          ratingnum:0,
                          review:''
                        })

                        this.inc()


this.setState({shows:false})

        })
        .catch(() => {
          this.setState({ revstat: 'Something went wrong!!!',pcolor:'red' })
        })

      .catch(error => {
        console.log(error)
      })

    } else {

    this.setState({ploading:false,  revstat: this.props.appStore.arabic?'الرجاء التقييم قبل ارسال تعليقك':"Please Rating before you send your comment",shows:true ,pcolor:'red'})
    setTimeout(() => {
    this.setState({shows:false})
    }, 3000)
    }
    } else {

  this.setState({ploading:false,  revstat: this.props.appStore.arabic?'الرجاء كتابة تعليقك':"Please Write your comment",shows:true ,pcolor:'red'})
    setTimeout(() => {
    this.setState({shows:false})
  }, 3000)
}
setTimeout(() => {this.setState({
                revstat: '',

              })}, 4000)

}
inc=async()=>{

console.log("dssdssdsdsdsdsdsdss");


let cityRef = firebaseApp.firestore().collection('Business').doc(this.state.data.postuid)
              try {
      await firebaseApp.firestore().runTransaction(async (t) => {
        const doc = await t.get(cityRef);

        // Add one person to the city population.
        // Note: this could be done without a transaction
        //       by updating the population using FieldValue.increment()
        const newPopulation = doc.data().ratingno + 1;
        t.update(cityRef, {ratingno: newPopulation});
      });

      console.log('Transaction success!');
    } catch (e) {
      console.log('Transaction failure:', e);
    }


}
render(){

  const {navigation}=this.props
  const business = false
  var items =[]
const day=  this.state.days.map((item)=>{
  if (item.selected) {
    items.push(this.props.appStore.arabic?item.ar:item.day)
  }

  })
  return (
    <ThemeContext.Consumer>
      {theme => (
        <View style={{flex:1}}>
<StatusBar hidden={true} />



    <TouchableOpacity style={styless.slide1} >
    <ImageBackground style={{width: Dimensions.get('window').width,flex:1}} source={{uri:this.state.businessdata.backimg}} >
<TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{position: 'absolute',top: 20,left: 20,justifyContent: 'center',alignItems: 'center',borderRadius: 70/2,backgroundColor: 'white',paddingHorizontal: 2}}>
<Ionicons name='ios-close-circle' size={40} color="#000000"/>
</TouchableOpacity>

    </ImageBackground>

    </TouchableOpacity>
    <View style={[styles.cards,{position: 'absolute',top:90,marginTop: 0}]}>
    <View style={cstyles.head}>
<View style={[cstyles.profile]}>
<View style={cstyles.pimg}>
<Thumbnail   borderRadius={9} style={{borderRadius: 9,width: '100%'}} source={{uri:this.state.businessdata.proimg}} />
</View>
<View style={cstyles.names}>
<View style={{flexDirection: 'column',alignItems: 'flex-start'}}>
<Text numberOfLines={2} style={cstyles.name}>{this.state.businessdata.Businessname}</Text>
<Text style={[styles.time,{color:this.state.businessdata.verfied?'green':'#eb144c'}]}  numberOfLines={1}>{this.state.businessdata.verfied?this.props.appStore.arabic?'موثق':'Verfied':this.props.appStore.arabic?'غير موثق':'Not Verfied'}</Text>
<Text style={[styles.time,{color:'#000000'}]}  numberOfLines={1}>{this.state.businessdata.nofollowers} {this.props.appStore.arabic?'متابع':'Followers'}</Text>

</View>
</View>
</View>
</View>
    <View style={cstyles.head}>
<View style={cstyles.profile}>

<View style={cstyles.names}>

{this.state.businessdata.ratingno>0?<Rating imageSize={20} readonly startingValue={this.state.avg} style={styles.rating} />:<Rating imageSize={20} readonly startingValue={0} style={styles.rating} />}
<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',alignSelf: 'flex-start',marginVertical: 5}}>
<View style={{flex:1,flexDirection: 'column'}}>

<Text style={[styles.price,{fontSize: 12,fontFamily: 'ralewaymedium',textAlign: 'left',marginVertical: 5}]}  numberOfLines={2}>{this.props.appStore.arabic?this.state.businessdata.catar:this.state.businessdata.Categories}</Text>

<Text style={[styles.price,{fontSize: 12,fontFamily: 'ralewaysemi',color: '#eb144c',textAlign: 'left'}]}  numberOfLines={2}>{this.state.businessdata.business=="Company"?this.props.appStore.arabic?'شركة':this.state.businessdata.business:this.state.businessdata.business=="Services Provider"?this.props.appStore.arabic?'مزود خدمة':this.state.businessdata.business:this.state.businessdata.business=="Local store"?this.props.appStore.arabic?'متجر محلي':this.state.businessdata.business:this.state.businessdata.business=="Local business"?this.props.appStore.arabic?'مشروع محلي/ شركة محلية':this.state.businessdata.business:this.state.businessdata.business}</Text>

</View>

</View>
</View>
</View>
<View style={cstyles.edit}>
<Button onPress={!this.state.friend?this.accepts:this.unfollow} block style={{backgroundColor: '#eb144c',justifyContent: 'center',alignItems: 'center',padding: 12,alignSelf: 'flex-end',borderRadius: 10}}>
{this.state.loading?<ActivityIndicator color="#fff"/>:<Text style={[styles.time,{color:'#fff'}]}>{this.state.friend?this.props.appStore.arabic?'الغاء متابعة':'Unfollow':this.props.appStore.arabic?'متابعة':'Follow'}</Text>}
</Button>
</View>
    </View>

      </View>

            {/*start of details*/}
            <View style={{
          flex:1,
          marginTop: 140,


        }}>

            <ScrollView  >
            <Tabs renderTabBar={()=> <ScrollableTab />} style={{marginBottom: 10}} tabBarUnderlineStyle={{backgroundColor:'#eb144c'}}>
            <Tab heading={this.props.appStore.arabic?'معلومات':"Info"} textStyle={{color:'black'}} tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color:'#eb144c'}}>
            <View style={{backgroundColor: 'white',width: Dimensions.get('window').width-20,paddingHorizontal: 20,borderRadius: 9,  shadowColor: '#000',
                 shadowOpacity: 0.4,
                 shadowRadius: 3,
          flex:1,
marginTop: 10,
          alignSelf: 'center',
                 shadowOffset: {
                   height: 2,
                   width: 0
                 },
                 //android
                 elevation: 5,}}>
                 <ScrollView
                   contentContainerStyle={[gStyle.contentContainerss,{paddingTop: 10}]}
                   style={gStyle.container[theme]}
                   refreshControl={
                       <RefreshControl
                         refreshing={this.state.refreshing}
                         onRefresh={this._onRefresh}
                         tintColor="#eb144c"
                       />
                     }
                 >

          <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'flex-start',alignSelf: 'flex-start',marginVertical: 5,width: '100%',marginHorizontal: 10}}>

          {business?<MaterialIcons name='business-center' size={15} style={{marginRight: 5}} color="black"/>:<FontAwesome name='map-marker' size={15} style={{marginRight: 5}} color="green"/>}
          {business?<Text style={styles.times}  numberOfLines={1}>dsfsdfdsf</Text>:
          <Text style={styles.time}  numberOfLines={1}>{this.state.businessdata.Address}</Text>
          }

          </View>
          <View style={{flexDirection: 'column',alignItems: 'flex-start',justifyContent: 'center',alignSelf: 'flex-start',marginVertical: 5,width: '100%'}}>
          <View style={{flexDirection: 'row',marginHorizontal: 10,marginVertical: 5}}>
          <MaterialIcons name='today' size={15} style={{marginRight: 5}} color="black"/>

                <Text style={[styles.type,{color:'black'}]}  numberOfLines={2}>{items.toString()}</Text>



          </View>

          {this.state.businessdata.phone?<TouchableOpacity onPress={()=>{Linking.openURL(`tel:${this.state.businessdata.phone}`)}} style={{flexDirection: 'row',marginHorizontal: 10,marginVertical: 5}}>
          <MaterialIcons name='phone' size={15} style={{marginRight: 5}} color="black"/>

          <Text style={[styles.type,{color:'black',textAlign: 'left'}]}  numberOfLines={1}>{this.state.businessdata.phone}</Text>
          </TouchableOpacity>:null}
            {this.state.businessdata.web?  <TouchableOpacity  onPress={()=>{Linking.openURL(`http://${this.state.businessdata.web}`)}} style={{flexDirection: 'row',marginHorizontal: 10,marginVertical: 5}}>
          <FontAwesome name='globe' size={15} style={{marginRight: 5}} color="black"/>

          <Text style={[styles.type,{color:'black',textAlign: 'left'}]}  numberOfLines={1}>{this.state.businessdata.web}</Text>
          </TouchableOpacity>:null}
          {this.state.businessdata.mail?   <TouchableOpacity onPress={()=>{Linking.openURL(`mailto:${this.state.businessdata.mail}`)}} style={{flexDirection: 'row',marginHorizontal: 10,marginVertical: 5}}>
          <Ionicons name='ios-mail' size={15} style={{marginRight: 5}} color="black"/>

          <Text style={[styles.type,{color:'black',textAlign: 'left'}]}  numberOfLines={1}>{this.state.businessdata.mail}</Text>
          </TouchableOpacity>:null}
          {this.state.businessdata.whats?   <TouchableOpacity onPress={()=>{Linking.openURL(`whatsapp://send?text=&phone=${this.state.businessdata.whats}`)}} style={{flexDirection: 'row',marginHorizontal: 10,marginVertical: 5}}>
          <Ionicons name='logo-whatsapp' size={15} style={{marginRight: 5}} color="green"/>

          <Text style={[styles.type,{color:'black',textAlign: 'left'}]}  numberOfLines={1}>{this.state.businessdata.whats}</Text>
          </TouchableOpacity>:null}
          <View style={{flexDirection: 'row',marginHorizontal: 10,marginVertical: 5}}>
          <MaterialIcons name='access-time' size={15} style={{marginRight: 5}} color="black"/>

          <Text style={[styles.type,{color:'black',textAlign: 'left'}]}  numberOfLines={1}>{this.state.businessdata.time?this.state.businessdata.time:'No specific time'} - {this.state.businessdata.time?this.state.businessdata.end:'No specific time'}</Text>
          </View>
          <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around',alignSelf: 'flex-start',marginVertical: 5,width: '100%'}}>
  {this.state.businessdata.facebook&&this.state.businessdata.facebook.length>0? <TouchableOpacity onPress={()=> Linking.openURL(`fb://facewebmodal/f?href=${this.state.businessdata.facebook}`)} style={{backgroundColor: '#fff',flexDirection: 'row',alignItems: 'center'}}>
          <FontAwesome name='facebook-square'  size={20} style={{marginRight: 5}} color="blue"/>

</TouchableOpacity>:null}
        {this.state.businessdata.instagram&&this.state.businessdata.instagram.length>0?   <TouchableOpacity onPress={()=> Linking.openURL(`instagram://user?username=${this.state.businessdata.instagram}`)} style={{backgroundColor: '#fff',flexDirection: 'row',alignItems: 'center'}}>
          <FontAwesome name='instagram' size={20} style={{marginRight: 5}} color="#eb144c"/>
          </TouchableOpacity>:null}
        {this.state.businessdata.twitter&&this.state.businessdata.twitter.length>0?      <TouchableOpacity onPress={()=> Linking.openURL(`${this.state.businessdata.twitter}`)} style={{backgroundColor: '#fff',flexDirection: 'row',alignItems: 'center'}}>
    <FontAwesome name='twitter' size={20} style={{marginRight: 5}} color="#1DA1F2"/>

          </TouchableOpacity>:null}
            {this.state.businessdata.linkedin&&this.state.businessdata.linkedin.length>0?  <TouchableOpacity onPress={()=> Linking.openURL(`${this.state.businessdata.linkedin}`)} style={{backgroundColor: '#fff',flexDirection: 'row',alignItems: 'center'}}>

          <FontAwesome name='linkedin-square' size={20} style={{marginRight: 5}} color="#0e76a8"/>

          </TouchableOpacity>:null}
      {this.state.businessdata.youtube&&this.state.businessdata.youtube.length>0?    <TouchableOpacity onPress={()=> Linking.openURL(`${this.state.businessdata.youtube}`)} style={{backgroundColor: '#fff',flexDirection: 'row',alignItems: 'center'}}>

          <FontAwesome name='youtube' size={20} style={{marginRight: 5}} color="red"/>

          </TouchableOpacity>:null}

          </View>
          </View>

          </ScrollView>

                  </View>
            <View style={styles.cards}>
            <Text style={gStyle.det}>{this.props.appStore.arabic?'تفاصيل وشرح':'Description'}</Text>
              <Text style={gStyle.p}>{this.state.businessdata.About}
          </Text>

              </View>
              <View style={styles.cards}>
              <Text style={[gStyle.det,{
                color:'#eb144c'
              }]}>{this.props.appStore.arabic?'خدمات':'Services'}</Text>

                <Text style={gStyle.p}>

        {this.state.businessdata.Do}
            </Text>

                </View>


              {this.state.regions&&this.state.regions.latitude?    <View style={[styles.cards,{display: "flex",flex:1}]}>
                  <Text style={[gStyle.det]}>{this.props.appStore.arabic?'الموقع':'Location'}</Text>
                  <Text style={[gStyle.det,{marginVertical: 10}]}>{this.state.businessdata.Address}</Text>

                  <MapView
                    style={styles.map}
          region={this.state.regions}
                    showsUserLocation={true}
                  >
                  <MapView.Marker
                   coordinate={{ "latitude": this.state.regions.latitude, "longitude": this.state.regions.longitude }}
                   title={"Service Location"}
                   draggable
                 />
                  </MapView>

                    </View>:null}
                          </Tab>
                          <Tab heading={this.props.appStore.arabic?'العروض':"Offers"} textStyle={{color:'black'}} tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color:'#eb144c'}}>
                          <Services owner={this.state.owner} ar='عروض' navigation={this.props.navigation} postuid={this.state.data.postuid} type="Offers"/>

                          </Tab>
            <Tab heading={this.props.appStore.arabic?'خدمات':"Services"} textStyle={{color:'black'}} tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color:'#eb144c'}}>
            <Services owner={this.state.owner} ar='خدمات' navigation={this.props.navigation} postuid={this.state.data.postuid} type="Services"/>
            </Tab>
            <Tab heading={this.props.appStore.arabic?'وظائف':"Jobs" }textStyle={{color:'black'}} tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color:'#eb144c'}}>
            <Services navigation={this.props.navigation} ar='وظائف' postuid={this.state.data.postuid} type="Jobs"/>

            </Tab>
            <Tab heading={this.props.appStore.arabic?'مقالات':"Articles"} textStyle={{color:'black'}} tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color:'#eb144c'}}>
            <Services navigation={this.props.navigation} ar='مقالات' postuid={this.state.data.postuid} type="Posts"/>

            </Tab>
            <Tab heading={this.props.appStore.arabic?'التقييمات':"Reviews"} textStyle={{color:'black'}} tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color:'#eb144c'}}>
            <View style={{marginVertical: 3,flexDirection: 'column',paddingVertical: 10,flex:1,paddingHorizontal:10,width:Dimensions.get('window').width}}>
            {this.state.revstat.length>0?<View style={{height: 50,width:Dimensions.get('window').width,backgroundColor: this.state.revstat=='Rating..'?'green':this.state.revstat=='Thank you'?'green':'red'}}>
            <Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'flex-start',marginHorizontal: 20,fontFamily: 'cairoreg',color: '#FFF'}]}>{this.state.revstat}</Text>

            </View>:null}
                  <Text style={[gStyle.text[theme], gStyle.Titleleft,{alignSelf: 'flex-start'}]}>{this.props.appStore.arabic?'التقييمات':'Reviews'} ({this.state.businessdata.ratingno})</Text>
                  {this.checkrev(this.state.reviewsarr, firebaseApp.auth().currentUser.uid)?null:<View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
                  <Text style={[gStyle.text[theme], gStyle.Titleleft,{alignSelf: 'flex-start',fontFamily: 'ralewaymedium',fontSize: 15}]}>{this.props.appStore.arabic?'اضف تقييمك':'SUBMIT YOUR RATING'}</Text>
                  <Rating imageSize={20}   onFinishRating={this.ratingCompleted}
                   ratingCount={5}  startingValue={this.state.ratingnum} style={styles.rating} />

                  </View>}
                  {this.checkrev(this.state.reviewsarr, firebaseApp.auth().currentUser.uid)?null:<View style={{flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center'}}>

                  <Input value={this.state.review} onChangeText={(review)=>this.setState({review})} inputStyle={{backgroundColor: '#ffffff',padding: 10,width: '100%'}} containerStyle={{borderRadius: 12}}
                    placeholder={this.props.appStore.arabic?'اكتب هنا رأيك حول الخدمة':"Write here your rating about service"}
                  />
                  <TouchableOpacity onPress={this.Submitrating}>
                  <FontAwesome name='save' size={25} style={{marginRight: 5}} color="black"/>
                  </TouchableOpacity>
                  </View>
                  }
<List>
  {this.state.reviewsarr.length>0&&this.state.reviewsarr.map((d)=>{
    return(<ListItem >

        <Body>
          <Text style={{fontFamily: 'ralewaysemi',fontSize: 15}}>{d.reviewername}</Text>
          <Text style={{fontFamily: 'raleway',marginRight: 10}}>{d.comment}</Text>
        </Body>
        <Right>
        <Rating imageSize={15}   readonly
          startingValue={d.ratingnum} style={styles.rating} />
        </Right>
      </ListItem>)
  })  }
  </List>

            </View>

            </Tab>
          </Tabs>

              </ScrollView>
              </View>

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
  map: {
    width:Dimensions.get('window').width-30,
    height: 200
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
  Title:{
    fontFamily: 'ralewaysemi',
    fontSize: 21,
    textAlign: 'left'
  },
  time:{
    fontFamily: 'ralewaymedium',
    fontSize: 12,
    color:'green',
    textAlign: 'left',
    marginHorizontal: 2
  },
  times:{
    fontFamily: 'ralewaymedium',
    fontSize: 12,
    color:'black',
    marginHorizontal: 2
  },
  price:{
    fontFamily: 'ralewaysemi',
    fontSize: 17,
    color:'black',
marginRight: 5
  },
  type:{
    fontFamily: 'raleway',
    fontSize: 12,
    color:'#eb144c',
    textAlign: 'left',
  },
  cards:{backgroundColor: 'white',width: Dimensions.get('window').width-20,paddingHorizontal: 20,borderRadius: 9,  shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 3,
  paddingVertical: 20,
  flex:1,
  marginTop: 20,
  alignSelf: 'center',
    shadowOffset: {
      height: 1,
      width: 0
    },


    alignItems: 'center',
    justifyContent: 'flex-start',
    //android
    elevation: 2},
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
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').width/2

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
const cstyles = StyleSheet.create({
head:{
  flex:1,
  flexDirection: 'row',
},
profile:{
  flex:7,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center'
},
edit:{
  flex:3,

  justifyContent: 'center',
  alignItems: 'center'
},
edits:{
  flex:2,

  justifyContent: 'center',
  alignItems: 'flex-end'
},
pimg:{
  flex:3,


},
footericon:{
  flex:8,

  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'row'
},
iconname:{
  flex:1,
  flexDirection: 'row',
  justifyContent: 'space-around',

  alignItems: 'center'
},
likesname:{
  flex:1,
  flexDirection: 'row',
  justifyContent: 'flex-start',

  alignItems: 'center'
},
names:{
  flex:8,
  justifyContent: 'space-between',
  alignItems: 'flex-start',
padding: 10,
  flexDirection: 'column'
},
body:{
  paddingVertical: 20,
  flex:1,

},
likes:{
  color:'red',
  marginHorizontal: 10
},
comment:{
  color:'black',
    marginHorizontal: 10
},
name:{
  fontFamily: 'ralewaysemi',
  marginVertical: 2
},
time:{
  fontFamily: 'ralewaymedium',
  fontSize: 12
},
image:{
  width: '100%',
  height: 200,
  resizeMode: 'contain',
  flex:1,
  borderRadius: 40,
  marginTop: 10
}
});
export default BusinessProfile;
