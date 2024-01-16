import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import Color from '../Assets/Utilities/Color';
import Entypo from 'react-native-vector-icons/Entypo';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../Components/CustomButton';
import Header from '../Components/Header';
import CustomImage from '../Components/CustomImage';
import Clipboard from '@react-native-clipboard/clipboard';
import Share from 'react-native-share';
import navigationService from '../navigationService';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const ShowQR = props => {
  const focused = useIsFocused()
  const navigation = useNavigation()
  const data = props?.route?.params?.data;
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
    <View>
      <Header
      showBack
        headerColor={[Color.blue, Color.blue]}
        title={'Scan'}
        // headerRight={true}
        rightIconName={'arrow-left'}
        iconType={Entypo}
        titleColor={Color.white}
      />
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: moderateScale(20, 0.6),
          paddingHorizontal: moderateScale(15.6),
          justifyContent: 'space-between',
          backgroundColor: Color.themeblue,
        }}>
        <Icon name={'link'} as={Entypo} size={25} color={Color.white} />
        <View
          style={{
            alignItems: 'left',
            // backgroundColor:'green',
            // width:windowWidth*0.3,
            position: 'absolute',
            left: 40,
            top: 20,
          }}>
          <CustomText
            style={{
              fontSize: moderateScale(15, 0.6),
              color: Color.white,
              paddingHorizontal: moderateScale(5, 0.6),
            }}>
            url
          </CustomText>
          <CustomText
            style={{
              color: Color.white,
              fontSize: moderateScale(11, 0.6),
              paddingHorizontal: moderateScale(5, 0.6),
            }}>
            17-jan-2024 8:31 pm Qrcode
          </CustomText>
        </View>
        <Icon name={'star'} as={Entypo} size={18} color={Color.white} />
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
          bgColor={Color.blue}
          fontSize={moderateScale(12, 0.3)}
          textColor={Color.white}
          // borderRadius={moderateScale(30, 0.3)}
          width={windowWidth}
          height={windowHeight * 0.06}
          marginTop={moderateScale(20, 0.3)}
          borderColor={Color.blue}
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
          height: windowHeight * 0.3,
          //   flexDirection:"row",
          alignSelf: 'center',
          // marginLeft:moderateScale(19, 0.8),
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor  : 'red'
        }}>
        <CustomImage
          resizeMode={'contain'}
          style={{width: windowWidth * 0.5}}
          source={require('../Assets/Images/scan.png')}
        />
      </View>
    </View>
  );
};

export default ShowQR;

const styles = StyleSheet.create({});
