import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View ,Image,Dimensions,TouchableOpacity,Alert} from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle } from '../constants';
import { Container, Header, DeckSwiper, Card, CardItem, Thumbnail,  Left, Body, Icon,Button ,Title,Right,Content} from 'native-base';
import Selectmywork from '../components/Selectmywork';
import { firebaseApp } from '../../firebase'

import AutoTypingText from 'react-native-auto-typing-text';
const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen");



const cards = [
  {
    text: 'Card One2',
    name: `اولا: لديك عدة ابواب يرسلها لك اصدقائك اختر الباب وافتحه لتكتشف`,
    image: require('../assets/guide/1.jpeg'),
  },
  {
    text: 'Card One2',
    name: `ثانيا : مجموعة تحديات وبوابات يرسلها لك اصدقائك لكي تتفاعل وتشاركها`,
    image: require('../assets/guide/2.jpeg'),
  },
  {
    text: 'Card One24',
    name: `ثالثا : ارسل باب سري لصديقك ويمكن ايضا ان ترسله بسريه لكي لا يعلم هويتك :)`,
    image: require('../assets/guide/3.jpeg'),
  },
  {
    text: 'Card One43',
    name: `رابعا : يمكنك ارسال تحدي للجميع لكي تبدأ تحدياتك الخاصة`,
    image: require('../assets/guide/4.jpeg'),
  },
  {
    text: 'Card Oner',
    name: `خامسا : يمكنك البحث عن اصدقائك وارسال طلب صداقة من خلال شاشة اكتب لاصدقائك`,
    image: require('../assets/guide/5.jpeg'),
  },
  {
    text: 'Carrd One',
    name: `سادسا : قم بالرد على صارحات وتحديات اصدقائك واقبل التحديات`,
    image: require('../assets/guide/6.jpeg'),
  },
];
// components
import Touch from '../components/Touch';
import { observer,inject } from 'mobx-react'
@inject("appStore") @observer

class NewBusiness extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      balance: 0,secret:'',
      status:'',
      isDatePickerVisible: false,
      code:'',
      dataArray: [],
      setDatePickerVisibility: false,
      myuid:'',
       refreshing: false,
       friendarray:[],
       mapvis:false,
      myusername:'',
      posts:[],
      comp:false,
      friends:[],
      Duration:'date',
      disabled:false,
      userpromo:'',
      reqdata:[],
      businesscount:0,
      load:true,
  not:[],
      check:false,
      Additional: '-------------',
      spinner:false,
    };
    this.currentUserId=''
    this.arrayholder=[]
    this.not=[]
    this.friendsdata=[]
    this.currentusername=''

  }
    onCollectionUpdates = (querySnapshot) => {
if (querySnapshot.data()) {
this.setState({comp:querySnapshot.data().Completed})

}


    }
    componentDidMount(){
      firebaseApp.firestore().collection('profiles').doc(firebaseApp.auth().currentUser.uid).onSnapshot(this.onCollectionUpdates)
      var ref = firebaseApp.firestore().collection('Business').where('writerId', '==', firebaseApp.auth().currentUser.uid).onSnapshot(this.onbusiness)

    }
    onbusiness = (querySnapshot) => {
      let count = 0;

      querySnapshot.forEach((doc) => {
count = count +1
      });
  this.setState({businesscount:count})

    }
    static navigationOptions = ({ navigation,theme= useTheme() }) => ({
  header:null
    });
