import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';

const GenerateQr = props => {
  const navigation = useNavigation();
  const data = props?.route?.params?.data;
  console.log('🚀 ~ GenerateQr ~ data:', data);
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
        <QRCode
          value={data}
          size={230} 
        />
            <CustomButton
        // onPress={() => {
        //   navigation.navigate('GenerateQr' ,{data:data})
        //   setLink('')
        //   setQrName('')
        // }}
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
