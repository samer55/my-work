import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,FlatList,Image} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text,Spinner} from 'native-base';
import _ from 'lodash';

const { width } = Dimensions.get("screen");
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import Trainer from '../components/Trainer';

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
header:null  });

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
        load:false,
        spinner:false,
        commentsRef:'',
        search:'',
        dataSources: [],
        searched:[],
        users:[],
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

        this.setState({ dataSources:Object.values(items),searched:Object.values(items),spinner:false},function(){
          this.arrayholder=items
        });
        console.log('itemss----------------'+items);
        console.log('dataArray----------------'+this.state.dataArray);

    });
console.log(this.state.dataArray);
  }
  usersfetch=()=>{
    var ref = firebaseApp.database().ref("users"); //Here assuming 'Users' as main table of contents

    ref.once('value').then(snapshot => {
        // console.log(snapshot.val());

         // get children as an array
         var items = [];
         snapshot.forEach((child) => {
           items.push(child.val());
           console.log(child.val());
        });

        this.setState({ refreshing:false,users: Object.values(items),spinner:false});
console.log("sdfsdfsdfsdf  fdsfdsf "+this.state.users);
    });

  }
  friends = () => {
    this.setState({spinner:true,refreshing:true})
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

        this.setState({ dataArray: Object.values(items),spinner:false,refreshing:false},function(){
          this.arrayholder=items
        });
        console.log('itemss----------------'+items);
        console.log('dataArray----------------'+this.state.dataArray);

    });
console.log(this.state.dataArray);
  }
  componentDidMount() {
    this.setState({ load:true})

    var ref = firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid).collection('follows').onSnapshot(this.follows)

    }
    follows = (querySnapshot) => {
      const boards = [];
      querySnapshot.forEach((doc) => {
        boards.push(doc.data());
      });
      this.setState({friends:Object.values(boards),load:false})

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
    accept2=(d)=>{
      firebaseApp.database().ref(`friends/${d.userId}`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.uid)

    }
   accepts=async(d,i)=>{

     firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid).collection('follows').doc(d.uid).delete()

let cityRef =d.type=='business'? firebaseApp.firestore().collection('Business').doc(d.uid):firebaseApp.firestore().collection('profiles').doc(d.uid)

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
const filteredData = this.state.friends.filter(item => item.uid !== d.uid);
 this.setState({ friends: filteredData });

    }
    deletes=(d)=>{

console.log("deletess"+d);

            firebaseApp.database().ref(`friends/${d}`).equalTo(firebaseApp.auth().currentUser.uid).on('value', function(snapshot) {
          snapshot.ref.remove();
          })
          firebaseApp.database().ref(`friends/${firebaseApp.auth().currentUser.uid}`).equalTo(d).on('value', function(snapshot) {
        snapshot.ref.remove();
        })
 this.displayCategories()
this.friends()

     }


  render() {
    const {navigation}=this.props

    let ArrayOfPeopleObject = Object.values(this.state.dataArray)

    return (
      <ThemeContext.Consumer>
        {theme => (
          <View style={{flex:1}}>

          <Header  style={{width: width,backgroundColor: gStyle.container[theme].backgroundColor}}>
          <Left>
                     <Button transparent onPress={()=>navigation.goBack()}>
                     <Icon name={'arrowleft'} type="AntDesign" size={25} style={{color: '#000000'}} />

                     </Button>
                   </Left>
                   <Body>
  <TouchableOpacity onPress={()=>this.setState({mapvis:true})} style={{flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center'}}>

  <Text style={{fontFamily: 'ralewaysemi'}} numberOfLines={1}>{this.props.appStore.arabic?'المتابعين':'Following'}</Text>

  </TouchableOpacity>
                   </Body>

      </Header>

      <ScrollView
        contentContainerStyle={[gStyle.contentContainerss,{alignItems: 'center'}]}
        style={gStyle.container[theme]}
      >


      {this.state.friends.length==0&&(!this.state.load)?
        <View style={{flex:1,alignItems: 'center'}}>
      <Image style={{width: 200,height: 200,alignItems: 'center',resizeMode: 'contain'}} source={{uri:'https://i.ibb.co/L6VSSXT/3659158.jpg'}} />
      <Text style={{fontSize: 15,fontFamily: 'ralewaysemi',textAlign: 'center'}}> {this.props.appStore.arabic?'عند متابعتك للاشخاص والشركات سوف تجدهم هنا':`Once you follow people, you'll see them here`}</Text>
      </View>:null}
        <List style={{width}}>
        <FlatList
   data={this.state.friends}
   renderItem={({ item ,index}) => (
     <ListItem thumbnail button onPress={item.type=='business'?()=>navigation.navigate('BusinessProfile',{carduid:item.uid,card:true}):()=>navigation.navigate('Userprofile',{id:item.uid})}>

       <Body>
         <Text style={[gStyle.text[theme],{textAlign: 'left'}]}>{item.name}</Text>
         <Text style={[gStyle.text[theme],{textAlign: 'left'}]} note numberOfLines={1}>{this.props.appStore.arabic?item.catar:item.category}</Text>
       </Body>
       <Right >

         <Button rounded style={{backgroundColor: '#eb144c'}}  onPress={()=>this.accepts(item,index)}>
           <Text style={[gStyle.text[theme],{color:'#fff'}]}>{this.props.appStore.arabic?'الغاء المتابعة':'Unfollow'}</Text>
         </Button>
       </Right>
     </ListItem>
    )}

 />
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
