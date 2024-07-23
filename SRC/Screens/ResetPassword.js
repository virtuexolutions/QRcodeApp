import React, {useState} from 'react';
import {
  Image,
  Dimensions,
  ImageBackground,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  View,
  SafeAreaView,
  Alert
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
// import CardContainer from '../Components/CardContainer';
// import CustomHeader from '../Components/CustomHeader';
import {Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {setUserToken} from '../Store/slices/auth';
import LinearGradient from 'react-native-linear-gradient';
import CustomImage from '../Components/CustomImage';
import {CodeField} from 'react-native-confirmation-code-field';



const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ResetPassword = props => {
  const email =props?.route?.params?.phoneNumber
  console.log("🚀 ~ ResetPassword ~ email:", email)
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const navigationN = useNavigation();
  const phoneNumber = props?.route?.params?.phone;
  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const reset = async () => {
    const url = 'password/reset';
    const body = {
      email: email,
      password: password,
      confirm_password: confirmPassword,
    };
    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show('All Fields are required', ToastAndroid.SHORT)
          : Alert.alert('All Fields are required');
      }
    }

    if (password !== confirmPassword) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Password donot match', ToastAndroid.SHORT)
        : Alert.alert('Password donot match');
    }
    setIsLoading(true);
    const response = await Post(url, body, apiHeader());
    setIsLoading(false);

    if (response != undefined) {
      console.log(
        '🚀 ~ file: Signup.js:66 ~ register ~ response:',
        response?.data,
      );
      Platform.OS == 'android'
        ? ToastAndroid.show('Password reset successfully', ToastAndroid.SHORT)
        : Alert.alert('Password reset successfully');

      navigationService.navigate('LoginScreen');
    }
  };

  return (
    <>
      <CustomStatusBar backgroundColor={'#FEFDFC'} barStyle={'dark-content'} />
      <SafeAreaView
      style={{
        height: windowHeight,
        width: windowWidth,
        backgroundColor: '#FEFDFC',
      }}
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
      <View style={{
        // backgroundColor :'red',
        justifyContent: 'center',
        alignItems: 'center',
         height: windowHeight * 0.8,
      }}
        >
     

        <CustomText
          style={{
            fontSize: moderateScale(18, 0.6),
          }}
          isBold>
          Reset Password
        </CustomText>

        <TextInputWithTitle
          secureText={true}
          titleText={'Your new Password'}
          placeholder={'Your new Password'}
          setText={setPassword}
          textColor={Color.black}
          // marginTop={moderateScale(10,0.3)}
          value={password}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.7}
          border={1}
          borderColor={'#0F02022E'}
          backgroundColor={'white'}
          marginTop={moderateScale(30, 0.3)}
          color={Color.darkGray}
          placeholderColor={Color.darkGray}
          borderRadius={moderateScale(20, 0.6)}
        />
        <TextInputWithTitle
          secureText={true}
          titleText={'Confirm Password'}
          placeholder={'Confirm Password'}
          setText={setConfirmPassword}
          textColor={Color.black}
          // marginTop={moderateScale(10,0.3)}
          value={confirmPassword}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.7}
          border={1}
          borderColor={'#0F02022E'}
          backgroundColor={'white'}
          marginTop={moderateScale(30, 0.3)}
          color={Color.darkGray}
          placeholderColor={Color.darkGray}
          borderRadius={moderateScale(20, 0.6)}
        />

        <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator color={Color.white} size={'small'} />
            ) : (
              'Reset Password'
            )
          }
          textColor={Color.white}
          width={windowWidth * 0.8}
          height={windowHeight * 0.07}
          marginTop={moderateScale(30, 0.3)}
          fontSize={moderateScale(16, 0.6)}
          bgColor={Color.themeBgColor}
          borderRadius={moderateScale(30, 0.3)}
          onPress={() => {
            reset();
            // navigationService.navigate('ResetInstruction');
          }}
          isGradient
        />
      </View>
      </SafeAreaView>

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

export default ResetPassword;
