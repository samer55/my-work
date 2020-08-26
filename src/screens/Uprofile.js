import React, { useState ,useEffect,useContext} from 'react';
import { Image, ScrollView, Text, View,Dimensions,TouchableOpacity,Linking,StatusBar ,AsyncStorage} from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import { firebaseApp } from '../../firebase'
import Trainer from '../components/Trainer';
import Complete from './Complete';

const headerImage = __DEV__ ? 'rabbitDev' : 'rabbitProd';
import Touch from '../components/Touch';
import User from '../components/user';
import { Container, Header, Content, Button, ListItem, Icon, Left, Body, Right, Switch ,Title,Badge,CheckBox,Picker,Form} from 'native-base';
import SwipeablePanel from 'rn-swipeable-panel';
import Spinner from 'react-native-loading-spinner-overlay';

import { observer,inject } from 'mobx-react'
@inject("appStore") @observer

export default class extends React.Component {
  static navigationOptions = ({ navigation,theme= useTheme() }) => ({
  header:null
  });
  constructor(props) {
    super(props);
    this.state = {
        modal: false,
        name:'',
 selected: props.appStore.currency,
        username:'',
        mail: '',
        balance:'',
        names:'',
        spinner:false,
        business:[firebaseApp.auth().currentUser.uid],
        comp:false,
        count:0,
        dataSources: [],
        upro:'',
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


  }
   openPanel = () => {
this.setState({modal:true})
  };

  closePanel = () => {
   this.setState({modal:false})
  };


      onCollectionUpdates = (querySnapshot) => {
if (querySnapshot.data()) {
  this.setState({comp:querySnapshot.data().Completed,upro:querySnapshot.data().proimg})

}


      }
      onValueChange(value: string) {
  this.setState({
    selected: value
  });
  AsyncStorage.setItem('curr', value);
  this.props.appStore.currency=value

}
componentDidMount(){
  this.setState({spinner:true})
  firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid).onSnapshot(this.onCollectionUpdate)
      var ref = firebaseApp.firestore().collection('Business').where('writerId', '==', firebaseApp.auth().currentUser.uid).onSnapshot(this.onbusiness)
      firebaseApp.firestore().collection('profiles').doc(firebaseApp.auth().currentUser.uid).onSnapshot(this.onCollectionUpdates)
      firebaseApp.firestore().collection('Orders').where('Provideruid','in',this.state.business).onSnapshot(this.ordercount)


}

