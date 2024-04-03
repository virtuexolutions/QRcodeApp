import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';

import {moderateScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import CustomButton from '../Components/CustomButton';

const Help = () => {
  // const navigation = useNavigation();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  // const [showNumberModal, setShowNumberModal] = useState(false);
  // const [countryCode, setCountryCode] = useState('US');
  // const [withFilter, setFilter] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // const [country, setCountry] = useState({
  //   callingCode: ['1'],
  //   cca2: 'US',
  //   currency: ['USD'],
  //   flag: 'flag-us',
  //   name: 'United States',
  //   region: 'Americas',
  //   subregion: 'North America',
  // });
  // const [withCallingCode, setWithCallingCode] = useState(true);
  //   const onSelect = country => {
  //     // console.log('dasdasdasdads =>', country);
  //     setCountryCode(country.cca2);
  //     setCountry(country);
  //   };

  return (
    <ImageBackground
      style={{
        width: windowWidth,
        minHeight: windowHeight,
        paddingBottom: moderateScale(40, 0.6),
      }}
      source={require('../Assets/Images/bg.png')}>
         <View style={styles.header}>
            <TouchableOpacity
            >

        <View style={styles.backBtn}>
          <Icon
            name="arrowleft"
            size={moderateScale(24, 0.6)}
            color={Color.white}
            as={AntDesign}
            />
      
        </View>
            </TouchableOpacity>
        </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          minHeight : windowHeight ,
          // marginTop: windowHeight * 0.1,
        }}
        contentContainerStyle={{
          
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: moderateScale(50, 0.6),
          // backgroundColor: 'red',
        }}>
        {/* <CustomText
          isBold
          style={{
            color: Color.white,
            width: windowWidth,
            textAlign: 'center',
            fontSize: moderateScale(25, 0.6),
            // marginVertical: moderateScale(9,0.2)
          }}>
          Help & Support
        </CustomText> */}
        <View
          style={{
            height: windowHeight * 0.12,
            width: windowHeight * 0.12,
          }}>
          <Image
            style={{
              height: '100%',
              width: '100%',
            }}
            source={require('../Assets/Images/customerservice.png')}
          />
        </View>
        <CustomText
        numberOfLine={2}
          isBold
          style={{
            color: Color.white,
            width: windowWidth *0.5,
            textAlign: 'center',
            fontSize: moderateScale(20, 0.6),
            paddingVertical:moderateScale(15,.6),
            // backgroundColor:'red',
            lineHeight:moderateScale(28,.6),
            letterSpacing:moderateScale(2.9,.6)
          }}>
         hello, How can we help you ?
        </CustomText>
        <View
          style={{
            alignItems: 'center',

            // marginTop: moderateScale(20, 0.3),
          }}>
            <TextInputWithTitle
            style={{
              borderWidth:moderateScale(1,.6),
              backgroundColor:'red',
              borderBottomWitdth:moderateScale(10,.6)
            }}
              iconName={'user'}
              iconType={FontAwesome}
              iconStyle={{
                backgroundColor:'red'
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
              marginBottom={moderateScale(10,.3)}
              
              marginTop={moderateScale(10, 0.3)}
              color={Color.white}
              placeholderColor={Color.white}
              // elevation
            />
          <TextInputWithTitle
            titleText={'Email'}
            placeholder={'Email'}
            setText={setEmail}
            value={email}
            iconName={'email'}
            iconType={Fontisto}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.55}
            borderColor={Color.white}
            borderBottomWidth={1}
            marginBottom={moderateScale(10,.3)}
            
            marginTop={moderateScale(10, 0.3)}
            color={Color.white}
            placeholderColor={Color.white}
          />
          <TextInputWithTitle
            titleText={'Phone'}
            placeholder={'Phone'}
            setText={setContact}
            value={contact}
            iconName={'phone'}
            iconType={Fontisto}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.55}
            borderColor={Color.white}
            borderBottomWidth={1}
            marginBottom={moderateScale(10,.3)}
            
            marginTop={moderateScale(10, 0.3)}
            color={Color.white}
            placeholderColor={Color.white}
          />
          <TextInputWithTitle
            titleText={'subject'}
            placeholder={'subject'}
            setText={setSubject}
            value={subject}
            iconName={'subject'}
            iconType={MaterialIcons}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.55}
            borderColor={Color.white}
            borderBottomWidth={1}
            marginBottom={moderateScale(10,.3)}
            
            marginTop={moderateScale(10, 0.3)}
            color={Color.white}
            placeholderColor={Color.white}
          />
          <TextInputWithTitle
            titleText={'Enter description'}
            placeholder={'Enter description'}
            setText={setDescription}
            value={description}
            iconName={'book'}
            iconType={FontAwesome}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.55}
            borderColor={Color.white}
            borderBottomWidth={1}
            marginBottom={moderateScale(10,.3)}
         
            marginTop={moderateScale(10, 0.3)}
            placeholderColor={Color.white}
            
            multiline={true}
           
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
            </TouchableOpacity> */}

          <View
            style={{
              width: windowWidth * 0.8,
              alignItems: 'center',
              paddingHorizontal: moderateScale(15, 0.3),
            }}>
            <CustomButton
              // onPress={() => navigationService.navigate('LoginScreen')}
              text={
                isLoading ? (
                  <ActivityIndicator color={Color.white} size={'small'} />
                ) : (
                  'Send question'
                )
              }
              textColor={Color.white}
              borderRadius={moderateScale(30, 0.3)}
              width={windowWidth * 0.4}
              height={windowHeight * 0.06}
               marginTop={moderateScale(20, 0.3)}
             borderColor={Color.white}
              borderWidth={1}
              // bgColor={Color.themeColor2}
              isBold
              // isGradi
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Help;
const styles = StyleSheet.create({
 
  header: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: moderateScale(18, 0.5),
    paddingVertical: moderateScale(20, 0.5),
    alignItems: 'center',
  },
  backBtn: {
    width: windowWidth * 0.09,
    height: windowWidth * 0.09,
    borderRadius: (windowWidth * 0.09) / 2,
    borderColor: Color.white,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  },
});
