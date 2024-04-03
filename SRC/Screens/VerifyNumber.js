import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Platform,
  ToastAndroid,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import navigationService from '../navigationService';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';
import {ActivityIndicator} from 'react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useEffect} from 'react';
// import CardContainer from '../Components/CardContainer';
import CustomStatusBar from '../Components/CustomStatusBar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import CustomImage from '../Components/CustomImage';

const VerifyNumber = props => {
  const SelecteduserRole = useSelector(
    state => state.commonReducer.selectedRole,
  );
  const navigationN = useNavigation();

  //params
  const fromForgot = props?.route?.params?.fromForgot;
  const phoneNumber = props?.route?.params?.phoneNumber;

  //states
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({code, cellCount: CELL_COUNT});
  const [abcd, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });
  const [time, settime] = useState(120);
  const [timerLabel, settimerLabel] = useState('Resend In ');
  if (time > 0) {
    setTimeout(function () {
      settime(time - 1);
    }, 1000);
  }

  const label = () => {
    time == 0 && (settimerLabel('Resend Code '), settime(''));
  };

  const sendOTP = async () => {
    const url = 'password/email';
    setIsLoading(true);
    const response = await Post(url, {email: phoneNumber}, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show(`OTP sent to ${phoneNumber}`, ToastAndroid.SHORT)
        : alert(`OTP sent to ${phoneNumber}`);
    }
  };

  const VerifyOTP = async () => {
    const url = 'password/code/check';
    setIsLoading(true);
    console.log(code);
    const response = await Post(url, {code: code}, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
  // return    console.log("🚀 ~ VerifyOTP ~ response:", response?.data)
      Platform.OS == 'android'
        ? ToastAndroid.show(`otp verified`, ToastAndroid.SHORT)
        : alert(`otp verified`);

      navigationService.navigate('ResetPassword', {phoneNumber: phoneNumber});
    }
  };

  useEffect(() => {
    label();
  }, [time]);

  // useEffect(()=>{
  //   if(timerLabel == )
  //   sendOTP();
  // },[timerLabel])

  return (
    <>
      <CustomStatusBar backgroundColor={'#FEFDFC'} barStyle={'dark-content'} />
      <View
        style={{
          height: windowHeight * 0.85,
          width: windowWidth,
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor:'red'
          paddingTop: windowHeight * 0.1,
          backgroundColor: '#FEFDFC',
        }}>
        {/* <View
          style={{
            width: windowWidth * 0.7,
            height: windowHeight * 0.2,
            alignItems: 'center',
          }}>
          <CustomImage
            source={require('../Assets/Images/dummyUser1.png')}
            resizeMode={'contain'}
            style={{
              height: '100%',
            }}
          />
        </View> */}

        <CustomText
          style={{
            fontSize: moderateScale(18, 0.6),
            // marginTop: moderateScale(0, 0.3),
          }}
          isBold>
          Enter OTP
        </CustomText>
        {isLoading ? (
          <View
            style={{
              width: windowWidth,
              height: windowHeight * 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={'large'} color={Color.themeColor} />
          </View>
        ) : (
          <View style={styles.conatiner}>
            <CodeField
              placeholder={'0'}
              ref={ref}
              value={code}
              onChangeText={setCode}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <View
                  onLayout={getCellOnLayoutHandler(index)}
                  key={index}
                  style={[styles.cellRoot, isFocused && styles.focusCell]}>
                  <CustomText
                    style={[
                      styles.cellText,
                      isFocused && {color: Color.black},
                    ]}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </CustomText>
                </View>
              )}
            />
            <CustomText
              style={[
                styles.txt3,
                {
                  width: windowWidth * 0.6,
                  marginHorizontal: moderateScale(40, 0.3),
                  // alignItems: 'center',
                },
              ]}>
              Haven't Recieved Verification Code ?{' '}
              {
                <TouchableOpacity
                  disabled={timerLabel == 'Resend Code ' ? false : true}
                  onPress={() => {
                    sendOTP();
                    settimerLabel('ReSend in '), settime(10);
                  }}>
                  <CustomText style={[styles.txt4]}>
                    {timerLabel} {time}
                  </CustomText>
                </TouchableOpacity>
              }
            </CustomText>
            <CustomButton
              text={
                isLoading ? (
                  <ActivityIndicator color={'#FFFFFF'} size={'small'} />
                ) : (
                  'Verify Now'
                )
              }
              textColor={Color.white}
              fontSize={moderateScale(16, 0.6)}
              width={windowWidth * 0.8}
              height={windowHeight * 0.07}
              marginTop={moderateScale(30, 0.3)}
              onPress={() => {
                VerifyOTP();
                // navigationService.navigate('ResetPassword');
              }}
              bgColor={Color.themeBgColor}
              borderRadius={moderateScale(30, 0.3)}
              isGradient
            />
          </View>
        )}
      </View>
    </>
  );
};

const styles = ScaledSheet.create({
  txt2: {
    color: Color.black,
    fontSize: moderateScale(25, 0.6),
    textTransform: 'uppercase',
  },
  txt3: {
    color: Color.themeLightGray,
    fontSize: moderateScale(11, 0.6),
    textAlign: 'center',
    width: windowWidth * 0.9,
    // paddingHorizontal: moderateScale(10, 0.6),
    // backgroundColor: 'red',
    marginTop: moderateScale(10, 0.3),
    lineHeight: moderateScale(20, 0.3),
  },
  txt4: {
    color: Color.yellow,
    fontSize: moderateScale(14, 0.6),
    borderBottomWidth: 1,
    borderColor: Color.white,
    // alignSelf : 'center'
  },
  txt5: {
    color: Color.black,

    fontSize: moderateScale(12, 0.6),
  },

  codeFieldRoot: {
    marginTop: moderateScale(20, 0.3),
    marginBottom: moderateScale(15, 0.3),
    width: windowWidth * 0.6,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: moderateScale(40, 0.3),
    height: moderateScale(40, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: moderateScale(5, 0.3),
    // backgroundColor: Color.black,
    // borderRadius: moderateScale(10, 0.3),
  },
  focusCell: {
    // backgroundColor: Color.themeColor,
    // borderRadius: moderateScale(10, 0.3),

    borderColor: Color.yellow,
    borderWidth: 1,
  },
  cellText: {
    color: Color.yellow,
    fontSize: moderateScale(20, 0.3),
    textAlign: 'center',
  },
});

export default VerifyNumber;
