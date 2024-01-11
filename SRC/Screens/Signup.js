import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {
  ActivityIndicator,
  ScrollView,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Zocial from 'react-native-vector-icons/Zocial';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import Fontisto from 'react-native-vector-icons/Fontisto';
import navigationService from '../navigationService';
// import CardContainer from '../Components/CardContainer';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useDispatch} from 'react-redux';
import {setUserData} from '../Store/slices/common';
import {SetUserRole, setUserToken} from '../Store/slices/auth';
import {ToastAndroid} from 'react-native';
import {Platform} from 'react-native';
import {validateEmail} from '../Config';
import {Icon} from 'native-base';
import ImagePickerModal from '../Components/ImagePickerModal';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPass, setconfirmPass] = useState('');
  const [showNumberModal, setShowNumberModal] = useState(false);
  console.log(
    '🚀 ~ file: Signup.js:48 ~ Signup ~ showNumberModal:',
    showNumberModal,
  );
  const [countryCode, setCountryCode] = useState('US');
  const [imagePicker, setImagePicker] = useState(false);
  console.log('🚀 ~ file: Signup.js:50 ~ Signup ~ imagePicker:', imagePicker);
  const [image, setImage] = useState({});

  const [country, setCountry] = useState({
    callingCode: ['1'],
    cca2: 'US',
    currency: ['USD'],
    flag: 'flag-us',
    name: 'United States',
    region: 'Americas',
    subregion: 'North America',
  });
  const [userRole, setuserRole] = useState('seller');
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [withFilter, setFilter] = useState(true);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const UserRoleArray = ['seller', 'buyer'];

  const dispatch = useDispatch();
  const onSelect = country => {
    // console.log('dasdasdasdads =>', country);
    setCountryCode(country.cca2);
    setCountry(country);
  };

  // const registerUser = async () => {
  //   const body = {
  //     name: username,
  //     email: email,
  //     phone: phone,
  //     // countryCode: country,
  //     address: 'askdhaksd',
  //     password: password,
  //     c_password: confirmPass,
  //     role: userRole == 'seller' ? 'vendor' : 'customer',
  //   };
  //   if (!validateEmail(email)) {
  //     return Platform.OS == 'android'
  //       ? ToastAndroid.show('Email is invalid', ToastAndroid.SHORT)
  //       : Alert.alert('Email is invalid');
  //   } else if (phone.length != 10) {
  //     return Platform.OS == 'android'
  //       ? ToastAndroid.show(
  //           'Please Enter a valid phone number',
  //           ToastAndroid.SHORT,
  //         )
  //       : Alert.alert('Please Enter a valid phone number');
  //   } else if (password != confirmPass) {
  //     return Platform.OS == 'android'
  //       ? ToastAndroid.show('passwords donot match', ToastAndroid.SHORT)
  //       : alert('passwords donot match');
  //   }
  //   const url = 'register';

  //   setIsLoading(true);
  //   const response = await Post(url, body, apiHeader());
  //   console.log('🚀 ~ file: Signup.js:93 ~ registerUser ~ response:', response);
  //   setIsLoading(false);

  //   if (response != undefined) {
  //     // console.log('response data==========>>>>>>>>', response?.data);
  //     dispatch(setUserData(response?.data?.user_info));
  //     dispatch(setUserToken({token: response?.data?.token}));
  //     dispatch(SetUserRole(response?.data?.user_info?.role));
  //   }
  // };

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          {
            // paddingBottom : moderateScale(40,0.6)
          }
        }>
        <ImageBackground
          style={{
            width: windowWidth,
            minHeight: windowHeight,
            paddingBottom: moderateScale(40, 0.6),
            justifyContent: 'center',
            // backgroundColor:'red',
            // height: windowHeight*0.8,
            alignItems: 'center',
          }}
          source={require('../Assets/Images/bgc.png')}>
          <View
            style={{
              // marginTop: 40,
              // alignItems:'center',
              // backgroundColor: 'red',
              height: windowHeight * 0.13,
              width: windowHeight * 0.13,
              borderRadius: moderateScale((windowHeight * 0.13) / 2),
              // overflow : 'hidden'
            }}>
            <CustomImage
              resizeMode="contain"
              source={require('../Assets/Images/dummyUser1.png')}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'blue',

                borderRadius: moderateScale((windowHeight * 0.13) / 2),
              }}
            />

            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.edit}
              onPress={() => {
                setImagePicker(true);
              }}>
              <Icon
                name="pencil"
                as={FontAwesome}
                style={styles.icon2}
                color={Color.black}
                size={moderateScale(13, 0.3)}
                onPress={() => {
                  setImagePicker(true);
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              // paddingVertical: moderateScale(30, 0.3),
              alignItems: 'center',
              // justifyContent: 'center',
              marginTop: moderateScale(20, 0.3),
            }}>
            <TextInputWithTitle
              iconName={'user-circle-o'}
              iconType={FontAwesome}
              LeftIcon={true}
              titleText={'Username'}
              placeholder={'Username'}
              setText={setUserName}
              value={username}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.55}
              border={1}
              borderRadius={moderateScale(30, 0.3)}
              backgroundColor={Color.white}
              borderColor={Color.black}
              marginTop={moderateScale(10, 0.3)}
              color={Color.black}
              placeholderColor={Color.veryLightGray}
              elevation
            />

            <TextInputWithTitle
              iconName={'email'}
              iconType={Fontisto}
              LeftIcon={true}
              titleText={'Email'}
              placeholder={'Email'}
              setText={setEmail}
              value={email}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.55}
              border={1}
              borderRadius={moderateScale(30, 0.3)}
              borderColor={Color.black}
              backgroundColor={Color.white}
              marginTop={moderateScale(10, 0.3)}
              color={Color.black}
              placeholderColor={Color.veryLightGray}
              elevation
              keyboardType={"email-address"}
            />
            <TouchableOpacity
              onPress={() => {
                setShowNumberModal(true);
                console.log('first');
              }}
              activeOpacity={0.9}
              style={[
                styles.birthday,
                {
                  justifyContent: 'flex-start',
                  // backgroundColor: 'red',
                  borderRadius: moderateScale(25, 0.6),
                },
              ]}>
              <CountryPicker
                {...{
                  countryCode,
                  withCallingCode,
                  onSelect,
                  withFilter,
                }}
                visible={showNumberModal}
                onClose={() => {
                  setShowNumberModal(false);
                }}
              />

              {country && (
                <CustomText
                  style={{
                    fontSize: moderateScale(15, 0.6),
                    color: '#5E5E5E',
                  }}>{`${countryCode}(+${country?.callingCode})`}</CustomText>
              )}

              <Icon
                name={'angle-down'}
                as={FontAwesome}
                size={moderateScale(20, 0.6)}
                color={Color.themeDarkGray}
                onPress={() => {
                  setShowNumberModal(true);
                }}
                style={{
                  position: 'absolute',
                  right: moderateScale(5, 0.3),
                }}
              />
            </TouchableOpacity>

            {/* <TextInputWithTitle
                iconName={'cellphone-sound'}
                iconType={MaterialCommunityIcons}
                LeftIcon={true}
                titleText={'Contact'}
                placeholder={'Contact'}
                setText={setPhone}
                value={phone}
                viewHeight={0.07}
              viewWidth={0.75}
              inputWidth={0.55}
                border={1}
                borderColor={Color.black}
                backgroundColor={Color.white}
                marginTop={moderateScale(10, 0.3)}
                color={Color.black}
                placeholderColor={Color.veryLightGray}
                elevation
              /> */}

            <TextInputWithTitle
              iconName={'phone'}
              iconType={AntDesign}
              LeftIcon={true}
              titleText={'Phone'}
              placeholder={'Phone'}
              setText={setPhone}
              value={phone}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.55}
              border={1}
              borderRadius={moderateScale(30, 0.3)}
              borderColor={'#000'}
              backgroundColor={Color.white}
              marginTop={moderateScale(10, 0.3)}
              color={Color.black}
              placeholderColor={Color.veryLightGray}
              elevation
              keyboardType={'numeric'}
            />
            <TextInputWithTitle
              iconName={'lock1'}
              iconType={AntDesign}
              LeftIcon={true}
              titleText={'Password'}
              placeholder={'Password'}
              setText={setPassword}
              value={password}
              secureText={true}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.55}
              border={1}
              borderRadius={moderateScale(30, 0.3)}
              borderColor={'#000'}
              backgroundColor={Color.white}
              marginTop={moderateScale(10, 0.3)}
              color={Color.black}
              placeholderColor={Color.veryLightGray}
              elevation
              keyboardType={"default"}
            />

            <TextInputWithTitle
              iconName={'unlock'}
              iconType={FontAwesome}
              LeftIcon={true}
              titleText={'confirm password'}
              placeholder={'confirm password'}
              setText={setconfirmPass}
              value={confirmPass}
              secureText={true}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.55}
              border={1}
              borderRadius={moderateScale(30, 0.3)}
              borderColor={'#000'}
              backgroundColor={Color.white}
              marginTop={moderateScale(10, 0.3)}
              color={Color.black}
              placeholderColor={Color.veryLightGray}
              elevation
            />
            <View
              style={{
                width: windowWidth * 0.8,
                // flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: moderateScale(15, 0.3),
              }}>
              {/* <CustomButton
                onPress={() => registerUser()}
                text={
                  isLoading ? (
                    <ActivityIndicator color={Color.white} size={'small'} />
                  ) : (
                    'SIGN UP'
                  )
                }
                fontSize={moderateScale(12, 0.3)}
                textColor={Color.black}
                borderRadius={moderateScale(30, 0.3)}
                width={windowWidth * 0.3}
                height={windowHeight * 0.04}
                marginTop={moderateScale(20, 0.3)}
                bgColor={Color.white}
                isBold
                // isGradient
              /> */}
              <CustomButton
                onPress={() => navigationService.navigate('LoginScreen')}
                text={
                  isLoading ? (
                    <ActivityIndicator color={Color.white} size={'small'} />
                  ) : (
                    'SIGN in'
                  )
                }
                fontSize={moderateScale(12, 0.3)}
                textColor={Color.white}
                borderRadius={moderateScale(30, 0.3)}
                width={windowWidth * 0.75}
                height={windowHeight * 0.06}
                marginTop={moderateScale(20, 0.3)}
                bgColor={Color.themeColor2}
                isBold
                // isGradient
              />
            </View>
            <CustomText style={styles.txt5}>
              Already Have an account ?{' '}
              <CustomText
              onPress={()=>{
                navigation.goBack()
              }}
                isBold
                style={{
                  color: Color.theme2,
                  fontSize: moderateScale(13, 0.6),
                }}>
                Login
              </CustomText>{' '}
            </CustomText>
            {/*
            <View
              style={{
                // width: windowWidth * 0.2,
                // backgroundColor:'green',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={styles.icon}>
                <Icon
                  name="twitter"
                  as={AntDesign}
                  size={3}
                  color={Color.black}
                />
              </View>
              <View
                style={[
                  styles.icon,
                  {marginHorizontal: moderateScale(5, 0.3)},
                ]}>
                <Icon
                  name="sc-facebook"
                  as={EvilIcons}
                  size={4}
                  color={Color.black}
                />
              </View>
              <View style={styles.icon}>
                <Icon
                  name="googleplus"
                  as={Zocial}
                  size={3}
                  color={Color.black}
                />
              </View> */}
            {/* <View style={styles.icon}>
                <Icon
                  name="instagram"
                  as={AntDesign}
                  size={3}
                  color={Color.black}
                />
              </View> */}
            {/* </View> */}
          </View>
          <View
            style={{
              marginTop: moderateScale(20, 0.3),
              width: windowWidth * 0.45,
              justifyContent: 'space-between',
              flexDirection: 'row',
              // backgroundColor : 'red'
            }}>
            <CustomText
              onPress={() => navigationService.navigate('LoginScreen')}
              style={styles.txt6}>
              Privacy policy
            </CustomText>
            <CustomText
              onPress={() => navigationService.navigate('LoginScreen')}
              style={styles.txt6}>
              |
            </CustomText>
            <CustomText
              onPress={() => navigationService.navigate('LoginScreen')}
              style={styles.txt6}>
              use and term
            </CustomText>
          </View>
        </ImageBackground>
        <ImagePickerModal
          show={imagePicker}
          setShow={setImagePicker}
          setFileObject={setImage}
        />
      </ScrollView>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  birthday: {
    width: windowWidth * 0.75,
    height: windowHeight * 0.06,
    marginTop: moderateScale(10, 0.3),
    borderRadius: moderateScale(10, 0.6),
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: Color.lightGrey,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10, 0.6),
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Color.themeColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  icon: {
    backgroundColor: Color.white,
    height: windowHeight * 0.03,
    width: windowHeight * 0.03,
    borderRadius: (windowHeight * 0.03) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt5: {
    color: 'white',
    marginTop: moderateScale(20, 0.3),
    fontSize: moderateScale(11, 0.6),
    paddingVertical: moderateScale(10, 0.3),
  },
  txt6: {
    fontSize: moderateScale(10, 0.6),
    color: Color.white,
  },
  edit: {
    backgroundColor: Color.white,
    width: moderateScale(20, 0.3),
    height: moderateScale(20, 0.3),
    position: 'absolute',
    // top: 110,
    bottom: -2,
    right: 5,
    borderRadius: moderateScale(10, 0.3),
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default Signup;
