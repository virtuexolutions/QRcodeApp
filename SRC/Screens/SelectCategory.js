import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CategoryComponent from '../Components/CategoryComponent';
import {useNavigation} from '@react-navigation/core';
import Color from '../Assets/Utilities/Color';
import {useDispatch} from 'react-redux';

import CustomButton from '../Components/CustomButton';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const SelectCategory = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const categoryArray = [
    {
      title: 'url',
      image: require('../Assets/Images/link.png'),
    },
    {
      title: 'image',
      image: require('../Assets/Images/image.png'),
       },
    {
      title: 'pdf',
      image: require('../Assets/Images/pdf.png'),
    },
    {
      title: 'text',
      image: require('../Assets/Images/text.png'),
    },
  ];

  return (
    <SafeAreaView>

    <LinearGradient
      style={{
        height: windowHeight,
      }}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={['#000000', '#000000']}>
      <View style={styles.row}>
      <TouchableOpacity style={styles.customBtn}
           onPress={() => {
            navigation.goBack();
          }}
          >
            <Icon 
           name='left'
           as={AntDesign}
           size={moderateScale(20,0.6)}
           color={Color.themeblue}
          />
        </TouchableOpacity>
        <CustomText isBold style={styles.text1}>
          Generate Qr
        </CustomText>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        scrollEnabled={false}
        data={categoryArray}
        numColumns={2}
        contentContainerStyle={{
          marginHorizontal: moderateScale(10, 0.3),
          marginVertical: moderateScale(10, 0.3),
          padding: moderateScale(10, 0.6),
          paddingBottom: moderateScale(50, 0.6),
          paddingVertical: moderateScale(70, 0.6),
          height: windowHeight,
          alignItems: 'center',
        }}
        renderItem={({item, index}) => {
          return <CategoryComponent item={item} />;
        }}
      />
    </LinearGradient>
  
    </SafeAreaView>
  );
};

export default SelectCategory;

const styles = StyleSheet.create({
  text1: {
    fontSize: moderateScale(25, 0.6),
    color: Color.white,
    width: windowWidth * 0.75,
    // backgroundColor:'red',
    textAlign: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:Color.red,
    paddingVertical: moderateScale(20, 0.3),
    paddingHorizontal: moderateScale(15, 0.3),
  },
  customBtn : { 
    width : windowWidth * 0.13,
    height : windowWidth * 0.13,
    borderRadius : windowWidth * 0.13 /2,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : Color.white,
    
  },
});
