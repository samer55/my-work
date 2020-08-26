import React from 'react';
import { Image, StatusBar,Text,ImageBackground, View, ScrollView, Animated,Dimensions,StyleSheet,ActivityIndicator,TouchableOpacity,Linking,RefreshControl } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import { Thumbnail,Button,Header,Item,Input ,Left,Right,Body,Title,Icon,Label,Textarea} from 'native-base';
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
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Rating, AirbnbRating } from 'react-native-elements';
import MapView from "react-native-maps";
import { Ionicons } from '@expo/vector-icons';
import SwipeablePanel from 'rn-swipeable-panel';
import * as ImagePicker from 'expo-image-picker';
import DocumentPicker from 'react-native-document-picker';

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
import uuid from 'uuid';
import { ImageBrowser } from 'expo-image-picker-multiple';

import { ThemeContext } from 'react-navigation';
async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebaseApp
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

import { observer,inject } from 'mobx-react'
@inject("appStore") @observer

class Job extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      balance: 0,secret:'',
      nameto:firebaseApp.auth().currentUser.displayName,
      phoneto:0,
      mailto:'',
      cityto:'',
      exto:'',
      cvto:'',
      cvname:'',
      status:'',
      isDatePickerVisible: false,
      code:'',
      dataArray: [],
      setDatePickerVisibility: false,
      myuid:'',
      postStatus:'',
      loading: true,userdat:[],
      regions:[],
      list:[],
           region: {
             latitude:32.5534246,
             longitude:35.8610753,
             latitudeDelta: 0.001,
             longitudeDelta: 0.001
           },
  data:  props.navigation.getParam('data',[]),
           isNavBarHidden: true,
           isMapReady: false,
           marginTop: 1,
           userLocation: "",
           regionChangeProgress: false,
       refreshing: false,
      myusername:'',
      ratingav:0,
       offset: 0,
      posts:[],
      daysweek:[],
      image:'',
heart:false,
scrollY: new Animated.Value(0)
,
swipeablePanelActive: false,

      Duration:'popular',
      disabled:false,
      check:false,
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
 openPanel = () => {
     this.setState({ swipeablePanelActive: true });
 };

 closePanel = () => {
     this.setState({ swipeablePanelActive: false });
 };
 _pickImage = async () => {

    const res = await DocumentPicker.pick({
    type: [DocumentPicker.types.allFiles],
    //There can me more options as well
    // DocumentPicker.types.allFiles
    // DocumentPicker.types.images
    // DocumentPicker.types.plainText
    // DocumentPicker.types.audio
    // DocumentPicker.types.pdf
  });
    this._handleImagePicked(res);
  };
  onAddItem = (s) => {
     this.setState(state => {
       const list = [...state.list, s];

       return {
         list,

       };
     });
   };
