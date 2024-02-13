import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';
import Entypo from 'react-native-vector-icons/Entypo'

import {
  ActivityIndicator,
  ScrollView,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  FlatList,
} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import {Icon} from 'native-base';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {Text} from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchbarComponent from '../Components/SearchbarComponent';
import CardComponent from '../Components/CardComponent';
import LinearGradient from 'react-native-linear-gradient';
import navigationService from '../navigationService';
import { useNavigation } from '@react-navigation/native';
import { useDrawerStatus } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
const navigation= useNavigation();
const userData = useSelector(state=> state.commonReducer.userData)
const token = useSelector(state => state.authReducer.token)
  // console.log("🚀 ~ HomeScreen ~ token:", token)
  // console.log("🚀 ~ HomeScreen ~ userData:", userData)
  const dataArray = [
    {
      id: 1,
      image: require('../Assets/Images/cardimage1.png'),
      title: 'QR SCAN',
      onPress :() => navigation.navigate('ScanScreen'),
      description: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.',
    },
    {
      id: 2,
      image: require('../Assets/Images/cardimage2.png'),
      title: 'Create QR',
      onPress:()=> navigation.navigate('SelectCategory'),
      description: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.',
    },
    {
      id: 3,
      image: require('../Assets/Images/cardimage3.png'),
      title: 'Create Photo With QR',
      description: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.',
    },
    {
      id: 4,
      image: require('../Assets/Images/cardimage4.png'),
      title: 'Generate QR',
      description: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.',
    },
    // {
    //   id:5,
    //   image:require('../Assets/Images/cardimage.png'),
    //   title:'QR SCAN',
    //   description:'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.'
    // },
  ];

  return (
    // <LinearGradient
    //   start={{x: 0, y: 1}}
    //   end={{x: 1, y: 1}}
    //   colors={['#49C3E9', '#0066FF']}
    //   style={styles.mainContainer}>
    <View style={styles.mainContainer}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.6),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.container}>
          <View style={styles.mainView}>
            <View style={styles.imagecontainer}>
              <CustomImage
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={userData?.user_info?.photo ? {uri :userData?.user_info?.photo} : require('../Assets/Images/user.png')}
              />
            </View>

            <View
              style={{
                paddingHorizontal: moderateScale(10, 0.6),
              }}>
              <CustomText style={styles.text1}>ryan francis</CustomText>

              <CustomText
                style={[
                  styles.text1,
                  {
                    fontSize: moderateScale(18, 0.6),
                    color: Color.black,
                    fontWeight: "bold",
                    // backgroundColor:'red',
                    width:windowWidth*0.35
                  },
                ]}>
                 
                {userData?.user_info?.first_name}
              </CustomText>
              <CustomText style={styles.text1}>ryan francis</CustomText>
            </View>
          </View>
          
          <TouchableOpacity
          onPress={()=>{
           navigation.toggleDrawer()
          }}
          >
          <LinearGradient style={styles.icon}
          colors={["#001D56", "#012496"]}
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 1 }}
          >
            <Icon
           
              name="menu"
              as={Entypo}
              size={moderateScale(20, 0.6)}
              color={Color.white}
              />
          </LinearGradient>
              </TouchableOpacity>        
       
        </View>
        <View
          style={{
            paddingVertical: moderateScale(20, 0.6),
          }}>
          <SearchbarComponent
            placeHolderColor={Color.veryLightGray}
            placeholderName={'Search..'}
            SearchStyle={{
              width: windowWidth * 0.9,
              backgroundColor: Color.white,
            }}
            />
        </View>
        <View>
          <LinearGradient 
          colors={["#001D55", "#012497"]}
          start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
          style={styles.cardContainner}>
            <View>
              <CustomText isBold style={styles.cardtitle}>
                QR CODE GENERATOR
              </CustomText>
              <CustomText style={styles.carddes}>
                Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Cras
                Suscipit Gravida Tellus, Eu Ullamcorper.
              </CustomText>
              <CustomButton
                // onPres s={() => navigationService.navigate('LoginScreen')}
                text={'Join Now'}
                fontSize={moderateScale(9, 0.3)}
                textColor={'#002F58'}
                borderRadius={moderateScale(30, 0.3)}
                width={windowWidth * 0.2}
                height={windowHeight * 0.04}
                marginTop={moderateScale(10, 0.3)}
                bgColor={Color.white}
                alignSelf={'left'}
                isBold
                // isGradient
              />
            </View>
            <View style={styles.imagecontainer2}>
              <CustomImage
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={require('../Assets/Images/cardimage.png')}
                />
            </View>
          </LinearGradient>
        </View>
        <FlatList
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
          scrollEnabled={true}
          data={dataArray}
          keyExtractor={item => item.id}
          numColumns={1}
          contentContainerStyle={{
            marginHorizontal: moderateScale(10, 0.3),
            marginVertical: moderateScale(10, 0.3),
            padding: moderateScale(10, 0.6),
            paddingBottom: moderateScale(50, 0.6),
          }}
          renderItem={({item, index}) => {
            return <CardComponent item={item} />;
          }}
        />
      </ScrollView>
      </View>
   //</LinearGradient>
    // </ImageBackground>
    );
  };
  
  export default HomeScreen;
  const styles = ScaledSheet.create({
    text1: {
      fontSize: moderateScale(10, 0.6),
    color: Color.white,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor:'red',s
    width: windowWidth,
    paddingHorizontal: moderateScale(10, 0.6),
    // marginHorizontal: moderateScale(15, 0.3),
    paddingVertical: moderateScale(5, 0.6),
    alignItems: 'center',
    marginTop: moderateScale(15, 0.3),
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imagecontainer: {
    width: windowHeight * 0.065,
    height: windowHeight * 0.065,
    borderRadius: (windowHeight * 0.065) / 2,
    overflow: 'hidden',
  },
  mainContainer: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.white
  },
  icon: {
    height: windowHeight * 0.042,
    width: windowHeight * 0.06,
    borderRadius: moderateScale(25.05),
    // backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardtitle: {
    fontSize: moderateScale(22, 0.6),
    // color: '#1F1D2B',
    color:Color.white,
    width: windowWidth * 0.5,
    textTransform : 'uppercase'
  },
  carddes: {
    // backgroundColor:'red',
    color: Color.veryLightGray,
    width: windowWidth * 0.5,
    fontSize: moderateScale(10, 0.6),
  },
  imagecontainer2: {
    // justifyContent : 'center',
    height: windowHeight * 0.2,
    width: windowWidth * 0.35,
  },
  cardContainner: {
    backgroundColor: Color.white,
    flexDirection: 'row',
    borderRadius: moderateScale(18, 0.6),
    // height: windowHeight * 0.23,
    width: windowWidth * 0.9,
    alignItems: 'center',
    paddingVertical: moderateScale(20, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
  },
});
