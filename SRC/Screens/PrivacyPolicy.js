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

const PrivacyPolicy = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
        <View style={styles.row}>
        <TouchableOpacity
           onPress={() => {
            navigation.goBack();
          }}
          >
        <LinearGradient
        
        colors={Color.themeBgColor}
        style={styles.customBtn}>
          <Icon 
           name='left'
           as={AntDesign}
           size={moderateScale(20,0.6)}
           color={'white'}
          />
        </LinearGradient>
        </TouchableOpacity>

        <CustomText
          isBold
          style={{
            fontSize: moderateScale(22, 0.6),
            width: windowWidth * 0.6,
            color: Color.themeblue,
            // backgroundColor:'red',
          }}>
          privacy policy
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
      contentContainerStyle={{
        paddingBottom: moderateScale(30, 0.6),
      }}>
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
         Information We Collect:

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
         Personal Information: 

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
         We may gather personal information such as your name, email address, and phone number when you register or interact with the App.

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
       Usage Information:
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
        We gather information on how you use the App, such as the QR codes you scan, the features you utilize, and the time and duration of your activity.
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
      How We Use Your Information:
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
            ' \n\n\u29BF We will use your information to offer, maintain, and improve the App. \n\u29BF We may use your information to deliver updates, security warnings, and support messages.\n\u29BF Analytics help us enhance user experience by analyzing how they engage with the app.            '
          }  </CustomText>
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
       
Log Data:

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
        We may collect the non-identifiable data when you use our app. This log data may include your 
device type, operating system version, and date and time of use. We use this data to improve the App functionality and diagnose any issues.
</CustomText>

    </ScrollView>
    </ImageBackground>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;

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
  customBtn : { 
    width : windowWidth * 0.13,
    height : windowWidth * 0.13,
    borderRadius : windowWidth * 0.13 /2,
    justifyContent : 'center',
    alignItems : 'center'
    // backgroundColor : Color.themeColor,
    
  },
});
