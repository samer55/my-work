import React from 'react';
import { Image, StatusBar,Text,ImageBackground, View, ScrollView, Dimensions,StyleSheet,TouchableOpacity,ActivityIndicator,FlatList,Linking,RefreshControl } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import { Thumbnail,Button,Header,Item,Input ,Left,Right,Body,Title,Icon,Label,CheckBox,List,ListItem,Tab, Tabs, ScrollableTab} from 'native-base';
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
import { Modalize } from 'react-native-modalize';
import SlCard from '../components/slidescard'
import { SearchBar } from 'react-native-elements';
import LCard from '../components/latestcard'

import Carousel from '../components/carousel';
import Avatar from '../components/avatar/Avatar';
import Team from '../components/teamimage';
import Feature from '../components/feature';
import Membership from '../components/Membership';
import Gallery from '../components/Gallery';
import Door from '../components/Door';
import FeaturedTile from '../components/tile/FeaturedTile';
import ClassCarousel from '../components/ClassCarousel';
const offers = [
  {
    title: 'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
    user:'sameranas',
firstdoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
seconddoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوddfdfdfdfب',
firstLock:true,
secondlock:true,
  },
  {
    title: 'بهوايا انت قاعدة معايا عينيكي ليا مرايا',
    description: 'When you subscribe 1 year on openshop apps',
    first:'#800020',
  second:'steelblue',
      user:'samisami',
      firstdoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
      seconddoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوddfdfdfdfب',
      firstLock:true,
      secondlock:false,
  },
  {
    title: 'باب الكراهية',
    first:'#800020',
  second:'steelblue',
      user:'ahmed',
      firstdoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
      seconddoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوddfdfdfdfب',
      firstLock:true,
      secondlock:true,
  },



];
import { LinearGradient } from 'expo-linear-gradient';

const posts = [
  {
    type:'قبل التحدي',
    user:'sameranas',
    NewChallenge:false,
    title:'التحدي',
des:'يجب عليك ان تضيف صورتك وانت صغير',
reply:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوddfdfdfdfب',
image:'https://previews.123rf.com/images/bogumil/bogumil1306/bogumil130600035/20420629-young-kid-is-going-to-school.jpg',
earn:5,
dateadded:20302302033,
firstlie:'انا شخص اجتماعي',
secondlie:'انا شخص لطيف',
thirdlie:'انا شخص بحب الناس',
lie:'first',
liegame:false,
love:1,
laugh:0,
sad:0,
dislike:0
  },
  {
    type:'اختار الصراحة',
    user:'ahmed ahmed',
    NewChallenge:false,
    title:'السؤال',
des:'هل بكيت يوما من اجل شخص؟',
reply:'لا لم ابكي يوما',
image:'',
earn:5,
dateadded:20302302033,
firstlie:'انا شخص اجتماعي',
secondlie:'انا شخص لطيف',
liegame:false,
thirdlie:'انا شخص بحب الناس',
lie:'first',
love:5,
laugh:2,
sad:6,
dislike:3
  },
  {
    type:'اختار كذبة',
    user:'ahmed ahmed',
    NewChallenge:false,
    title:'الكذبة',
des:'انت شخص تحب مالك اكثر من الناس',
reply:'لا احب الناس',
image:'',
firstlie:'انا شخص اجتماعي',
secondlie:'انا شخص لطيف',
thirdlie:'انا شخص بحب الناس',
lie:'first',
earn:5,
dateadded:20302302033,
love:5,
liegame:false,
laugh:2,
sad:6,
dislike:3
  },
  {
    type:'اجاب على الصراحة',
    user:'ahmed ahmed',
    NewChallenge:false,
    title:'الصراحة',
des:'انت شخص تحب مالك اكثر من الناس',
reply:'لا احب الناس',
image:'',
firstlie:'انا شخص اجتماعي',
secondlie:'انا شخص لطيف',
thirdlie:'انا شخص بحب الناس',
lie:'first',
earn:5,
firstno:2,
secondno:1,
thirdno:5,
dateadded:20302302033,
love:1,
laugh:2,
sad:6,
liegame:false,
dislike:3
  },

  {
    type:'اضاف 3 كذبات',
    user:'ahmed ahmed',
    NewChallenge:true,
    title:'الكذبة الاولى',
des:'انا شخص احب الناس',
reply:'لا احب الناس',
image:'',
firstlie:'انا شخص اجتماعي',
secondlie:'انا شخص لطيف',
thirdlie:'انا شخص بحب الناس',
lie:'first',
liegame:true,
earn:5,
firstno:2,
secondno:1,
thirdno:5,

dateadded:20302302033,
love:1,
laugh:2,
sad:6,
dislike:3
  },
];
import { LayoutUtil } from './LayoutUtil';
import { RecyclerListView, DataProvider } from 'recyclerlistview';

