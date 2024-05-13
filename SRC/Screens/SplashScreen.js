import React, {useEffect, useRef} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {View} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import Color from '../Assets/Utilities/Color';

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: windowHeight*0.55,
          width: windowWidth * 0.99, // flex: 1,
         
        }}>
        <FastImage
          source={require('../Assets/Images/gif.gif')}
          style={{width: '100%', height: '100%'}}
          animated
        />
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
    // backgroundColor :'rgba(0,0,0,0.1)'
  },
  bottomImage: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.3,
  },
  // textContainer: {
  //   flexDirection: "row",
  //   alignSelf :'center',
  //   width : windowWidth * 0.4,
  //   height :windowWidth * 0.4,
  //   borderRadius : moderateScale(windowWidth* 0.7 / 2 , 0.3),
  //   justifyContent : 'center',
  //   alignItems : 'center',
  //   // backgroundColor : Color.white,

  // },
  LogoText: {
    fontSize: moderateScale(35, 0.3),
    fontWeight: 'bold',
  },
});

export default SplashScreen;
