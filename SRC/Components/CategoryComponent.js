import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {moderateScale} from 'react-native-size-matters';
import CustomImage from './CustomImage'
import CustomText from './CustomText'
import { windowHeight, windowWidth } from '../Utillity/utils';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setSelectedItem } from '../Store/slices/common';

const CategoryComponent = ({item}) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()



  return (
    <TouchableOpacity
    style={[styles.mainview,{
        shadowColor: 'grey',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 0.3,
        elevation: 3,
    }]}
    onPress={() => {
      navigation.navigate('LinkUrlScreen')
      dispatch(setSelectedItem(item))
    }}
    >
        <View
        style={styles.imagecontainner}>
        <CustomImage
        resizeMode={'stretch'}
          style={{
            height: '100%',
            width: '100%',
            // tintColor : Color.black
          }}
          source={item?.image}
        />
      </View>
      <CustomText isBold style={styles.title}>
        {item?.title}
        </CustomText>
    </TouchableOpacity>
  )
}

export default CategoryComponent

const styles = StyleSheet.create({

    title: {
        fontSize: moderateScale(16 , 0.6),
        color: '#1F1D2B',
        width: windowWidth * 0.6,
        // textTransform : 'uppercase',
        // backgroundColor : 'red',
        marginHorizontal:moderateScale(10,.3),
        textAlign:'center',
        paddingVertical:moderateScale(10,.3)
      },
      imagecontainner:{
        height: windowHeight * 0.15,
        width: windowWidth * 0.25,
        // backgroundColor:'red',
        padding: moderateScale(10, 0.6),
      },
      mainview :{
        backgroundColor:Color.white,
        marginBottom:moderateScale(20,.3),
        // flexDirection:'row',
        borderRadius:moderateScale(10,.6),
        justifyContent:'center',
        alignItems:'center',
        width:windowWidth*0.4,
        height:windowHeight*0.25,
        marginHorizontal:moderateScale(10,.3)
    },
    shadowprop: {
        shadowColor: 'grey',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 0.3,
        elevation: 3,
        // shadowRadius: 8,
      },
})