import { Alert, SafeAreaView, TouchableOpacity,StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Color from '../Assets/Utilities/Color'
import { windowHeight, windowWidth } from '../Utillity/utils'
import QRCode from 'react-native-qrcode-svg'
import { Icon } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient'
import { moderateScale } from 'react-native-size-matters'
import CustomText from '../Components/CustomText'
import CustomImage from '../Components/CustomImage'
import RNPrint from 'react-native-print';
import Share from 'react-native-share';
const PrintQrImage = ({navigation,route}) => {
    console.log(route)
    const printImage = async () => {
        try {
          if (route?.params?.qrImage) {
            await RNPrint.print({
              filePath: route.params.qrImage,
            });
          } else {
            Alert.alert('No Image', 'No image found to print');
          }
        } catch (error) {
          Alert.alert('Print Error', 'An error occurred while trying to print the image.');
          console.error('Print error: ', error); // Log the error for debugging
        }
      };

  return (
    <SafeAreaView>

    <View style={styles.mainScreen} >
  <View style={styles.row}>
  <TouchableOpacity
              onPress={() => {
                navigation.goBack()
              }}>
              <LinearGradient
                colors={Color.themeBgColor}
                style={styles.customBtn}>
                <Icon
                  name="left"
                  as={AntDesign}
                  size={moderateScale(20, 0.6)}
                  color={'white'}
                />
              </LinearGradient>
            </TouchableOpacity>
            <CustomText isBold style={{fontSize:moderateScale(24,0.3)}}>Print Your QR Code</CustomText>
            <TouchableOpacity
              onPress={printImage}>
              <LinearGradient
                colors={Color.themeBgColor}
                style={styles.customBtn}>
                <Icon
                  name="printer"
                  as={AntDesign}
                  size={moderateScale(20, 0.6)}
                  color={'white'}
                />
              </LinearGradient>
            </TouchableOpacity>
  </View>
 <View  style={{paddingTop: moderateScale(29,0.3)}}>

      {/* <Text>{route?.params?.qrImage}</Text> */}
      <View style={{width: windowWidth * 0.85, height: windowHeight * 0.35}}>
      <CustomImage
      source={{uri:route?.params?.qrImage}}
      style={{width: "100%",
    height: "100%"}}
      />
      </View>
     
      
    </View>  
    {/* <TouchableOpacity
              onPress={() => {
                navigation.goBack()
              }}>
              <LinearGradient
                colors={Color.themeBgColor}
                style={styles.customBtn}>
                <Icon
                  name="left"
                  as={AntDesign}
                  size={moderateScale(20, 0.6)}
                  color={'white'}
                />
              </LinearGradient>
            </TouchableOpacity>
    <TouchableOpacity 
    onPress={printImage}
    style={styles.shareBtn}>
        <CustomText>Share</CustomText>
    </TouchableOpacity> */}

    </View>
    </SafeAreaView>

  )
}

export default PrintQrImage

const styles = StyleSheet.create({
    mainScreen:{
        width: windowWidth,
        height:windowHeight,
        alignItems:'center'
    },
    customBtn: {
        width: windowWidth * 0.13,
        height: windowWidth * 0.13,
        borderRadius: (windowWidth * 0.13) / 2,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor : Color.themeColor,
      },
      row:{
        width: windowWidth,

    height:windowHeight * 0.1,
    // backgroundColor:'blue',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:moderateScale(7,0.2),
    
},
      shareBtn:{
        marginTop: moderateScale(20,0.2),
        paddingVertical: moderateScale(5,0.2),
        paddingHorizontal:moderateScale(7,0.2),
        borderRadius: moderateScale(6,0.2),
        borderWidth:moderateScale(1,0.2),
        // backgroundColor:''
      }
})