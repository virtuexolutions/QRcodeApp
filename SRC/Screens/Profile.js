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
  Platform,
  ToastAndroid,
} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';

import navigationService from '../navigationService';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {Icon} from 'native-base';
import ImagePickerModal from '../Components/ImagePickerModal';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {setUserData} from '../Store/slices/common';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userData = useSelector(state => state.commonReducer.userData);
  console.log('🚀 ~ Profile ~ userData=========>:', userData);
  const token = useSelector(state => state.authReducer.token);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUserName] = useState(userData?.first_name);
  const [email, setEmail] = useState(userData?.email);
  const [showNumberModal, setShowNumberModal] = useState(false);
  const [countryCode, setCountryCode] = useState('US');
  const [imagePicker, setImagePicker] = useState(false);
  const [image, setImage] = useState({});
  console.log('🚀 ~ Profile ~ image:', image);

  const [country, setCountry] = useState({
    callingCode: ['1'],
    cca2: 'US',
    currency: ['USD'],
    flag: 'flag-us',
    name: 'United States',
    region: 'Americas',
    subregion: 'North America',
  });
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [withFilter, setFilter] = useState(true);
  const [phone, setPhone] = useState('');

  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  const profileUpdate = async () => {
    const formData = new FormData();
    const body = {
      first_name: username,
      email: email,
    };
    for (let key in body) {
      formData?.append(key, body[key]);
    }
    if (Object.keys(image).length > 0) formData.append('photo', image);
    const url = 'auth/profile';
    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show('profile updated Successfully', ToastAndroid.SHORT)
        : alert('profile updated Successfully');
      console.log('🚀 ~ profileUpdate ~ response:', response?.data?.user_info);
      navigation.navigate('HomeScreen');
    }
    dispatch(setUserData(response?.data?.user_info));
  };

  return (
    
    <SafeAreaView style={{width: windowWidth, height: windowHeight}}>
    <ScrollView
     contentContainerStyle={{
      paddingBottom: moderateScale(20, 0.6),
      justifyContent: 'center',
      alignItems: 'center',
    }}
      showsVerticalScrollIndicator={false}>
      <ImageBackground
        style={{
          width: windowWidth,
          justifyContent: 'center',
          alignItems: 'center',
          height: windowHeight * 0.3,
        }}
        source={require('../Assets/Images/bg1.jpg')}>
        <View
          style={{
            width: windowWidth * 0.2,
            position: 'absolute',
            left: 0,
            top: 10,
          }}>
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
        </View>

        <View
          style={{
            height: windowHeight * 0.13,
            width: windowHeight * 0.13,
            borderRadius: moderateScale((windowHeight * 0.13) / 2),
          }}>
          <CustomImage
            source={
              Object.keys(image).length > 0
                ? {uri: image?.uri}
                : userData?.photo
                ? {uri: userData?.photo}
                : require('../Assets/Images/user.png')
            }
            style={{
              width: '100%',
              height: '100%',
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
      </ImageBackground>
      <View
        style={{
          marginTop: moderateScale(10, 0.3),
          alignItems: 'center',
        }}>
        <TextInputWithTitle
          iconName={'user'}
          iconType={FontAwesome}
          LeftIcon={true}
          titleText={'Username'}
          placeholder={'Username'}
          setText={setUserName}
          value={username}
          viewHeight={0.06}
          viewWidth={0.75}
          inputWidth={0.55}
          borderColor={Color.themeblue}
          borderBottomWidth={1}
          marginBottom={moderateScale(10, 0.3)}
          marginTop={moderateScale(10, 0.3)}
          color={Color.themeblue}
          placeholderColor={Color.themeblue}
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
          borderColor={Color.themeblue}
          borderBottomWidth={1}
          marginBottom={moderateScale(10, 0.3)}
          marginTop={moderateScale(10, 0.3)}
          color={Color.themeblue}
          placeholderColor={Color.themeblue}
          elevationss
          keyboardType={'email-address'}
          disable={true}
        />
        {/* <TouchableOpacity
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
            <TextInputWithTitle
              iconName={'phone'}
              iconType={FontAwesome}
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
              borderColor={Color.black}
              backgroundColor={Color.white}
              marginTop={moderateScale(10, 0.3)}
              color={Color.black}
              placeholderColor={Color.veryLightGray}
              elevation
            /> */}
        <View
          style={{
            width: windowWidth * 0.78,
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: moderateScale(20, 0.6),
            // paddingHorizontal:moderateScale(15.6)
          }}>
          <LinearGradient
            colors={['#001D55', '#012497']}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: windowWidth * 0.35,
              height: windowHeight * 0.08,
              borderRadius: moderateScale(10, 0.6),
              // backgroundColor:'red'
            }}>
            <CustomText
              isBold
              style={{
                textAlign: 'center',
                fontSize: moderateScale(13, 0.6),
                color: Color.white,
                // backgroundColor: 'red',
              }}>
              total qr codes
            </CustomText>
            <CustomText
            numberOfLines={1}
              isBold
              style={{
                textAlign: 'center',
                color: Color.white,
                width :windowWidth *0.26,
                // backgroundColor : 'red',
                fontSize: moderateScale(15, 0.6),
              }}>
                {/* hjkdhkjashkjdahskdjh */}
              {userData?.totalDocumentCount}
            </CustomText>
          </LinearGradient>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // width:windowWidth*0.6,
            paddingVertical: moderateScale(10, 0.6),
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: windowWidth * 0.18,
              backgroundColor: Color.themeBgColor,
              height: windowHeight * 0.08,
              borderRadius: moderateScale(10, 0.6),
              borderColor: Color.themeColor,
              borderWidth: 1,
            }}>
            <CustomText
              isBold
              style={{
                textAlign: 'center',
                color: '#012497',
                fontSize: moderateScale(14, 0.6),
              }}>
              images
            </CustomText>
            <CustomText
            numberOfLines={1}
              isBold
              style={{
                textAlign: 'center',
                width :windowWidth *0.13,
                // backgroundColor :'red',
                color: '#012497',
                fontSize: moderateScale(13, 0.6),
              }}>
              {userData?.document_image_count}
            </CustomText>
          </View>
          <LinearGradient
            colors={['#001D55', '#012497']}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={styles.cardContainner}>
            <View>
              <CustomText
                isBold
                style={{
                
                  textAlign: 'center',
                  color: Color.white,
                  fontSize: moderateScale(14, 0.6),
                }}>
                link
              </CustomText>
              <CustomText
              numberOfLines={1}
                isBold
                style={{
                
                  width :windowWidth *0.13,
                  // backgroundColor :'red',
                    textAlign: 'center',
                  color: Color.white,
                  fontSize: moderateScale(13, 0.6),
                }}>
                {userData?.document_url_count}
              </CustomText>
            </View>
          </LinearGradient>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: windowWidth * 0.18,
              backgroundColor: Color.themeBgColor,
              height: windowHeight * 0.08,
              borderRadius: moderateScale(10, 0.6),
              borderColor: Color.themeColor,
              borderWidth: 1,
              marginHorizontal: moderateScale(10, 0.6),
            }}>
            <CustomText
              isBold
              style={{
                textAlign: 'center',
                color: '#012497',
                fontSize: moderateScale(15, 0.6),
              }}>
              pdf
            </CustomText>
            <CustomText
            numberOfLines={1}
              isBold
              style={{
                width :windowWidth *0.13,
                // backgroundColor :'red',
                
                textAlign: 'center',
                color: '#012497',
                fontSize: moderateScale(13, 0.6),
                // backgroundColor: 'red',
              }}>
              {userData?.document_pdf_count}
            </CustomText>
          </View>

          <LinearGradient
            colors={['#001D55', '#012497']}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={styles.cardContainner}>
            <View>
              <CustomText
                isBold
                style={{
                  textAlign: 'center',
                  color: Color.white,
                  fontSize: moderateScale(14, 0.6),
                  // backgroundColor: 'red',
                }}>
                text
              </CustomText>
              <CustomText
              numberOfLines={1}
                isBold
                style={{
                  width :windowWidth *0.13,
                // backgroundColor :'red',
                
                  textAlign: 'center',
                  color: Color.white,
                  fontSize: moderateScale(13, 0.6),
                  // backgroundColor: 'red',
                }}>
                {userData?.document_text_count  }
              </CustomText>
            </View>
          </LinearGradient>
        </View>

        <CustomButton
          onPress={() => profileUpdate()}
          text={
            isLoading ? (
              <ActivityIndicator color={Color.white} size={'small'} />
            ) : (
              'SUBMIT'
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
      <ImagePickerModal
        show={imagePicker}
        setShow={setImagePicker}
        setFileObject={setImage}
      />
    </ScrollView>
    </SafeAreaView>

  );
};

export default Profile;
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
  cardContainner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.18,
    height: windowHeight * 0.08,
    borderRadius: moderateScale(10, 0.6),
    borderColor: Color.themeblue,
    borderWidth: 1,
    marginHorizontal: moderateScale(10, 0.6),
  },

  edit: {
    backgroundColor: Color.white,
    width: moderateScale(20, 0.3),
    height: moderateScale(20, 0.3),
    position: 'absolute',
    bottom: 8,
    right: 10,
    borderRadius: moderateScale(10, 0.3),
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  back: {
    width: windowHeight * 0.05,
    height: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.05) / 2,
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    position: 'absolute',
    left: moderateScale(10, 0.6),
    top: moderateScale(10, 0.6),
    zIndex: 1,
    margin: 5,
    backgroundColor: Color.themeblue,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(10, 0.6),
  },
  customBtn : { 
    width : windowWidth * 0.13,
    height : windowWidth * 0.13,
    borderRadius : windowWidth * 0.13 /2,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : Color.white,
    marginHorizontal :moderateScale(15,.3)
  },
});
