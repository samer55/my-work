import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground,
  TouchableOpacity,
  Text as NativeText,
  View,
  Share as Shared,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import { colors, gStyle, images } from '../constants';
import { Button ,Thumbnail} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firebaseApp } from '../../firebase'
import moment from 'moment';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
// components
import * as Permissions from 'expo-permissions';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { ViewPropTypes, BackgroundImage, withTheme } from './config';
import { AntDesign } from '@expo/vector-icons';
import ReadMore from 'react-native-read-more-text';
import { FontAwesome } from '@expo/vector-icons';

import Hyperlink from 'react-native-hyperlink';

import Text from './text/Text';

const Pcard = props => {
  const {
    title,
    icon,
    price,
    per,
    av,
    caption,
    nav,
    show,
    imageSrc,
    onfirst,
    name,
    body,
    onsecond,
    onthird,
    offer,
    theme,
    incs,
    onPresss,
    laugh,
    sad,
    firstno,
    secondno,
    image,
    thirdno,
    dis,
    onPress,challenge,
    datas,
    details,
    containerStyle,
    imageContainerStyle,
    overlayContainerStyle,
    love,
    iconContainerStyle,
    user,
    data,
    navigation,
    titleStyle,
    dash,
    datast,services,
    jobs,
    nolikes,
    onLike,
    laughed,
    onUnlike,
    nodis,
    inArray,
    nolaugh,
    type,
    pimg,
    nosad,
    arabic,
    captionStyle,mprice,
    lie,
    ImageComponent,
    ...attributes
  } = props;

  const {
    width = Dimensions.get('window').width,
    height = width * 0.7
  } = props;
  const trLocale = require('moment/locale/ar');
function dele(){
  firebaseApp.database().ref('Posts/' + data.postuid).on('value', function(snapshot) {
snapshot.ref.remove();
})
if (show) {
  navigation.goBack()
}
}
  const timeString = moment().locale('ar',trLocale).fromNow();
  const [clicked, setclick] = useState(false)


      useEffect(() => {
         // Update the document title using the browser API
       });
  const sharesocial= async () => {
    setclick(false)

     try {
       const result = await Shared.share({
         message: `
        ${data.type}  ${data.user}
      لمشاهدة الرد حمل التطبيق على الاندرويد
         https://play.google.com/store/apps/details?id=com.opentiq.secretdoor
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
   const imgsafe= async () => {
     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {

alert('الرجاء السماح للوصول للصور لحفظ المنشور')          }else {
  try {

    let result = await captureRef(this.seconddoors, {
      format: 'png',
    });

    let saveResult = await MediaLibrary.saveToLibraryAsync(result, 'photo');
    console.log(saveResult);
    Alert.alert(
    'تم حفظ المنشور في معرض الصور',
    'يمكنك ارسال الصورة لاصدقائك او مشاركة عبر التواصل الاجتماعي',
    [
      {text: 'الرجوع', onPress: () => console.log('Ask me later pressed')},
      {text: 'مشاركة عبر التواصل', onPress: sharesocial},
    ],
    { cancelable: false }
  )
    setclick(false)

  }
  catch(snapshotError) {
    console.error(snapshotError);
  }
}
     setclick(false)

    }
    const styles = StyleSheet.create({
    head:{
      flex:1,
      flexDirection: 'row',
  borderRadius: 20,

      backgroundColor: 'white',

    },
    profile:{
      flex:8,
      flexDirection: 'row',
      justifyContent: 'flex-start',
        borderRadius: 20,
      alignItems: 'center'
    },
    edit:{
      flex:2,
alignItems: 'center',justifyContent: 'center'
    },
    edits:{
      flex:2,

      justifyContent: 'center',
      alignItems: 'flex-end'
    },
    pimg:{
      flex:2,
  borderRadius: 20,

    },
    footericon:{
      flex:8,

      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexDirection: 'row'
    },
    iconname:{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-around',

      alignItems: 'center'
    },
    likesname:{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'flex-start',

      alignItems: 'center'
    },
    names:{
      flex:8,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
padding: 19,
      flexDirection: 'column'
    },
    body:{

      flex:1,

    },
    likes:{
      color:'red',
      marginHorizontal: 10
    },
    comment:{
      color:'black',
        marginHorizontal: 10
    },
    name:{
      fontFamily: 'ralewaysemi',
      marginVertical: 2
    },
    time:{
      fontFamily: 'ralewaymedium',
      fontSize: 12
    },
    image:{
      width: width-50,
      minHeight:  150,
      alignSelf: 'center',
      resizeMode: 'cover',

      borderRadius: 9,

    }
    });



  return (
    <TouchableOpacity
      style={{
        width: width-20 ,
        backgroundColor:'#fff',

        shadowColor: '#4a4a4a',
        shadowOpacity: 0.2,
        shadowRadius: 20,
       shadowOffset: {
          height: 1,
          width: 0
        },
        //android
        elevation:2,
height: undefined,

flex:1,
        marginVertical: 5,


alignSelf: 'center',
        marginHorizontal: 10,
        borderRadius: 20
      }}
onPress={()=>navigation.navigate('Userprofile',{id:data.writerId})}
    >

      <View style={styles.head}>
<View style={styles.profile}>
<View style={[styles.pimg,{marginRight: 5}]}>
  <Thumbnail    style={{flex:1 , borderRadius: 20,marginRight: 5,}} source={{uri:image}} />
  </View>
<View style={[styles.names]}>
<View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',width: '100%'}}>
<Text style={styles.name} numberOfLines={1}>{datast.user}</Text>

{datast.verfied?<MaterialIcons name='verified-user' size={15} style={{marginRight: 5}} color="green"/>
:null}
</View>
<Text style={[styles.time,{fontFamily: 'ralewaymedium'}]}>{arabic?datast.careerar:datast.career}</Text>

{false?<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
<FontAwesome name='eye' size={15} style={{marginRight: 5}} color="black"/>

<Text style={styles.time}  numberOfLines={1}>153242</Text>

</View>:datast.country&&datast.country.length>0?<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
<FontAwesome name='map-marker' size={15} style={{marginRight: 5}} color="green"/>

<Text style={styles.time}  numberOfLines={1}>{datast.country}</Text>

</View>:null}
{true?<Text style={[styles.time,{fontFamily: 'ralewaymedium',color: '#eb144c'}]}>{datast.typeofservice=='local'?arabic?'محلي':'Local':datast.typeofservice=='talent'?arabic?'مواهب':'Talent':datast.typeofservice=='online'?arabic?'اونلاين':'Online':datast.typeofservice}</Text>:null}
</View>
</View>

      </View>



    </TouchableOpacity>
  );
function  _renderTruncatedFooter(handlePress) {
    return (
      <Text style={{ color: 'white', marginTop: 5,fontFamily: 'cairobold'}} onPress={handlePress}>
        اقرا اكثر..
      </Text>
    );
  };
function  _renderRevealedFooter (handlePress){
    return (
      <Text style={{ color: 'white', marginTop: 5,fontFamily: 'cairobold' }} onPress={handlePress}>
      اقرأ اقل..
      </Text>
    );
  };
};

Pcard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.object,
  caption: PropTypes.node,
  imageSrc: Image.propTypes.source,
  onPress: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  iconContainerStyle: ViewPropTypes.style,
  imageContainerStyle: ViewPropTypes.style,
  overlayContainerStyle: ViewPropTypes.style,
  titleStyle: NativeText.propTypes.style,
  captionStyle: NativeText.propTypes.style,
  width: PropTypes.number,
  height: PropTypes.number,
  ImageComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

Pcard.defaultProps = {
  ImageComponent: BackgroundImage
};

export default Pcard;
