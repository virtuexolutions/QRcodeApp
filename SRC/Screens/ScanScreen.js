import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const ScanScreen = () => {
  const navigation = useNavigation();
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
        //   backgroundColor:Color.red,
          paddingVertical: moderateScale(15, 0.3),
          paddingHorizontal: moderateScale(10, 0.3),
        }}>
        <TouchableOpacity
          onPress={() => {
              navigation.goBack();
            }}
            style={styles.btn}>
          <Icon name="arrowleft" as={AntDesign} color={Color.white} size={25} />
        </TouchableOpacity>
        <CustomText isBold style={styles.text1}>
          Qr Scan
        </CustomText>
      </View>
      <QRCodeScanner
          onRead={({data}) => console.log(data)}
        flashMode={RNCamera.Constants.FlashMode.off}
        reactivate={true}
        reactivateTimeout={500}
        showMarker={true}
      />
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
    backgroundColor: '#002F58',
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.05) / 2,
    alignItems: 'center',
    justifyContent: 'center',

  },
});
