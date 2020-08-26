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
        mybusiness:  props.navigation.getParam('business',[firebaseApp.auth().currentUser.uid]),
        jobsarray:[],
        offerarr:[],
        count:1,
        pointneed:150,
        businessarray:[],
balance: props.navigation.getParam('balance',0),
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
    onCollectionUpdate = (querySnapshot) => {
this.setState({balance:querySnapshot.data().balance})


    }
  componentDidMount(){
    this.setState({lod:true})
    firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid).onSnapshot(this.onCollectionUpdate)

    var ref = firebaseApp.firestore().collection('Business').where('writerId','in', this.state.mybusiness).onSnapshot(this.Businessupdate)
    var ref1 = firebaseApp.firestore().collection('Services').where('writerId','in', this.state.mybusiness).onSnapshot(this.Servicesupdate)
    var ref3 = firebaseApp.firestore().collection('Jobs').where('writerId','in', this.state.mybusiness).onSnapshot(this.Jobsupdate1)


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
  Jobsupdate1 = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      boards.push(doc.data());
    });
    console.log("loadddinngggg3");

    this.setState({jobsarray: Object.values(boards)})

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

     dec=async()=>{

     console.log("dssdssdsdsdsdsdsdss");


     let cityRef = firebaseApp.firestore().collection("users").doc(firebaseApp.auth().currentUser.uid)
                   try {
           await firebaseApp.firestore().runTransaction(async (t) => {
             const doc = await t.get(cityRef);

             // Add one person to the city population.
             // Note: this could be done without a transaction
             //       by updating the population using FieldValue.increment()
             const newPopulation = doc.data().balance -this.state.pointneed;
             t.update(cityRef, {balance: newPopulation});
           });
           console.log('Transaction success!');
         } catch (e) {
           console.log('Transaction failure:', e);
         }


     }
  render() {
    const {navigation}=this.props
    let combinedArray1 = [...this.state.businessarray, ...this.state.dataArray, ...this.state.jobsarray]

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
                     <Title style={{color:'black'}}>{this.props.appStore.arabic?'ترويج':'Promotion'}</Title>
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

             <Text style={[gStyle.text[theme],  gStyle.Title,{alignSelf: 'flex-end',marginHorizontal: 20}]}>{combinedArray1.length >0?`${this.state.balance} ${this.props.appStore.arabic?'نقاط':'Points'}`:this.props.appStore.arabic?'ليس لديك ايا نقاط كافية':'You do not have any Business'}</Text>

        <List style={{width}}>
        {combinedArray1.map((item, index) => {


          return( <ListItem thumbnail>
             <Left>
               <Thumbnail square large source={{uri:item.backimg}} />
             </Left>
             <Body>
               <Text style={[gStyle.text[theme],{textAlign: 'left',marginVertical: 5}]}  numberOfLines={1}>{item.servicetitle?item.servicetitle:item.Htitle?item.Htitle:item.Businessname}</Text>
               <View style={{flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center'}}>
               <Button bordered danger small onPress={()=>this.setState({count:this.state.count+1,pointneed:this.state.pointneed+150})}>
                           <Text>+</Text>
                         </Button><Button small bordered danger >
                           <Text>{this.state.count}</Text>
                         </Button><Button small bordered danger onPress={this.state.count>1?()=>this.setState({count:this.state.count-1,pointneed:this.state.pointneed-150}):()=>{}}>
                           <Text>-</Text>
                         </Button>
               </View>
               <Text style={[gStyle.text[theme],{textAlign: 'center',fontSize: 12,fontFamily: 'raleway',marginVertical: 5}]}  numberOfLines={3}>{this.state.count} {this.props.appStore.arabic?'ايام':'days'} ({this.state.pointneed}) {this.props.appStore.arabic?'نقاط':'Points'}</Text>
               <Right >

                 <Button dark style={{marginVertical: 5}} onPress={()=>{
                   this.setState({spinner:true})
                   if(this.state.pointneed>this.state.balance){
                     alert(this.props.appStore.arabic?'ليس لديك نقاط كافية':"you do not have enough points")
                     this.setState({spinner:false})

                   }else {
                     let namedata = item.servicetitle?"Services":item.Htitle?"Jobs":"Business"
                     const postData = {
          active:true,
adsactive:   new Date().getTime()+(60*60*(24*this.state.count)*1000),
                     }

               //       firebaseApp.database().ref('tags').set(this.state.tags.tagsArray)
               firebaseApp.firestore().collection(namedata).doc(item.postuid).update(postData)
               .then(() => {
                 this.dec()
                 this.setState({spinner:false})

                 alert(this.props.appStore.arabic?'تم الترويج بنجاح':"Promoted successfully")


               })
                   }
                 }}>
                   <Text style={[gStyle.text['dark']]}>{this.props.appStore.arabic?'قم بالترويج':'Promote'}</Text>
                 </Button>
               </Right>
             </Body>

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
