import React, {useState} from 'react';
import {
  Image,
  Dimensions,
  ImageBackground,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import navigationService from '../navigationService';

import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';

import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';
import {ActivityIndicator} from 'react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CardContainer from '../Components/CardContainer';
// import CustomHeader from '../Components/CustomHeader';
import { Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { setUserToken } from '../Store/slices/auth';
import LinearGradient from 'react-native-linear-gradient';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ResetPassword = props => {

  const dispatch = useDispatch();
  const navigationN = useNavigation();
  const phoneNumber = props?.route?.params?.phone;
const [password, setPassword] = useState('')
const [ConfirmPass, setConfirmPass] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  // const sendOTP = async () => {
  //   const url = 'password/email';
  //   if (['', null, undefined].includes(phone)) {
  //     return Platform.OS == 'android'
  //       ? ToastAndroid.show('Phone number is required', ToastAndroid.SHORT)
  //       : alert('Phone number is required');
  //   }
  //   setIsLoading(true);
  //   const response = await Post(url, {email: phone}, apiHeader());
  //   setIsLoading(false);
  //   if (response != undefined) {
  //     console.log('response data =>', response?.data);
  //     Platform.OS == 'android'
  //       ? ToastAndroid.show(`OTP sent to ${phone}`, ToastAndroid.SHORT)
  //       : alert(`OTP sent to ${phone}`);
  //     fromForgot
  //       ? navigationService.navigate('VerifyNumber', {
  //           fromForgot: fromForgot,
  //           phoneNumber: `${phone}`,
  //         })
  //       : navigationService.navigate('VerifyNumber', {
  //           phoneNumber: `${phone}`,
  //         });
  //   }
  // };

  return (
    <>
      <CustomStatusBar
       backgroundColor={
        Color.white
      }
        barStyle={'dark-content'}
      />
         <LinearGradient
        style={{
          width: windowWidth,
          height: windowHeight,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y:1}}
         colors={[Color.themeColor2,Color.themeColor2]}
        // locations ={[0, 0.5, 0.6]}
        >
            <TouchableOpacity
            activeOpacity={0.8}
          style={{
            position : 'absolute',
            top : moderateScale(20,0.3),
            left : moderateScale(20,0.3),
            height: moderateScale(30, 0.3),
            width: moderateScale(30, 0.3),
            borderRadius: moderateScale(5, 0.3),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'white',
            zIndex : 1
          }}>
         
            <Icon
              name={'arrowleft'}
              as={AntDesign}
              size={moderateScale(22, 0.3)}
              color={Color.yellow}
              onPress={()=>{
                navigationN.goBack()
              }}
            />
            </TouchableOpacity>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: moderateScale(20, 0.3),
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: windowHeight,
          }}>
          <CardContainer
            style={{
              paddingVertical: moderateScale(30, 0.3),
              alignItems: 'center',
            }}>
            <CustomText isBold style={styles.txt2}>
              Forget Password
            </CustomText>
            <CustomText style={styles.txt3}>
              Forgot your password ? don't worry, jsut take a simple step and
              create your new password!
            </CustomText>

            <TextInputWithTitle
              titleText={'Enter New Password'}
              secureText={false}
              placeholder={'Enter New Password'}
              setText={setPassword}
              value={password}
              viewHeight={0.07}
              viewWidth={0.75}
              inputWidth={0.7}
              // border={1}
              borderColor={'#ffffff'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(35, 0.3)}
              color={Color.yellow}
              placeholderColor={Color.themeLightGray}
              // borderRadius={moderateScale(25, 0.3)}
              elevation
            />
            <TextInputWithTitle
              titleText={'Confirm your new password'}
              secureText={false}
              placeholder={'Confirm your new password'}
              setText={setConfirmPass}
              value={ConfirmPass}
              viewHeight={0.07}
              viewWidth={0.75}
              inputWidth={0.7}
              // border={1}
              borderColor={'#ffffff'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(10, 0.3)}
              color={Color.yellow}
              placeholderColor={Color.themeLightGray}
              // borderRadius={moderateScale(25, 0.3)}
              elevation
            />
            <CustomButton
              text={
                isLoading ? (
                  <ActivityIndicator color={'#FFFFFF'} size={'small'} />
                ) : (
                  'Reset'
                )
              }
              textColor={Color.white}
              width={windowWidth * 0.4}
              height={windowHeight * 0.06}
              marginTop={moderateScale(20, 0.3)}
              onPress={() => {
              // dispatch(setUserToken({token : 'sadasdawdadas'}))
              }}
              bgColor={Color.yellow
            }
              // borderColor={Color.white}
              // borderWidth={2}
              // borderRadius={moderateScale(30, 0.3)}
            />

           
             
            
          </CardContainer>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </>
  );
};

const styles = ScaledSheet.create({
  txt2: {
    color: Color.black,
    fontSize: moderateScale(25, 0.6),
  },
  txt3: {
    color: Color.themeLightGray,
    fontSize: moderateScale(10, 0.6),
    textAlign: 'center',
    width: '80%',
    marginTop: moderateScale(5, 0.3),
    lineHeight: moderateScale(17, 0.3),
  },

  phoneView: {
    width: '80%',
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    marginTop: moderateScale(20, 0.3),
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.9,
    // marginTop: moderateScale(10,0.3),
  },
  txt4: {
    color: Color.purple,
    fontSize: moderateScale(14, 0.6),
    marginTop: moderateScale(8, 0.3),
    fontWeight: 'bold',
  },
  txt5: {
    color: Color.themeLightGray,
    marginTop: moderateScale(10, 0.3),
    fontSize: moderateScale(12, 0.6),
  },
});

export default ResetPassword;
