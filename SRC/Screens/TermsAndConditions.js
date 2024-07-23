import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const TermsAndConditions = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.row}>
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

        <CustomText
          isBold
          style={{
            fontSize: moderateScale(20, 0.6),
            width: windowWidth * 0.65,
            color: Color.themeblue,
            // backgroundColor:'red',
          }}>
          Terms & Conditions
        </CustomText>
      </View>
      <ImageBackground 
      style={{
        height :windowHeight,
        width :windowWidth ,
        // backgroundColor :'red'
      }}
      source={require('../Assets/Images/mg.png')}
      >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={
          {
            // backgroundColor:'white'
            // marginTop : windowHeight * 0.1,
          }
        }
        contentContainerStyle={{
          paddingBottom: moderateScale(120, 0.6),
        }}>
        <CustomText
          style={{
            marginTop: moderateScale(30, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.black,
            // width : windowWidth ,
            textAlign: 'justify',
            fontSize: moderateScale(12, 0.6),
          }}>
          QR n Go is committed to providing you with secure privacy. While you
          use this app, it is presumed that you have read and accepted the
          following terms and conditions, if you do not agree to them, please
          don’t use this app.
        </CustomText>
        <CustomText
          isBold
          style={{
            marginTop: moderateScale(30, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.black,
            // width : windowWidth ,
            textAlign: 'center',
            fontSize: moderateScale(18, 0.6),
          }}>
          App Usage
        </CustomText>
        <CustomText
          isBold
          style={{
            marginTop: moderateScale(30, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.black,
            // width : windowWidth ,
            textAlign: 'justify',
            fontSize: moderateScale(14, 0.6),
          }}>
          Licensing:
        </CustomText>
        <CustomText
          style={{
            marginTop: moderateScale(10, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.black,
            // width : windowWidth ,
            textAlign: 'justify',
            fontSize: moderateScale(12, 0.6),
          }}>
          You are granted a limited, non-exclusive, non-transferable, revocable
          license to use the App for personal, and business purposes.
        </CustomText>
        <CustomText
          isBold
          style={{
            marginTop: moderateScale(30, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.black,
            // width : windowWidth ,
            textAlign: 'justify',
            fontSize: moderateScale(14, 0.6),
          }}>
          Prohibited Uses:
        </CustomText>
        <CustomText
          style={{
            marginTop: moderateScale(10, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.black,
            // width : windowWidth ,
            textAlign: 'justify',
            fontSize: moderateScale(12, 0.6),
          }}>
          {
            'You agree not to use the App for any illegal or forbidden activity, including, but not limited to: \n\n\u29BF Scanning QR codes that you are not authorized to scan. \n\u29BF Trying to gain unauthorized access to the Apps systems or networks.\n\u29BF Interfere with or disturb the App integrity or functioning.'
          }
        </CustomText>
        <CustomText
          isBold
          style={{
            marginTop: moderateScale(30, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.black,
            // width : windowWidth ,
            textAlign: 'justify',
            fontSize: moderateScale(14, 0.6),
          }}>
          Camera Permission:
        </CustomText>
        <CustomText
          style={{
            marginTop: moderateScale(10, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.black,
            // width : windowWidth ,
            textAlign: 'justify',
            fontSize: moderateScale(12, 0.6),
          }}>
          The app needs permission to access your device’s camera to scan QR
          codes. This permission is mandatory for the basic functionality of the
          app. We don’t take photos or record videos with our camera.
        </CustomText>
        <CustomText
          isBold
          style={{
            marginTop: moderateScale(30, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.black,
            // width : windowWidth ,
            textAlign: 'justify',
            fontSize: moderateScale(14, 0.6),
          }}>
          Third-Party Links:
        </CustomText>
        <CustomText
          style={{
            marginTop: moderateScale(10, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.black,
            // width : windowWidth ,
            textAlign: 'justify',
            fontSize: moderateScale(12, 0.6),
          }}>
          The App may include connections to third-party websites or services.
          We accept no responsibility for the content or practices of any
          third-party websites or services.
        </CustomText>
        <CustomText
          isBold
          style={{
            marginTop: moderateScale(30, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.black,
            // width : windowWidth ,
            textAlign: 'justify',
            fontSize: moderateScale(14, 0.6),
          }}>
          Governing Law:
        </CustomText>
        <CustomText
          style={{
            marginTop: moderateScale(10, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.black,
            // width : windowWidth ,
            textAlign: 'justify',
            fontSize: moderateScale(12, 0.6),
          }}>
          These Terms are regulated and construed in compliance with worldwide
          laws.
        </CustomText>
        <CustomText
          isBold
          style={{
            marginTop: moderateScale(30, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.black,
            // width : windowWidth ,
            textAlign: 'center',
            fontSize: moderateScale(18, 0.6),
          }}>
          Disclaimers and Limitations of Liability
        </CustomText>
        <CustomText
          isBold
          style={{
            marginTop: moderateScale(30, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.black,
            // width : windowWidth ,
            textAlign: 'justify',
            fontSize: moderateScale(14, 0.6),
          }}>
          Disclaimer:
        </CustomText>
        <CustomText
          style={{
            marginTop: moderateScale(10, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.black,
            // width : windowWidth ,
            textAlign: 'justify',
            fontSize: moderateScale(12, 0.6),
          }}>
          The App is supplied "as is" and "as available", with no explicit or
          implied guarantees.
        </CustomText>
        <CustomText
          isBold
          style={{
            marginTop: moderateScale(30, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.black,
            // width : windowWidth ,
            textAlign: 'justify',
            fontSize: moderateScale(14, 0.6),
          }}>
          Limitation of Liability:
        </CustomText>
        <CustomText
          style={{
            marginTop: moderateScale(10, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.black,
            // width : windowWidth ,
            textAlign: 'justify',
            fontSize: moderateScale(12, 0.6),
          }}>
          QR n Go will not be liable for any indirect, incidental, special,
          consequential, or punitive damages, or any loss of profits or
          revenues.
        </CustomText>
        <CustomText
          isBold
          style={{
            marginTop: moderateScale(30, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.black,
            // width : windowWidth ,
            textAlign: 'justify',
            fontSize: moderateScale(14, 0.6),
          }}>
          Changes in the Terms
        </CustomText>
        <CustomText
          style={{
            marginTop: moderateScale(10, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.black,
            // width : windowWidth ,
            textAlign: 'justify',
            fontSize: moderateScale(12, 0.6),
          }}>
          We retain the right to alter these Terms at any time. Any
          modifications will take effect immediately following publication. You
          agree to the changes if you keep using the app after they are posted.
        </CustomText>
      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default TermsAndConditions;

const styles = ScaledSheet.create({
  back: {
    width: moderateScale(35, 0.6),
    height: moderateScale(35, 0.6),
    borderRadius: moderateScale(5, 0.6),
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    position: 'absolute',
    left: moderateScale(10, 0.6),
    top: moderateScale(10, 0.6),
    zIndex: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customBtn: {
    width: windowWidth * 0.13,
    height: windowWidth * 0.13,
    borderRadius: (windowWidth * 0.13) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor : Color.themeColor,
  },
});
