import Clipboard from '@react-native-clipboard/clipboard';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Icon } from 'native-base';
import React, { useState } from 'react';
import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import { moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import { windowHeight, windowWidth } from '../Utillity/utils';

const ShowQR = props => {
  const data = props?.route?.params?.data;
  
  const focused = useIsFocused()
  const navigation = useNavigation()
  
  const [textOrNot , setTextORNot] = useState(false)

  const copyToClipboard = () => {
    Clipboard.setString(data);
    Platform.OS == 'android'
      ? ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT)
      : alert('Copied to clipboard');
  };
  const ShareLink = () => {
    Share.open({url : data})
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  const isLink=(text)=> {
    // Regular expression to check if the text resembles a URL
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    console.log(urlRegex.test(text))
    return urlRegex.test(text)
    // setTextORNot(urlRegex.test(text))
  }


  
  return (
      <ScrollView contentContainerStyle={{
        paddingBottom:moderateScale(20,.6)
      }}>
    {/* <View> */}
      <Header
      showBack
        headerColor={['#002F58','#002F58']}
        title={'Scan'}
        // headerRight={true}
        rightIconName={'arrow-left'}
        iconType={Entypo}
        titleColor={Color.white}
      />
      <View
        style={{
          flexDirection: 'row',
          marginVertical:moderateScale(10,.3),
          paddingVertical: moderateScale(20, 0.6),
          paddingHorizontal: moderateScale(15.6),
          justifyContent: 'space-between',
        }}>
        <Icon name={'link'} as={Entypo} size={28} color={Color.themeblue} />
        <View
          style={{
            alignItems: 'left',
            position: 'absolute',
            left: 40,
            top: 20,
          }}>
          <CustomText
          isBold
            style={{
              fontSize: moderateScale(17, 0.6),
              color: Color.themeblue,
              paddingHorizontal: moderateScale(5, 0.6),
            }}>
            url
          </CustomText>
          <CustomText
            style={{
              color: Color.themeblue,
              fontSize: moderateScale(11, 0.6),
              paddingHorizontal: moderateScale(5, 0.6),
            }}>
            17-jan-2024 8:31 pm Qrcode
          </CustomText>
        </View>
        <Icon name={'star'} as={Entypo} size={22} color={Color.themeblue} />
      </View>

      <CustomText
        onPress={() => {}}
        style={{
          marginHorizontal: moderateScale(10, 0.3),
          width: windowWidth * 0.75,
          fontSize: moderateScale(15, 0.6),
          paddingVertical: moderateScale(15, 0.6),
        }}>
        {data}
      </CustomText>
      <View
        style={{
          backgroundColor: Color.lightBlue,
          flexDirection: 'row',
          alignItems: 'center',
          height: windowHeight * 0.18,
          paddingHorizontal: moderateScale(35, 0.6),
          gap: moderateScale(16, 0.7),
          // paddingVertical:moderateScale(10,.6)
        }}>
          {isLink(data) &&


<TouchableOpacity
          onPress={() => {
            Linking.openURL(data);
          }}
          style={{alignItems: 'center'}}>
          <Icon
            name={'open-outline'}
            as={Ionicons}
            size={45}
            color={Color.themeblue}
            onPress={() => {
              Linking.openURL(data);
            }}
            />
          <CustomText
            style={{
              fontSize: moderateScale(13, 0.6),
              color: Color.themeblue,
            }}>
            open
          </CustomText>
        </TouchableOpacity>}
        <TouchableOpacity
          onPress={() => {
            ShareLink();
          }}
          style={{alignItems: 'center'}}>
          <Icon
            name={'share'}
            as={Entypo}
            size={45}
            color={Color.themeblue}
            onPress={() => {
              ShareLink();
            }}
            />
          <CustomText
            style={{
              marginHorizontal: moderateScale(20, 0.6),
              fontSize: moderateScale(13, 0.6),
              color: Color.themeblue,
            }}>
            share
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            copyToClipboard();
          }}
          style={{alignItems: 'center'}}>
          <Icon
            name={'copy'}
            as={Feather}
            size={45}
            color={Color.themeblue}
            onPress={() => {
              copyToClipboard();
            }}
            />

          <CustomText
            style={{
              fontSize: moderateScale(13, 0.6),
              color: Color.themeblue,
            }}>
            copy
          </CustomText>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: windowWidth,
          
          alignItems: 'center',
        }}>
        <CustomButton
          text={'Scan Again'}
          bgColor={Color.themeblue}
          fontSize={moderateScale(12, 0.3)}
          textColor={Color.white}
          // borderRadius={moderateScale(30, 0.3)}
          width={windowWidth*0.7}
          height={windowHeight * 0.06}
          marginBottom={moderateScale(10,.3)}
          marginTop={moderateScale(20, 0.3)}
          borderColor={Color.white}
          borderWidth={1}
          onPress={()=> navigation.goBack()}
          isBold
          // isGradient
          />
      </View>
      <View
        style={{
          overflow: 'hidden',
          width: windowWidth,
          height: windowHeight * 0.35,
          //   flexDirection:"row",
          alignSelf: 'center',
          // marginLeft:moderateScale(19, 0.8),
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor  : 'red'
          
        }}>
           <QRCode
          value={data}
          size={230} 
          />
        {/* <CustomImage
          resizeMode={'contain'}
          style={{width: windowWidth * 0.5}}
          source={require('../Assets/Images/scan.png')}
        /> */}
      </View>
        </ScrollView>
    // </View>
  );
};

export default ShowQR;

const styles = StyleSheet.create({});
