import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,FlatList,RefreshControl} from "react-native";
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
        business:[firebaseApp.auth().currentUser.uid],
        commentsRef:'',
        search:'',
        dataSources: [],
        searched:[],
params:  props.navigation.getParam('onnav',null),
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
    this.setState({lod:true})

    firebaseApp.firestore().collection('notification').doc(firebaseApp.auth().currentUser.uid).collection('List').orderBy('createdAt','desc').limit(15).onSnapshot(this.Jobsupdate)
    var ref = firebaseApp.firestore().collection('Business').where('writerId', '==', firebaseApp.auth().currentUser.uid).onSnapshot(this.onbusiness)


  }
  onbusiness = (querySnapshot) => {
      const boards = [];

      querySnapshot.forEach((doc) => {
        boards.push(doc.data().postuid);

      });
  let ss =this.state.business.concat(boards)
  this.setState({business:this.state.business.concat(boards)})
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
    let trLocale = require('moment/locale/ar');
    let ArrayOfPeopleObject = Object.values(this.state.dataArray)

    return (
      <ThemeContext.Consumer>
        {theme => (
          <View style={{flex:1}}>
          <Header  style={{width: width,backgroundColor: gStyle.container[theme].backgroundColor}}>
          <Left>

                   </Left>
                   <Body>
      <TouchableOpacity  style={{flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center'}}>

      <Text style={{fontFamily: 'ralewaysemi'}} numberOfLines={1}>{this.props.appStore.arabic?'اشعارات':'Notifications'}</Text>

      </TouchableOpacity>
                   </Body>

      </Header>

      <ScrollView
        contentContainerStyle={[gStyle.contentContainerss,{alignItems: 'center'}]}
        style={gStyle.container[theme]}
      >
      <Spinner
             visible={this.state.spinner}
            textContent={'Loading..'}
             textStyle={{color:'#fff'}}
           />

           <Text style={[gStyle.text[theme],  gStyle.Title,{alignSelf: 'flex-end',marginHorizontal: 20}]}>{this.state.dataSources.length >0?this.props.appStore.arabic?'الاشعارات':'Notifications':this.props.appStore.arabic?'لايوجد لديك اشعارات':'You do not have any Notification'}</Text>

        <List style={{width}}>
        {this.state.dataSources.map((item, index) => {




          return( <ListItem thumbnail>
             <Left>
               <Thumbnail square source={require('../assets/not.png')} />
             </Left>
             <Body>
               <Text style={[gStyle.text[theme],{textAlign: 'left',fontFamily: 'ralewaysemi'}]}  numberOfLines={3}>{this.props.appStore.arabic?item.notiar:item.noti}</Text>
                <Text style={[gStyle.text[theme],{textAlign: 'left'}]} note numberOfLines={2}>{item.createdAt?moment(item.createdAt.toDate()).locale(this.props.appStore.arabic?'ar':'en').fromNow():''}</Text>
             </Body>
             <Right >

               <Button light  onPress={item.type=='order'?()=>this.props.navigation.navigate('Myorders',{business:this.state.business}):()=>this.props.navigation.navigate('Mypost')}>
                 <Text style={[gStyle.text['light']]}>{this.props.appStore.arabic?'عرض':'View'}</Text>
               </Button>
             </Right>
           </ListItem>)})}

     </List>




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
