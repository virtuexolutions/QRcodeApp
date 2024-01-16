import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
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

const ShowQR = () => {
  return (
    <View>
        <Header
        headerColor={[Color.blue, Color.blue]}
        title={"Scan"}
        headerRight={true}
        rightIconName={"dots-three-vertical"}
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
        https://oblador.github.io/react-native-vector-icons/
      </CustomText>
      <View
        style={{
            backgroundColor: Color.lightBlue,
          flexDirection: 'row',
         alignItems:'center',
          height: windowHeight * 0.18,
          paddingHorizontal: moderateScale(35, 0.6),
          gap:moderateScale(16, 0.7)
          // paddingVertical:moderateScale(10,.6)
        }}>
        <View style={{alignItems:"center"}}>
          <Icon
            name={'open-outline'}
            as={Ionicons}
            size={45}
            color={Color.themeblue}
          />
          <CustomText
            style={{
              fontSize: moderateScale(13, 0.6),
              color: Color.themeblue,
            }}>
            open
          </CustomText>
        </View>
        <View style={{alignItems:"center"}}>
          <Icon
            name={'share'}
            as={Entypo}
            size={45}
            color={Color.themeblue}
          />
          <CustomText
            style={{
              marginHorizontal: moderateScale(20, 0.6), 
              fontSize: moderateScale(13, 0.6),
              color: Color.themeblue,
            }}>
            share
          </CustomText>
        </View>
        <View style={{alignItems:"center"}}>
          <Icon name={'copy'} as={Feather} size={45} color={Color.themeblue} />

          <CustomText  style={{
            fontSize:moderateScale(13,.6),
            color:Color.themeblue
          }}>copy</CustomText>
        </View>
      </View>
      <View
              style={{
                width: windowWidth,
               
                alignItems: 'center',
               
              }}>
      <CustomButton

                text={"Scan"}
                bgColor={Color.blue}
                fontSize={moderateScale(12, 0.3)}
                textColor={Color.white}
                // borderRadius={moderateScale(30, 0.3)}
                width={windowWidth}
                height={windowHeight * 0.06}
                marginTop={moderateScale(20, 0.3)}
                borderColor={Color.blue}
                borderWidth={1}
                
                // bgColor={Color.themeColor2}
                isBold
                // isGradient
              />

              </View>
              <View style={{
                overflow:"hidden",
              width: windowWidth,
              height:windowHeight * 0.3,
            //   flexDirection:"row",
            alignSelf : 'center',
            // marginLeft:moderateScale(19, 0.8),
              justifyContent: "center",
              alignItems : 'center',
                // backgroundColor  : 'red'
}}>

              <CustomImage
              resizeMode={"contain"}
              style={{width: windowWidth * 0.5}}
              source={require("../Assets/Images/scan.png")}
              />
              </View>
    </View>
  );
};

export default ShowQR;

const styles = StyleSheet.create({});
