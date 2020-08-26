import React from "react";
import { Alert ,Image,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,FlatList,RefreshControl,Linking,ImageBackground,ActivityIndicator} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text} from 'native-base';
import _ from 'lodash';

const { width } = Dimensions.get("screen");
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import Spinner from 'react-native-loading-spinner-overlay';
import Trainer from '../components/Trainer';
import moment from 'moment';
import 'moment/src/locale/ar'
import Lightbox from 'react-native-lightbox';

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

import { Button,Header,Item,Icon,Input,Title } from 'native-base';
import NavigationBack from '../components/NavigationBack';


import { firebaseApp } from '../../firebase'
import { ThemeContext } from 'react-navigation';
import { observer,inject } from 'mobx-react'
@inject("appStore") @observer

export default class extends React.Component {
  static navigationOptions = ({ navigation,theme= useTheme() }) => ({
  header:null
  });

  constructor(props) {
    super(props);
    this.state = {
        swipeablePanelActive: false,
        first:'ss',

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
        req:  props.navigation.getParam('request',false),

item:  props.navigation.getParam('item',[]),
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
  componentDidMount(){

  }
  notification=(d,notkey,post,m)=>{
    console.log(d+'  //  '+notkey+'  //  '+post);
    firebaseApp.firestore().collection('notification').doc(d).collection('List').doc().set({
        username:firebaseApp.auth().currentUser.displayName,
        noti:`${firebaseApp.auth().currentUser.displayName} ${m}: ${post}`,
        notiar:`${firebaseApp.auth().currentUser.displayName} ${m=='Accepted your order'?'قبل طلبك':'رفض طلبك'}: ${post}`,

        postuid:notkey,
        type:'order',
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
       updatedAt:firebase.firestore.FieldValue.serverTimestamp(),
    })


  }
  Acceptorder = ()=>{
    const newPostKey = firebaseApp.database().ref('friends').push().key

    this.setState({spinner:true})
    let title = this.state.item.Jobtitle?this.state.item.Jobtitle:this.state.item.servicetitle
    firebaseApp.firestore().collection('Orders').doc(this.state.item.postuid).update({Status:'Accepted'});
    this.notification(this.state.item.customeruid,this.state.item.postuid,title,'Accepted your order');
    this.setState({spinner:false})
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
         headings: {"en": `${firebaseApp.auth().currentUser.displayName} Accepted your order`,"ar":`${firebaseApp.auth().currentUser.displayName} قبل الطلب`},
         android_sound: "fishing",
         data: {"puid": newPostKey, "new_message":true},
         ios_sound: "fishing.caf",
         contents: {"en": `${firebaseApp.auth().currentUser.displayName} Accepted your order:
         ${title}` ,"ar":`${firebaseApp.auth().currentUser.displayName} قبل طلبك:
         ${title}`},
    filters: [{"field":"tag","key":"uid","relation":"=","value":this.state.item.customeruid}],
       })
     })
  this.props.navigation.goBack()

  }
  cancelsure = ()=>{
    const newPostKey = firebaseApp.database().ref('friends').push().key

    Alert.alert(
  this.props.appStore.arabic?'هل انت متاكد من الغاء الطلب':'Are you sure you want to cancel this order',
      this.props.appStore.arabic?'بالضغط على نعم سيتم الغاء الطلب':'By clicking yes you sure you want to cancel this order',
    [
      {text:   this.props.appStore.arabic?'لا, لا اريد الغاء الطلب':'No, Do not cancel', onPress: () => console.log('Ask me later pressed')},
      {text:   this.props.appStore.arabic?'نعم':'Yes', onPress: ()=>{firebaseApp.firestore().collection('Orders').doc(this.state.item.postuid).update({Status:'Canceled'});
    this.props.navigation.goBack()}},
    ],
    { cancelable: false }
  )

  }
  rejectsure = ()=>{
    const newPostKey = firebaseApp.database().ref('friends').push().key

    let title = this.state.item.Jobtitle?this.state.item.Jobtitle:this.state.item.servicetitle

    Alert.alert(
    this.props.appStore.arabic?'هل انت متاكد من رفض الطلب':'Are you sure you want to reject this order',
      this.props.appStore.arabic?'بالضغط على نعم سيتم رفض الطلب':'By clicking yes you sure you want to reject this order',
    [
      {text:   this.props.appStore.arabic?'لا, لا اريد رفضه':'No, Do not cancel', onPress: () => console.log('Ask me later pressed')},
      {text:   this.props.appStore.arabic?'نعم':'Yes', onPress: ()=>{firebaseApp.firestore().collection('Orders').doc(this.state.item.postuid).update({Status:'Canceled'});
    this.props.navigation.goBack();
    this.notification(this.state.item.customeruid,this.state.item.postuid,title,'Rejected your order');

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
         headings: {"en": `${title} has been Rejected`,"ar":`${title} تم رفضه`},
         android_sound: "fishing",
         data: {"puid": newPostKey, "new_message":true},
         ios_sound: "fishing.caf",
         contents: {"en": `${title} has been Rejected:
         ${title}`,"ar":`${title} تم رفضه:
         ${title}` },
    filters: [{"field":"tag","key":"uid","relation":"=","value":this.state.item.customeruid}],
       })
     })}},
    ],
    { cancelable: false }
  )

  }

  Jobsupdate = (querySnapshot) => {
    const boards = [];

    querySnapshot.forEach((doc) => {
      boards.push(doc.data());

    });

  this.setState({dataSources:Object.values(boards)});
  }
    create = (d) => {
      this.setState({
        ploading:true,
        postStatus: 'جاري الارسال..',
        shows:true,pcolor:'warning'
      })
      const newPostKey = firebaseApp.database().ref('friends').push().key

            const uid = firebaseApp.auth().currentUser.uid



            const postData = {
              userId:d.userId,
              username:d.username,
          accept:false,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              updatedAt: firebase.firestore.FieldValue.serverTimestamp(),

            }
            let updates = {}
            let updatess = {}

            updates['friends/' + uid+'/'+d.userId] = postData

              //  updates["data/"+newPostKey+'/name'] =state.tag
      //       firebaseApp.database().ref('tags').set(this.state.tags.tagsArray)

            firebaseApp.database().ref().update(updates)
            .then(() => {
              this.setState({
                              postStatus: 'تم شكرا لك.',
                          refreshing:true,

                            })

    alert('تم ارسال طلب الصداقة')


            })
            .catch(() => {
              this.setState({ postStatus: 'Something went wrong!!!',pcolor:'red' })
            })

          .catch(error => {
            console.log(error)
          })








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


  render() {
    const dataArray = Object.values(this.arrayholder)
    const {navigation}=this.props
    const {item,req}=this.state

    let trLocale = require('moment/locale/ar');
    let ArrayOfPeopleObject = Object.values(this.state.dataArray)

    return (
      <ThemeContext.Consumer>
        {theme => (
          <View style={{flex:1}}>
          <Header searchBar rounded style={{backgroundColor: gStyle.container[theme].backgroundColor}}>
      <Left>
      <TouchableOpacity onPress={()=>navigation.goBack()} style={{justifyContent: 'center',alignItems: 'center',borderRadius: 70/2,backgroundColor: 'white',paddingHorizontal: 2}}>

      <Icon name='arrow-back' size={40} color="#000000"/>
      </TouchableOpacity>
      </Left>
                   <Body>
                     <Title style={{color:'black'}}>{this.props.appStore.arabic?'تفاصيل الطلب':'Order details'}</Title>
                   </Body>

      </Header>
          <Spinner
                 visible={this.state.spinner}
                 textContent={'Loading...'}
                 textStyle={{color:'#fff'}}
               />
      <ScrollView
        contentContainerStyle={[gStyle.contentContainerss,{width:Dimensions.get('window').width}]}
        style={gStyle.container[theme]}
      >


           <View style={{flex:1,flexDirection: 'column',marginVertical: 10,marginHorizontal: 10,borderRadius: 12,width:Dimensions.get('window').width-10}}>
           <View style={{flex:1,backgroundColor: '#ededed',justifyContent: 'space-around',padding: 10,alignItems: 'center',flexDirection: 'row',borderTopLeftRadius: 12,borderTopRightRadius: 12}}>
          <Text style={{fontFamily: 'raleway'}}> {this.props.appStore.arabic?'المزود':'Provider'}:<Text style={{fontFamily: 'ralewaysemi',color: '#000000'}} numberOfLines={1}> {item.customername}</Text></Text>
           <Text style={{fontFamily: 'ralewaymedium',color: '#000000'}} numberOfLines={1}>{item.createdAt?moment(item.createdAt.toDate()).locale(this.props.appStore.arabic?'ar':'en').fromNow():''}</Text>

           </View>
           <View style={{flex:1,backgroundColor: '#ededed',justifyContent: 'center',padding: 10,alignItems: 'center'}}>
           <Text style={{fontFamily: 'ralewaysemi'}} >{item.servicetitle&&item.servicetitle.length>0?item.servicetitle:item.Jobtitle}</Text>
           <Text style={{fontFamily: 'ralewaymedium',color: '#eb144c'}} >{item.Cat}</Text>

           </View>

           <View style={{flex:1,backgroundColor: '#ededed',justifyContent: 'space-around',padding: 10,alignItems: 'center',flexDirection: 'row',borderBottomLeftRadius: 12,borderBottomRightRadius: 12}}>
           <Text style={{color:item.Status==('Pending')||item.Status=='Canceled'?'red':'green' ,fontFamily: 'ralewaymedium'}}>{item.Status=='Pending'?this.props.appStore.arabic?'قيد الانتظار':'Pending':item.Status=='Canceled'?this.props.appStore.arabic?'تم الالغاء':'Cancelled':this.props.appStore.arabic?'تم القبول':'Accepted'}<Text style={{color: '#000000'}}> | {this.props.appStore.arabic?item.type=='services'?'خدمات':item.type=='offer'?'عروض':'وظائف':item.type}</Text></Text>
           <Text style={{fontFamily: 'raleway',fontWeight: '400'}}>${item.price} / {item.priceper}</Text>

           </View>
           </View>



           <View style={{flex:1,flexDirection: 'column',marginVertical: 10,marginHorizontal: 10,borderRadius: 12,width:Dimensions.get('window').width-10}}>
             {item.type=='Jobs'? <View style={{flex:1,backgroundColor: '#ededed',justifyContent: 'center',padding: 10,alignItems: 'center',flexDirection: 'column',borderTopLeftRadius: 12,borderTopRightRadius: 12}}>
           <Text style={{color:'#eb144c' ,fontFamily: 'ralewaymedium'}}>{this.props.appStore.arabic?'سنوات الخبرة والتاريخ الوظيفي':'Work experience & History'}:</Text>

           <Text style={{fontFamily: 'ralewaymedium'}} >{item.workex}</Text>

           </View>:<View style={{flex:1,backgroundColor: '#ededed',justifyContent: 'center',padding: 10,alignItems: 'center',flexDirection: 'column',borderTopLeftRadius: 12,borderTopRightRadius: 12}}>
           <Text style={{color:'#eb144c' ,fontFamily: 'ralewaymedium'}}>{this.props.appStore.arabic?'تفاصيل الطلب':'Order details'}:</Text>

           <Text style={{fontFamily: 'ralewaymedium'}} >{item.note}</Text>

           </View>}

</View>
  {item.type=='Jobs'&&item.cvto&&item.cvto.length>0?                   <View style={{marginVertical: 10,flex:1}}>
  <Text style={{color:'#000000' ,fontFamily: 'ralewaysemi',marginVertical: 10}}>{this.props.appStore.arabic?'السيرة الذاتية':'CV File'}:</Text>

          {item.cvto&&item.cvto.length>0?
<Button dark  onPress={()=> Linking.openURL(item.cvto)} style={{justifyContent: 'center',alignItems: 'center',padding: 10}}>
<Text style={{color: 'white',fontSize: 14}}>{this.props.appStore.arabic?'تحميل السيرة الذاتية':'View CV'}</Text>
</Button>
          :null}

</View>:null}


           <View style={{flex:1,flexDirection: 'column',marginVertical: 10,marginHorizontal: 10,borderRadius: 12,width:Dimensions.get('window').width-10}}>
           <Text style={{fontFamily: 'ralewaysemi',marginVertical: 10,fontSize: 20}} >{req?this.props.appStore.arabic?'معلوماتي':'My Info':''}</Text>

           <View style={{flex:1,backgroundColor: '#ededed',justifyContent: 'space-around',padding: 10,alignItems: 'center',flexDirection: 'row',borderTopLeftRadius: 12,borderTopRightRadius: 12}}>

           <Item>
           <Icon active name='user' type="Feather"/>
           <Input value={item.customername}/>
         </Item>
         </View>
         <View style={{flex:1,backgroundColor: '#ededed',justifyContent: 'center',padding: 10,alignItems: 'center'}}>

        {item.type=='Jobs'? <Item>
         <Icon active name='mail' type="Feather"/>
         <Input value={item.mailto}/>
       </Item>: <Item>
         <Icon active name='map' type="Feather"/>
         <Input value={item.location}/>
       </Item>}
       </View>
      {item.type=='Jobs'?  <View style={{flex:1,backgroundColor: '#ededed',justifyContent: 'center',padding: 10,alignItems: 'center'}}>

       <Item>
        <Icon active name='map' type="Feather"/>
        <Input value={item.ciry}/>
      </Item>
     </View>: null}
       <View style={{flex:1,backgroundColor: '#ededed',justifyContent: 'space-around',padding: 10,alignItems: 'center',flexDirection: 'row',borderBottomLeftRadius: 12,borderBottomRightRadius: 12}}>
       <Item>
       <Icon active name='phone' type="Feather"/>
       <Input value={item.phone}/>
     </Item>
       </View>
           </View>
        {item.Status==='Pending'&& req?   <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',alignSelf: 'center',width: '100%',padding: 20}}>

        <Button bordered onPress={this.cancelsure} block style={{justifyContent: 'center'
         ,alignItems: 'center',padding: 20,width: '100%',borderRadius: 10,borderColor:  'red'}}>
       <Text style={{fontSize: 12,fontFamily: 'ralewaymedium',color: 'red'}}>{this.props.appStore.arabic?'الغاء الطلب':'Cancel Order'}</Text>
         </Button>
           </View>:item.Status==='Pending'&& !req?
           <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',alignSelf: 'center',width: '100%',padding: 20}}>

          <Button bordered onPress={this.rejectsure} block style={{justifyContent: 'center'
           ,alignItems: 'center',padding: 20,width: '100%',borderRadius: 10,borderColor:  'red'}}>
         <Text style={{fontSize: 12,fontFamily: 'ralewaymedium',color: 'red'}}>{this.props.appStore.arabic?'رفض الطلب':'Reject Order'}</Text>
           </Button>
             </View>:null
         }
        {item.Status==='Pending'&& !req?this.state.spinner?<ActivityIndicator />: <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',alignSelf: 'center',width: '100%',padding: 20}}>

         <Button bordered onPress={this.Acceptorder} block style={{justifyContent: 'center'
          ,alignItems: 'center',padding: 20,width: '100%',borderRadius: 10,borderColor:  'green'}}>
         <Text style={{fontSize: 12,fontFamily: 'ralewaymedium',color: 'green'}}>{this.props.appStore.arabic?'قبول الطلب':'Accept Order'}</Text>
          </Button>
            </View>:null}
           <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',alignSelf: 'center',width: '100%',padding: 20}}>


           </View>
      </ScrollView>
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
