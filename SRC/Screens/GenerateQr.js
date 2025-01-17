import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import QRCode from 'react-native-qrcode-svg';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import {Platform} from 'react-native';
import Color from '../Assets/Utilities/Color';
import Feather from 'react-native-vector-icons/Feather';
import RNFetchBlob from 'rn-fetch-blob';
import VerificationModal from '../Components/VerificationModal';
import LinearGradient from 'react-native-linear-gradient';

const GenerateQr = props => {
  const navigation = useNavigation();
  const token = useSelector(state => state.authReducer.token);
  const type = props?.route?.params?.item;
  console.log('🚀 ~ GenerateQr ~ Item:', type);
  const data = props?.route?.params?.data;
  // console.log("🚀 ~ GenerateQr ~ data:", data)
  const qrName = props?.route?.params?.qrName;
  console.log('🚀 ~ GenerateQr ~ qrName============>:', qrName);

  const [Image, setImage] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [qrCodeRef, setQrCodeRef] = useState(null);
  console.log('🚀 ~ GenerateQr ~ modal ========>:', isVisible);

  const onCapture = useCallback(async uri => {
    // console.log("do something with ", uri);
    // const base64Data = await RNFS.readFile(uri, 'base64');
    setImage(uri);
  }, []);

  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  // const DownloadQr = () => {
  //   try {
  //     qrCodeRef.toDataURL(async data => {
  //       const path =
  //         RNFetchBlob.fs.dirs.DownloadDir +
  //         `/${qrName
  //           .replace('http', '')
  //           .replace('://', 'a')
  //           .replace('.', '_')
  //           .slice(0, 20)}.png`;
  //       await RNFetchBlob.fs.writeFile(path, data, 'base64');

  //       alert('Download Successfully');
  //       navigation.navigate('HomeScreen');
  //       // console.log("🚀 ~ qrCodeRef.toDataURL ~ path:", path)
  //     });
  //   } catch (error) {}
  // };

  // const saveQrImage = async () => {
  //   const formData = new FormData();
  //   const body = {
  //     type: type,
  //     image: Image,
  //     qr_name: qrName,
  //   };
  //   //  console.log("🚀 ~ saveQrImage ~ body===================>:", body)
  //   // for (let key in body) {
  //   //   formData?.append(key, body[key]);
  //   // }

  //   // if (Object.keys(Image)?.length > 0) {
  //   //   formData.append('image', Image);
  //   // }
  //   const url = 'auth/document';
  //   setIsLoading(true);
  //   const response = await Post(url, body, apiHeader(token));
  //   console.log('🚀 ~ saveQrImage ~ response:', response?.data);
  //   //  return  console.log("🚀 ~ saveQrImage ~ formData:================> image save successfully ")

  //   Platform.OS == 'android'
  //     ? ToastAndroid.show('Succesfully generated!', ToastAndroid.SHORT)
  //     : alert('Invalid URL');
  //   // return   console.log('🚀 ~ saveQrImage ~ response:', response?.data);
  //   navigation.navigate('HomeScreen');
  // };
  return (
    <SafeAreaView>
      <View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
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
        </View>
        <View
          style={{
            height: windowHeight * 0.75,
            // backgroundColor:'red',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ViewShot onCapture={onCapture} captureMode="mount">
            <QRCode
              value={type == 'url' || type == 'text' ? data : data?.path}
              // getRef={c => (this.save=c)}
              // value="Just some string value"
              logo={require('../Assets/Images/cardimage.png')}
              size={230}
              getRef={ref => setQrCodeRef(ref)}
            />
          </ViewShot>
          <CustomButton
            onPress={() => {
              setIsVisible(true);
              // DownloadQr()
            }}
            text={
              isLoading ? (
                <ActivityIndicator size={'small'} color={'white'} />
              ) : (
                'save'
              )
            }
            fontSize={moderateScale(14, 0.3)}
            textColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.4}
            height={windowHeight * 0.06}
            marginTop={moderateScale(40, 0.3)}
            borderWidth={1}
            isGradient={true}
            bgColor={Color.themeBgColor}
            borderColor={Color.white}
            isBold
          />
          {/* <CustomButton
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}
          text={'Skip'}
          fontSize={moderateScale(14, 0.3)}
          textColor={Color.white}
          borderRadius={moderateScale(30, 0.3)}
          width={windowWidth * 0.4}
          height={windowHeight * 0.06}
          marginTop={moderateScale(10, 0.3)}
          borderWidth={1}
          isGradient={true}
          bgColor={Color.themeBgColor}
          borderColor={Color.white}
          isBold
        /> */}
        </View>
        <VerificationModal
          data={data}
          type={type}
          qrCodeRef={qrCodeRef}
          qrName={qrName}
          setIsVisible={setIsVisible}
          isVisible={isVisible}
        />
      </View>
    </SafeAreaView>
  );
};

export default GenerateQr;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#002F58',
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.05) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    //   backgroundColor:Color.red,
    paddingVertical: moderateScale(15, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
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