  onCollectionUpdate = (querySnapshot) => {
    this.setState({username:querySnapshot.data().username,names:querySnapshot.data().name,mail:querySnapshot.data().email,balance:querySnapshot.data().balance})



  }
  logout=()=>{
    firebaseApp
      .auth()
      .signOut()
      .then(
        () => {
          this.props.navigation.navigate('loading');
        },
        function(error) {
          console.log(error);
        }
      );
  }
    ordercount = (querySnapshot) => {
      const boards = [];

      querySnapshot.forEach((doc) => {
        if (doc.data().Status=='Pending') {
          boards.push(doc.data().postuid);

        }

      });
      this.setState({count:boards.length})
  this.setState({spinner:false})
    }
  onbusiness = (querySnapshot) => {
    const boards = [];

    querySnapshot.forEach((doc) => {
      boards.push(doc.data().postuid);

    });
let ss =this.state.business.concat(boards)
this.setState({business:this.state.business.concat(boards)})

  }
  render(){
    const {navigation}=this.props
  return (
    <View style={{flex:1}}>
    <Spinner
           visible={this.state.spinner}
          textContent={this.props.appStore.arabic?'جاري التحميل..':'Loading..'}
           textStyle={{color:'#fff'}}
         />
    <Header searchBar rounded style={{backgroundColor: gStyle.container['light'].backgroundColor}}>

             <Body>
               <Title style={{color:'black'}}>{this.props.appStore.arabic?'الملف الشخصي':'Profile'}</Title>
             </Body>
             <Right>
               <Icon active name="settings" type="MaterialCommunityIcons" onPress={()=>navigation.navigate('Settings',{arabic:this.props.appStore.arabic})}/>
             </Right>
</Header>
    <ScrollView
      contentContainerStyle={gStyle.contentContainerss}
      style={gStyle.container['light']}
    >
<StatusBar hidden={true} />
    <Trainer
      theme={'light'}
      icon="ios-wifi"
      title={this.state.username}
      imageSrc={this.state.upro&&this.state.upro.length>0?{uri:this.state.upro}:require('../assets/users.png')}
name={this.state.balance}
arabic={this.props.appStore.arabic}
onPress={this.openPanel}
      details={this.state.balance}
      comp={this.state.comp}
    />

      <View style={gStyle.spacer16} />
      <Content style={{width:Dimensions.get('window').width }}>

      <Form style={{width: Dimensions.get('window').width,flexDirection: 'row'}}>

      <Picker
     mode="dropdown"
     iosHeader="Select your SIM"
     iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
     style={{ width: '50%' }}
     selectedValue={this.state.selected}
     onValueChange={this.onValueChange.bind(this)}
    >
     <Picker.Item label={this.props.appStore.arabic?'العملة: $ USD':"Currency: $ USD"} value="$ USD" />
     <Picker.Item label={this.props.appStore.arabic?'العملة: JD(دينار اردني)':"Currency: JD" } value="JD" />
     <Picker.Item label={this.props.appStore.arabic?'العملة: EGP(جنيه مصري)':"Currency: EGP"} value="EGP" />
     <Picker.Item label={this.props.appStore.arabic?'العملة: € EURO':"Currency: € EURO"} value="€ EURO" />
    </Picker>
      </Form>

      <ListItem icon button onPress={()=>{
        let add = !this.props.appStore.arabic
        AsyncStorage.setItem('lang', JSON.stringify(add));
this.props.appStore.arabic=!this.props.appStore.arabic
navigation.navigate('loading')
      }}>
      <Left>
      <Button style={{ backgroundColor: "#eb144c" }} onPress={()=>{
        let add = !this.props.appStore.arabic
        AsyncStorage.setItem('lang', JSON.stringify(add));
this.props.appStore.arabic=!this.props.appStore.arabic
navigation.navigate('loading')

      }}>
        <Icon active name="language" type="FontAwesome"/>
      </Button>

      </Left>
                      <Body>
                  <Text style={{fontFamily: 'cairobold',fontSize: 15,marginHorizontal: 10}}>تغيير اللغة للعربية</Text>
                </Body>
                <Right>
                <CheckBox checked={this.props.appStore.arabic} onPress={()=>{
                  let add = !this.props.appStore.arabic
                  AsyncStorage.setItem('lang',add);
          this.props.appStore.arabic=!this.props.appStore.arabic
          navigation.navigate('loading')

                }}/>
                </Right>
              </ListItem>


              <ListItem icon Button onPress={this.state.business.length==0?()=>alert(this.props.appStore.arabic?'ليس لديك اعمال حاليا':'You do not have any business yet!'):()=>navigation.navigate('Mybusiness',{business:this.state.business})}>
                <Left>
                  <Button style={{ backgroundColor: "gray" }} onPress={this.state.business.length==0?()=>alert(this.props.appStore.arabic?'ليس لديك اعمال حاليا':'You do not have any business yet!'):()=>navigation.navigate('Mybusiness',{business:this.state.business})}>
                    <Icon active name="business" />
                  </Button>
                </Left>
                <Body>
                  <Text style={gStyle.text['light']}>{this.props.appStore.arabic?'ادارة اعمالي':'My Business'}</Text>
                </Body>
                <Right>
                  <Text style={gStyle.text['light']}></Text>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem Button  onPress={()=>navigation.navigate('Myorders',{business:this.state.business})} icon>
                <Left>
                  <Button style={{ backgroundColor: "#37d67a" }} >
                    <Icon active name="ios-clipboard" />
                  </Button>
                </Left>
                <Body>
                  <Text style={gStyle.text['light']}>{this.props.appStore.arabic?'ادارة الطلبات':'Manage Orders'}</Text>
                </Body>
                <Right>
                  <Text style={gStyle.text['light']}></Text>
                  <Badge style={{alignItems: 'center',justifyContent: 'center',marginLeft: 10}}>
              <Text style={{color:'white',marginHorizontal: 2}}>{this.state.count}</Text>
            </Badge>
                </Right>
              </ListItem>
              <ListItem Button  onPress={()=>navigation.navigate('Mypost',{business:this.state.business})} icon>
                <Left>
                  <Button style={{ backgroundColor: "steelblue" }} >
                    <Icon active name="paper" />
                  </Button>
                </Left>
                <Body>
                  <Text style={gStyle.text['light']}>{this.props.appStore.arabic?'منشوراتي':'Posts'}</Text>
                </Body>
                <Right>
                  <Text style={gStyle.text['light']}></Text>
                  <Icon active name="arrow-forward"/>
                </Right>
              </ListItem>
              <ListItem Button  onPress={()=>navigation.navigate('Promote',{business:this.state.business})} icon>
                <Left>
                  <Button style={{ backgroundColor: "#eb144c" }} >
                    <Icon active name="bullhorn" type="FontAwesome" />
                  </Button>
                </Left>
                <Body>
                  <Text style={gStyle.text['light']}>{this.props.appStore.arabic?'ترويج اعلاناتي':'Promote Business'}</Text>
                </Body>
                <Right>
                <Text style={gStyle.text['light']}></Text>
                <Icon active name="arrow-forward"/>

                </Right>
              </ListItem>
              <ListItem Button  onPress={ ()=>navigation.navigate('Myfav')} icon>
                <Left>
                  <Button style={{ backgroundColor: "red" }} >
                    <Icon active name="heart" />
                  </Button>
                </Left>
                <Body>
                  <Text style={gStyle.text['light']}>{this.props.appStore.arabic?'المفضلة':'Favourite'}</Text>
                </Body>
                <Right>
                  <Text style={gStyle.text['light']}></Text>
                  <Icon active name="arrow-forward"/>
                </Right>
              </ListItem>
              <ListItem Button  onPress={ ()=>navigation.navigate('Share',{arabic:this.props.appStore.arabic})} icon>
                <Left>
                  <Button style={{ backgroundColor: "#9c27b0" }} >
                    <Icon active name="gift" />
                  </Button>
                </Left>
                <Body>
                  <Text style={gStyle.text['light']}>{this.props.appStore.arabic?'شارك واجمع النقاط':'Share & Earn'}</Text>
                </Body>
                <Right>
                  <Text style={gStyle.text['light']}></Text>
                  <Icon active name="arrow-forward"/>
                </Right>
              </ListItem>
              <ListItem Button  onPress={() => Linking.openURL(`mailto:info@opentiq.net?subject=${this.props.appStore.arabic?`اريد توثيق رقم ${firebaseApp.auth().currentUser.uid}`:`I want to verficate ID: ${firebaseApp.auth().currentUser.uid}`}&body= ${this.props.appStore.arabic?`اسم ومعلومات العمل الذي تريد توثيقه مع صورة من الهوية:`:`Name of your business with Photo of your id`}`) } icon>
                <Left>
                  <Button style={{ backgroundColor: "steelblue" }} >
                    <Icon active name="verified-user" type="MaterialIcons"/>
                  </Button>
                </Left>
                <Body>
                  <Text style={gStyle.text['light']}>{this.props.appStore.arabic?'توثيق اعمالك ':'Request Verfication'}</Text>
                </Body>
                <Right>
                  <Text style={gStyle.text['light']}></Text>
                  <Icon active name="arrow-forward"/>
                </Right>
              </ListItem>
              <ListItem Button  onPress={()=>navigation.navigate('Contactus')} icon>
                <Left>
                  <Button style={{ backgroundColor: "#000000" }} >
                    <Icon active name="bulb" />
                  </Button>
                </Left>
                <Body>
                  <Text style={gStyle.text['light']}>{this.props.appStore.arabic?'تصميم وتطوير':'Design & Development'}</Text>
                </Body>
                <Right>
                  <Text style={gStyle.text['light']}></Text>
                  <Icon active name="arrow-forward"/>
                </Right>
              </ListItem>

              <ListItem Button  onPress={()=>{
                firebaseApp
                  .auth()
                  .signOut()
                  .then(
                    () => {
                      navigation.navigate('loading');
                    },
                    function(error) {
                      console.log(error);
                    }
                  );
              }} icon>
                <Left>
                  <Button style={{ backgroundColor: "#eb144c" }} >
                  <Icon active name="logout" type="MaterialCommunityIcons"/>
                  </Button>
                </Left>
                <Body>
                  <Text style={gStyle.text['light']}>{this.props.appStore.arabic?'تسجيل الخروج':'Log out'}</Text>
                </Body>
                <Right>
                  <Text style={gStyle.text['light']}></Text>
                  <Icon active name="arrow-forward"/>
                </Right>
              </ListItem>
            </Content>
            <View style={gStyle.spacer16} />

      <Text style={[gStyle.text['light'], gStyle.textPacifico]}>
        Opentiq.com Development
      </Text>

    </ScrollView>
    <SwipeablePanel
             fullWidth
             isActive={this.state.modal}
             onClose={this.closePanel}
             showCloseButton
onlyLarge
openLarge
             onPressCloseButton={this.closePanel}
         >
    <Complete prof={true}/>
  </SwipeablePanel>
    </View>
  );}
};
