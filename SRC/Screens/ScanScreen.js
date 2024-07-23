import {
  Alert,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import VerificationModal from '../Components/VerificationModal';
import LinearGradient from 'react-native-linear-gradient';
const ScanScreen = () => {
  const navigation = useNavigation();
  const [modalIsVisible, setModalIsVisble] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [path, setPath] = useState('');
  console.log('🚀 ~ ScanScreen ~ path:', path);
  // const [modalStates, setModalStates] = useState({
  //   isVisible:false,
  //   showImage:false,
  //   qrData: null
  // });

  const checkIfImageExists = async imageUrl => {
    console.log('======> image',imageUrl)
    try {
      const response = await fetch(imageUrl , { method: 'HEAD' });
      
      console.error(' ======== > fdfdfd ', response);
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
    <SafeAreaView
      style={{
        // backgroundColor: 'red',
        height: windowHeight,
        width: windowWidth,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // backgroundColor:Color.red,
          paddingVertical: moderateScale(15, 0.3),
          paddingHorizontal: moderateScale(10, 0.3),
        }}>
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
        
        <CustomText isBold style={styles.text1}>
          Qr Scan
        </CustomText>
      </View>
      {(!path || path == '') && (
        <QRCodeScanner
          onRead={
            ({data}) =>
              checkIfImageExists(data).then(result => {
                if (result) {
                  console.log('here with iamge', result);
                  setQrData(data);
                  setModalIsVisble(true);
                } else {
                  // console.log('here with no iamge' ,data)
                  navigation.navigate('ShowQR', {data: data});
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
      )}
      <VerificationModal
        isVisible={modalIsVisible}
        setIsVisible={setModalIsVisble}
        // type={path?.type}
        // data={data}
        data={qrData}
        type={'image'}
        // qrName={path?.qrname}

        btnText={'Continue'}
        onContinue={() => {
          setModalIsVisble(false);
          setPath(qrData);
          setShowImage(true);

          // setPath("")
        }}
      />
      {path && path != '' && showImage && (
        <CustomImage
          source={{uri: path}}
          style={{
            // width : moderateScale(200 ,0.6),
            // height : moderateScale(200 ,0.6),
            width: '100%',
            height: windowHeight * 0.85,
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default ScanScreen;

const styles = ScaledSheet.create({
  text1: {
    fontSize: moderateScale(25, 0.6),
    color: '#002F58',
    width: windowWidth * 0.75,
    // backgroundColor:'red',
    textAlign: 'center',
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
  customBtn : { 
    width : windowWidth * 0.13,
    height : windowWidth * 0.13,
    borderRadius : windowWidth * 0.13 /2,
    justifyContent : 'center',
    alignItems : 'center'
    // backgroundColor : Color.themeColor,
    
  },
});
