import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from './CustomButton';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import Color from '../Assets/Utilities/Color';

const CardComponent = ({item}) => {
  return (
    <View style={styles.container}>
      <View>
        <CustomText isBold style={styles.title}>
          {item?.title}
        </CustomText>
        <CustomText
          style={styles.desc}>
          {item?.description}
        </CustomText>
      </View>
      <View
        style={styles.imagecontainner}>
        <CustomImage
        resizeMode={'stretch'}
          style={{
            height: '100%',
            width: '100%',
            tintColor : Color.black
          }}
          source={item?.image}
        />
      </View>
    </View>
  );
};

export default CardComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    flexDirection: 'row',
    borderRadius: moderateScale(20, 0.6),
    height: windowHeight * 0.13,
    marginBottom: moderateScale(10, 0.6),
    width: windowWidth * 0.9,
    alignItems: 'center',
    paddingHorizontal: moderateScale(15, 0.6),
  },
  title: {
    fontSize: moderateScale(18, 0.6),
    color: '#1F1D2B',
    width: windowWidth * 0.6,
    textTransform : 'uppercase',
    // backgroundColor : 'red'
  },
  desc:{
    color: Color.black,
    width: windowWidth * 0.5,
    fontSize: moderateScale(10, 0.6),
  },
  imagecontainner:{
    height: windowHeight * 0.11,
    width: windowWidth * 0.2,
    // backgroundColor:'red',
    padding: moderateScale(10, 0.6),
  }
});
