import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CategoryComponent from '../Components/CategoryComponent';
import {useNavigation} from '@react-navigation/core';
import Color from '../Assets/Utilities/Color';
import { useDispatch } from 'react-redux';
import { setSelectedItem } from '../Store/slices/common';

const SelectCategory = () => {
  
  const dispatch = useDispatch();
  // const [selectedItem ,setSelectedItem] = useState()
 
  const navigation = useNavigation();

  const categoryArray = [
    {
      title: 'link url',
      // onPress: () => navigation.navigate('LinkUrlScreen'),
      
      image: require('../Assets/Images/link.png'),
    },
    {
      title: 'image',
      image: require('../Assets/Images/photo.png'),
      // onPress: () => navigation.navigate('LinkUrlScreen'),

    },
    {
      title: 'pdf',
      image: require('../Assets/Images/pdf.png'),
    },
    {
      title: 'text',
      // onPress: () => navigation.navigate('LinkUrlScreen'),
      image: require('../Assets/Images/text.png'),
    },
  ];




  return (
    <View
      style={{
        backgroundColor: '#002F58',
      }}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.btn}>
          <Icon name="arrowleft" as={AntDesign} color={'#002F58'} size={25} />
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
        // numColumns={2}
        numColumns={2}
        contentContainerStyle={{
          marginHorizontal: moderateScale(10, 0.3),
          marginVertical: moderateScale(10, 0.3),
          padding: moderateScale(10, 0.6),
          paddingBottom: moderateScale(50, 0.6),
          paddingVertical: moderateScale(70, 0.6),
          height: windowHeight,
          alignItems: 'center',
          // justifyContent:'center',
          // backgroundColor:'red'
        }}
        renderItem={({item, index}) => {
          return <CategoryComponent item={item} />;
        }}
      />
    </View>
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
  btn: {
    backgroundColor: Color.white,
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.05) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    //   backgroundColor:Color.red,
    paddingVertical: moderateScale(20, 0.3),
    paddingHorizontal: moderateScale(15, 0.3),
  },
});