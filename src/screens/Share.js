import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View,Image,TouchableOpacity,Dimensions,Share as Shared ,Clipboard} from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle } from '../constants';
import {  Button,Item,Label,Input,Title,Header,Left,Right,Body,Icon} from 'native-base';

import NavigationBack from '../components/NavigationBack';
import { firebaseApp } from '../../firebase'
var voucher_codes = require('voucher-code-generator');

// components
import Touch from '../components/Touch';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
// components
import * as Permissions from 'expo-permissions';

const Share = ({ navigation }) => {
  const theme = useTheme();
  const [username, setuser] = useState('')
  const [mail, setemail] = useState('')
  const [balance, setbalance] = useState('')
  const [names, setname] = useState('')
  const [av, setav] = useState(false)
  const [arabic, setarabic] = useState( navigation.getParam('arabic',false))
  const [coupon, useStates] = useState('')
  const [business, setbusiness] = useState([firebaseApp.auth().currentUser.uid])

  const  onbusiness = (querySnapshot) => {
      const boards = [];

      querySnapshot.forEach((doc) => {
        boards.push(doc.data().postuid);

      });
  console.log(boards+"   ///////");
  let ss =business.concat(boards)
  setbusiness(business.concat(boards))
    }
     useEffect(() => {
       var ref = firebaseApp.firestore().collection('Business').where('writerId', '==', firebaseApp.auth().currentUser.uid).onSnapshot(onbusiness)

       firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid).onSnapshot((querySnapshot)=>

{

         if (querySnapshot.data().promo&&querySnapshot.data().promo.length>0) {
           setav(true)
           useStates(querySnapshot.data().promo)
setbalance(querySnapshot.data().balance)
         }

       }
       )

    /** handleWidgets */
//firebaseApp.firestore().collection('Promo').doc("Sers").set({promo:"Sers"})


   }, []);
   const sharesocial= async () => {

      try {
        const result = await Shared.share({
          message:arabic?`
          استخدم هذا الكود واحصل على اعلان مجانا لاعمالك داخل التطبيق
          ${coupon}

          لتحميل التطبيق اضغط على الرابط اسفل:
          https://play.google.com/store/apps/details?id=com.opentiq.fekra`: `
           Use this promo code to get free ads in fekra app:
           ${coupon}

       To install the app click on the link bellow:
          https://play.google.com/store/apps/details?id=com.opentiq.fekra
 `,
        });

        if (result.action === Shared.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Shared.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    }

   const sendpromo =()=>{
     var d =voucher_codes.generate({
       length: 4,
       count: 1,


         charset:`${firebaseApp.auth().currentUser.displayName}`

     });
     useStates('promo-'+d);
     let promo ='promo-'+d
     setav(true)

     Clipboard.setString(d.toString());
   alert('Copied')
     firebaseApp.firestore().collection('Promo').doc(promo).set({promo:promo,id:firebaseApp.auth().currentUser.uid})
     firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid).update({promo:promo})

   }
   const copy = (d)=>{
     Clipboard.setString(coupon.toString());
   alert('Copied')
   }
  return (
    <View style={{flex:1}}>
    <Header searchBar rounded style={{backgroundColor: gStyle.container[theme].backgroundColor}}>
<Left>
<TouchableOpacity onPress={()=>navigation.goBack()} style={{justifyContent: 'center',alignItems: 'center',borderRadius: 70/2,backgroundColor: 'white',paddingHorizontal: 2}}>

<Icon name='arrow-back' size={40} color="#000000"/>
</TouchableOpacity>
</Left>
             <Body>
               <Title style={{color:'black'}}>{arabic?'المفضلة':'Favourite'}</Title>
             </Body>

</Header>
    <ScrollView
      contentContainerStyle={gStyle.Centercont}
      style={[gStyle.container[theme]]}
    >
    <Text style={{fontFamily: 'ralewaymedium',fontSize: 34}}> <Text style={{fontFamily: 'ralewaymedium'}}>{balance}</Text></Text>

    <Text style={{fontFamily: 'ralewaymedium',fontSize: 21}}>{arabic?'نقاطك الحالية':'Your current Points'}</Text>
  {av?  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',marginVertical: 30,flexDirection: 'row',marginHorizontal: 70}}>
    <Item floatingLabel>
                 <Label>{arabic?'برومو كود':'Promo code'}</Label>
                 <Input editable={false} value={coupon}/>
               </Item>
               <Button onPress={copy} light><Text> {arabic?'نسخ':'Copy'} </Text></Button>

    </View>:     <Button onPress={sendpromo} large bordered style={{padding: 18,borderColor: '#eb144c',borderRadius: 12,justifyContent: 'center',alignItems: 'center',marginVertical: 10}}><Text style={{color: '#eb144c'}}> {arabic?'احصل على كود':'Get Promo code'} </Text></Button>}
    <Text style={{fontFamily: 'ralewaymedium',fontSize: 17,textAlign: 'center'}}>{arabic?'عندما يستخدم احد هذا الكود عند التسجيل سيحصل على':'When someone use your promo code in signup he will get'} <Text style={{fontWeight: 'bold'}}>500</Text> {arabic?'نقطة وستحصل انت ايضا  على مثلها':'Point and you will get the same'}  </Text>
    <Text style={{fontFamily: 'raleway',fontSize: 17,textAlign: 'center',color: '#eb144c'}}>{arabic?'بواسطة النقاط يمكنك ترويج اعلانك مجانا داخل التطبيق':'With Points you can get promotion for your business in the app'}  </Text>
    <View style={{flex:1,justifyContent: 'center',alignItems: 'center',marginVertical: 30,flexDirection: 'column',marginHorizontal: 70}}>

    <Button onPress={()=>navigation.navigate("Promote",{business,balance})} block style={{backgroundColor: '#eb144c',padding: 10}}>
                <Text style={{color: '#fff',fontFamily: 'raleway',fontSize: 15}}>{arabic?'ترويج اعلاناتك واعمالك':'Promote your business'}</Text>
              </Button>
              <Button onPress={sharesocial} block light style={{padding: 10,marginVertical: 15}}>
                          <Text style={{color: '#000000',fontFamily: 'raleway',fontSize: 15}}>{arabic?'مشاركة':'Share'}</Text>
                        </Button>
              </View>

    </ScrollView>
    </View>
  );
};


Share.navigationOptions = ({ navigation }) => ({
header:null
});

Share.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};

export default Share;
