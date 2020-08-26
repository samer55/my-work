import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Image, StyleSheet, View ,Text,TouchableOpacity,ScrollView} from 'react-native';
import { Button ,Thumbnail} from 'native-base';
import Product from '../components/Product'
import BCard from '../components/BusinessCard'
import LCard from '../components/latestcard'

import Card from '../components/slidescard'
const ShowScrollers = ({ dataset, type ,cats,navPress,navigation,types,busref,serref,jobref,renderFooter,retrieveMore,refreshing}) => {
  const dataArray = Object.values(dataset);

  return (
    <ScrollView horizontal={type=="latest"?false:true} showsHorizontalScrollIndicator={false} style={{padding: 10}}>
    {dataArray.map((item)=>{
      let renderItem =  <Card type={item.type} name={item.Htitle} image={item.backimg} cat={item.Categories} by={item.user} data={item} navigation={navigation}/>;


        if (type=="company") {
        renderItem = (
        <TouchableOpacity onPress={()=>navigation.navigate('BusinessProfile',{data:item})} style={{flex:1,justifyContent: 'space-around',alignItems: 'center',marginHorizontal: 10,width:150}}>
        {item.proimg&&item.proimg.length>0?  <Thumbnail large   source={{uri:item.proimg}} />
:  <Thumbnail large navigation={navigation}  source={{uri:'https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-4.png'}} />
}
<Text>{item.Businessname}</Text>
<Text numberOfLines={1} >{item.Categories}</Text>

        </TouchableOpacity>
        );
      }
    else  if (type=="cate") {
          renderItem = (
          <TouchableOpacity onPress={()=>navigation.navigate('BusinessProfile',{data:item})} style={{flex:1,justifyContent: 'space-around',alignItems: 'center',marginHorizontal: 10}}>
          {item.proimg&&item.proimg.length>0?  <Thumbnail large square  source={{uri:item.proimg}} />
:  <Thumbnail large navigation={navigation}  source={{uri:'https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-4.png'}} />
}
<Text>{item.Businessname}</Text>
<Text >{item.Categories}</Text>

          </TouchableOpacity>
          );
        }
    else  if  (cats=="Product") {
          renderItem = (
        <Product data={item}  navigation={navigation} name={item.name} imageSrc={item.image} price={item.type} store={item.store}/>
      )
      }
    else  if  (type=="local") {
          renderItem = (
        <BCard  navigation={navigation} image={item.backimg}
          pimg={item.proimg}
data={item}
          show={false}
  name={item.Businessname}
  type={item.Categories}/>
      )
      }
    else  if  (type=="latest") {
          renderItem = (
        <LCard navigation={navigation}
          pimg={{uri:'https://image.freepik.com/free-vector/pharmacy-logo-vector_23987-171.jpg'}}
image={item.proimg}
data={item}
nav={item.Businessname?"BusinessProfile":item.servicetitle?"OfferPage":"Job"}
          show={false}
          datast={item}
  name={item.Businessname?item.Businessname:item.servicetitle?item.servicetitle:item.Htitle}
  type={item.Categories}/>
      )
      }
      else  if  (type=="dash") {
            renderItem = (
          <LCard navigation={navigation}
            pimg={{uri:'https://image.freepik.com/free-vector/pharmacy-logo-vector_23987-171.jpg'}}
 image={item.image}
 data={item}
 dash
 datast={item}

            show={false}
    name={item.name}
    type={item.type}/>
        )
        }
        else  if  (type==="local service") {

              renderItem = item.type=='local'?(
        <Card     data={item}        datast={item}
type={item.price} name={item.servicetitle} image={item.backimg} cat={item.Categories} by={item.user} navigation={navigation}/>
      ):null

}
else  if  (type==="service") {

      renderItem = (
<Card     data={item}        datast={item}
type={item.price} name={item.servicetitle} image={item.backimg} cat={item.Categories} by={item.user} navigation={navigation}/>
)

}
else  if  (type==="special") {

      renderItem = item.type=='talent'?(
<Card        data={item}     datast={item}
type={item.price} name={item.servicetitle} image={item.backimg} cat={item.Categories} by={item.user} navigation={navigation}/>
):null

}
else  if  (type==="Jobs") {

    renderItem = (
<Card        data={item} job={true}    datast={item}
type={item.price} name={item.Htitle} image={item.backimg} cat={item.Categories} by={item.user} navigation={navigation}/>
)

}
else  if  (type==="online service") {

      renderItem = item.type=='online'?(
<Card       data={item}      datast={item}
type={item.price} name={item.servicetitle} image={item.backimg} cat={item.Categories} by={item.user} navigation={navigation}/>
):null

}

return renderItem;

    })}
</ScrollView>
  );
};

ShowScrollers.defaultProps = {
  dataset: 'dumbData',
  type: 'rectangle'
};

ShowScrollers.propTypes = {
  // optional
  dataset: PropTypes.string,
  type: PropTypes.string
};

const styles = StyleSheet.create({
  rectangle: {
    height: 131,
    marginRight: 8,
    width: 91
  },
  rectangleImage: {
    height: 131,
    marginRight: 8,
    resizeMode: 'contain',
    width: 91
  },
  round: {
    borderRadius: 48,
    height: 96,
    marginRight: 8,
    width: 96
  },
  roundImage: {
    height: 96,
    marginRight: 8,
    resizeMode: 'contain',
    width: 96
  }
});

export default ShowScrollers;