render(){
  const {navigation}=this.props
  return (
    <Container style={{width: '100%',backgroundColor: gStyle.container['light'].backgroundColor}}>

      <Content>
     <ScrollView>
        <TouchableOpacity onPress={ !this.state.comp?()=>
          Alert.alert(
          this.props.appStore.arabic?'الرجاء اكمال ملفك الشخصي اولا':"Please Complete your profile at first",
          this.props.appStore.arabic?'الرجاء الضغط على اكمال الملف ':"Please Click Complete Profile",
          [
            {text: this.props.appStore.arabic?'لاحقا':'Later', onPress: () => console.log('Ask me later pressed')},
            {text: this.props.appStore.arabic?'اكمال الملف':'complete profile', onPress: ()=>navigation.navigate('Complete')},
          ],
          { cancelable: false }
        )
:this.state.businesscount>=3?()=>alert(this.props.appStore.arabic?`لقد تخطيت الحد الاقصى من المشاريع لديك الان ${this.state.businesscount} مشاريع`:`You have exceeded the maximum number of projects you have now ${this.state.businesscount} Project`):()=>navigation.navigate('Startnew')} style={{width:'95%',flex:1,flexDirection: 'row',padding: 12,    shadowColor: '#4a4a4a',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            shadowOffset: {
              height: 0.5,
              width: 1
            },
            //android
            elevation:1,
            flex: 1,
            marginVertical: 10,
            marginTop: 40,


    alignSelf: 'center',
            marginHorizontal: 10,
            borderRadius: 10}}>
  <View style={{width:'100%',flex:2,marginHorizontal: 5}}>
  <Thumbnail square  source={{uri:'https://i.ibb.co/ZKg5CX4/business-and-trade-2.png'}} />
  </View>
  <View style={{width:'100%',flex:8}}>
  <Text style={{fontFamily: 'ralewaysemi',fontSize: 21}}>{this.props.appStore.arabic?'ابدأ مشروع جديد':'Start New Business'}</Text>
  <Text style={{fontFamily: 'ralewaymedium',fontSize: 15}}>{this.props.appStore.arabic?'افتح شركة, مقدم خدمات, متجر محلي, مشروع محلي':'Open Company, Service Provider, Local Store, Local Business'}</Text>

  </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={  !this.state.comp?()=>
          Alert.alert(
          this.props.appStore.arabic?'الرجاء اكمال ملفك الشخصي اولا':"Please Complete your profile at first",
          this.props.appStore.arabic?'الرجاء الضغط على اكمال الملف ':"Please Click Complete Profile",
          [
            {text: this.props.appStore.arabic?'لاحقا':'Later', onPress: () => console.log('Ask me later pressed')},
            {text: this.props.appStore.arabic?'اكمال الملف':'complete profile', onPress: ()=>navigation.navigate('Complete')},
          ],
          { cancelable: false }
        )
: ()=>navigation.navigate('OfferService')} style={{width:'95%',flex:1,flexDirection: 'row',padding: 12,    shadowColor: '#4a4a4a',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: {
          height: 0.5,
          width: 1
        },
        //android
        elevation:1,
        flex: 1,
        marginVertical: 10,


  alignSelf: 'center',
        marginHorizontal: 10,
            borderRadius: 10}}>
  <View style={{width:'100%',flex:2,marginHorizontal: 5}}>
  <Thumbnail square source={{uri:'https://i.ibb.co/2v8pM1Z/operating.png'}} />
  </View>
  <View style={{width:'100%',flex:8}}>
  <Text style={{fontFamily: 'ralewaysemi',fontSize: 21}}>{this.props.appStore.arabic?'اعرض خدمة معينة':'Offer Service'}</Text>
  <Text style={{fontFamily: 'ralewaymedium',fontSize: 15}}>{this.props.appStore.arabic?'خدمة محلية /اونلاين مثال: تنظيف, تصليح, تسويق, برمجة, عمل مكياج..':'Local/online Services e.g: cleaning, drawing, developing...'}</Text>

  </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={ !this.state.comp?()=>
          Alert.alert(
          this.props.appStore.arabic?'الرجاء اكمال ملفك الشخصي اولا':"Please Complete your profile at first",
          this.props.appStore.arabic?'الرجاء الضغط على اكمال الملف ':"Please Click Complete Profile",
          [
            {text: this.props.appStore.arabic?'لاحقا':'Later', onPress: () => console.log('Ask me later pressed')},
            {text: this.props.appStore.arabic?'اكمال الملف':'complete profile', onPress: ()=>navigation.navigate('Complete')},
          ],
          { cancelable: false }
        )
:()=>navigation.navigate('Specialoffer')} style={{width:'95%',flex:1,flexDirection: 'row',padding: 12,    shadowColor: '#4a4a4a',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: {
          height: 0.5,
          width: 1
        },
        //android
        elevation:1,
        flex: 1,
        marginVertical: 10,


  alignSelf: 'center',
        marginHorizontal: 10,
            borderRadius: 10}}>
  <View style={{width:'100%',flex:2,marginHorizontal: 5}}>
  <Thumbnail square source={{uri:'https://i.ibb.co/ww3HzhM/open-24-hours.png'}} />
  </View>
  <View style={{width:'100%',flex:8}}>
  <Text style={{fontFamily: 'ralewaysemi',fontSize: 21}}>{this.props.appStore.arabic?'اعرض خدمة خاصة':'Offer Special Skills'}</Text>
  <Text style={{fontFamily: 'ralewaymedium',fontSize: 15}}>{this.props.appStore.arabic?'اعرض خدمة او موهبة انت بارع بها مثل الرسم, الرقص, لغة معينة انت بارع بها..':'Post Something you really good, Special, Talented.'}</Text>

  </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={ !this.state.comp?()=>
          Alert.alert(
          this.props.appStore.arabic?'الرجاء اكمال ملفك الشخصي اولا':"Please Complete your profile at first",
          this.props.appStore.arabic?'الرجاء الضغط على اكمال الملف ':"Please Click Complete Profile",
          [
            {text: this.props.appStore.arabic?'لاحقا':'Later', onPress: () => console.log('Ask me later pressed')},
            {text: this.props.appStore.arabic?'اكمال الملف':'complete profile', onPress: ()=>navigation.navigate('Complete')},
          ],
          { cancelable: false }
        )
:()=>navigation.navigate('Hire')} style={{width:'95%',flex:1,flexDirection: 'row',padding: 12,    shadowColor: '#4a4a4a',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: {
          height: 0.5,
          width: 1
        },
        //android
        elevation:1,
        flex: 1,
        marginVertical: 10,


      alignSelf: 'center',
        marginHorizontal: 10,
            borderRadius: 10}}>
  <View style={{width:'100%',flex:2,marginHorizontal: 5}}>
  <Thumbnail square source={{uri:'https://i.ibb.co/hKXDKsc/search-1.png'}} />
  </View>
  <View style={{width:'100%',flex:8}}>
  <Text style={{fontFamily: 'ralewaysemi',fontSize: 21}}>{this.props.appStore.arabic?'انشر وظيفة':'post a job'}</Text>
  <Text style={{fontFamily: 'ralewaymedium',fontSize: 15}}>{this.props.appStore.arabic?'وظف شخصا لعملك':'Hire someone for you business'}</Text>

  </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>alert('Not Available at this moment')} style={{width:'95%',flex:1,flexDirection: 'row',padding: 12,    shadowColor: '#4a4a4a',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: {
          height: 0.2,
          width: 1
        },
        //android
        elevation:1,
        flex: 1,
        marginVertical: 10,


  alignSelf: 'center',
        marginHorizontal: 10,
            borderRadius: 10}}>
  <View style={{width:'100%',flex:2,marginHorizontal: 5}}>
  <Thumbnail square source={{uri:'https://i.ibb.co/3BtJ4Tp/shop-2.png'}} />
  </View>
  <View style={{width:'100%',flex:8}}>
  <Text style={{fontFamily: 'ralewaysemi',fontSize: 21}}>{this.props.appStore.arabic?'افتح متجرك الخاص':'Open online store'}</Text>
  <Text style={{fontFamily: 'ralewaymedium',fontSize: 17}}>{this.props.appStore.arabic?'متجر اونلاين, تطوير موقع او تطبيق لمتجرك':'Online Store, Mobile/Web store building'}</Text>

  </View>
        </TouchableOpacity>
    </ScrollView>

      </Content>

     </Container>
  );
};
}


export default NewBusiness;
