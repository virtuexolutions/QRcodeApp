import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, { useCallback, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import CustomImage from '../Components/CustomImage';


const GenerateQr = props => {
  const navigation = useNavigation();
  const data = props?.route?.params?.data;
  console.log('🚀 ~ GenerateQr ~ data:', data);
  const [Image, setImage] = useState('')

  const onCapture =  useCallback  ( async (uri) => {
    // console.log("do something with ", uri);
    const base64Data = await RNFS.readFile(uri, 'base64');
    console.log("🚀 ~ onCapture ~ base64Data:", base64Data)
    setImage(base64Data)
  }, []);

  
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
          height: windowHeight*0.75,
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
          navigation.navigate('drawer')
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
    backgroundColor:'#002F58',
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
