import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  PixelRatio,
  SafeAreaView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Icon} from 'native-base';
import AppIntroSlider from 'react-native-app-intro-slider';
import Color from '../Assets/Utilities/Color';
import {useSelector, useDispatch} from 'react-redux';
import ScreenBoiler from '../Components/ScreenBoiler';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {setWalkThrough} from '../Store/slices/auth';
import LinearGradient from 'react-native-linear-gradient';
import {color} from 'native-base/lib/typescript/theme/styled-system';
import {RadialGradient} from 'react-native-svg';
import {height} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import {transform} from 'typescript';

const WalkThroughScreen = props => {
  const dispatch = useDispatch();

  const slides = [
    {
      key: 1,
      image: require('../Assets/Images/walkthroughblack1.png'),
      title: 'LOREM IPSUM',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor lorem consequat egestas placerat. Integer eu lorem ullamcorper, volutpat ligula ac, ultrices neque. Integer sit amet velit consequat, auctor nulla sit amet, egestas ex. Nulla ut velit consequat, dapibus urna u.',
      sidetext: 'Lorem Ipsum Dolor Sit Amet, Consectetur',
    },
    {
      key: 2,
      image: require('../Assets/Images/walkthroughblack2.png'),
      title: 'LOREM IPSUM',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor lorem consequat egestas placerat. Integer eu lorem ullamcorper, volutpat ligula ac, ultrices neque. Integer sit amet velit consequat, auctor nulla sit amet, egestas ex. Nulla ut velit consequat, dapibus urna u.',
      sidetext: 'Lorem Ipsum Dolor Sit Amet, Consectetur',
    },
    {
      key: 3,
      image: require('../Assets/Images/walkthroughblack3.png'),
      title: 'LOREM IPSUM',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor lorem consequat egestas placerat. Integer eu lorem ullamcorper, volutpat ligula ac, ultrices neque. Integer sit amet velit consequat, auctor nulla sit amet, egestas ex. Nulla ut velit consequat, dapibus urna u.',
    },
  ];

  const RenderSlider = ({item}) => {
    return (
      <SafeAreaView style={styles.SliderContainer}>
        <ImageBackground
          style={{
            width: windowWidth,
            minHeight: windowHeight,
            // paddingBottom: moderateScale(40, 0.6),
            justifyContent: 'center',
            // backgroundColor:'red',
            // height: windowHeight*0.8,
            alignItems: 'center',
          }}
          source={item.image}>
          {/* <View style={{backgroundColor:'red'}}> */}
          <CustomText
            style={{
              color: Color.white,
              fontSize: moderateScale(10, 0.6),
              width: windowWidth * 0.65,
              // backgroundColor:'green',
              padding: moderateScale(5, 0.6),
              // lineHeight: moderateScale(44, 0.6),
              // position: 'absolute',
              bottom:
                item?.key == 1 ? moderateScale(50, 0.6) : moderateScale(-155),
              marginLeft:
                item?.key == 1 ? moderateScale(340, 0.6) : moderateScale(-340),
              // top: item?.key == 1 ? moderateScale(0,0.6) : moderateScale(50,0.6),
              transform: [{rotate: '-90deg'}],
              // right: item?.key != 1 ? 150 : 55,
              letterSpacing: 0.6,
              textTransform: 'upperCase',
            }}
            // numberOfLines={2}
          >
            {item?.sidetext}
          </CustomText>
          {/* </View> */}
          <LinearGradient
            style={{
              height: windowHeight * 0.07,
              justifyContent: 'center',
              marginTop:
                item.key === 1
                  ? moderateScale(-420, 0.3)
                  : moderateScale(290, 0.6),
            }}
            colors={['#FFFFFF00', Color.white]}
            start={item.key !== 3 ? {x: 1, y: 1} : {x: 0, y: 0.9}}
            end={item.key !== 3 ? {x: 0.1, y: 1} : {x: 1, y: 0.4}}>
            <CustomText
              style={{
                // backgroundColor:Color.white,
                color: Color.black,
                // fontWeight:'bold',
                fontSize: moderateScale(30, 0.6),
                width: windowWidth,
                paddingHorizontal: moderateScale(16, 0.6),
                textAlign: item.key == 3 ? 'right' : 'left',
                // paddingVertical: moderateScale(5, 0.6),
              }}
              // numberOfLines={2}
              isBold>
              {item?.title}
            </CustomText>
          </LinearGradient>
          <View
            style={[
              {
                width: windowWidth * 0.95,
                // lineHeight:20,
                height:
                  item.key == '2' ? windowHeight * 0.24 : windowHeight * 0.73,

                borderRadius: moderateScale(20, 0.6),
                // paddingVertical: moderateScale(26, 0.6),
                // backgroundColor: Color.themeColor2,
                alignItems: 'center',
                position: 'absolute',
                bottom: 0,
                // backgroundColor:'green'
              },
              item.key == '3' ? {height: windowHeight * 0.24} : null,
            ]}>
            <CustomText
              style={{
                color: Color.white,
                fontSize: moderateScale(11, 0.6),
                width: windowWidth * 0.9,
                lineHeight: moderateScale(19, 0.3),
                textAlign: item.key == '3' ? 'right' : 'left',
                paddingVertical: moderateScale(5, 0.6),
              }}
              numberOfLines={15}>
              {item?.text}
            </CustomText>
          </View>

          {/* <View
            style={[{
              
              width: windowWidth * 0.9,
              height: item.key== '2'? windowHeight * 0.4: windowHeight * 0.8,
              borderRadius: moderateScale(20, 0.6),
              // paddingVertical: moderateScale(26, 0.6),
              backgroundColor: Color.themeColor2,
              alignItems: 'center',
              position: 'absolute',
              bottom: 0,
            }, item.key== '3' ? {height: windowHeight * 0.35} :null]}>
              <LinearGradient
              style={{marginTop: item.key === '2'? moderateScale(15,0.3) : windowHeight*0.1}}
              colors={[ "#FFFFFF00" ,Color.white,]}
                start={ item.key!== '3'?{x: 1.5, y: 1}:{x: 0, y:0.9}} end={item.key!== '3'?{x:0.15, y:1.5} :{x: 1, y: 0.4}}
              >

            <CustomText
              style={{
                // backgroundColor:Color.white,
                color: "#001D56",
                fontSize: moderateScale(30, 0.6),
                width: windowWidth,
                paddingHorizontal: moderateScale(25, 0.6),
                textAlign: item.key=='3'? 'right': 'left',
                // paddingVertical: moderateScale(5, 0.6),
              }}
              // numberOfLines={2}
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
            
          </View> */}
        </ImageBackground>
      </SafeAreaView>
    );
  };

  const RenderNextBtn = () => {
    console.log('aftab');
    return (
      <View style={[styles.generalBtn, styles.btnRight]}>
        <Icon
          name="arrowright"
          size={moderateScale(24, 0.6)}
          color={Color.white}
          as={AntDesign}
        />
      </View>
    );
  };
  const RenderDoneBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(setWalkThrough(true));
        }}
        style={[
          styles.generalBtn,
          styles.btnRight,
          // top: moderateScale(-610, 0.6),
        ]}>
        <Icon
          name="arrowright"
          size={moderateScale(24, 0.6)}
          color={Color.white}
          as={AntDesign}
        />
      </TouchableOpacity>
    );
  };
  // const RenderSkipBtn = () => {
  //   return (
  //     <TouchableOpacity
  //     onPress={()=>{
  //       dispatch(setWalkThrough(true));
  //     }}
  //     style={[styles.doneBtn, styles.skip]}>

  //     <CustomText
  //       onPress={() => {
  //         dispatch(setWalkThrough(true));
  //       }}
  //       isBold
  //       style={{color:Color.white,overflow:'hidden' ,fontSize:moderateScale(12, 0.9)}}
  //       >
  //       Skip
  //     </CustomText>

  //         </TouchableOpacity>
  //   );
  // };
  // const RenderBackBtn = () => {
  //     return (
  //       <View style={[styles.generalBtn, styles.btnLeft]}>
  //       {/* <RadialGradient

  //       colors={[Color.lightBlue, Color.darkBlue]}
  //       > */}

  //       <Icon
  //       name='arrowleft'
  //       size={moderateScale(24, 0.6)}
  //       color={Color.white}
  //       as={AntDesign}

  //       />
  //       {/* </RadialGradient> */}
  //       </View>    );
  //   };
  return (
    <ScreenBoiler
      showHeader={false}
      statusBarBackgroundColor={[Color.white, Color.white]}
      statusBarContentStyle={'dark-content'}>
      {/* <View style={styles.container}> */}

      <AppIntroSlider
        renderItem={RenderSlider}
        data={slides}
        // showNextButton={true}
        // showSkipButton={true}
        // showPrevButton={true}
        showDoneButton={true}
        dotStyle={{display: 'none'}}
        activeDotStyle={{display: 'none'}}
        renderNextButton={RenderNextBtn}
        // renderPrevButton={RenderBackBtn}
        renderDoneButton={RenderDoneBtn}
        // renderSkipButton={RenderSkipBtn}
      />
      {/* </View> */}
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
    // backgroundColor: "#001D56",
    borderColor: Color.white,
    // opacity:0.34,
    width: windowWidth * 0.14,
    height: windowWidth * 0.14,
    borderWidth: moderateScale(1, 0.6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(100, 0.9),
    // paddingVertical: moderateScale(15, 0.5),
    // textAlign: 'center',
    fontWeight: '400',
    position: 'absolute',
    top: moderateScale(-600, 0.6),
    zIndex: 1,
    // top:moderateScale(50,0.6)
    // fontSize: moderateScale(15, 0.3),
  },
  // doneBtn:{
  //   width:windowWidth * 0.14,
  //   height: windowHeight * 0.07,
  //   alignItems:'center',
  //   overflow:"hidden",
  //   justifyContent:'center',
  //   // marginTop: moderateScale(18, 0.3),
  //   borderRadius: moderateScale(100, 0.6),
  //   borderColor:Color.white,
  //   backgroundColor: "#001D56",
  //   // opacity: 0.5,
  //   borderWidth: 1,

  // },
  // btnLeft: {
  //   backgroundColor: "#001D56",
  //   position:'absolute',
  //   paddingHorizontal: moderateScale(7, 0.2),
  //   paddingVertical: moderateScale(7, 0.2),
  //   // top: moderateScale(20, 0.7),
  //   // right: moderateScale(20,0.1),
  //   zIndex:1,
  // },
  // skip: {

  //   // top: moderateScale(20, 0.7),
  //   // width:windowWidth * 0.18,
  //   // height: windowHeight * 0.09,
  //   alignItems:'center',
  //   justifyContent:'center',
  //   borderRadius: moderateScale(100, 0.9),
  //   // borderColor:Color.white,
  //   backgroundColor: "#001D56",
  //   // opacity: 0.5,
  //   // borderWidth:  moderateScale(3,0.1),
  //   zIndex:1
  // },
  btnRight: {
    backgroundColor: Color.themesplashblack,
    paddingHorizontal: moderateScale(8, 0.4),
    // paddingVertical: moderateScale(8, 0.4),
    // position:'absolute',
    // bottom:'100%',
    // opacity:0.34,
    // top: moderateScale(20, 0.6),
    right: moderateScale(11, 0.6),
    // zIndex:1,
  },
  maintextBox: {
    height: windowHeight * 0.1,
    width: windowWidth,
  },
});

export default WalkThroughScreen;
const BoldText = ({children}) => {
  return <Text style={{fontWeight: 'bold'}}>{children}</Text>;
};
