import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  ToastAndroid,
  View,
  StyleSheet,
} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {useDispatch} from 'react-redux';
import {SetUserRole, setUserToken} from '../Store/slices/auth';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {setTotalQRcodes, setUserData} from '../Store/slices/common';
import Entypo from 'react-native-vector-icons/Entypo';
import navigationService from '../navigationService';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();


  const LoginUser = async () => {
    if (email == '' && password == '') {
      return Platform.OS == 'android'
        ? ToastAndroid.show(
            'password and email is required',
            ToastAndroid.SHORT,
          )
        : alert('password and email is required');
    } else if (email == '') {
      return Platform.OS == 'android'
        ? ToastAndroid.show('email is required', ToastAndroid.SHORT)
        : alert('email is required');
    } else if (password == '') {
      return Platform.OS == 'android'
        ? ToastAndroid.show('password is required', ToastAndroid.SHORT)
        : alert('password is required');
    }

    const url = 'login';
    const body = {email: email.trim(), password: password};
    setIsLoading(true);
    const response = await Post(url, body, apiHeader());
    setIsLoading(false);

    if (response?.data?.success) {
      console.log('🚀 ~ LoginUser ~ response:', response?.data?.user_info);
      dispatch(setUserData(response?.data?.user_info));
      dispatch(setUserToken({token: response?.data?.token}));
      dispatch(setTotalQRcodes(response?.data?.user_info?.document_image_count))
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        <View
          style={{
            width: windowWidth * 0.35,
            height: windowHeight * 0.2,
            overflow: 'hidden',
          }}>
          <CustomImage
            source={require('../Assets/Images/logo.png')}
            style={{width: '100%', height: '100%'}}
            resizeMode={'contain'}
          />
        </View>
        <View
          style={{
            width: windowWidth * 0.78,
          }}>
          <CustomText
            style={{
              fontSize: moderateScale(11, 0.6),
              color: Color.white,
              textAlign: 'center',
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            suscipit gravida tellus, eu ullamcorper.
          </CustomText>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: moderateScale(18, 0.6),
          }}>
          <TextInputWithTitle
            iconName={'user'}
            iconType={FontAwesome}
            LeftIcon={true}
            titleText={'User name'}
            placeholder={'User email'}
            setText={setEmail}
            value={email}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.55}
            borderBottomWidth={1}
            borderColor={Color.white}
            marginTop={moderateScale(10, 0.3)}
            marginBottom={moderateScale(10, 0.3)}
            inputColor={Color.white}
            placeholderColor={Color.white}
          />

          <TextInputWithTitle
            iconName={'key'}
            iconType={Entypo}
            LeftIcon={true}
            titleText={'Password'}
            placeholder={'Password'}
            setText={setPassword}
            value={password}
            secureText={true}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.55}
            borderBottomWidth={1}
            marginBottom={moderateScale(10, 0.3)}
            borderColor={Color.white}
            marginTop={moderateScale(10, 0.3)}
            color={Color.white}
            placeholderColor={Color.white}
          />

          <CustomText
            onPress={() => {
              console.log('====================> verify number screen');
              navigation.navigate('EnterPhone', {fromforgotpassword: true});
            }}
            style={{
              color: Color.white,
              position: 'absolute',
              right: 0,
              bottom: 145,
              paddingLeft: moderateScale(20, 0.6),
              fontSize: moderateScale(11, 0.6),
            }}>
            Forgot password?
          </CustomText>
          <CustomButton
            onPress={
              () => LoginUser()
            }
            text={
              isLoading ? (
                <ActivityIndicator color={Color.white} size={'small'} />
              ) : (
                'log in'
              )
            }
            fontSize={moderateScale(12, 0.3)}
            textColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.3}
            height={windowHeight * 0.06}
            marginTop={moderateScale(40, 0.3)}
            borderWidth={1}
            borderColor={Color.white}
            isBold
          />

          <CustomText style={styles.txt5}>do you have an account ? </CustomText>
          <CustomText
            onPress={() => {
              navigationService.navigate('Signup');
            }}
            isBold
            style={{
              fontSize: moderateScale(15, 0.6),
              color: Color.white,
              bottom:moderateScale(10,0.6)
            }}>
            Sign up
          </CustomText>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: moderateScale(35, 0.6),
            width: windowWidth * 0.75,
          }}>
          <CustomText
     
            style={{
              fontSize: moderateScale(11, 0.6),
              color: Color.white,
              textAlign: 'center',
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            suscipit gravida tellus, eu ullamcorper.
          </CustomText>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  txt5: {
    color: 'white',
    marginTop: moderateScale(20, 0.3),
    fontSize: moderateScale(11, 0.6),
    paddingVertical: moderateScale(10, 0.3),
  },
  txt6: {
    fontSize: moderateScale(15, 0.6),
    color: 'white',
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
  icon: {
    backgroundColor: Color.white,
    height: windowHeight * 0.03,
    width: windowHeight * 0.03,
    borderRadius: (windowHeight * 0.03) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    height: windowHeight * 0.15,
    width: windowWidth * 0.4,
    // borderRadius: moderateScale((windowHeight * 0.13) / 2),
  },
  imageView: {
    width: windowWidth,
    minHeight: windowHeight,
    paddingBottom: moderateScale(40, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.themesplashblack,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
