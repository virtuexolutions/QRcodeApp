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
// import CardContainer from '../Components/CardContainer';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import ScreenBoiler from '../Components/ScreenBoiler';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Icon } from 'native-base';



const EnterPhone = props => {
  const SelecteduserRole = useSelector(
    state => state.commonReducer.selectedRole,
  );
  const fromForgot = props?.route?.params?.fromforgotpassword;
  console.log('here=>', fromForgot);
  const [phone, setPhone] = useState('');
  console.log("🚀 ~ EnterPhone ~ phone:", phone)
  const [isLoading, setIsLoading] = useState(false);

  const sendOTP = async () => {
    const url = 'password/email';
    if (['', null, undefined].includes(phone)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Phone number is required', ToastAndroid.SHORT)
        : alert('Phone number is required');
    }
    setIsLoading(true);
    const response = await Post(url, {email: phone}, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
     console.log('response data =>', response?.data?.data);
     alert(response?.data?.data[0]?.code)
      Platform.OS == 'android'
        ? ToastAndroid.show(`OTP sent to ${phone}`, ToastAndroid.SHORT)
        : alert(`OTP sent to ${phone}`);
      fromForgot
        ? navigationService.navigate('VerifyNumber', {
            fromForgot: fromForgot,
            phoneNumber: `${phone}`,
          })
        : navigationService.navigate('VerifyNumber', {
            phoneNumber: `${phone}`,
          });
    }
  };

  return (
    <>
     <ScreenBoiler
      // statusBarBackgroundColor={Color.themeBgColor}
      statusBarContentStyle={'dark-content'}
      // showBack
      // showHeader
      >
          <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <LinearGradient colors={Color.themeBgColor} style={styles.customBtn}>
            <Icon
              name="left"
              as={AntDesign}
              size={moderateScale(20, 0.6)}
              color={'white'}
            />
          </LinearGradient>
        </TouchableOpacity>
      
    
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: moderateScale(20, 0.3),
            alignItems: 'center',
            justifyContent : 'center',
            width: '100%',
            height : windowHeight
          }}>
         

          {/* <CardContainer  style={{paddingVertical: moderateScale(30, 0.3) , alignItems : 'center'}}> */}
            <CustomText isBold style={styles.txt2}>Forget Password</CustomText>
            <CustomText style={styles.txt3}>
            Forgot your password ? don't worry, jsut take a simple step and create your new password!
            </CustomText>
            
            <TextInputWithTitle

            titleText={'Enter your Email'}
            secureText={false}
            placeholder={'Enter your Email'}
            setText={setPhone}
            value={phone}
            viewHeight={0.07}
            viewWidth={0.75}
            inputWidth={0.7}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(35, 0.3)}
            color={Color.yellow}
            placeholderColor={Color.themeLightGray}
            elevation
          />
        
            <CustomButton
                text={
                  isLoading ? (
                    <ActivityIndicator color={'#FFFFFF'} size={'small'} />
                  ) : (
                    'submit'
                  )
                }
                textColor={Color.white}
                fontSize={moderateScale(16, 0.6)}
                width={windowWidth * 0.6}
                height={windowHeight * 0.07}
                marginTop={moderateScale(30, 0.3)}
                onPress={() => {
                sendOTP()
                }}
                bgColor={Color.themeBgColor}
                borderRadius={moderateScale(30, 0.3)}
                isGradient
              />

       
          {/* </CardContainer> */}
        </KeyboardAwareScrollView>
        {/* </LinearGradient> */}
        </ScreenBoiler>
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
  },
  txt4: {
    color: Color.yellow,
    fontSize: moderateScale(14, 0.6),
    marginTop: moderateScale(8, 0.3),
    fontWeight: 'bold',
  },
  txt5: {
    color: Color.themeLightGray,
    marginTop: moderateScale(10, 0.3),
    fontSize: moderateScale(12, 0.6),
  },
  customBtn: {
    width: windowWidth * 0.13,
    height: windowWidth * 0.13,
    borderRadius: (windowWidth * 0.13) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor : Color.themeColor,
    marginHorizontal: moderateScale(10, 0.3),
  },
});

export default EnterPhone;
