import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,FlatList,Image} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text,Spinner} from 'native-base';
import _ from 'lodash';

const { width } = Dimensions.get("screen");
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import Trainer from '../components/Trainer';
import ShowScroller from './showscards'
import LCard from '../components/latestcard'
import Card from '../components/Card';

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


import { firebaseApp } from '../../firebase'
import { ThemeContext } from 'react-navigation';
import { observer,inject } from 'mobx-react'
@inject("appStore") @observer

export default class extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
        swipeablePanelActive: false,
        first:'ss',
refreshing:false,
        text:'',
        dataArray: [],
        friends:[],
        name:'dfsdf',
        mydata:[],
        spinner:false,
        commentsRef:'',
        search:'',
        dataSources: [],
        searched:[],
        posts:[],
        users:[],
        lod:false,
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
  this.setState({lod:true})

  firebaseApp.firestore().collection(this.props.type).where('writerId', '==', this.props.postuid).onSnapshot(this.Jobsupdate)


}
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

onUnlike = (data,d,liked) => {
 let idx =liked.indexOf(firebaseApp.auth().currentUser.uid)
 liked.splice(idx, 1)
 firebaseApp.firestore().collection('Posts').doc(data.postuid).update({nooflike:liked})

 //this.delnotification(data.writerId,data.postuid,data.post)


};
Jobsupdate = (querySnapshot) => {
  const boards = [];

  querySnapshot.forEach((doc) => {
    boards.push(doc.data());

  });

this.setState({ check:false,disabled:false,lod:false,posts: Object.values(boards),spinner:false,refreshing:false,firsts:false});
}
  render() {
    const {navigation}=this.props

    return (
      <ThemeContext.Consumer>
        {theme => (
          <View style={{flex:1}}>


      <ScrollView
        contentContainerStyle={[gStyle.contentContainerss,{alignItems: 'center'}]}
        style={gStyle.container[theme]}
      >
      {this.props.type=='Offers'&&this.props.owner?  <Button onPress={()=>navigation.navigate('Newoffer',{offer:true,postuid:this.props.postuid})} block style={{marginVertical: 15,alignSelf: 'center',justifyContent: 'center'
        ,alignItems: 'center',padding: 20,width: '90%',borderRadius: 10,backgroundColor: '#eb144c'}}>
<Text style={{fontSize: 12,fontFamily: 'ralewaymedium',color: 'white'}}>{this.props.appStore.arabic?'اضف عرض':'Add an offer'}</Text>
        </Button>:
        this.props.type=='Services'&&this.props.owner?<Button onPress={()=>navigation.navigate('OfferService',{postas:this.props.postuid})} block style={{marginVertical: 15,alignSelf: 'center',justifyContent: 'center'
          ,alignItems: 'center',padding: 20,width: '90%',borderRadius: 10,backgroundColor: '#eb144c'}}>
  <Text style={{fontSize: 12,fontFamily: 'ralewaymedium',color: 'white'}}>{this.props.appStore.arabic?'اضف خدمة':'Add Service'}</Text>
          </Button>:null}
      <View style={{marginVertical: 3,flexDirection: 'column',paddingVertical: 10,flex:1}}>

{this.state.posts.length==0&&(!this.state.lod)?
  <View style={{flex:1}}>
<Image style={{width: 200,height: 200,alignItems: 'center',resizeMode: 'contain'}} source={{uri:'https://i.ibb.co/YR9xBQ6/3255469.jpg'}} />
<Text style={{fontSize: 15,fontFamily: 'ralewaysemi',textAlign: 'center'}}>{this.props.appStore.arabic?`لايوجد ${this.props.ar} حاليا`:` No ${this.props.type} Yet`}</Text>
</View>
  :this.state.posts.length==0&&(this.state.lod)? <Image source={{uri:'https://cdn.dribbble.com/users/645440/screenshots/3162915/shopping-loader.gif'}} style={{height:400,width:250,resizeMode: 'contain'}} />
:
  this.state.posts.map((item)=>{
    let userEmail = firebaseApp.auth().currentUser.uid;
    let  liked = item.nooflike ? Object.values(item.nooflike) : [];

    if (this.props.type=='Business') {
        return(
          <LCard navigation={navigation}
            pimg={{uri:'https://image.freepik.com/free-vector/pharmacy-logo-vector_23987-171.jpg'}}
      image={item.proimg}
            show={false}
            data={item}
            datast={item}
            arabic={this.props.appStore.arabic}
            nav="BusinessProfile"
      name={item.Businessname}
      type={item.Categories}/>
        )


    }else if (this.props.type=='Services') {

      return(
        <LCard navigation={navigation}
          pimg={{uri:'https://image.freepik.com/free-vector/pharmacy-logo-vector_23987-171.jpg'}}
    image={item.proimg}
          show={false}
          datast={item}
          nav="OfferPage"
          arabic={this.props.appStore.arabic}
  data={item}
    name={item.servicetitle}
    type={item.Categories}/>
      )

        }
        else if (this.props.type=='Offers') {

          return(
            <LCard navigation={navigation}
              pimg={{uri:'https://image.freepik.com/free-vector/pharmacy-logo-vector_23987-171.jpg'}}
        image={item.backimg}
              show={false}
              datast={item}
        name={item.servicetitle}
      price={item.price}
      nav="Offerview"
  data={item}
  arabic={this.props.appStore.arabic}
      per={item.priceper}
      offer={true}
      av={item.priceav}/>
          )

            }
        else if (this.props.type=='Jobs') {

          return(
            <LCard navigation={navigation}
              pimg={{uri:'https://image.freepik.com/free-vector/pharmacy-logo-vector_23987-171.jpg'}}
        image={item.proimg}
              show={false}
              nav="Job"
                data={item}
              datast={item}
              arabic={this.props.appStore.arabic}
        name={item.Htitle}
        type={item.Categories}/>
          )

            }
            else if (this.props.type=='Posts') {

              return(
                <Card
            navigation={this.props.navigation}
                  image={require('../assets/logo.png')}
                  pimg={{uri:item.proimg}}
            data={item}
            arabic={this.props.appStore.arabic}
            id={this.props.postuid}
            onLike={this.isInArray(liked, userEmail)?()=>this.onUnlike(item,'likedby',liked):()=>this.onLike(item,'likedby',liked)}
            heartname={this.isInArray(liked, userEmail)?'heart':'heart-outline'}
                  show={false}
                  body={item.post}
            name={item.user}

                />
              )

                }
    return null
  })

}
 </View>

      </ScrollView>
      </View>
    )}

  </ThemeContext.Consumer>

    );
  }




}
