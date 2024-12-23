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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
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
import Entypo from 'react-native-vector-icons/Entypo';
// import {useNavigation} from '@react-navigation/native';
import {source} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import {SafeAreaView} from 'react-native-safe-area-context';

const Signup = () => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();
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
  // console.log('🚀 ~ file: Signup.js:50 ~ Signup ~ imagePicker:', imagePicker);
  const [image, setImage] = useState({});
  console.log('🚀 ~ Signup ~ image:', image);

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

  // const dispatch = useDispatch();
  const onSelect = country => {
    // console.log('dasdasdasdads =>', country);
    setCountryCode(country.cca2);
    setCountry(country);
  };

  const registerUser = async () => {
    const formData = new FormData();
    console.log('🚀 ~ registerUser ~ formData:', formData);
    const body = {
      first_name: username,
      email: email,
      // photo: image,
      password: password,
      confirm_password: confirmPass,
    };

    if (!validateEmail(email)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Email is invalid', ToastAndroid.SHORT)
        : Alert.alert('Email is invalid');
    } else if (password != confirmPass) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('passwords donot match', ToastAndroid.SHORT)
        : alert('passwords donot match');
    }
    // const formData = new FormData();
    for (let key in body) {
      formData?.append(key, body[key]);
    }
    if (Object.keys(image).length > 0) formData.append('photo', image);

    const url = 'register';
    console.log(
      '🚀 ~ registerUser ~ response:',
      JSON.stringify(formData, null, 2),
    );

    setIsLoading(true);
    const response = await Post(url, formData, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
      dispatch(setUserData(response?.data?.user_info));
      dispatch(setUserToken({token: response?.data?.token}));
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        <View
          style={{
            height: windowHeight * 0.13,
            width: windowHeight * 0.13,
            borderRadius: moderateScale((windowHeight * 0.13) / 2),
          }}>
          {Object.keys(image).length > 0 ? (
            <CustomImage source={{uri: image?.uri}} style={styles.image} />
          ) : (
            <CustomImage
              style={styles.image}
              source={require('../Assets/Images/user.png')}
            />
          )}

          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.edit}
            onPress={() => {
              setImagePicker(true);
            }}>
            <Icon
              name="pencil"
              as={FontAwesome}
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
            width: windowWidth * 0.78,
            marginTop: moderateScale(8, 0.6),
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
            marginTop: moderateScale(20, 0.3),
          }}>
          <TextInputWithTitle
            style={{
              borderWidth: moderateScale(1, 0.6),
              backgroundColor: 'red',
              borderBottomWitdth: moderateScale(10, 0.6),
            }}
            iconName={'user'}
            iconType={FontAwesome}
            iconStyle={{
              backgroundColor: 'red',
            }}
            LeftIcon={true}
            titleText={'Username'}
            placeholder={'Username'}
            setText={setUserName}
            value={username}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.55}
            borderColor={Color.white}
            borderBottomWidth={1}
            marginBottom={moderateScale(0, 0.3)}
            marginTop={moderateScale(10, 0.3)}
            inputColor={Color.white}
            placeholderColor={Color.white}
 
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
            borderColor={Color.white}
            borderBottomWidth={1}
            marginBottom={moderateScale(10, 0.3)}
            marginTop={moderateScale(10, 0.3)}
            inputColor={Color.white}
            placeholderColor={Color.white}
            elevationss
            keyboardType={'email-address'}
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
            keyboardType={'default'}
          />

          <TextInputWithTitle
            iconName={'check'}
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
            borderBottomWidth={1}
            marginBottom={moderateScale(10, 0.3)}
            borderColor={Color.white}
            marginTop={moderateScale(10, 0.3)}
            color={Color.white}
            placeholderColor={Color.white}
          />
          <CustomButton
            onPress={
              () => registerUser()
            }
            text={
              isLoading ? (
                <ActivityIndicator color={Color.white} size={'small'} />
              ) : (
                'SIGN IN'
              )
            }
            fontSize={moderateScale(12, 0.3)}
            textColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.3}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            borderColor={Color.white}
            borderWidth={1}
            isBold
          />

          <View
            style={{
              width: windowWidth * 0.5,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: moderateScale(10, 0.3),
            }}>
            <CustomText style={styles.txt5}>
              Already Have an account ?
            </CustomText>
            <CustomText
              onPress={() => {
                navigation.goBack();
                console.log('hellooooooo');
              }}
              isBold
              style={{color: Color.white, fontSize: moderateScale(13, 0.6)}}>
              Login
            </CustomText>
          </View>
        </View>
        <View
          style={{
            width: windowWidth * 0.78,
            position: 'absolute',
            bottom: moderateScale(35, 0.6),
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

const styles = ScaledSheet.create({
  mainContainer: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.themesplashblack,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt5: {
    color: 'white',

    fontSize: moderateScale(11, 0.6),
  },
  txt6: {
    fontSize: moderateScale(10, 0.6),
    color: Color.white,
  },
  image: {
    width: moderateScale(100, 0.3),
    height: moderateScale(100, 0.3),
    borderRadius: moderateScale(50, 0.3),
  },

  edit: {
    backgroundColor: Color.white,
    width: moderateScale(20, 0.3),
    height: moderateScale(20, 0.3),
    position: 'absolute',
    top: moderateScale(73, 0.6),
    right: moderateScale(4, 0.6),
    borderRadius: moderateScale(10, 0.3),
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default Signup;
