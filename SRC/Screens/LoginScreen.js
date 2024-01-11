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
import {ActivityIndicator, TouchableOpacity,ImageBackground, Platform, ScrollView, ToastAndroid, View, StyleSheet} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import navigationService from '../navigationService';
import {useDispatch} from 'react-redux';
// import CardContainer from '../Components/CardContainer';
import {SetUserRole, setUserToken} from '../Store/slices/auth';
import {Post} from '../Axios/AxiosInterceptorFunction';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {setUserData} from '../Store/slices/common';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import { useNavigation } from '@react-navigation/native';
import {Icon} from 'native-base';
import ImagePickerModal from '../Components/ImagePickerModal';

const LoginScreen = (props) => {
  // const navigation =useNavigation()
  const [username, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imagePicker, setImagePicker] = useState(false);
  const [image, setImage] = useState({});
  const navigation = useNavigation()


  const dispatch = useDispatch();

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
    //  else if (userRole == '') {
    //   return Platform.OS == 'android'
    //     ? ToastAndroid.show('user role is required', ToastAndroid.SHORT)
    //     : alert('user role is required');
    // }

    const url = 'login';
    const body = {email: email.trim(), password: password};
    setIsLoading(true);
    const response = await Post(url, body, apiHeader());
    setIsLoading(false);

    // console.log('LoginResponse============>>>>>>>', response?.data);
    if (response?.data?.success) {
      console.log("Login Testing =============>>>>>>",response?.data?.user_info)
      dispatch(setUserData(response?.data?.user_info));
      dispatch(SetUserRole(response?.data?.user_info?.role))
      dispatch(setUserToken({token: response?.data?.token}));
      

    }
    // dispatch(setUserData(response?.data?.user_info));
      // dispatch(setUserToken({token: 'dfhksdjlsk'}));
      // dispatch(SetUserRole('customer'))

  };

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <ScrollView
   showsVerticalScrollIndicator={false}
>
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
  source={require('../Assets/Images/bgc.png')}
  >
<View
            style={{
              marginTop: 40,
              // alignItems:'center',
              backgroundColor: 'red',
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
            />

<View
              style={{
                width: windowWidth * 0.75,
                flexDirection: 'row',
                gap: 12,
                justifyContent: 'space-around',
                paddingHorizontal: moderateScale(15, 0.3),
              }}>
              <CustomButton
                onPress={() => navigationService.navigate('Signup')}
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
              />
              <CustomButton
                onPress={() =>  dispatch(setUserToken({token : 'meerab'}))}
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
                width={windowWidth * 0.3}
                height={windowHeight * 0.04}
                marginTop={moderateScale(20, 0.3)}
                bgColor={Color.themeColor2}
                isBold
                // isGradient
              />
            </View>

            <CustomText style={styles.txt5}>Or login with </CustomText>
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
              </View>
              {/* <View style={styles.icon}>
                <Icon
                  name="instagram"
                  as={AntDesign}
                  size={3}
                  color={Color.black}
                />
              </View> */}
            </View>
</View>
<View style={{
            marginTop : moderateScale(50,0.3),
            width : windowWidth *0.50 ,
            // marginHorizontal:'20',
            gap:10,
            // textAlign:'center',
            flexDirection : 'row',
            alignItems:'center',
            justifyContent :'space-between', 
            // backgroundColor : 'red'
          }}>
           <View>
          <CustomText
            onPress={() => navigationService.navigate('PrivacyPolicy')}
            style={styles.txt6}>
            Privacy policy 
          </CustomText>
              </View> 
              <View>
          <CustomText
            onPress={() => navigationService.navigate('LoginScreen')}
            style={styles.txt6}>
             |
          </CustomText>
              </View> 
              <View>
          <CustomText
            onPress={() => navigationService.navigate('TermsAndConditions')}
            style={styles.txt6}>
             use and term
          </CustomText>
            </View> 
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

const styles = StyleSheet.create({
  txt5: {
    color: 'white',
    marginTop: moderateScale(20, 0.3),
    fontSize: moderateScale(11, 0.6),
    paddingVertical: moderateScale(10, 0.3),
  },
  txt6: {
    fontSize: moderateScale(15, 0.6),
   color:'white'
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
});

export default LoginScreen;
