import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { Icon } from 'native-base';
import AppIntroSlider from 'react-native-app-intro-slider';
import Color from '../Assets/Utilities/Color';
import { useSelector, useDispatch } from 'react-redux';
import ScreenBoiler from '../Components/ScreenBoiler';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { moderateScale } from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import { setWalkThrough } from '../Store/slices/auth';
import LinearGradient from 'react-native-linear-gradient';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import { RadialGradient } from 'react-native-svg';

const WalkThroughScreen = props => {
  const dispatch = useDispatch();
 
  const slides = [
    {
      key: '1',
      image: require('../Assets/Images/mobile_Qr_Code_illustration.png'),
      title: 'Lorem Ipsum Dolor',
      text: `Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Pellentesque Eu Pulvinar Metus, Fringilla Semper Enim. Etiam Viverra Porttitor Nunc Laoreet Faucibus. Fusce Accumsan Mauris At Sem Finibus Gravida. Donec Cursus Tincidunt Eros In Efficitur. Maecenas Cursus Pretium Dui, In Tristique Turpis Finibus Nec. Class Aptent. `,
    },
    {
      key: '2',
      image: require('../Assets/Images/scannings.png'),
      title: 'Lorem Ipsum Dolor',
      text: `Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Pellentesque Eu Pulvinar Metus, Fringilla Semper Enim. Etiam Viverra Porttitor Nunc Laoreet Faucibus. Fusce Accumsan Mauris At Sem Finibus Gravida. Donec Cursus Tincidunt Eros In Efficitur. Maecenas Cursus Pretium Dui, In Tristique Turpis Finibus Nec. Class Aptent.`,
    },
    {
      key: '3',
      image: require('../Assets/Images/holding-phone.png'),
      title: 'Lorem Ipsum Dolor',
      text: `Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Pellentesque Eu Pulvinar Metus, Fringilla Semper Enim. Etiam Viverra Porttitor Nunc Laoreet Faucibus. Fusce Accumsan Mauris At Sem Finibus Gravida. Donec Cursus Tincidunt Eros In Efficitur. Maecenas Cursus Pretium Dui, In Tristique Turpis Finibus Nec. Class Aptent.`
    },
  ];


  const RenderSlider = ({ item }) => {
    return (
      <View style={styles.SliderContainer}>
        <ImageBackground
          style={{
            width: windowWidth,
            minHeight: windowHeight,
            paddingBottom: moderateScale(40, 0.6),
            justifyContent: 'center',
            // backgroundColor:'red',
            // height: windowHeight*0.8,
            alignItems: 'center',
          }}
          source={require('../Assets/Images/bg.png')}>
  { item.key !== '1'
             ? <Image

source={item.image}
resizeMode={'contain'}
style={{
  position: 'absolute',
  // left: moderateScale(1,0.1),
  bottom: moderateScale(11,0.2),
  // right: moderateScale(-79,0.7),

  zIndex:1,
  right: item.key==='2'? moderateScale(-77,0.9) : moderateScale(-9,0.7),
  // top: moderateScale(-125, 0.4),
  top: item.key=== '2' ?  moderateScale(-156, 0.4)  : moderateScale(85, 0.4),
  height: item.key === '2' ? windowHeight : windowHeight *0.6 ,
  // height:windowHeight*0.3,
  width: item.key === '2' ? windowWidth * 2.15 :windowWidth * 0.8   

}}
/> : null}

                  <View
            style={[{
              
              width: windowWidth * 0.9,
              height: item.key== '2'? windowHeight * 0.4: windowHeight * 0.8,
              borderRadius: moderateScale(20, 0.6),
              // paddingVertical: moderateScale(26, 0.6),
              // backgroundColor: Color.themeColor2,
              alignItems: 'center',
              position: 'absolute',
              bottom: 0,
            }, item.key== '3' ? {height: windowHeight * 0.35} :null]}>
              <LinearGradient
              style={{marginTop: item.key === '2'? moderateScale(15,0.3) : 0,}}
              colors={[ "#FFFFFF00" ,Color.white,]}
                start={ item.key!== '3'?{x: 1.5, y: 1}:{x: 0, y:0.9}} end={item.key!== '3'?{x:0.15, y:1.5} :{x: 1, y: 0.4}}
              >

            <CustomText
              style={{
                // backgroundColor:Color.white,
                color: Color.darkBlue,
                fontSize: moderateScale(30, 0.6),
                width: windowWidth,
                paddingHorizontal: moderateScale(25, 0.6),
                textAlign: item.key=='3'? 'right': 'left',
                paddingVertical: moderateScale(5, 0.6),
              }}
              numberOfLines={2}
              isBold>
              {item?.title}
            </CustomText>
                </LinearGradient>
            <CustomText
              style={{
                color: Color.white,
                fontSize: moderateScale(11, 0.6),
                width: windowWidth * 0.9,
                lineHeight: moderateScale(15, .3),
                textAlign: item.key=='3'? 'right': 'left',
                paddingVertical: moderateScale(5, 0.6),
              }}
              numberOfLines={15}>
              {item?.text}
            </CustomText>
            { item.key == '1'
             ? <Image

source={item.image}
resizeMode={'contain'}
style={{
  // position: 'absolute',
  // left: item?.key == 2 ? 320 :0,
  // top: 35,
  height: windowHeight * 0.7,
  // height:windowHeight*0.3,
  // width:windowWidth*0.3,

}}
/> : null}

          </View>
        </ImageBackground>
      </View>
    );
  };

  const RenderNextBtn = () => {
    return (
      <View style={[styles.generalBtn, styles.btnRight]}>
      {/* <RadialGradient
      
      colors={[Color.lightBlue, Color.darkBlue]}
      > */}

      <Icon
      name='arrowright'
      size={moderateScale(35, 0.6)}
      color={Color.white}
      as={AntDesign}
      
      />
      {/* </RadialGradient> */}
      </View>
    );
  };
  const RenderDoneBtn = () => {
    return (
      <View style={[styles.doneBtn, styles.btnRight,{
    top: moderateScale(-610, 0.6),

      }]}>

      <CustomText
        onPress={() => {
          dispatch(setWalkThrough(true));
        }}
        isBold
        style={{color:Color.white,overflow:'hidden' , fontSize:moderateScale(16, 0.9)}}
        >
        Done
      </CustomText>
        </View>
    );
  };
  const RenderSkipBtn = () => {
    return (
      <View style={[styles.doneBtn, styles.skip]}>

      <CustomText
        onPress={() => {
          dispatch(setWalkThrough(true));
        }}
        isBold
        style={{color:Color.white,overflow:'hidden' ,fontSize:moderateScale(16, 0.9)}}
        >
        Skip
      </CustomText>

          </View>
    );
  };
  const RenderBackBtn = () => {
    return (
      <View style={[styles.generalBtn, styles.btnLeft]}>
      {/* <RadialGradient
      
      colors={[Color.lightBlue, Color.darkBlue]}
      > */}

      <Icon
      name='arrowleft'
      size={moderateScale(35, 0.6)}
      color={Color.white}
      as={AntDesign}
      
      />
      {/* </RadialGradient> */}
      </View>    );
  };
  return (
    <ScreenBoiler
      showHeader={false}
      statusBarBackgroundColor={[Color.white, Color.white]}
      statusBarContentStyle={'dark-content'}>
      <View style={styles.container}>
        
        <AppIntroSlider
          renderItem={RenderSlider}
          data={slides}
          showSkipButton={true}
          showPrevButton={true}
          showDoneButton={true}
         
          dotStyle={{display:'none'}}
          activeDotStyle={{display:'none' }}
          renderNextButton={RenderNextBtn}
          renderPrevButton={RenderBackBtn}
          renderDoneButton={RenderDoneBtn}
          renderSkipButton={RenderSkipBtn}
        />
      </View>
    </ScreenBoiler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
  },
  SliderContainer: {
    // flex: 1,
    height: windowHeight,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  title: {
    color: Color.themeColor2,
    fontWeight: '700',
    fontSize: 30,
    textAlign: 'center',
    width: windowWidth * 0.8,
    marginTop: windowHeight * 0.065,
  },
  subcontainer: {
    width: windowWidth,
    height: windowHeight * 0.55,
    backgroundColor: Color.green,
    borderTopLeftRadius: moderateScale(35, 0.3),
    borderTopRightRadius: moderateScale(35, 0.3),
  },
  subText: {
    color: Color.themeColor2,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: moderateScale(15, 0.3),
    width: windowWidth * 0.8,
    marginTop: moderateScale(10, 0.3),
  },
  generalBtn: {
    backgroundColor: "#49C3E9",
    borderColor: Color.white,
    opacity:0.34,
    borderWidth: moderateScale(3,0.1),
    borderRadius: moderateScale(100, 0.9),
    paddingVertical: moderateScale(15, 0.5),
    textAlign: 'center',
    fontWeight: '400',
    // fontSize: moderateScale(15, 0.3),
  },
  doneBtn:{
    width:windowWidth * 0.18,
    height: windowHeight * 0.09,
    alignItems:'center',
    overflow:"hidden",
    justifyContent:'center',
    // marginTop: moderateScale(18, 0.3),
    borderRadius: moderateScale(100, 0.9),
    borderColor:Color.white,
    backgroundColor: "#49C3E9",
    opacity: 0.5,

    borderWidth:  moderateScale(3,0.1),
  },
  btnLeft: {
    color: Color.white,
    position:'absolute',
    paddingHorizontal: moderateScale(7, 0.2),
    paddingVertical: moderateScale(7, 0.2),
    top: moderateScale(-600, 0.7),
    // right: moderateScale(20,0.1),
    zIndex:1,
  },
  skip: {
 
    top: moderateScale(-610, 0.7),
    // width:windowWidth * 0.18,
    // height: windowHeight * 0.09,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: moderateScale(100, 0.9),
    borderColor:Color.white,
    backgroundColor: "#49C3E9",
    opacity: 0.5,
    borderWidth:  moderateScale(3,0.1),
    zIndex:1
  },
  btnRight: {
    color: Color.white,
    paddingHorizontal: moderateScale(8, 0.4),
    paddingVertical: moderateScale(8, 0.4),
    position:'absolute',
    opacity:0.34,
    top: moderateScale(-600, 0.7),
    right: moderateScale(20,0.1),
    zIndex:1,
  },
});

export default WalkThroughScreen;
const BoldText = ({ children }) => {
  return <Text style={{ fontWeight: 'bold' }}>{children}</Text>;
};
