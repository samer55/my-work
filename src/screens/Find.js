import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,FlatList,RefreshControl} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text} from 'native-base';
import _ from 'lodash';

const { width } = Dimensions.get("screen");
import { useTheme } from 'react-navigation';
import { gStyle, images,colors } from '../constants';
import Spinner from 'react-native-loading-spinner-overlay';
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
import NavigationBack from '../components/NavigationBack';

import { Button,Header,Item,Icon,Input } from 'native-base';


import { firebaseApp } from '../../firebase'
import { ThemeContext } from 'react-navigation';

export default class extends React.Component {
  static navigationOptions = ({ navigation,theme= useTheme() }) => ({
    headerLeft: <NavigationBack navigation={navigation} />,
    headerRight: <View style={{ flex: 1 }} />,
    headerTitleStyle: gStyle.headerTitleStyle,
    title: 'ابحث عن لاعب'
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
this.friends()
this.displayCategories()
  }
  _onRefresh = () => {
   this.setState({refreshing: true});
   this.friends()
   this.displayCategories()

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
    firebaseApp.auth().onAuthStateChanged(user => {
      this.currentUserId=user.uid
      this.currentusername=user.displayName
    })


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

  render() {
    const filtered =this.state.dataArray.filter(person => this.state.friends.includes(person.userId))
    const dataArray = Object.values(this.arrayholder)
    const {navigation}=this.props
    let ArrayOfPeopleObject = Object.values(this.state.dataArray)

    return (
      <ThemeContext.Consumer>
        {theme => (
          <View style={{flex:1}}>
          <Header  searchBar rounded style={{width: '100%',backgroundColor: gStyle.container[theme].backgroundColor }}>
      <Item>
      <Icon name="ios-search" />
      <Input placeholder="ابحث عن شخص لتكتب له.." onChangeText={text => this.searchFilterFunction(text)} />
      </Item>
      <Button transparent>
      <Text style={gStyle.text[theme]}>ابحث</Text>
      </Button>
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
{this.state.dataSources.length==0?<Text style={[gStyle.text[theme], , gStyle.det,{alignSelf: 'flex-end',marginHorizontal: 20}]}>اصدقائي</Text>:
<Text style={[gStyle.text[theme], , gStyle.Title,{alignSelf: 'flex-end',marginHorizontal: 20}]}>ابحث عن شخص لترسل لتكتب له </Text>}


        <List style={{width}}>
        <FlatList
   data={this.state.dataSources}
   renderItem={({ item }) => (
     <ListItem thumbnail button onPress={()=>navigation.navigate('Profile',{data:item.userId})}>
       <Left>
         <Thumbnail square source={require('../assets/users.png')} />
       </Left>
       <Body>
         <Text style={[gStyle.text[theme],{textAlign: 'left'}]}>@{item.username}</Text>
         <Text style={[gStyle.text[theme],{textAlign: 'left'}]} note numberOfLines={1}>{item.name}</Text>
       </Body>
       <Right>


       </Right>
     </ListItem>
    )}

 />



          </List>

          {this.state.friends.length ===0?
            <View
              style={{
                flex: 1,
                padding: 20,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',

              }}
            >
            <Text style={[gStyle.button,gStyle.text[theme]]}>ليس لديك اصدقاء حاليا ابحث عن صديقك وارسل له طلب صداقة</Text>


            </View>
          :null}

            <List style={{width}}>

        {this.state.dataSources.length==0&&this.state.dataArray.filter(person => this.state.friends.includes(person.userId)).map((item, index) => {

    return(
      <ListItem thumbnail>
        <Left>
          <Thumbnail square source={require('../assets/users.png')} />
        </Left>
        <Body>
          <Text style={[gStyle.text[theme],{textAlign: 'left'}]}>@{item.username}</Text>
          <Text style={[gStyle.text[theme],{textAlign: 'left'}]}>{item.name}</Text>

        </Body>
        <Right >
          <Button light  onPress={()=>navigation.navigate('Write',{data:item,myuid:this.currentUserId,username:this.currentusername})}>
            <Text style={gStyle.text['light']}>اكتب</Text>
          </Button>

        </Right>
      </ListItem>
    )




        })}

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
