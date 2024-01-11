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

const WalkThroughScreen = props => {
  const dispatch = useDispatch();

  const slides = [
    {
      key: '1',
      image: require('../Assets/Images/walkthrough1.png'),
      title: 'Lorem Ipsum Dolor',
      text: `Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Pellentesque Eu Pulvinar Metus, Fringilla Semper Enim. Etiam Viverra Porttitor Nunc Laoreet Faucibus. Fusce Accumsan Mauris At Sem Finibus Gravida. Donec Cursus Tincidunt Eros In Efficitur. Maecenas Cursus Pretium Dui, In Tristique Turpis Finibus Nec. Class Aptent. `,
    },
    {
      key: '2',
      image: require('../Assets/Images/walkthrough2.png'),
      title: 'Lorem Ipsum Dolor',
      text: `Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Pellentesque Eu Pulvinar Metus, Fringilla Semper Enim. Etiam Viverra Porttitor Nunc Laoreet Faucibus. Fusce Accumsan Mauris At Sem Finibus Gravida. Donec Cursus Tincidunt Eros In Efficitur. Maecenas Cursus Pretium Dui, In Tristique Turpis Finibus Nec. Class Aptent.`,
    },
    {
      key: '3',
      image: require('../Assets/Images/walkthrough3.png'),
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
          source={item?.image}>
          <Image

            source={require('../Assets/Images/Path.png')}
            resizeMode={'contain'}
            style={{
              position: 'absolute',
              left: item?.key == 2 ? 320 :0,
              top: 35,
              height: windowHeight * 0.6,
              // height:windowHeight*0.3,
              // width:windowWidth*0.3,

            }}
          />
          <View
            style={{
              width: windowWidth * 0.9,
              height: windowHeight * 0.38,
              borderRadius: moderateScale(20, 0.6),
              paddingVertical: moderateScale(26, 0.6),
              // backgroundColor: Colosr.themeColor2,
              alignItems: 'center',
              position: 'absolute',
              bottom: 0,
            }}>
            <CustomText
              style={{
                color: Color.white,
                fontSize: moderateScale(30, 0.6),
                width: windowWidth * 0.8,
                // textAlign: 'justify',
                paddingVertical: moderateScale(5, 0.6),
              }}
              numberOfLines={2}
              isBold>
              {item?.title}
            </CustomText>
            <CustomText
              style={{
                color: Color.white,
                fontSize: moderateScale(11, 0.6),
                width: windowWidth * 0.9,
                lineHeight: moderateScale(15, .3),
                textAlign: 'center',
                paddingVertical: moderateScale(5, 0.6),
              }}
              numberOfLines={15}>
              {item?.text}
            </CustomText>

          </View>
          {/* <View
            style={{
              alignItems: 'center',
            }}>
            <Text numberOfLines={1} style={styles.title}>
              {item.title}
            </Text>
            <Text numberOfLines={4} style={styles.subText}>
              {item.text}
            </Text>
          </View> */}
        </ImageBackground>
      </View>
    );
  };

  const RenderNextBtn = () => {
    return (
      <CustomText style={[styles.generalBtn, styles.btnRight]}>Next</CustomText>
    );
  };
  const RenderDoneBtn = () => {
    return (
      <CustomText
        onPress={() => {
          dispatch(setWalkThrough(true));
        }}
        style={[styles.generalBtn, styles.btnRight]}>
        Done
      </CustomText>
    );
  };
  const RenderSkipBtn = () => {
    return (
      <CustomText
        onPress={() => {
          dispatch(setWalkThrough(true));
        }}
        style={[styles.generalBtn, styles.btnLeft]}>
        Skip
      </CustomText>
    );
  };
  const RenderBackBtn = () => {
    return (
      <CustomText style={[styles.generalBtn, styles.btnLeft]}>Back</CustomText>
    );
  };
  return (
    <ScreenBoiler
      showHeader={false}
      statusBarBackgroundColor={[Color.white, Color.white]}
      statusBarContentStyle={'dark-content'}>
      <View style={styles.container}>
        {/* <CustomImage
          source={backgroundImage}
          resizeMode="contain"
          style={styles.bgImage}
        /> */}
        <AppIntroSlider
          renderItem={RenderSlider}
          data={slides}
          showSkipButton={true}
          showPrevButton={true}
          activeDotStyle={{ backgroundColor: Color.themeColor2 }}
          dotStyle={{
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: Color.white,
          }}
          renderDoneButton={RenderDoneBtn}
          renderNextButton={RenderNextBtn}
          renderSkipButton={RenderSkipBtn}
          renderPrevButton={RenderBackBtn}
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
    paddingVertical: moderateScale(15, 0.3),
    textAlign: 'center',
    fontWeight: '400',
    fontSize: moderateScale(15, 0.3),
  },
  btnLeft: {
    color: Color.white,
    paddingLeft: moderateScale(20, 0.3),
  },
  btnRight: {
    color: Color.white,
    paddingRight: moderateScale(20, 0.3),
  },
});

export default WalkThroughScreen;
const BoldText = ({ children }) => {
  return <Text style={{ fontWeight: 'bold' }}>{children}</Text>;
};
