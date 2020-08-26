import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View,Image,TouchableOpacity,Dimensions,Share as Shared ,Clipboard,StyleSheet} from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle } from '../constants';
import {  Button,Item,Label,Input,Icon,Header,Title,Left,Right,Body} from 'native-base';
import RNPicker from "rn-modal-picker";
import CountryPicker, {
  getAllCountries
} from 'react-native-country-picker-modal'
import NavigationBack from '../components/NavigationBack';
import { firebaseApp } from '../../firebase'
var voucher_codes = require('voucher-code-generator');
const NORTH_AMERICA = ['CA', 'MX', 'US']

// components
import Touch from '../components/Touch';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
// components
import * as Permissions from 'expo-permissions';

const Career = ({ navigation }) => {
  const theme = useTheme();
  const [cat, setcat] = useState('')
  const [catar, setcatar] = useState('')

  const [mail, setemail] = useState('')
  const [balance, setbalance] = useState('')
  const [arr, setarr] = useState([])
  const [av, setav] = useState(false)
  const [arabic,setarabic]= useState(navigation.getParam('arabic',false))
  const [cca2, setcountry] = useState('Jordan')

  const [coupon, useStates] = useState('')
  const [business, setbusiness] = useState([firebaseApp.auth().currentUser.uid])
function  _selectedValue(index, item) {
  setcat(item.name)
  setcatar(item.ar)
}

  const  onbusiness = (querySnapshot) => {
      const boards = [];

      querySnapshot.forEach((doc) => {

      const newData = boards.filter(item => {
        const itemData = item.name;
         const textData = doc.data().career;
         const textar = doc.data().careerar;
let inde =arabic?textar:textData
         if (itemData&&itemData.indexOf(inde) === -1) {
         return  true
         }else {
         return  false
         }

      });
      let arab=arabic?doc.data().careerar:doc.data().career

        if (newData) {
          boards.push({
      id:doc.data().writerId,
            name:doc.data().career,
          ar:doc.data().careerar});
        }


      });

  setarr(boards)
    }
     useEffect(() => {
       var ref = firebaseApp.firestore().collection('profiles').onSnapshot(onbusiness)





    /** handleWidgets */
//firebaseApp.firestore().collection('Promo').doc("Sers").set({promo:"Sers"})


   }, []);

   var result = arr.reduce((unique, o) => {
       if(!unique.some(obj => obj.name === o.name)) {
         unique.push(o);
       }
       return unique;
   },[]);
  return (
    <View style={{flex:1}}>
    <Header searchBar rounded style={{backgroundColor: gStyle.container[theme].backgroundColor}}>
<Left>
<TouchableOpacity onPress={()=>navigation.goBack()} style={{justifyContent: 'center',alignItems: 'center',borderRadius: 70/2,backgroundColor: 'white',paddingHorizontal: 2}}>

<Icon name='arrow-back' size={40} color="#000000"/>
</TouchableOpacity>
</Left>
             <Body>
               <Title style={{color:'black'}}>{arabic?'مهن المستخدمين':'Users Career'}</Title>
             </Body>

</Header>
    <ScrollView
      contentContainerStyle={gStyle.Centercont}
      style={[gStyle.container[theme]]}
    >

    <Text style={{fontFamily: 'ralewaymedium',fontSize: 21}}>{arabic?'ابحث عن اشخاص حسب المهنة':'Find People by their career'} </Text>
    <Text style={{fontFamily: 'raleway',fontSize: 17,textAlign: 'center',color: '#eb144c',marginVertical: 20}}>{arabic?'اختر المهنة التي تريد ان تبحث عنها حول العالم':'Select Career you looking for and search around the world'}</Text>
    <View style={{flex:1,justifyContent: 'center',alignItems: 'center',marginVertical: 30,flexDirection: 'column',marginHorizontal: 70}}>
    <RNPicker
              dataSource={result}
              dummyDataSource={result}
arabic={arabic}
arabichold={'اختر المهنة'}
              defaultValue={false}
              pickerTitle={arabic?"اختيار المهن":'Career Picker'}
              showSearchBar={true}
              disablePicker={false}
              changeAnimation={"none"}
              searchBarPlaceHolder={arabic?'ابحث..':"Search....."}
              showPickerTitle={true}
              pickerStyle={Styles.pickerStyle}
              itemSeparatorStyle={Styles.itemSeparatorStyle}
              pickerItemTextStyle={Styles.listTextViewStyle}
              selectedLabel={arabic?catar:cat}
              placeHolderLabel={"Select Categories"}
              selectLabelTextStyle={Styles.selectLabelTextStyle}
              placeHolderTextStyle={Styles.placeHolderTextStyle}
              dropDownImageStyle={Styles.dropDownImageStyle}
              selectedValue={(index, item) => _selectedValue(index, item)}
            />
            <View style={{justifyContent: 'space-around',alignItems: 'center',paddingHorizontal: 20,marginVertical: 15,flexDirection: 'row',borderWidth: 0.5,paddingVertical: 15,marginHorizontal: 10}}>

            <View style={{flex:1,flexDirection: 'row',alignItems: 'center'}}>
            <CountryPicker
                    countryList={NORTH_AMERICA}
                    onSelect={(value) => {
                      setcountry(value.name)

                    }}
                    placeholder={arabic?'حدد الدولة':'Select Country'}

                    translation="eng"
                  />
                                  </View>
                                  <Text style={{fontFamily: 'ralewaymedium',color: '#eb144c'}}>{cca2}</Text>
                                  </View>

    <Button onPress={cat.length>0?()=>navigation.navigate('Careerlisting',{career:cat,cca2,careerar:catar}):()=>alert('Please Select category')} block style={{backgroundColor: '#eb144c',padding: 10,marginVertical: 20}}>
                <Text style={{color: '#fff',fontFamily: 'raleway',fontSize: 15}}>{arabic?'ابدأ':`Let's Go`}</Text>
              </Button>

              </View>

    </ScrollView>
    </View>
  );
};
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  itemSeparatorStyle:{
    height: 1,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#D3D3D3"
  },
  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: "row",
    height: 40,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1
    },
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10
  },

  selectLabelTextStyle: {
    color: "#000",
    textAlign: "left",
    width: "99%",
    padding: 10,
    flexDirection: "row"
  },
  placeHolderTextStyle: {
    color: "#D3D3D3",
    padding: 10,
    textAlign: "left",
    width: "99%",
    flexDirection: "row"
  },
  dropDownImageStyle: {
    marginLeft: 10,
    width: 10,
    height: 10,
    alignSelf: "center"
  },
  listTextViewStyle: {
    color: "#000",
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: "left"
  },
  pickerStyle: {
    marginLeft: 21,
    elevation:3,
    paddingRight: 25,
    marginRight: 12,
    marginBottom: 2,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 1,
      height: 1
    },
    borderWidth:1,
    shadowRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 5,
    flexDirection: "row"
  }
});


Career.navigationOptions = ({ navigation }) => ({
header:null
});

Career.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};

export default Career;
