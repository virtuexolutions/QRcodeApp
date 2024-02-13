import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useRef} from 'react';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'


import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  SetUserRole,
  setIsVerifed,
  setUserLogoutAuth,
} from '../Store/slices/auth';
import {setUserLogOut} from '../Store/slices/common';
import navigationService from '../navigationService';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Drawer = () => {
  const userData = useSelector(state => state.commonReducer.userData)
  // console.log("🚀 ~ Drawer ~ userData:", userData)
  const navigation = useNavigation();
  const dispatch =useDispatch()
  const data = [
    {
      name: 'Home',
      iconName: 'home',
      iconType: Entypo,
      onPress: () => {
        navigation.navigate('HomeScreen');
      },
    },
    {
      name: 'my gallery',
      iconName: 'images',
      iconType: Entypo,
      onPress: () => {
        navigation.navigate('GalleryView');
      },
    },
    {
      name: 'profile',
      iconName: 'user',
      iconType: FontAwesome,
      onPress: () => {
        navigation.navigate('Profile');
      },
    },
    {
      name: 'Change Password',
      iconName: 'key',
      iconType: Entypo,
      onPress: () => {
        navigation.navigate('ChangePassword');
      },
    },

    // {
    //   name: 'Settings',
    //   iconName: 'settings',
    //   iconType: Feather,
    //   onPress: () => {
    //     navigation.navigate('settings');
    //   },
    // },
  ];

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <LinearGradient
        style={{
          // width: windowWidth *0.6,
          height: windowHeight,
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#ffffff', '#ffffff']}>
        <View
          style={{
            height: windowHeight * 0.25,
            width: '100%',
            backgroundColor: '#D2E4E4',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: windowWidth * 0.1,
              height: windowWidth * 0.1,
              marginVertical: moderateScale(10, 0.3),
              marginHorizontal: moderateScale(10, 0.3),
              borderRadius: (windowWidth * 0.1) / 2,
              backgroundColor: Color.white,
              // position: 'absolute',
              // bottom: 40,
              // left: 20,
              elevation: 10,
            }}>
            <Icon
              onPress={() => {
                navigation.goBack();
              }}
              name="chevron-left"
              as={Feather}
              size={moderateScale(25, 0.7)}
              color={Color.black}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: moderateScale(20, 0.3),
              alignItems: 'center',
              marginLeft: moderateScale(10, 0.3),
            }}>
            <View style={styles.Profile}>
              <CustomImage
                resizeMode={'cover'}
                source={userData?.user_info?.photo ?{uri : userData?.user_info?.photo} :require('../Assets/Images/user.png')}
                style={{width: '100%', height: '100%'}}
              />
            </View>

            <View style={{marginLeft: moderateScale(10, 0.3)}}>
                <CustomText
                style={{fontSize: moderateScale(16, 0.6), color: Color.black}}
                isBold>
                {userData?.user_info?.first_name}
                </CustomText>
                
                <CustomText
                style={{
                    width: windowWidth * 0.4,
                    fontSize: moderateScale(11, 0.6),
                    color: Color.black,
                }}>
                  {userData?.user_info?.email}
                </CustomText>
            </View>
          </View>
          <View
            style={{
              // marginLeft: moderateScale(10, 0.3),
              marginTop: moderateScale(60, 0.3),
              // backgroundColor:'red',
              // height:'100%',
              height: windowHeight * 0.85,
              // alignItems:'center'
            }}>
            {data.map((item, index) => (
              <>
                <TouchableOpacity
                  onPress={item?.onPress}
                  style={{
                    width: windowWidth * 0.5,
                    // borderBottomWidth: 0.5,
                    borderColor: Color.black,
                    margin: moderateScale(15, 0.3),
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name={item?.iconName}
                    as={item?.iconType}
                    size={moderateScale(20, 0.3)}
                    color={Color.black}
                    onPress={item?.onPress}
                  />
                  <CustomText
                    style={{
                      fontSize: moderateScale(14, 0.6),
                      color: Color.black,
                      marginLeft: moderateScale(10, 0.3),
                    }}>
                    {item.name}
                  </CustomText>
                </TouchableOpacity>
              </>
            ))}
          </View>
        </View>
        <View
          style={{
            marginLeft: moderateScale(10, 0.3),
            marginTop: moderateScale(40, 0.3),
            position: 'absolute',
            bottom: 40,
          }}>
          <TouchableOpacity
            onPress={() => {
              dispatch(setUserLogoutAuth());
              dispatch(setUserLogOut());
            }}
            style={{
              width: windowWidth * 0.5,
              // borderBottomWidth: 0.5,
              // borderColor: Color.black,
              margin: moderateScale(15, 0.3),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon
              name={'logout'}
              as={AntDesign}
              style={styles.icon2}
              color={Color.black}
              size={moderateScale(16, 0.3)}
            />

            <CustomText
              style={{
                //  paddingVertical:moderateScale(5,.3),
                fontSize: moderateScale(14, 0.6),
                color: Color.black,
                marginLeft: moderateScale(10, 0.3),
              }}>
              Log out
            </CustomText>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  Profile: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: (windowWidth * 0.2) / 1,
    borderWidth: 1,
    borderColor: Color.white,
    overflow: 'hidden',
  },
});
