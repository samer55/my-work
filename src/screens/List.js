import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,FlatList,RefreshControl} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text,Footer, FooterTab} from 'native-base';
import _ from 'lodash';

const { width } = Dimensions.get("screen");
import { useTheme } from 'react-navigation';
import { gStyle, images,colors } from '../constants';
import Spinner from 'react-native-loading-spinner-overlay';
import Trainer from '../components/Trainer';
import SwipeablePanel from 'rn-swipeable-panel';

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
import NavigationBack from '../components/NavigationBack';
import { Ionicons } from '@expo/vector-icons';

import { Button,Header,Item,Icon,Input,Title } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

import moment from 'moment';

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
revstat:'',
        text:'',
        dataArray: [],
        friends:[],
        name:'dfsdf',
        mydata:[],
        spinner:false,
        commentsRef:'',
        search:'',
comment:'',
        dataSources: [],
        searched:[],
        postuid:  props.navigation.getParam('postuid',''),
        data:  props.navigation.getParam('data',''),

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
  _onRefresh = () => {
   this.setState({refreshing: true});
this.componentDidMount()
 }
  displayCategories = () => {
    this.setState({spinner:true})
    var ref = firebaseApp.database().ref("users"); //Here assuming 'Users' as main table of contents

    ref.once('value').then(snapshot => {
        // console.log(snapshot.val());

         // get children as an array
         var items = [];
         snapshot.forEach((child) => {
           items.push(child.val());
        });

        this.setState({ refreshing:false,dataArray: Object.values(items),searched:Object.values(items),spinner:false},function(){
          this.arrayholder=Object.values(items)
        });
        console.log('itemss----------------'+items);
        console.log('dataArray----------------'+this.state.dataArray);

    });
console.log(this.state.dataArray);
  }
  openPanel = () => {
      this.setState({ swipeablePanelActive: true });
  };

  closePanel = () => {
      this.setState({ swipeablePanelActive: false });
  };

  friends = () => {
    this.setState({spinner:true})
    var ref = firebaseApp.database().ref("friends/"+firebaseApp.auth().currentUser.uid); //Here assuming 'Users' as main table of contents

    ref.once('value').then(snapshot => {
        // console.log(snapshot.val());

         // get children as an array
         var items = [];
         friend =[]
         snapshot.forEach((snap) => {
           var item = snap.val();
item.key = snap.key;
console.log("Ssss---- "+snap.val());
items.push(item);



        });

        this.setState({ friends: Object.values(items),spinner:false});

    });
  }

  componentDidMount() {
    this.setState({refreshing: true});

    firebaseApp.firestore().collection('Posts').doc(this.state.postuid).collection('Comments').orderBy('createdAt','desc').onSnapshot(this.Jobsupdate)


    }
    Jobsupdate = (querySnapshot) => {
      const boards = [];

      querySnapshot.forEach((doc) => {
        boards.push(doc.data());

      });

    this.setState({ dataArray: Object.values(boards),refreshing:false});
    }
    searchFilterFunction = text => {
      const newData = this.arrayholder.filter(item => {
        const itemData = `${item.username.toUpperCase()}
        ${item.name.toUpperCase()}`;

         const textData =text.length==0?'dsfsdfshhh' :text.toUpperCase();

         return itemData.indexOf(textData) > -1;
      });

      this.setState({dataSources : newData });
    };
    create = (d) => {
      this.setState({
        ploading:true,
        postStatus: 'جاري الارسال..',
        shows:true,pcolor:'warning'
      })
      const newPostKey = firebaseApp.database().ref('friends').push().key

            const uid = firebaseApp.auth().currentUser.uid



            const postData = {
              userId:uid,
              username:firebaseApp.auth().currentUser.displayName,
          accept:false,
            status:'send',
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              updatedAt: firebase.firestore.FieldValue.serverTimestamp(),

            }
            const postDatas = {
              userId:d.userId,
              username:d.username,
          accept:true,
          status:'send',
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              updatedAt: firebase.firestore.FieldValue.serverTimestamp(),

            }
            let updates = {}
            let updatess = {}

            updates['friendsreq/' +d.userId +'/'+uid] = postData

              //  updates["data/"+newPostKey+'/name'] =state.tag
      //       firebaseApp.database().ref('tags').set(this.state.tags.tagsArray)

            firebaseApp.database().ref().update(updates)
            .then(() => {
              this.setState({
                              postStatus: 'تم شكرا لك.',
                          refreshing:false,

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
    submitcomment = () => {
      this.setState({
        revstat: this.props.appStore.arabic?'جاري التعليق..':'Commenting..',
      })

      const refs = firebaseApp.firestore().collection('Posts').doc(this.state.postuid).collection('Comments').doc()
      const newPostKey = refs.id
    if (this.state.comment.length >0) {

            const postData = {
              reviewerid:firebaseApp.auth().currentUser.uid,
              reviewername:firebaseApp.auth().currentUser.displayName,
              postuid:this.state.postuid,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
              postuid:newPostKey,
              comment:this.state.comment,
            }
            let updates = {}
            refs.set(postData)



            .then(() => {
              this.setState({
                              revstat:this.props.appStore.arabic?'شكرا لك': 'Thank you',
                              comment:'',
                              swipeablePanelActive:false
                            })


                            this.notification(this.state.data.writerId,this.state.postuid,this.state.data.post)

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
         headings: {"en": `${firebaseApp.auth().currentUser.displayName} Commented on your post`,"ar":`${firebaseApp.auth().currentUser.displayName} قام بالتعليق على منشورك`},
         android_sound: "fishing",
         data: {"puid": newPostKey, "new_message":true},
         ios_sound: "fishing.caf",
         contents: {"en": `${firebaseApp.auth().currentUser.displayName} Commented on your post: ${this.state.data.post}`,"ar": `${firebaseApp.auth().currentUser.displayName} قام بالتعليق على منشورك: ${this.state.data.post}` },
  filters: [{"field":"tag","key":"uid","relation":"=","value":this.state.data.writerId}],
       })
     })

            })
            .catch(() => {
              this.setState({ revstat: 'Something went wrong!!!',pcolor:'red' })
            })

          .catch(error => {
            console.log(error)
          })


        } else {

      this.setState({ploading:false,  revstat: "Please Write your comment",shows:true ,pcolor:'red'})
        setTimeout(() => {
        this.setState({shows:false})
      }, 3000)
    }
    setTimeout(() => {this.setState({
                    revstat: '',

                  })}, 4000)

    }
    notification=(d,notkey,post)=>{
      const newPostKey = firebaseApp.database().ref('like').push().key
      firebaseApp.firestore().collection('notification').doc(d).collection('List').doc().set({
          username:firebaseApp.auth().currentUser.displayName,
          noti:`${firebaseApp.auth().currentUser.displayName} Comment on your post: ${post}`,
          notiar:`${firebaseApp.auth().currentUser.displayName} قام بالتعليق على منشورك: ${post}`,

          postuid:notkey,
          type:'Comment',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
         updatedAt:firebase.firestore.FieldValue.serverTimestamp(),
      })


    }
    SearchFilterFunction(text) {
      const newData = this.state.arrayholder.filter(function(item) {
        //applying filter for the inserted text in search bar

        const itemData = item.username?`${item.username}${item.name}`.toUpperCase():'dsfsdfs';
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1
      });
      this.setState({
        //setting the filtered newData on datasource
        //After setting the data it will automatically re-render the view
        dataSources:newData,
        text:text,
      });
      }
      deletepost=(d)=>{
        Alert.alert(
      this.props.appStore.arabic?'هل انت متاكد من حذفك لتعليق':'Are you sure you want to delete this Comment',
        this.props.appStore.arabic?'بالضغط على نعم سيتم حذف تعليقك':'By clicking yes you sure you want to delete this Comment',
        [
          {text: this.props.appStore.arabic?'الغاء':'cancel', onPress: () => console.log('Ask me later pressed')},
          {text: this.props.appStore.arabic?'نعم':'Yes', onPress: ()=>firebaseApp.firestore().collection('Posts').doc(this.state.postuid).collection('Comments').doc(d).delete()},
        ],
        { cancelable: false }
      )



        }
  render() {
    const {navigation}=this.props

    return (
      <ThemeContext.Consumer>
        {theme => (
          <View style={{flex:1}}>
          {this.state.revstat.length>0?<View style={{height: 50,width:Dimensions.get('window').width,backgroundColor: this.state.revstat=='Rating..'?'green':this.state.revstat=='Thank you'?'green':'red'}}>
          <Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'flex-start',marginHorizontal: 20,fontFamily: 'cairoreg',color: '#FFF'}]}>{this.state.revstat}</Text>

          </View>:null}
          <Header searchBar rounded style={{backgroundColor: gStyle.container[theme].backgroundColor}}>
      <Left>
      <TouchableOpacity onPress={()=>navigation.goBack()} style={{justifyContent: 'center',alignItems: 'center',borderRadius: 70/2,backgroundColor: 'white',paddingHorizontal: 2}}>

      <Icon name='arrow-back' size={40} color="#000000"/>
      </TouchableOpacity>
      </Left>
                   <Body>
                     <Title style={{color:'black'}}>{this.props.appStore.arabic?'التعليقات':'Comments'}</Title>
                   </Body>

      </Header>
      <ScrollView
        contentContainerStyle={[gStyle.contentContainerss,{alignItems: 'center'}]}
        style={gStyle.container[theme]}
        refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
      onRefresh={this._onRefresh}
              tintColor="#eb144c"
            />
          }
      >
      <Spinner
             visible={this.state.spinner}
            textContent={'جاري التحميل...'}
             textStyle={{color:'#fff'}}
           />



            <List style={{width}}>

        {this.state.dataArray.map((item, index) => {

    return(
      <ListItem >
      {item.reviewerid==firebaseApp.auth().currentUser.uid?<TouchableOpacity onPress={()=>this.deletepost(item.postuid)}  >
      <Ionicons name='md-close' size={20} color="red"/>
      </TouchableOpacity>:null}
          <Body>
            <Text style={{fontFamily: 'ralewaysemi',fontSize: 15}}>{item.reviewername}</Text>
            <Text style={{fontFamily: 'raleway'}}>{item.comment}</Text>
          </Body>
          <Right>
          <Text style={{fontFamily: 'raleway'}}>{item.createdAt?moment(item.createdAt.toDate()).locale(this.props.appStore.arabic?'ar':'en').fromNow():''}</Text>

          </Right>
        </ListItem>
    )




        })}

              </List>

      </ScrollView>
      <Footer style={{backgroundColor: 'white'}} backgroundColor="white">
         <FooterTab button onPress={this.openPanel} style={{backgroundColor: 'white',flexDirection: 'row',alignItems: 'center',borderWidth: 0.3,borderColor: '#dddddd'}} >
<Button full onPress={this.openPanel}>
        <Text style={{fontFamily: 'ralewaymedium',fontSize: 12,color: '#eb144c'}}>{this.props.appStore.arabic?'اكتب هنا تعليقك':'Write here your comment'}</Text>
</Button>
         <TouchableOpacity onPress={this.openPanel}>
         <FontAwesome name='send' size={25} style={{marginRight: 15}} color="#eb144c"/>
         </TouchableOpacity>
         </FooterTab>
       </Footer>
       <SwipeablePanel
                fullWidth
                isActive={this.state.swipeablePanelActive}
                onClose={this.closePanel}
                showCloseButton
                onlyLarge
                onPressCloseButton={this.closePanel}
            >
            <View style={{flex: 1,justifyContent: 'center',paddingVertical: 30,width:Dimensions.get('window').width,paddingHorizontal: 20,paddingBottom: 30}}>
            <Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'flex-start',marginHorizontal: 20,fontFamily: 'cairoreg',color: '#eb144c'}]}>{this.state.revstat}</Text>

   <ScrollView>
   <View onPress={this.openPanel} style={{backgroundColor: 'white',flexDirection: 'row',alignItems: 'center'}} >

   <Input value={this.state.comment} onChangeText={(comment)=>this.setState({comment})} inputStyle={{backgroundColor: '#ffffff',padding: 10,width: '100%'}} containerStyle={{borderRadius: 12}}
   placeholder={this.props.appStore.arabic?'اكتب هنا تعليقك':"Write here your Comment"}
   />
   <TouchableOpacity onPress={this.submitcomment}>
   <FontAwesome name='send' size={25} style={{marginRight: 15}} color="#eb144c"/>
   </TouchableOpacity>
   </View>
          </ScrollView>
          </View>
    </SwipeablePanel>

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
