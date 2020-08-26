import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,FlatList,RefreshControl} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text,Tab, Tabs, ScrollableTab,Title} from 'native-base';
import _ from 'lodash';

const { width } = Dimensions.get("screen");
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import Spinner from 'react-native-loading-spinner-overlay';
import Trainer from '../components/Trainer';
import moment from 'moment';

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
        refreshing:false,
        commentsRef:'',
        search:'',
        dataSources: [],
        searched:[],
mybusiness:  props.navigation.getParam('business',[]),
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
  _onRefresh= () => {
this.setState({refreshing:true})
this.componentDidMount()

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
    this.setState({refreshing:true})

    firebaseApp.firestore().collection('Orders').where('Provideruid','in',this.state.mybusiness).orderBy('createdAt','desc').onSnapshot(this.Jobsupdate)
    firebaseApp.firestore().collection('Orders').where('customeruid','==',firebaseApp.auth().currentUser.uid).orderBy('createdAt','desc').onSnapshot(this.request)


  }
  Jobsupdate = (querySnapshot) => {
    const boards = [];

    querySnapshot.forEach((doc) => {
      boards.push(doc.data());

    });

  this.setState({dataSources:Object.values(boards)});
  }
  request = (querySnapshot) => {
    const boards = [];

    querySnapshot.forEach((doc) => {
      boards.push(doc.data());

    });

  this.setState({searched:Object.values(boards),refreshing:false});
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
    let ArrayOfPeopleObject = Object.values(this.state.dataArray)

    return (
      <ThemeContext.Consumer>
        {theme => (
          <View style={{flex:1}}>
          <Header searchBar rounded style={{backgroundColor: gStyle.container[theme].backgroundColor}}>
      <Left>
      <TouchableOpacity onPress={()=>navigation.goBack()} style={{justifyContent: 'center',alignItems: 'center',borderRadius: 70/2,backgroundColor: 'white',paddingHorizontal: 2}}>

      <Icon name='ios-close-circle' size={40} color="#000000"/>
      </TouchableOpacity>
      </Left>
                   <Body>
                     <Title style={{color:'black'}}>{this.props.appStore.arabic?'ادارة الطلبات':'Order Management'}</Title>
                   </Body>

      </Header>
          <Tabs   style={{marginBottom: 10,backgroundColor: '#fff'}} backgroundColor="#fff" tabBarUnderlineStyle={{backgroundColor:'#eb144c'}}>
          <Tab heading={this.props.appStore.arabic?'طلبات المستخدمين':"Users orders"} textStyle={{color:'black',fontFamily: 'ralewaysemi'}} tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color:'#eb144c'}}>
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

            <List style={{width}}>
            {this.state.dataSources.map((item, index) => {




              return(

    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Orderdet',{item})} style={{flex:1,flexDirection: 'column',marginVertical: 10,marginHorizontal: 10,borderRadius: 12}}>
    <View style={{flex:1,backgroundColor: '#ededed',justifyContent: 'space-around',padding: 10,alignItems: 'center',flexDirection: 'row',borderTopLeftRadius: 12,borderTopRightRadius: 12}}>
    <Text style={{fontFamily: 'ralewaysemi',color: '#000000'}} numberOfLines={1}> {item.customername}</Text>
    <Text style={{fontFamily: 'ralewaymedium',color: '#000000'}} numberOfLines={1}>{item.createdAt?moment(item.createdAt.toDate()).locale(this.props.appStore.arabic?'ar':'en').fromNow():''}</Text>

    </View>
    <View style={{flex:1,backgroundColor: '#ededed',justifyContent: 'center',padding: 10,alignItems: 'center'}}>
    <Text style={{fontFamily: 'ralewaysemi'}} numberOfLines={2}>{item.servicetitle?item.servicetitle:item.Jobtitle}</Text>

    </View>

    <View style={{flex:1,backgroundColor: '#ededed',justifyContent: 'space-around',padding: 10,alignItems: 'center',flexDirection: 'row',borderBottomLeftRadius: 12,borderBottomRightRadius: 12}}>
    <Text style={{color:item.Status==('Pending')||item.Status=='Canceled'?'red':'green' ,fontFamily: 'ralewaymedium'}}>{item.Status=='Pending'?this.props.appStore.arabic?'قيد الانتظار':'Pending':item.Status=='Canceled'?this.props.appStore.arabic?'تم الالغاء':'Cancelled':this.props.appStore.arabic?'تم القبول':'Accepted'}<Text style={{color: '#000000'}}> | {this.props.appStore.arabic?item.type=='services'?'خدمات':item.type=='offer'?'عروض':'وظائف':item.type}</Text></Text>
    <Text style={{fontFamily: 'raleway',fontWeight: '400'}}>{item.price?'$':''}{item.price}</Text>

    </View>
    </TouchableOpacity>
              )})}

         </List>




          </ScrollView>

</Tab>
          <Tab heading={this.props.appStore.arabic?'الطلبات المرسلة':"Requests"} textStyle={{color:'black',fontFamily: 'ralewaysemi'}} tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color:'#eb144c'}}>
          <ScrollView
            contentContainerStyle={[gStyle.contentContainerss,{alignItems: 'center'}]}
            style={gStyle.container[theme]}
          >
          <Spinner
                 visible={this.state.spinner}
                textContent={'Loading..'}
                 textStyle={{color:'#fff'}}
               />


            <List style={{width}}>
            {this.state.searched.map((item, index) => {




              return(

    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Orderdet',{item,request:true})} style={{flex:1,flexDirection: 'column',marginVertical: 10,marginHorizontal: 10,borderRadius: 12}}>
    <View style={{flex:1,backgroundColor: '#ededed',justifyContent: 'space-around',padding: 10,alignItems: 'center',flexDirection: 'row',borderTopLeftRadius: 12,borderTopRightRadius: 12}}>
    <Text style={{fontFamily: 'ralewaysemi',color: '#000000'}} numberOfLines={1}> {item.provname}</Text>
    <Text style={{fontFamily: 'ralewaymedium',color: '#000000'}} numberOfLines={1}>{item.createdAt?moment(item.createdAt.toDate()).locale(this.props.appStore.arabic?'ar':'en').fromNow():''}</Text>

    </View>
    <View style={{flex:1,backgroundColor: '#ededed',justifyContent: 'center',padding: 10,alignItems: 'center'}}>
    <Text style={{fontFamily: 'ralewaysemi'}} numberOfLines={2}>{item.servicetitle&&item.servicetitle.length>0?item.servicetitle:item.Jobtitle}</Text>

    </View>

    <View style={{flex:1,backgroundColor: '#ededed',justifyContent: 'space-around',padding: 10,alignItems: 'center',flexDirection: 'row',borderBottomLeftRadius: 12,borderBottomRightRadius: 12}}>
    <Text style={{color:item.Status==('Pending')||item.Status=='Canceled'?'red':'green' ,fontFamily: 'ralewaymedium'}}>{item.Status=='Pending'?this.props.appStore.arabic?'قيد الانتظار':'Pending':item.Status=='Canceled'?this.props.appStore.arabic?'تم الالغاء':'Cancelled':this.props.appStore.arabic?'تم القبول':'Accepted'}<Text style={{color: '#000000'}}> | {this.props.appStore.arabic?item.type=='services'?'خدمات':item.type=='offer'?'عروض':'وظائف':item.type}</Text></Text>
    <Text style={{fontFamily: 'raleway',fontWeight: '400'}}>{item.price?'$':''}{item.price}</Text>

    </View>
    </TouchableOpacity>
              )})}

         </List>




          </ScrollView>

          </Tab>

</Tabs>

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