_handleImagePicked = async pickerResult => {
    try {
      this.setState({uploading:true})

    this.setState({status:'Loading image..',refreshing:true})
      if (!pickerResult.cancelled) {

        //  this.setState({image:await uploadImageAsync(pickerResult.uri)})
        this.setState({cvto:await uploadImageAsync(pickerResult.uri),cvname:pickerResult.name})
      }
        console.log("state ===="+image);
    } catch (e) {
      console.log(e);
      this.setState({status:'Something went wrong',refreshing:false})

    } finally {
      this.setState({uploading:false,refreshing:false})
      this.setState({status:''})


    }
  };

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
  busindata = (querySnapshot) => {
    const boards = [];

    this.setState({
    userdat:querySnapshot.data(),
    daysweek:querySnapshot.data().day?querySnapshot.data().day:querySnapshot.data().daily,
  })

  }
  onCollectionUpdate = (querySnapshot) => {
    const boards = [];

    this.setState({
    regions:querySnapshot.data().region,
  })

  }
  componentDidMount() {
    firebaseApp.firestore().collection('Jobs').doc(this.state.data.postuid).onSnapshot(this.onCollectionUpdate)
    firebaseApp.firestore().collection('users').doc(this.state.data.writerId).get()
.then((docSnapshot) => {
if (docSnapshot.exists) {
  firebaseApp.firestore().collection('profiles').doc(this.state.data.writerId).onSnapshot(this.busindata)

} else {
  firebaseApp.firestore().collection('Business').doc(this.state.data.writerId).onSnapshot(this.busindata)
}
});




}
notification=(d,notkey,post)=>{
  console.log(d+'  //  '+notkey+'  //  '+post);
  const newPostKey = firebaseApp.database().ref('like').push().key
  firebaseApp.firestore().collection('notification').doc(d).collection('List').doc().set({
      username:firebaseApp.auth().currentUser.displayName,
      noti:`${firebaseApp.auth().currentUser.displayName} Applied to your Job: ${post}`,
        notiar:`${firebaseApp.auth().currentUser.displayName} قدم طلبا للوظيفة: ${post}`,
      postuid:notkey,
      type:'order',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
     updatedAt:firebase.firestore.FieldValue.serverTimestamp(),
  })


}
booking = () => {
  this.setState({
    ploading:true,
    postStatus: this.props.appStore.arabic?'تقديم..':'Applying..',
    spinner:true,
    shows:true,pcolor:'warning'
  })
  const refs = firebaseApp.firestore().collection('Orders').doc()

  const newPostKey = refs.id
if (this.state.nameto.length >0) {
if (this.state.phoneto >0) {
  if (this.state.mailto.length >0) {
    if (this.state.cityto.length >0) {
      if (this.state.exto.length >0||this.state.list.length >0) {

        const postData = {
          customeruid:firebaseApp.auth().currentUser.uid,
          Jobtitle:this.state.data.Htitle,
          customername:this.state.nameto,
          ciry:this.state.cityto,
          workex:this.state.exto,
          phone:this.state.phoneto,
          Status:'Pending',
          mailto:this.state.mailto,
          cvto:this.state.cvto,
          type:'Jobs',
          orderid:this.state.data.postuid,
          Customerimg:firebaseApp.auth().currentUser.photoURL,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          postuid:newPostKey,
          provname:this.state.data.user,

Provideruid:this.state.data.writerId
        }
        let updates = {}
        let updatess = {}


          //  updates["data/"+newPostKey+'/name'] =state.tag
  //       firebaseApp.database().ref('tags').set(this.state.tags.tagsArray)

  refs.set(postData)

        .then(() => {

          this.setState({
                          postStatus: this.props.appStore.arabic?'شكرا لك':'Thank you',
                          title:'',
                          lovemsg:'',
                          spinner:false,
                          hatemsg:'',
show:true,swipeablePanelActive:false
                        })
this.setState({shows:false})
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
     headings: {"en": `${firebaseApp.auth().currentUser.displayName} Applied to your job position`,"ar":`${firebaseApp.auth().currentUser.displayName} قدم طلب توظيف لديك`},
     android_sound: "fishing",
     data: {"puid": newPostKey, "new_message":true},
     ios_sound: "fishing.caf",
     contents: {"en": `${firebaseApp.auth().currentUser.displayName} Applied to your job position:
     ${this.state.data.Htitle}`,"ar": `${firebaseApp.auth().currentUser.displayName} قدم طلب توظيف :
     ${this.state.data.Htitle}`},
filters: [{"field":"tag","key":"uid","relation":"=","value":this.state.data.writerId}],
   })
 })
this.notification(this.state.data.writerId,this.state.data.postuid,this.state.data.Htitle)


        })
        .catch(() => {
          this.setState({ postStatus: 'Something went wrong!!!',pcolor:'red' })
        })

      .catch(error => {
        console.log(error)
      })

} else {

this.setState({ploading:false, spinner:false, postStatus: this.props.appStore.arabic?'الرجاء تحميل صورة السيرة الذاتية او كتابة خبراتك في العمل':"Please Upload your cv resumes or enter your work experience",shows:true ,pcolor:'red'})
setTimeout(() => {
this.setState({shows:false})
}, 3000)
}
} else {

this.setState({ploading:false, spinner:false, postStatus: this.props.appStore.arabic?'الرجاء ادخال المدينة':"Please enter city you live in",shows:true ,pcolor:'red'})
setTimeout(() => {
this.setState({shows:false})
}, 3000)
}
    } else {

  this.setState({ploading:false, spinner:false, postStatus:this.props.appStore.arabic?'الرجاء ادخال البريد الالكتروني': "Please enter email to contact",shows:true ,pcolor:'red'})
    setTimeout(() => {
    this.setState({shows:false})
  }, 3000)
  }
    } else {

  this.setState({ploading:false, spinner:false, postStatus: this.props.appStore.arabic?'الرجاء كتابة رقم الهاتف':"Please enter Phone number to contact",shows:true ,pcolor:'red'})
    setTimeout(() => {
    this.setState({shows:false})
  }, 3000)
  }
    } else {

  this.setState({ploading:false, spinner:false, postStatus: this.props.appStore.arabic?'الرجاء ادخال رقم الهاتف':"Please enter Your full name",shows:true ,pcolor:'red'})
    setTimeout(() => {
    this.setState({shows:false})
  }, 3000)
}


}

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










 onBack() {
   this.setState({spinner:true})
   this.displayCategories(this.state.myuid)

     // Back from another screen
   }
   onRemoveItem = i => {
     this.setState(state => {
       const list = state.list.filter((item, j) => i !== j);

       return {
         list,
       };
     });
   };
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

 onUnlike = (data,d) => {
  let ref = firebaseApp.database().ref('Posts').child(data.postuid).child(d);
    ref.orderByChild('likedby').equalTo(firebaseApp.auth().currentUser.email).once('value', snapshot => {
      let updates = {};
      snapshot.forEach(child => updates[child.key] = null);
      ref.update(updates);
  });
};
render(){
  var items =[]
  const daysf =this.state.daysweek
  const day=  daysf&&daysf.map((item)=>{
    if (item.selected) {
      items.push(this.props.appStore.arabic?item.ar:item.day)
    }

    })
  const {navigation}=this.props
  const business = false
  return (
    <ThemeContext.Consumer>
      {theme => (
        <View style={{flex:1}}>

<StatusBar hidden={true} />

<ScrollView style={{flex:1}}>
    <TouchableOpacity style={styless.slide1} >
    <ImageBackground style={{width: Dimensions.get('window').width,flex:1}} source={{uri:this.state.data.backimg}} >
<TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{position: 'absolute',top: 20,left: 20,justifyContent: 'center',alignItems: 'center',borderRadius: 70/2,backgroundColor: 'white',paddingHorizontal: 2}}>
<Ionicons name='ios-close-circle' size={40} color="#000000"/>
</TouchableOpacity>

    </ImageBackground>

    </TouchableOpacity>
      {this.state.isNavBarHidden?   <View style={{position: 'absolute',top:120,backgroundColor: 'white',width: Dimensions.get('window').width-20,paddingHorizontal: 20,borderRadius: 9,  shadowColor: '#000',
           shadowOpacity: 0.4,
           shadowRadius: 3,
flex:1,
marginBottom:40,
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
<Text style={styles.Title}>{this.state.data.Htitle}</Text>
<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around',alignSelf: 'flex-start',marginVertical: 5}}>
<View style={{flex:1,flexDirection: 'row'}}>
{business?<MaterialIcons name='business-center' size={15} style={{marginRight: 5}} color="black"/>:null}
{business?<Text style={styles.times}  numberOfLines={1}>dsfsdfdsf</Text>:
<Text style={[styles.price,{fontSize: 13,fontFamily: 'ralewaymedium',textAlign: 'center'}]}  numberOfLines={2}>{this.props.appStore.arabic?this.state.data.catar:this.state.data.Categories}</Text>
}
</View>
<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
<Text style={[styles.price]}  numberOfLines={1}>|</Text>

<Text style={[styles.price,{fontFamily: 'raleway'}]}  numberOfLines={1}>{this.state.data.mprice} - {this.state.data.hprice}{this.state.data.curr} /{this.state.data.pperiod=='Monthly'?this.props.appStore.arabic?'شهر':this.state.data.pperiod:this.state.data.pperiod=='Weekly'?this.props.appStore.arabic?'اسبوع':this.state.data.pperiod:this.state.data.pperiod=='Daily'?this.props.appStore.arabic?'يوم':this.state.data.pperiod:this.state.data.pperiod=='Hourly'?this.props.appStore.arabic?'الساعة':this.state.data.pperiod:this.state.data.pperiod}</Text>
</View>
</View>

<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around',alignSelf: 'flex-start',marginVertical: 5}}>

<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>

<Text style={[styles.price,{fontSize: 14,fontFamily: 'raleway'}]}  numberOfLines={1}>{this.state.data.type=='local'?this.props.appStore.arabic?'محلي':'Local':this.state.data.type=='Special'?this.props.appStore.arabic?'خاص':'Special':this.state.data.type=='online'?this.props.appStore.arabic?'اونلاين':'Online':this.state.data.type} </Text>
</View>
<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
<Text style={[styles.price,{fontSize: 10}]}  numberOfLines={1}>|</Text>

<Text style={[styles.price,{fontSize: 14,fontFamily: 'raleway'}]}  numberOfLines={1}>{this.state.data.Availablility=='Freelancer'?this.props.appStore.arabic?'عمل حر':this.state.data.Availablility:this.state.data.Availablility=='Working from home'?this.props.appStore.arabic?'عمل من المنزل':"Working from home":this.state.data.Availablility=='Part time job'?this.props.appStore.arabic?'عمل بدوام جزئي':"Part time job":this.state.data.Availablility=='Full time job'?this.props.appStore.arabic?'عمل بدوام كامل':"Full time job":
this.state.data.Availablility=='one time job'?this.props.appStore.arabic?'عمل لمرة واحدة':"one time job":this.state.data.Availablility}
</Text>
</View>
<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
<Text style={[styles.price,{fontSize: 10}]}  numberOfLines={1}>|</Text>

<Text style={[styles.price,{fontSize: 14,fontFamily: 'raleway'}]}  numberOfLines={1}>{this.state.data.yearsofx} {this.props.appStore.arabic?'سنة خبرة':'Years of exp'}</Text>
</View>
</View>

</ScrollView>
            </View>:null}
            {/*start of details*/}
            <View style={{
          flex:1,
          marginTop: 100,


        }}>


            <View style={styles.cards}>
            <Text style={gStyle.det}>{this.props.appStore.arabic?'شرح':'Description'}</Text>
              <Text style={gStyle.p}>{this.state.data.About}
          </Text>

              </View>
              <View style={styles.cards}>
              <Text style={[gStyle.det,{
                color:'#eb144c'
              }]}>{this.props.appStore.arabic?'مهارات مطلوبة':'Skills required'}</Text>

                <Text style={gStyle.p}>

{this.state.data.skills}
            </Text>

                </View>
                <View style={styles.cards}>
                <View style={cstyles.head}>
          <View style={cstyles.profile}>
          <View style={cstyles.pimg}>
    {this.state.userdat.proimg&&this.state.userdat.proimg.length>0?
           <Thumbnail   borderRadius={9} style={{borderRadius: 9,width: '100%'}} source={{uri:this.state.userdat.proimg&&this.state.userdat.proimg.length>0?this.state.userdat.proimg:'dsfsdf'}} />
           :
           null
    }
     </View>
          <View style={cstyles.names}>
          <View style={{flexDirection: 'column',alignItems: 'flex-start'}}>
          <Text numberOfLines={1} style={cstyles.name}>{this.state.userdat.Businessname&&this.state.userdat.Businessname.length>0?this.state.userdat.Businessname:this.state.userdat.user}</Text>
          <Text style={[styles.time,{color:this.state.userdat.verfied?'green':'red'}]}  numberOfLines={1}>{this.state.userdat.verfied?this.props.appStore.arabic?'موثوق':'Verfied':this.props.appStore.arabic?'غبر موثوق':'Not Verfied'}</Text>

          </View>

          </View>
          </View>
          <View style={cstyles.edit}>
          <Button onPress={this.state.userdat.Businessname?()=>navigation.navigate('BusinessProfile',{carduid:this.state.userdat.postuid,card:true}):()=>navigation.navigate('Userprofile',{id:this.state.userdat.writerId})} bordered style={{borderColor: '#eb144c',justifyContent: 'center',alignItems: 'center',padding: 10,borderRadius: 10}}>
          <Text style={[styles.time,{color:'#eb144c'}]}>{this.props.appStore.arabic?'عرض':'View'}</Text>
          </Button>
          </View>
                </View>
                <View style={{flexDirection: 'column',alignItems: 'flex-start',justifyContent: 'center',alignSelf: 'flex-start',marginVertical: 5,width: '100%'}}>
    <View style={{flexDirection: 'row',marginHorizontal: 10}}>
    <MaterialIcons name='today' size={15} style={{marginRight: 5}} color="black"/>
                <Text style={[styles.type,{color:'black'}]}  numberOfLines={2}>{items.toString()}</Text>
    </View>
    <View style={{flexDirection: 'row',marginHorizontal: 10}}>
    <MaterialIcons name='access-time' size={15} style={{marginRight: 5}} color="black"/>

                <Text style={[styles.type,{color:'black',textAlign: 'left'}]}  numberOfLines={1}>{this.state.userdat.time?this.state.userdat.time:'No specific time'} - {this.state.userdat.time?this.state.userdat.end:'No specific time'}</Text>
    </View>
  {this.state.userdat.Businessname&&this.state.userdat.Businessname.length>0?  <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around',alignSelf: 'flex-start',marginVertical: 5,width: '100%'}}>

  {this.state.userdat.facebook&&this.state.userdat.facebook.length>0? <TouchableOpacity onPress={()=> Linking.openURL(`fb://facewebmodal/f?href=${this.state.userdat.facebook}`)} style={{backgroundColor: '#fff',flexDirection: 'row',alignItems: 'center'}}>
          <FontAwesome name='facebook-square'  size={20} style={{marginRight: 5}} color="blue"/>

</TouchableOpacity>:null}
        {this.state.userdat.instagram&&this.state.userdat.instagram.length>0?   <TouchableOpacity onPress={()=> Linking.openURL(`instagram://user?username=${this.state.userdat.instagram}`)} style={{backgroundColor: '#fff',flexDirection: 'row',alignItems: 'center'}}>
          <FontAwesome name='instagram' size={20} style={{marginRight: 5}} color="#eb144c"/>
          </TouchableOpacity>:null}
        {this.state.userdat.twitter&&this.state.userdat.twitter.length>0?      <TouchableOpacity onPress={()=> Linking.openURL(`${this.state.userdat.twitter}`)} style={{backgroundColor: '#fff',flexDirection: 'row',alignItems: 'center'}}>
    <FontAwesome name='twitter' size={20} style={{marginRight: 5}} color="#1DA1F2"/>

          </TouchableOpacity>:null}
            {this.state.userdat.linkedin&&this.state.userdat.linkedin.length>0?  <TouchableOpacity onPress={()=> Linking.openURL(`${this.state.userdat.linkedin}`)} style={{backgroundColor: '#fff',flexDirection: 'row',alignItems: 'center'}}>

          <FontAwesome name='linkedin-square' size={20} style={{marginRight: 5}} color="#0e76a8"/>

          </TouchableOpacity>:null}
      {this.state.userdat.youtube&&this.state.userdat.youtube.length>0?    <TouchableOpacity onPress={()=> Linking.openURL(`${this.state.userdat.youtube}`)} style={{backgroundColor: '#fff',flexDirection: 'row',alignItems: 'center'}}>

          <FontAwesome name='youtube' size={20} style={{marginRight: 5}} color="red"/>

          </TouchableOpacity>:null}
    </View>:null}
                </View>
                  </View>
                  {this.state.regions&&this.state.regions.latitude?    <View style={[styles.cards,{display: "flex",flex:1}]}>
                      <Text style={[gStyle.det]}>{this.props.appStore.arabic?'الموقع':'Location'}</Text>
                      <Text style={[gStyle.det,{fontSize: 12,fontFamily: 'ralewaymedium',marginVertical: 10}]}>{this.state.data.Address}</Text>

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


              </View>
              </ScrollView>
              <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',alignSelf: 'center',width: '100%',padding: 20}}>

          {!this.state.swipeablePanelActive?  <Button onPress={this.openPanel} block style={{justifyContent: 'center'
            ,alignItems: 'center',padding: 20,width: '100%',borderRadius: 10,backgroundColor: '#eb144c'}}>
<Text style={{fontSize: 12,fontFamily: 'ralewaymedium',color: 'white'}}>{this.props.appStore.arabic?'تقديم طلب':'Submit an application'}</Text>
            </Button>:null}
              </View>
              <SwipeablePanel
                       fullWidth
                       isActive={this.state.swipeablePanelActive}
                       onClose={this.closePanel}
                       showCloseButton
                       onPressCloseButton={this.closePanel}
                       onlyLarge
                   >
                   <Spinner
                            visible={this.state.spinner}
                            textContent={this.props.appStore.arabic?'جاري التحميل..':'Loading...'}
               textStyle={{color: '#fff'}}
                          />
                   {this.state.postStatus.length>0?<View style={{height: 50,width:Dimensions.get('window').width,backgroundColor: this.state.postStatus=='Booking..'?'green':this.state.postStatus=='تم النشر'?'green':'red'}}>
                   <Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'flex-start',marginHorizontal: 20,fontFamily: 'cairoreg',color: '#FFF'}]}>{this.state.postStatus}</Text>

                   </View>:null}
                                      <View style={{flex: 1,justifyContent: 'center',paddingVertical: 30,width:Dimensions.get('window').width,paddingHorizontal: 20,paddingBottom: 30}}>
            <ScrollView>
    <Text style={{fontFamily: 'ralewaysemi',fontSize: 21}}>{this.props.appStore.arabic?'تاكيد الطلب':'Applying confirmation'}</Text>


    <Form style={{width:'100%' }}>
    <Item regular style={{marginVertical: 10}}>
              <Input placeholder={this.props.appStore.arabic?'الاسم كامل':'Full name'} value={this.state.nameto} onChangeText={(nameto)=>this.setState({nameto})}/>
            </Item>
            <Item regular style={{marginVertical: 5}}>
                      <Input placeholder={this.props.appStore.arabic?'رقم الهاتف':'Phone number'} value={this.state.phoneto} onChangeText={(phoneto)=>this.setState({phoneto})}/>
                    </Item>
                    <Item regular style={{marginVertical: 5}}>
                              <Input placeholder={this.props.appStore.arabic?'البريد الالكتروني':'Email address'} value={this.state.mailto} onChangeText={(mailto)=>this.setState({mailto})}/>
                            </Item>
                            <Item regular style={{marginVertical: 5}}>
                                      <Input placeholder={this.props.appStore.arabic?'المدينة':'City'} value={this.state.cityto} onChangeText={(cityto)=>this.setState({cityto})}/>
                                    </Item>
                      </Form>
                      <Label style={{fontFamily: 'ralewaysemi',marginTop:  10,fontSize: 15,color: '#eb144c'}}>
                      {this.props.appStore.arabic?'خبرات العمل وتاريخ العمل':'Work experience & History'}
                      </Label>

                                  <Textarea rowSpan={5} style={gStyle.text[theme]} value={this.state.exto} onChangeText={(exto)=>this.setState({exto})} bordered placeholder={this.props.appStore
                                    .arabic?'لقد عملت في..':"I've been working at ..."} />
                                  <Label style={{fontFamily: 'ralewaysemi',marginTop:  10,fontSize: 15,color: '#eb144c'}}>
                                  {this.props.appStore.arabic?'أو':'OR'}
                                  </Label>
        {this.state.uploading?<ActivityIndicator />:null}
          <View style={{alignItems: 'center',marginVertical: 10}}>
          <ScrollView horizontal={true}>
          <TouchableOpacity onPress={this._pickImage} style={{marginHorizontal: 10,flex:1,width: 150,height: 100,borderRadius: 12,backgroundColor:'#fff',borderColor:'#800020',borderWidth: 0.5,alignItems: 'center',justifyContent: 'center'}}>
          <Icon name='image' style={{color:'#eb3349'}}/>

          <Text style={{color:'#800020'}}>{this.props.appStore.arabic?'اضف صورة السيرة الذاتية':'Add CV Image'}</Text>
          </TouchableOpacity>

          {this.state.cvto? <ImageBackground source={{uri:'https://image.flaticon.com/icons/png/512/36/36049.png'}} style={{marginHorizontal: 10,borderRadius: 12,width: 150,height: 100,resizeMode: 'contain'}}>
        <TouchableOpacity onPress={()=>this.setState({cvto:''})} style={{position: 'absolute',top: 4,left:4,backgroundColor: 'rgba(0,0,0,0.2)',width: '100%'}}>

            <Icon name='closecircle' type="AntDesign" style={{color:'#fff'}}/>
        </TouchableOpacity>
        <TouchableOpacity  style={{position: 'absolute',bottom: 3,left:4,backgroundColor: 'rgba(0,0,0,0.2)',width: '100%'}}>

<Text style={{color: 'white'}}>{this.state.cvname}</Text>
        </TouchableOpacity>
            </ImageBackground>:null}

          </ScrollView>
          </View>
          <Text style={{fontFamily: 'ralewaymedium',fontSize: 15,color: '#eb144c'}}>{this.state.image}</Text>
          <Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'flex-start',marginHorizontal: 20,fontFamily: 'cairoreg',color: 'red'}]}>{this.state.postStatus}</Text>

          <Button onPress={this.booking} block style={{borderRadius: 9,justifyContent: 'center',alignItems: 'center',padding: 20,backgroundColor: '#eb144c'}}>
          <Text style={{fontFamily: 'ralewaymedium',fontSize: 15,color: '#fff'}}>{this.props.appStore.arabic?'تاكيد الطلب':'Confirm Booking'}</Text>

          </Button>
                 </ScrollView>

                 </View>
                 {this.state.postStatus.length>0?<View style={{height: 50,width:Dimensions.get('window').width,backgroundColor: this.state.postStatus=='Booking..'?'green':this.state.postStatus=='تم النشر'?'green':'red'}}>
                 <Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'flex-start',marginHorizontal: 20,fontFamily: 'cairoreg',color: '#FFF'}]}>{this.state.postStatus}</Text>

                 </View>:null}
            </SwipeablePanel>
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
    fontSize: 17,
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
  flex:8,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center'
},
edit:{
  flex:2,

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
export default Job;
