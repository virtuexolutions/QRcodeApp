import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useCallback, useState} from 'react';
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
import CustomImage from '../Components/CustomImage';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import {Platform} from 'react-native';

const GenerateQr = props => {
  const navigation = useNavigation();
  const Item = props?.route?.params?.item;
  console.log('🚀 ~ GenerateQr ~ item:', Item);
  const data = props?.route?.params?.data;
  console.log('🚀 ~ GenerateQr ~ data:', data);
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ GenerateQr ~ token:', token);
  const [Image, setImage] = useState({});
  // console.log("🚀 ~ GenerateQr ~ Image:", Image)
  const [isLoading, setIsLoading] = useState(false);

  const onCapture = useCallback(async uri => {
    // console.log("do something with ", uri);
    const base64Data = await RNFS.readFile(uri, 'base64');
    console.log('🚀 ~ onCapture ~ base64Data:', base64Data);
    setImage(base64Data);
  }, []);

  const saveQrImage = async () => {
    const formData = new FormData();
    const body = {
      type: Item,
    };
    for (let key in body) {
      formData?.append(key, body[key]);
    }
    {
      if (Object.keys(Image)?.length > 0) {
        formData.append('image', Image);
      }
      const url = 'auth/document';
      setIsLoading(true);
      const response = await Post(url, formData, apiHeader(token));
      //  return  console.log("🚀 ~ saveQrImage ~ formData:", formData)
      if (response != undefined) {
     console.log('🚀 ~ saveQrImage ~ response:', response?.data);
     navigation.navigate('HomeScreen')
      }
    }
  };

  return (
    <View>
      {/* // <Text>GenerateQr</Text> */}
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.btn}>
          <Icon name="arrowleft" as={AntDesign} color={Color.white} size={25} />
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
            value={data}
            // value="Just some string value"
            // logo={require('../Assets/Images/cardimage.png')}
            size={230}
          />
        </ViewShot>
        <CustomButton
          onPress={() => {
            saveQrImage();
            // navigation.navigate('drawer');
          }}
          text={'save'}
          fontSize={moderateScale(14, 0.3)}
          textColor={Color.white}
          borderRadius={moderateScale(30, 0.3)}
          width={windowWidth * 0.4}
          height={windowHeight * 0.06}
          marginTop={moderateScale(40, 0.3)}
          borderWidth={1}
          bgColor={'#002F58'}
          borderColor={Color.white}
          isBold
        />
        {/* {
  Image != '' &&

        <CustomImage 
        source={{uri : `data:image/png;base64,${Image}`}}
        style={{
          width : 100 ,
          height : 100,
          backgroundColor : 'red'
        }}
        />} */}
      </View>
    </View>
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
});
