import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';

import {
  ActivityIndicator,
  ScrollView,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

import navigationService from '../navigationService';
import {useDispatch, useSelector} from 'react-redux';

import {Icon} from 'native-base';
import ImagePickerModal from '../Components/ImagePickerModal';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
const Profile = () => {
  const navigation = useNavigation();

  const token = useSelector(state => state.authReducer.token);
  const [isLoading, setIsLoading] = useState(false);
  const [currPassword, setCurrPassword] = useState('');
  console.log('🚀 ~ Profile ~ currPassword:', currPassword);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const resetPassword = async () => {
    const body = {
      current_password: currPassword,
      new_password: newPassword,
      confirm_password: confirmNewPassword,
    };
    for (let i in body) {
      if (body[i] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show('All Fields are required', ToastAndroid.SHORT)
          : Alert.alert('All Fields are required');
      }
    }
    if (newPassword !== confirmNewPassword) {
      Platform.OS == 'android'
        ? ToastAndroid.show('Passwords do not match', ToastAndroid.SHORT)
        : alert('Passwords do not match');
    }
    const url = 'auth/change_password';
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      console.log('🚀 ~ ChangePassword ~ response:', response?.data);
      Platform.OS == 'android'
        ? ToastAndroid?.show(
            'Successfully changed password.',
            ToastAndroid.SHORT,
          )
        : Alert.alert('Success', 'Successfully changed password.');
    }
    navigation.navigate('HomeScreen');
  };

  return (
    <View
      style={{
        height: windowHeight,
        width: windowWidth,
        paddingTop: moderateScale(20, 0.3),
      }}>
      <View
        style={{
          width: windowWidth * 0.2,
        }}>
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

      <CustomText style={styles.txt5}>Change Password</CustomText>
      <View
        style={{
          gap: 15,
          // backgroundColor:'red',
          height: windowHeight * 0.45,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TextInputWithTitle
          iconName={'lock1'}
          iconType={AntDesign}
          LeftIcon={true}
          titleText={'Current Password'}
          placeholder={'Current Password'}
          setText={setCurrPassword}
          value={currPassword}
          secureText={true}
          viewHeight={0.06}
          viewWidth={0.75}
          inputWidth={0.55}
          border={1}
          borderRadius={moderateScale(30, 0.3)}
          borderColor={Color.themeblue}
          backgroundColor={Color.white}
          color={Color.themeblue}
          textColor={Color.themeblue}
          placeholderColor={Color.themeblue}
          elevation
        />
        <TextInputWithTitle
          iconName={'lock1'}
          iconType={AntDesign}
          LeftIcon={true}
          titleText={'New Password'}
          placeholder={'New Password'}
          setText={setNewPassword}
          value={newPassword}
          secureText={true}
          viewHeight={0.06}
          viewWidth={0.75}
          inputWidth={0.55}
          border={1}
          borderRadius={moderateScale(30, 0.3)}
          borderColor={Color.themeblue}
          backgroundColor={Color.white}
          marginTop={moderateScale(10, 0.3)}
          color={Color.themeblue}
          textColor={Color.themeblue}
          placeholderColor={Color.themeblue}
          elevation
        />

        <TextInputWithTitle
          iconName={'unlock'}
          iconType={FontAwesome}
          LeftIcon={true}
          titleText={'Confirm your new password'}
          placeholder={'Confirm your new password'}
          setText={setConfirmNewPassword}
          value={confirmNewPassword}
          secureText={true}
          viewHeight={0.06}
          viewWidth={0.75}
          inputWidth={0.55}
          border={1}
          borderRadius={moderateScale(30, 0.3)}
          borderColor={Color.themeblue}
          backgroundColor={Color.white}
          marginTop={moderateScale(10, 0.3)}
          color={Color.themeblue}
          textColor={Color.themeblue}
          // placeholderTextColor={Color.themeblue}
          placeholderColor={Color.themeblue}
          elevation
        />

        <CustomButton
          onPress={
            () => resetPassword()
            // navigationService.navigate('LoginScreen')
          }
          text={
            isLoading ? (
              <ActivityIndicator color={Color.white} size={'small'} />
            ) : (
              'RESET'
            )
          }
          fontSize={moderateScale(12, 0.3)}
          textColor={Color.white}
          borderRadius={moderateScale(30, 0.3)}
          width={windowWidth * 0.75}
          height={windowHeight * 0.06}
          marginTop={moderateScale(20, 0.3)}
          bgColor={Color.themeBgColor}
          isGradient={true}
          isBold
        />
      </View>
    </View>
  );
};

export default Profile;
const styles = ScaledSheet.create({
  txt5: {
    textAlign: 'center',
    marginTop: windowHeight * 0.15,
    fontSize: moderateScale(20, 0.6),
    fontWeight: 'bold',
    // backgroundColor:'green',
    color: Color.themeblue,
  },

  back: {
    backgroundColor: Color.themeblue,
    padding: moderateScale(8, 0.6),
    // width: moderateScale(35, 0.6),
    // height: moderateScale(35, 0.6),
    borderRadius: moderateScale(5, 0.6),
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    position: 'absolute',
    left: moderateScale(10, 0.6),
    top: moderateScale(10, 0.6),
    zIndex: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
