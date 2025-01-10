import {StyleSheet, Text, View, Image, ActivityIndicator, Platform, ToastAndroid, Alert} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import {useNavigation} from '@react-navigation/native';
import CustomImage from './CustomImage';
import RNFetchBlob from 'rn-fetch-blob';
import {createLanguageService} from 'typescript';
import RNFS from 'react-native-fs';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

const VerificationModal = ({
  data,
  qrName,
  qrCodeRef,
  setIsVisible,
  type,
  isVisible,
  btnText,
  onContinue,
  fromGallery,
  galleryImages,
  modalVisible,
  setModalVisible,
  content,
  name,
}) => {
  console.log('🚀 ~ VerificationModal ~ type:=======>', data);
  // console.log(
  //   '🚀 ~ VerificationModal ~ data==========>:',
  //   galleryImages[0]?.filename,
  // );
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

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
        console.log('fdffdfsfds', qrCodeRef);
        await RNFetchBlob.fs.writeFile(path, data, 'base64');

        alert('Download Successfully');
        navigation.navigate('HomeScreen');
        // console.log("🚀 ~ qrCodeRef.toDataURL ~ path:", path)
      });
    } catch (error) {}
  };
  const DownloadQrIOS = () => {
    console.log('here');
    qrCodeRef.toDataURL(data => {
      // console.log('data here ===== >>>> ' , data)
      setIsLoading(true);
      RNFS.writeFile(
        RNFS.CachesDirectoryPath + `/${qrName}.png`,
        data,
        'base64',
      )
        .then(success => {
          console.log(success);
          return CameraRoll.saveToCameraRoll(
            RNFS.CachesDirectoryPath + `/${qrName}.png`,
            'photo',
          );
        })
        .then(() => {
          setIsLoading(false);
          // this.setState({ busy: false, imageSaved: true  })
          // ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT)
          Platform.OS == 'android' ?
          ToastAndroid.show('QR COde saved to gallery' , ToastAndroid.SHORT) :
          Alert.alert('QR COde saved to gallery');
          navigation.navigate('HomeScreen');
        });
    });
  };

  return (
    <Modal
      hasBackdrop={true}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isVisible={fromGallery ? modalVisible : isVisible}
      onBackdropPress={() => {
        fromGallery ? setModalVisible(false) : setIsVisible(false);
      }}>
      <View style={styles.mainContainer}>
        <View style={styles.headingContainer}>
          <CustomText style={styles.heading2} isBold>
            this qr code contains
          </CustomText>
        </View>
        <CustomText style={styles.heading1} isBold>
          Content:
        </CustomText>
        {btnText ? (
          <View style={styles.imagecontainer}>
            <CustomImage
              style={{
                height: '100%',
                width: '100%',
              }}
              source={{uri: data}}
            />
          </View>
        ) : (fromGallery && type == 'image') || data?.type == 'image' ? (
          data?.path != '' && (
            <View style={styles.imagecontainer}>
              <CustomImage
                style={{
                  height: '100%',
                  width: '100%',
                }}
                // source={require('../Assets/Images/dummyUser1.png')}
                source={fromGallery ? {uri: content} : {uri: data?.path}}
              />
            </View>
          )
        ) : (
          <CustomText
            numberOfLines={2}
            style={{
              // backgroundColor :'red',
              marginRight: moderateScale(35, 0.3),
              color: Color.black,
              width: windowWidth * 0.4,
              fontSize: moderateScale(15, 0.6),
            }}
            isBold>
            {fromGallery
              ? content
              : data?.type == 'pdf'
              ? data?.filename
              : data}
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
          <CustomText
            style={[
              styles.codename,
              {
                color: Color.black,
              },
            ]}
            isBold>
            {type}
          </CustomText>
        </View>
        {[null, undefined, ''].includes(btnText) && (
          <View style={styles.row}>
            <CustomText style={styles.heading} isBold>
              qr code name :
            </CustomText>

            <CustomText
              numberOfLines={1}
              style={[
                styles.codename,
                {
                  color: Color.black,
                },
              ]}
              isBold>
              {fromGallery ? name : qrName}
            </CustomText>
          </View>
        )}
        {fromGallery ? (
          <View
            style={{
              // backgroundColor: 'red',
              width: '50%',
              paddingVertical: moderateScale(10, 0.6),
              marginLeft: moderateScale(190, 0.6),
            }}>
            <CustomButton
              bgColor={Color.themeblue}
              textColor={Color.white}
              width={windowWidth * 0.23}
              height={windowHeight * 0.05}
              borderRadius={moderateScale(10, 0.4)}
              text={'cancel'}
              fontSize={moderateScale(12, 0.3)}
              onPress={() => {
                setModalVisible(false);
              }}
              isBold
              marginTop={moderateScale(5, 0.3)}
            />
          </View>
        ) : (
          <View style={styles.btnRow}>
            <CustomButton
              bgColor={Color.themeblue}
              textColor={Color.white}
              width={windowWidth * 0.23}
              height={windowHeight * 0.05}
              borderRadius={moderateScale(10, 0.4)}
              text={
                isLoading ? (
                  <ActivityIndicator size={'small'} color={'white'} />
                ) : btnText ? (
                  btnText
                ) : (
                  'save'
                )
              }
              fontSize={moderateScale(12, 0.3)}
              onPress={() => {
                console.log('butto is pressed =============>');
                btnText ? onContinue() : DownloadQrIOS();
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
                btnText
                  ? setIsVisible(false)
                  : navigation.navigate('HomeScreen');
              }}
              isBold
              marginTop={moderateScale(5, 0.3)}
              borderColor={Color.themeblue}
              borderWidth={1}
            />
          </View>
        )}
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
    color: Color.themeblue,
    width: windowWidth * 0.25,
    fontSize: moderateScale(14, 0.6),
  },
  heading: {
    color: Color.themeblue,
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
    color: Color.themeblue,
    paddingTop: moderateScale(10, 0.6),
    width: windowWidth * 0.5,
    fontSize: moderateScale(14, 0.6),
  },
  heading2: {
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(18, 0.6),
  },
  mainContainer: {
    backgroundColor: Color.white,
    width: windowWidth * 0.8,
    alignItems: 'center',
    borderRadius: moderateScale(20, 0.3),
    borderWidth: moderateScale(4, 0.6),
    borderColor: Color.themeblue,
    overflow: 'hidden',
  },
  headingContainer: {
    paddingVertical: moderateScale(15, 0.3),
    backgroundColor: Color.themeblue,
    width: windowWidth * 0.8,
    overflow: 'hidden',
  },
});
