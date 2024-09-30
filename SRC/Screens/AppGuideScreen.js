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

const AppGuideScreen = () => {
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
          App Guide
        </CustomText>
      </View>
      <ImageBackground
        style={{
          height: windowHeight,
          width: windowWidth,
          // backgroundColor :'red'
        }}
        source={require('../Assets/Images/mg.png')}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={
            {
              // backgroundColor:'white'
              // marginTop : windowHeight * 0.1,
            }
          }
          contentContainerStyle={{
            paddingBottom: moderateScale(180, 0.6),
          }}>
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
            Creating a QR Code:
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
              '1.  Open the App : Launch the QR Code Generator app on your device.  \n\n 2. Upload Content: Choose one of the following options to create your QR code: \n\n\u29BF 	Image : Upload an image from your device.\n\u29BF 	URL Link : Enter a URL link. \n\u29BF 	PDF : Upload a PDF file. \n\u29BF     Text : Enter a text item name.  \n\n 3. Name Your QR Code : Provide a name for your QR code. \n\n 4. Save QR Code : The QR code is automatically saved in the Gallery within the app.  '
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
            Printing Your QR Code :
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
              // '1. Save to Camera Roll : Your QR code is also saved to the camera roll on your device  \n\n\ 2. Print QR Code : Use a portable printer to print the QR code directly from your camera roll. Attach the printed QR code to the desired item.'
              "1. Click on Print: After creating your QR code, tap the Print button. \n\n2.Select Printer Option: A menu will appear asking you to select a printer \n\n3. Connect to Wi-Fi: Before selecting a printer, make sure your printer is connected to the same Wi-Fi network as your device. \n\n\u29BF  Go to your device's Wi-Fi settings and connect your printer. Ensure it is not connected via Bluetooth, as the app requires a Wi-Fi connection to detect printers.   \n\n  4. Choose Your Printer: Once your printer is connected to the Wi-Fi network, it should appear in the printer selection list within the app. Select your printer from the list.\n\n 5. Proceed to Print: After selecting your printer, tap on Print to start printing your QR cod"
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
            Scanning a QR Code :
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
              '1. Open Scanner : Use the apps built-in camera to scan a QR code.  \n\n 2. Identify Item : \n\u29BF  If the scanned QR code is not the item you are looking for, skip and scan again. \n\n\u29BF  If it is the correct item, click on Continue.  \n\n 3. Open Associated Content: Clicking on Continue will open the associated picture, PDF, URL, or text attached to the QR code. '
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
            Managing Your Gallery:
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
              '1. Open My Gallery : Access the Gallery within the app to view all your saved QR codes \n\n 2. Long Press Options : Long press on a QR code to see the following options: \n\u29BF Delete : Remove the QR code from your gallery.\n\u29BF Information (i) : Click on the i icon to view details about what the QR code is for. '
            }
          </CustomText>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default AppGuideScreen;

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
