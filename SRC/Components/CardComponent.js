import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from './CustomButton';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import Color from '../Assets/Utilities/Color';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const CardComponent = ({item}) => {
  // console.log("🚀 ~ CardComponent ~ item===========>:", item)
  return (
    <TouchableOpacity 
    onPress={item?.onPress}
    activeOpacity={0.6}
    
    >
      <LinearGradient style={styles.container} 
      colors={[ "#594524" ,"#3A3C31",]} 
      start={{x:3 ,y:2 }} end={{x:1,y:0}} >
      <View
        style={styles.imagecontainner}>
        <CustomImage
         onPress={item?.onPress}
        resizeMode={'stretch'}
          style={{
            height: '100%',
            width: '100%',
            // tintColor : Color.black
          }}
          source={item?.image}
        />
      </View>
      
      <View>
        <CustomText style={styles.title}>
          {item?.title}
        </CustomText>
        
      </View>
      
      </LinearGradient>
  </TouchableOpacity>
  );
};

export default CardComponent;

const styles = StyleSheet.create({
  container: {
    // overflow:'hidden',
    backgroundColor: Color.white,
    // flexDirection: 'row',
    borderRadius: moderateScale(20, 0.6),
    height: windowHeight * 0.2,
    marginBottom: moderateScale(10, 0.6),
    width: windowWidth * 0.35,
    alignItems: 'center',
    justifyContent:'center',
    // elevation: 6,
    borderColor: Color.white,
    borderWidth:0.99,
    // paddingHorizontal: moderateScale(15, 0.6),
    // backgroundColor :'red',
  },
  // imagecontainer:{
  //   overflow: 'hidden',
  //     flexDirection: 'row',
  //     justifyContent:"flex-end",
  // width:windowWidth * 1.2,
  // // marginright:100,
  //  paddingHorizontal:  moderateScale(15, 0.6),
 
  // },
  title: {
    fontSize: moderateScale(17, 0.6),
    color: Color.white,
    // width: windowWidth * 0.25,
    textTransform : 'uppercase',
    // backgroundColor : 'red'
  },

  imagecontainner:{
    height: windowHeight * 0.1,
    width: windowWidth * 0.2,
    // backgroundColor:'red',
    padding: moderateScale(10, 0.6),
  }
});
