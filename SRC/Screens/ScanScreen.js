import {Alert, Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React,{useEffect ,useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import CustomImage from '../Components/CustomImage';
import CustomButton from '../Components/CustomButton';
import Feather from 'react-native-vector-icons/Feather'

const ScanScreen = () => {
  const navigation = useNavigation();
    // const [showImage , setShowImage] = useState(false)
    const [path , setPath] = useState('')

  const checkIfImageExists = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
  
      // Check if the response status is OK
      if (response.ok) {
        // Check the content type to determine if it's an image
        const contentType = response.headers.get('content-type');
        return contentType.startsWith('image/');
      } else {
        return false;
      }
    } catch (error) {
      // Handle errors, e.g., network issues
      console.error('Error checking image:', error);
      return false;
    }
  };
  
  // Example usage
  
//   useEffect(() => {
//     //   const imageUrl = 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
//     // const image2 = 'https://unsplash.com/s/photos/image'
    
 
//   }, [])
  
 
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: windowHeight,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems:'center',
          // backgroundColor:Color.red,
          paddingVertical: moderateScale(15, 0.3),
          paddingHorizontal: moderateScale(10, 0.3),
        }}>
          <CustomButton
            iconStyle={{
              width: windowWidth * 0.09,
              height: windowHeight * 0.05,
              textAlign: 'center',
              paddingTop: moderateScale(15, 0.6),
              fontSize: moderateScale(24, 0.6),
              color: Color.white,
            }}
              iconName="chevron-left"
              iconType={Feather}
              iconSize={18}
              color={Color.white}
              marginTop={moderateScale(5, 0.3)}
              // text={'Use'}
              isGradient={true}
              onPress={() => {
                navigation.goBack();
              }}
              bgColor={Color.themeBgColor}
              width={windowHeight * 0.06}
              height={windowHeight * 0.06}
            />
        <CustomText isBold style={styles.text1}>
          Qr Scan
        </CustomText>
      </View>
      {path == '' &&

          <QRCodeScanner
          onRead={({data}) => 
          checkIfImageExists(data).then((result) => {
            if (result) {
                console.log('here with iamge')
                setPath(data) 
                // setShowImage(true)
            } else {
                // console.log('here with no iamge' ,data)
              navigation.navigate('ShowQR',{data : data})
                // Linking.openURL(data)
            }
        })
        // console.log(data)
    }
    flashMode={RNCamera.Constants.FlashMode.auto}
    reactivate={true}
    reactivateTimeout={500}
    showMarker={true}
    />
}
      {path != '' && 
        <CustomImage 
        source ={{ uri : path}}
        style={{
            width : moderateScale(100 ,0.6),
            height : moderateScale(100 ,0.6),

        }}
        />

      }
    </View>
  );
};


export default ScanScreen;

const styles = ScaledSheet.create({
  text1: {
    fontSize: moderateScale(25, 0.6),
    color: '#002F58',
    width:windowWidth*0.75,
    // backgroundColor:'red',
    textAlign:'center'
  },
  btn: {
    // backgroundColor:'red',
    // backgroundColor: '#002F58',
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.05) / 2,
    alignItems: 'center',
    justifyContent: 'center',

  },
});
