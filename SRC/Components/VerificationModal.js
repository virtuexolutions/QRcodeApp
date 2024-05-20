import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import {useNavigation} from '@react-navigation/native';
import CustomImage from './CustomImage';
import RNFetchBlob from 'rn-fetch-blob';

const VerificationModal = ({
  data,
  qrName,
  qrCodeRef,
  setIsVisible,
  type,
  isVisible,
}) => {
  console.log('🚀 ~ VerificationModal ~ type:', type);
  console.log('🚀 ~ VerificationModal ~ data==========>:', data);
  const navigation = useNavigation();
  const DownloadQr = () => {
    try {
      qrCodeRef.toDataURL(async data => {
        const path =
          RNFetchBlob.fs.dirs.DownloadDir +
          `/${qrName
            .replace('http', '')
            .replace('://', 'a')
            .replace('.', '_')
            .slice(0, 20)}.png`;
        await RNFetchBlob.fs.writeFile(path, data, 'base64');

        alert('Download Successfully');
        navigation.navigate('HomeScreen');
        // console.log("🚀 ~ qrCodeRef.toDataURL ~ path:", path)
      });
    } catch (error) {}
  };

  return (
    <Modal
      hasBackdrop={true}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isVisible={isVisible}
      onBackdropPress={() => {
        setIsVisible(false);
      }}>
      <View style={styles.mainContainer}>
        <View
          style={styles.headingContainer}>
          <CustomText style={styles.heading2} isBold>
            this qr code contains 
          </CustomText>
        </View>
        <CustomText style={styles.heading1} isBold>
          Content:
        </CustomText>

        {data?.type == 'image' ? (
          data?.path !== '' ? (
            <View style={styles.imagecontainer}>
              <CustomImage
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={{uri: data?.path}}
              />
            </View>
          ) : null
        ) : (
          <CustomText
            numberOfLines={2}
            style={{
              // backgroundColor :'red',
              marginRight :moderateScale(35,.3),
              color: Color.black,
              width: windowWidth * 0.4,
              fontSize: moderateScale(15, 0.6),
            }}
            isBold>
            {data?.type == 'pdf' ? data?.filename : data}
          </CustomText>
        )}
        <View style={styles.row}>
          <CustomText
            style={[
              styles.codename,
              {
                width: windowWidth * 0.13,
              },
            ]}
            isBold>
            type :
          </CustomText>

          <CustomText style={styles.codename} isBold>
            {type}
          </CustomText>
        </View>
        <View style={styles.row}>
          <CustomText style={styles.heading} isBold>
            qr code name :
          </CustomText>

          <CustomText numberOfLines={1} style={styles.codename} isBold>
            {qrName}
          </CustomText>
        </View>

        <View style={styles.btnRow}>
          <CustomButton
            bgColor={Color.themeblue}
            textColor={Color.white}
            width={windowWidth * 0.23}
            height={windowHeight * 0.05}
            borderRadius={moderateScale(10, 0.4)}
            text={'save'}
            fontSize={moderateScale(12, 0.3)}
            onPress={() => {
              console.log('butto is pressed =============>');
              DownloadQr();
            }}
            isBold
            marginTop={moderateScale(5, 0.3)}
          />
          <CustomButton
            bgColor={'transparent'}
            textColor={Color.themeblue}
            width={windowWidth * 0.23}
            height={windowHeight * 0.05}
            borderRadius={moderateScale(10, 0.4)}
            text={'skip'}
            fontSize={moderateScale(12, 0.3)}
            onPress={() => {
              navigation.navigate('HomeScreen');
            }}
            isBold
            marginTop={moderateScale(5, 0.3)}
            borderColor={Color.themeblue}
            borderWidth={1}
          />
        </View>
      </View>
    </Modal>
  );
};

export default VerificationModal;

const styles = StyleSheet.create({
  btnRow: {
    flexDirection: 'row',
    width: windowWidth * 0.53,
    justifyContent: 'space-between',
    paddingVertical: moderateScale(10, 0.6),
    marginLeft: moderateScale(50, 0.3),
  },
  codename: {
    color: Color.black,
    width: windowWidth * 0.25,
    fontSize: moderateScale(14, 0.6),
  },
  heading: {
    color: Color.black,
    width: windowWidth * 0.3,
    fontSize: moderateScale(14, 0.6),
  },
  row: {
    flexDirection: 'row',
    width: windowWidth * 0.5,
  },
  imagecontainer: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.3,
    marginRight: moderateScale(69, 0.3),
  },
  heading1: {
    color: Color.black,
    paddingTop: moderateScale(10, 0.6),
    width: windowWidth * 0.5,
    // paddingHorizontal: moderateScale(2,.6),
        // backgroundColor :'red',
    fontSize: moderateScale(14, 0.6),
  },
  heading2: {
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(18, 0.6),
    // backgroundColor :'red',
    // paddingHorizontal:moderateScale(13,.6)
  },
  mainContainer: {
    backgroundColor: Color.white,
    width: windowWidth * 0.8,
    alignItems: 'center',
    // paddingHorizontal: moderateScale(40, 0.6),
    borderRadius: moderateScale(20, 0.3),
    borderWidth: moderateScale(4, 0.6),
    borderColor: Color.themeblue,
    overflow: 'hidden',
  },
  headingContainer:{
    paddingVertical: moderateScale(15, 0.3),
    backgroundColor: Color.themeblue,
    width: windowWidth * 0.8,
    overflow: 'hidden',
  }
});