import SwipeablePanel from 'rn-swipeable-panel';
import { ThemeContext } from 'react-navigation';
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react'
@inject("appStore") @observer

class Searchscreens extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,secret:'',
      status:'',
      isDatePickerVisible: false,
      swipeablePanelActive: false,
title:'high',
dataProvider: new DataProvider((r1, r2) => {
return r1 !== r2;
}),
layoutProvider: LayoutUtil.getLayoutProvider(2),
images: [],
count: 0,
userarr:[],
viewType: 0,
searchText:'',
list:[],
refs:false,
refs1:false,
refs2:false,
servicearr:[],
jobsarray:[],
counter:15,
isLoading: true,
isEmpty: false,
isFinished: false,

      code:'',
      dataArray: [],
      setDatePickerVisibility: false,
      myuid:'',
      listedsection:  props.navigation.getParam('listed',[]),
      idin:  props.navigation.getParam('id',[]),
      sec:  props.navigation.getParam('sec',''),
      head:  props.navigation.getParam('head',''),

       refreshing: false,
      myusername:'',
      posts:[],
      page: 1,
      texts:'',
      refs5:false,
          seed: 1,
          query: "",
          isLoading: true,
          spinnerVisibility: false,
      Duration:'popular',
      disabled:false,
      catindex:0,
      check:false,
      Additional: '-------------',
      spinner:false,
    };
    this.currentUserId=''
    this.arrayholder=[]
    this.filt=[]

    this.currentusername=''

  }


  openPanel = () => {
      this.setState({ swipeablePanelActive: true });
  };

  closePanel = () => {
      this.setState({ swipeablePanelActive: false });
  };

  filterList = (text) => {
    var newData = this.filt;
    newData = this.filt.filter((item) => {
      const itemData = item.title.toLowerCase();
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    LayoutAnimation.configureNext(CustomLayoutSpring(null, null, "scaleXY"));
    this.setState({
      query: text,
      posts: newData,
    });
  };
  DisplayPosts = (d) => {
    this.setState({refreshing:false})


    firebaseApp.database().ref(`Ads`).on('value', (snapshot) => {
         var items = [];
         snapshot.forEach((child) => {
           if (this.props.appStore.place==child.val().city) {
                items.push(child.val());
           }

        });
this.setState({ check:false,disabled:false,spinner:false,refreshing:false,firsts:false},function(){
  this.filt=Object.values(items)
});

    });
  }

componentDidMount(){



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
this.setState({refs:true,refs1:true,refs2:true,refs5:true})
    var ref = firebaseApp.firestore().collection('Services').orderBy('servicetitle').startAt(this.state.searchText).limit(15).onSnapshot(this.Servicesupdate)
    var ref = firebaseApp.firestore().collection('Business').orderBy('Businessname').startAt(this.state.searchText).limit(15).onSnapshot(this.Businessupdate)
    var ref = firebaseApp.firestore().collection('Jobs').orderBy('Htitle').startAt(this.state.searchText).limit(15).onSnapshot(this.Jobsupdate)
    var ref = firebaseApp.firestore().collection('profiles').orderBy('user').startAt(this.state.searchText).limit(15).onSnapshot(this.userdata)

  };
  Servicesupdate = (querySnapshot) => {
    this.setState({refs:true})
    const boards = [];
    querySnapshot.forEach((doc) => {
      boards.push(doc.data());
    });
    console.log("loadddinngggg2");

    this.setState({servicearr:Object.values(boards)})
    this.setState({refs:false})

  }
  userdata = (querySnapshot) => {
    this.setState({refs5:true})
    const boards = [];
    querySnapshot.forEach((doc) => {
      boards.push(doc.data());
    });
    console.log("loadddinngggg2");

    this.setState({userarr:Object.values(boards)})
    this.setState({refs5:false})

  }
  Jobsupdate = (querySnapshot) => {
    this.setState({refs1:true})

    const boards = [];
    querySnapshot.forEach((doc) => {
      boards.push(doc.data());
    });
    console.log("loadddinngggg3");

    this.setState({jobsarray: Object.values(boards)})
    this.setState({refs1:false})

  }

  Businessupdate = (querySnapshot) => {
    this.setState({refs2:true})

    const boards = [];
    querySnapshot.forEach((doc) => {
      boards.push(doc.data());
    });
  console.log("loadddinngggg1");
    this.setState({dataArray:boards})
    this.setState({refs2:false})

  }


  renderItem(item) {
    return (
      <LCard navigation={navigation}
        pimg={{uri:'https://image.freepik.com/free-vector/pharmacy-logo-vector_23987-171.jpg'}}

  name={item.title}
/>
    );
  }

  onRefresh = () => {
    this.setState({
      posts: [],
      isLoading: false,
      refreshing: true,
      seed: 1,
      page: 1,
    });
    // this.fetchData();
  };

  loadMore = () => {
    this.setState({
      // refreshing: true,
      page: this.state.page + 1,
    });
    // this.fetchData();
  };
  firstSearch=()=> {
    this.searchDirectory(firebaseApp.database().ref(`Ads`));
  }



searchDirectory=(itemsRef)=> {

var searchText = this.state.searchText.toString();

if (searchText == ""){
  this.listenForItems(itemsRef);
}else{
  itemsRef.orderByChild("title").startAt(searchText).endAt(searchText).on('value', (snap) => {

  let  items = [];
    snap.forEach((child) => {
      items.push({
        title: child.val().title,
        img: child.val().img[0],
        typeofservice: child.val().typeofservice,
      });
    });


    this.setState({
    dataProvider: this.state.dataProvider.cloneWithRows(items)
    });

  });
}

}
render(){

  const {navigation}=this.props
  return (
    <ThemeContext.Consumer>
      {theme => (
        <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading..'}
          textStyle={{fontFamily: 'cairoreg',color: 'white'}}

        />
        <Header searchBar rounded style={{backgroundColor: 'white'}}>

        <Left>
        <TouchableOpacity onPress={()=>navigation.goBack()}>

          <Icon name="arrow-back" />
          </TouchableOpacity>

        </Left>
            <Body />
            <Right />
              </Header>

        <SearchBar
      placeholder={this.props.appStore.arabic?'ابحث عن مستخدم, خدمة, عمل او مشروع..':"Search for users, Service, business, offer, jobs.."}
      platform="android"
      onChangeText={(text) => this.setState({searchText:text})}
      value={this.state.searchText}
      onSubmitEditing={this.searchFilterFunction}
    />
    <Tabs   style={{marginBottom: 10}} tabBarUnderlineStyle={{backgroundColor:'#eb144c'}}>
    <Tab heading={this.props.appStore.arabic?'اشخاص':"Users"}  textStyle={{color:'black',fontFamily: 'ralewaysemi'}}  tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color:'#eb144c'}}>

 {this.state.refs5?<View style={{flex:1}}>
   <ActivityIndicator />
   </View>:
   this.state.userarr.length==0?<View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
   <Image style={{width: 200,height: 200,alignItems: 'center',resizeMode: 'contain'}} source={{uri:'https://i.ibb.co/YR9xBQ6/3255469.jpg'}} />
   <Text style={{fontSize: 15,fontFamily: 'ralewaysemi',textAlign: 'center'}}> {this.props.appStore.arabic?'ابحث عن رجل اعمال, مدرس, ..الخ حول العالم':'Find entrepreneurs, Teachers ..etc around the World'}</Text>
   <Text style={{fontSize: 15,fontFamily: 'ralewaymedium',textAlign: 'center'}}> {this.props.appStore.arabic?'ابخث عن اشخاص حسب مهنتهم':'Search for people by their career'}</Text>

   <Button onPress={()=>navigation.navigate('Career')} block style={{marginVertical: 15,alignSelf: 'center',justifyContent: 'center'
     ,alignItems: 'center',padding: 20,width: '90%',borderRadius: 10,backgroundColor: '#eb144c'}}>
   <Text style={{fontSize: 12,fontFamily: 'ralewaymedium',color: 'white'}}>{this.props.appStore.arabic?'ابدأ الان':'GET STARTED'}</Text>
     </Button>
     </View>:
   <List >
   {this.state.userarr.map((item, index) => {




     return(
       <ListItem avatar button onPress={()=>navigation.navigate('Userprofile',{id:item.writerId})}>
                     <Left>
                     <Thumbnail source={{ uri: item.proimg}} />

                     </Left>
                     <Body>
                       <Text>{item.user}</Text>
                       <Text note>{item.career}</Text>
                     </Body>
                     <Right>
                       <Text note>{item.typeofservice}</Text>
                     </Right>
                   </ListItem>

     )})}


 </List> }
    </Tab>
     <Tab heading={this.props.appStore.arabic?'وظائف':"Jobs"}  textStyle={{color:'black',fontFamily: 'ralewaysemi'}}  tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color:'#eb144c'}}>

{this.state.refs1?<View style={{flex:1}}>
    <ActivityIndicator />
    </View>:
       <ShowScroller arabic={this.props.appStore.arabic}  navigation={this.props.navigation} dataset={this.state.jobsarray} type="latest" />
}
     </Tab>
     <Tab heading={this.props.appStore.arabic?'خدمات':"Services"}  textStyle={{color:'black',fontFamily: 'ralewaysemi'}} tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color:'#eb144c'}}>
     {this.state.refs?
       <View style={{flex:1}}>
           <ActivityIndicator />
           </View>:
     <ShowScroller arabic={this.props.appStore.arabic} navigation={this.props.navigation} dataset={this.state.servicearr} type="latest" />
   }
     </Tab>
     <Tab heading={this.props.appStore.arabic?'اعمال':"Business"} textStyle={{color:'black',fontFamily: 'ralewaysemi'}} tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color:'#eb144c'}}>
     {this.state.refs2?
       <View style={{flex:1}}>
           <ActivityIndicator />
           </View>:
     <ShowScroller arabic={this.props.appStore.arabic}  navigation={this.props.navigation} dataset={this.state.dataArray} type="latest" />
}
     </Tab>
   </Tabs>


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
    width: Dimensions.get('window').width,

  },
  container: {
  flex:1
  },
  item: {
      width: Dimensions.get('window').width * 0.25,
      height: 100,margin: 10,
      borderWidth: 1,
      borderColor: "lightgray",
      alignItems: 'center',
      justifyContent: 'center'
  },
  itemIcon: {
      width: 50,
      height: 50,
      resizeMode: 'cover'
  },
  itemTitle: {
      marginTop: 16,textAlign: 'center'
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
    flex:1,

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
export default Searchscreens;
