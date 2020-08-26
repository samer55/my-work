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
import { Button ,Thumbnail,ActionSheet} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firebaseApp } from '../../firebase'
import moment from 'moment';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
// components
import * as Permissions from 'expo-permissions';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Lightbox from 'react-native-lightbox';

import { ViewPropTypes, BackgroundImage, withTheme } from './config';
import { AntDesign } from '@expo/vector-icons';
import ReadMore from 'react-native-read-more-text';
var BUTTONS = ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

import Hyperlink from 'react-native-hyperlink';

import Text from './text/Text';

const Card = props => {
  const {
    title,
    icon,
    price,
    caption,
    arabic,
    show,
    imageSrc,
    onfirst,
    name,
    body,
    onsecond,
    onthird,
    theme,
    date,
    incs,
    onPresss,
    laugh,
    sad,
    firstno,
    secondno,
    image,
    thirdno,
    heartname,
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
    nolikes,
    onLike,
    laughed,
    onUnlike,
    nodis,
    inArray,
    nolaugh,
    pimg,
    nosad,
    id,
    captionStyle,
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
  const timeString = moment(date).fromNow();
  const [clicked, setclick] = useState(false)
  const [me, setme] = useState(false)


      useEffect(() => {
        if (data.writerId==firebaseApp.auth().currentUser.uid||data.writerId==id) {
          setme(true)
        }
         // Update the document title using the browser API
       });
  const sharesocial= async () => {
    setclick(false)

     try {
       const result = await Shared.share({
         message: `
          ${data.user}
      ${data.post}

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
  const  deletepost=()=>{
    Alert.alert(
  arabic?'هل انت متاكد من حذفك للمنشور':'Are you sure you want to delete this post',
    arabic?'بالضغط على نعم سيتم حذف منشورك':'By clicking yes you sure you want to delete this post',
    [
      {text: arabic?'الغاء':'cancel', onPress: () => console.log('Ask me later pressed')},
      {text: arabic?'نعم':'Yes', onPress: ()=>firebaseApp.firestore().collection('Posts').doc(data.postuid).delete()},
    ],
    { cancelable: false }
  )



    }
    const styles = StyleSheet.create({
    head:{
      flex:1,
      flexDirection: 'row',
    },
    profile:{
      flex:9,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    edit:{
      flex:1,

      justifyContent: 'center',
      alignItems: 'center'
    },
    edits:{
      flex:2,

      justifyContent: 'center',
      alignItems: 'flex-end'
    },
    pimg:{
      flex:2,


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
padding: 10,
      flexDirection: 'column'
    },
    body:{
      paddingVertical: 20,
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
      width: '100%',
      height: 200,
      resizeMode: 'contain',
      flex:1,
      borderRadius: 40,
      marginTop: 10
    }
    });



  return (
    <View
      style={{
        width: width-20 ,
        backgroundColor:'#fff',

        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: {
          height: 0.5,
          width: 0
        },
        borderWidth: 0,
        //android
        elevation: 5,
        flex: 1,
        marginVertical: 5,

alignSelf: 'center',
        padding: 20,
        borderRadius: 9
      }}

    >
      <View style={styles.head}>
<View style={styles.profile}>
<View style={styles.pimg}>
  <Thumbnail small square borderRadius={9} style={{borderRadius: 9,width: '100%'}} source={pimg} />
  </View>
<TouchableOpacity onPress={data.business?()=>navigation.navigate('BusinessProfile',{carduid:data.writerId,card:true}):()=>navigation.navigate('Userprofile',{id:data.writerId})} style={styles.names}>
<Text style={styles.name}>{name}</Text>
<Text style={styles.time}>{data.createdAt?moment(data.createdAt.toDate()).locale(arabic?'ar':'en').fromNow():''}</Text>

</TouchableOpacity>
</View>
{me?<TouchableOpacity onPress={()=>navigation.navigate('New',{data,id:data.postuid,edit:true})}  style={styles.edit}>
<Feather name='more-horizontal' size={20} color="#000000"/>
</TouchableOpacity>:null}
{me?<TouchableOpacity onPress={deletepost}  style={styles.edit}>
<Ionicons name='md-close' size={20} color="#000000"/>
</TouchableOpacity>:null}
      </View>

      <View style={styles.body}>
      <View style={{flex:1}}>
<Text styles={styles.textbody}>{body}</Text>
</View>
{data.image&&data.image.length>0?
  <Lightbox underlayColor="white">

  <Image style={styles.image} source={{uri:data.image}}/>
  </Lightbox>

  :null}
      </View>
      <View style={styles.head}>
      {/*footer here*/}
      <View style={styles.footericon}>
      <TouchableOpacity onPress={onLike} style={styles.likesname}>
      <MaterialCommunityIcons name={heartname} size={20} color="red" style={{marginHorizontal: 0}}/>

      <Text style={styles.likes}>{data.nooflike.length} {arabic?'لايك':'likes'}</Text>
      </TouchableOpacity >
      <TouchableOpacity onPress={()=>navigation.navigate('List',{postuid:data.postuid,data})} style={styles.likesname}>
      <MaterialCommunityIcons name='comment-text-multiple-outline' size={20} color="#000000"/>

      <Text style={styles.comment}>{data.noofcomment} {arabic?'تعليق':'comments'}</Text>

      </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={sharesocial} style={styles.edits}>

      <MaterialCommunityIcons name='share' size={20} color="#000000"/>
      </TouchableOpacity>


      </View>

    </View>
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

Card.propTypes = {
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

Card.defaultProps = {
  ImageComponent: BackgroundImage
};

export default Card;
