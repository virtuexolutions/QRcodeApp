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
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
import CustomButton from '../Components/CustomButton';

const Drawer = () => {
  const userData = useSelector(state => state.commonReducer.userData);

  // console.log('🚀 ~ Drawer ~ userData:', userData);
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
          height: windowHeight,
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#ffffff', '#ffffff']}>
        <View style={styles.row}>
          <View style={styles.back}>
            <CustomButton
              iconStyle={{
                width: windowWidth * 0.09,
                height: windowHeight * 0.05,
                textAlign: 'center',
                paddingTop: moderateScale(15, 0.6),
                fontSize: moderateScale(24, 0.6),
                color: Color.white,
              }}
              iconName="chevron-left"
              iconType={Feather}
              iconSize={18}
              color={Color.white}
              marginTop={moderateScale(5, 0.3)}
              // text={'Use'}
              isGradient={true}
              onPress={() => {
                navigation.goBack();
              }}
              bgColor={Color.themeBgColor}
              width={windowHeight * 0.06}
              height={windowHeight * 0.06}
            />
          </View>
          <View style={styles.imageContainer}>
            <View style={styles.Profile}>
              <CustomImage
                resizeMode={'cover'}
                source={
                  userData?.photo
                    ? {uri: userData?.photo}
                    : require('../Assets/Images/user.png')
                }
                style={{width: '100%', height: '100%'}}
              />
            </View>

            <View style={{marginLeft: moderateScale(10, 0.3)}}>
              <CustomText style={styles.text1} isBold>
                {userData?.first_name}
              </CustomText>

              <CustomText isBold style={styles.text3}>
                {userData?.email}
              </CustomText>
            </View>
          </View>
          <View style={styles.btn2View}>
            {data?.map((item, index) => (
              <>
                <TouchableOpacity onPress={item?.onPress} style={styles.btn2}>
                  <Icon
                    name={item?.iconName}
                    as={item?.iconType}
                    size={moderateScale(20, 0.3)}
                    color={'#1F1D2B'}
                    onPress={item?.onPress}
                  />
                  <CustomText isBold style={styles.text}>
                    {item.name}
                  </CustomText>
                </TouchableOpacity>
              </>
            ))}
          </View>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity
            onPress={() => {
              dispatch(setUserLogoutAuth());
              dispatch(setUserLogOut());
            }}
            style={styles.btn}>
            <Icon
              name={'logout'}
              as={AntDesign}
              style={styles.icon2}
              color={'#1F1D2B'}
              size={moderateScale(20, 0.3)}
            />

            <CustomText isBold style={styles.text}>
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
  btnView: {
    marginLeft: moderateScale(10, 0.3),
    marginTop: moderateScale(40, 0.3),
    position: 'absolute',
    bottom: 40,
  },
  btn: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.5,
    margin: moderateScale(15, 0.3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  text1: {
    fontSize: moderateScale(16, 0.6),
    color: '#1F1D2B',
  },
  text: {
    fontSize: moderateScale(14, 0.6),
    color: '#1F1D2B',
    marginLeft: moderateScale(10, 0.3),
  },
  imageContainer: {
    flexDirection: 'row',
    marginTop: moderateScale(20, 0.3),
    alignItems: 'center',
    marginLeft: moderateScale(10, 0.3),
  },
  btn2: {
    width: windowWidth * 0.5,
    borderColor: Color.black,
    margin: moderateScale(15, 0.3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn2View: {
    marginTop: moderateScale(60, 0.3),
    height: windowHeight * 0.85,
  },
  text3: {
    width: windowWidth * 0.4,
    fontSize: moderateScale(12, 0.6),
    color: '#1F1D2B',
  },
  back: {
    // backgroundColor: 'red',
    width: windowWidth * 0.1,
    marginVertical: moderateScale(10, 0.3),
    marginHorizontal: moderateScale(10, 0.3),
    elevation: 10,
  },
  row: {
    height: windowHeight * 0.25,
    width: '100%',
  },
});
